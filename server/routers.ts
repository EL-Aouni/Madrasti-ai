import { z } from "zod";
import { COOKIE_NAME, ONE_YEAR_MS } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import { scorePronunciation } from "../lib/speech-scoring";
import { hashPassword, verifyPassword } from "./password";
import { sdk } from "./_core/sdk";
import { storagePut, storageGetSignedUrl } from "./storage";
import { transcribeAudio } from "./_core/voiceTranscription";
import { invokeLLM, type Message } from "./_core/llm";
import { ENV } from "./_core/env";

const MOUALIM_SYSTEM_PROMPT =
  "Tu es Moualim, un professeur particulier bienveillant pour des élèves marocains du collège et du lycée. " +
  "Tu t'appuies sur le programme scolaire marocain. Réponds en français clair et simple par défaut, mais si " +
  "l'élève t'écrit en arabe, en darija ou dans une autre langue, réponds dans cette même langue. Explique étape " +
  "par étape, pose des questions courtes pour vérifier la compréhension plutôt que de donner la réponse finale " +
  "trop vite, et reste encourageant. Garde tes réponses concises (moins de 120 mots), sauf si l'élève demande " +
  "explicitement un exercice ou une explication détaillée.";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    register: publicProcedure.input(z.object({ name: z.string().trim().min(2).max(120), email: z.string().email(), password: z.string().min(8).max(128) })).mutation(async ({ ctx, input }) => {
      const email = input.email.trim().toLowerCase();
      if (await db.getUserByEmail(email)) throw new TRPCError({ code: "CONFLICT", message: "Un compte existe déjà avec cet email." });
      const user = await db.createPasswordUser({ name: input.name, email, passwordHash: await hashPassword(input.password) });
      if (!user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Impossible de créer le compte." });
      const token = await sdk.createSessionToken(user.openId, { name: user.name ?? input.name });
      ctx.res.cookie(COOKIE_NAME, token, { ...getSessionCookieOptions(ctx.req), maxAge: ONE_YEAR_MS });
      return { sessionToken: token, user: { id: user.id, openId: user.openId, name: user.name, email: user.email, loginMethod: user.loginMethod, lastSignedIn: user.lastSignedIn } };
    }),
    login: publicProcedure.input(z.object({ email: z.string().email(), password: z.string().min(1).max(128) })).mutation(async ({ ctx, input }) => {
      const user = await db.getUserByEmail(input.email);
      if (!user?.passwordHash || !(await verifyPassword(input.password, user.passwordHash))) throw new TRPCError({ code: "UNAUTHORIZED", message: "Email ou mot de passe incorrect." });
      await db.upsertUser({ openId: user.openId, lastSignedIn: new Date() });
      const token = await sdk.createSessionToken(user.openId, { name: user.name ?? user.email ?? "Madrasti" });
      ctx.res.cookie(COOKIE_NAME, token, { ...getSessionCookieOptions(ctx.req), maxAge: ONE_YEAR_MS });
      return { sessionToken: token, user: { id: user.id, openId: user.openId, name: user.name, email: user.email, loginMethod: user.loginMethod, lastSignedIn: new Date() } };
    }),
    logout: publicProcedure.mutation(({ ctx }) => { const cookieOptions = getSessionCookieOptions(ctx.req); ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 }); return { success: true } as const; }),
  }),
  workspace: router({
    myClasses: protectedProcedure.query(({ ctx }) => db.getProfessorClassrooms(ctx.user.id)),
    classroom: protectedProcedure.input(z.object({ classroomId: z.number().int().positive() })).query(({ input }) => db.getClassroomById(input.classroomId)),
    createClass: protectedProcedure.input(z.object({ name: z.string().min(3), subject: z.string().min(2), gradeId: z.string().min(2), joinCode: z.string().min(4) })).mutation(({ ctx, input }) => db.createClassroom({ professorId: ctx.user.id, ...input })),
    joinClass: protectedProcedure.input(z.object({ code: z.string().min(4) })).mutation(({ ctx, input }) => db.joinClassroomByCode(input.code, ctx.user.id)),
    myJoinedClasses: protectedProcedure.query(({ ctx }) => db.getStudentClassrooms(ctx.user.id)),
    publish: protectedProcedure.input(z.object({ classroomId: z.number().int().positive(), kind: z.enum(["course", "exercise", "exam"]), title: z.string().min(3), body: z.string().min(1), dueAt: z.coerce.date().optional() })).mutation(({ ctx, input }) => db.createAssignment({ professorId: ctx.user.id, ...input })),
    assignments: protectedProcedure.input(z.object({ classroomId: z.number().int().positive() })).query(({ input }) => db.getClassroomAssignments(input.classroomId)),
    saveProgress: protectedProcedure.input(z.object({ assignmentId: z.number().int().positive(), status: z.enum(["not_started", "in_progress", "submitted", "graded"]), score: z.number().int().optional(), feedback: z.string().optional() })).mutation(({ ctx, input }) => db.saveAssignmentProgress({ studentId: ctx.user.id, ...input })),
    grade: protectedProcedure.input(z.object({ progressId: z.number().int().positive(), score: z.number().int().min(0), feedback: z.string().min(1) })).mutation(({ input }) => db.gradeProgress(input)),
    notifications: protectedProcedure.query(({ ctx }) => db.getStudentNotifications(ctx.user.id)),
    markNotificationRead: protectedProcedure.input(z.object({ notificationId: z.number().int().positive() })).mutation(({ ctx, input }) => db.markNotificationRead(input.notificationId, ctx.user.id)),
  }),
  voice: router({
    evaluate: protectedProcedure.input(z.object({ target: z.string().min(1), transcript: z.string().min(1), language: z.string().min(2) })).mutation(async ({ ctx, input }) => { const result = scorePronunciation(input.target, input.transcript); await db.savePronunciationAttempt({ userId: ctx.user.id, language: input.language, target: input.target, transcript: input.transcript, accuracy: result.accuracy }); return { ...result, transcript: input.transcript }; }),
    history: protectedProcedure.input(z.object({ language: z.string().min(2).optional() }).optional()).query(({ ctx, input }) => db.getPronunciationAttempts(ctx.user.id, input?.language)),
    uploadAndEvaluate: protectedProcedure.input(z.object({ fileName: z.string().min(1), mimeType: z.string().min(1), base64: z.string().min(1).max(24_000_000), target: z.string().min(1), language: z.string().min(2) })).mutation(async ({ ctx, input }) => {
      const bytes = Buffer.from(input.base64, "base64");
      if (bytes.length > 16 * 1024 * 1024) throw new TRPCError({ code: "BAD_REQUEST", message: "Audio file is larger than 16MB" });
      const stored = await storagePut(`voice/${ctx.user.id}/${input.fileName}`, bytes, input.mimeType);
      const signedUrl = await storageGetSignedUrl(stored.key);
      const transcription = await transcribeAudio({ audioUrl: signedUrl, language: input.language, prompt: `Pronunciation practice. Target phrase: ${input.target}` });
      if (!("text" in transcription)) throw new TRPCError({ code: "BAD_GATEWAY", message: transcription.error });
      const result = scorePronunciation(input.target, transcription.text);
      await db.savePronunciationAttempt({ userId: ctx.user.id, language: input.language, target: input.target, transcript: transcription.text, accuracy: result.accuracy });
      return { ...result, transcript: transcription.text, storageKey: stored.key, duration: transcription.duration };
    }),
  }),
  teacher: router({
    chat: protectedProcedure
      .input(
        z.object({
          message: z.string().trim().min(1).max(2000),
          history: z
            .array(z.object({ role: z.enum(["student", "teacher"]), text: z.string().max(2000) }))
            .max(20)
            .optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const usage = await db.incrementAndCheckTeacherChatUsage(ctx.user.id, ENV.teacherChatDailyLimit);
        if (!usage.allowed) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: `Tu as atteint la limite de ${usage.limit} messages avec Moualim aujourd'hui. Reviens demain !`,
          });
        }

        const messages: Message[] = [
          { role: "system", content: MOUALIM_SYSTEM_PROMPT },
          ...(input.history ?? []).map(
            (m): Message => ({ role: m.role === "student" ? "user" : "assistant", content: m.text }),
          ),
          { role: "user", content: input.message },
        ];

        let result;
        try {
          result = await invokeLLM({ messages, model: ENV.llmModel, maxTokens: 400 });
        } catch (err) {
          console.error("[teacher.chat] LLM request failed:", err);
          throw new TRPCError({
            code: "BAD_GATEWAY",
            message: "Moualim n'est pas disponible pour le moment. Vérifie la clé OPENAI_API_KEY côté serveur, ou réessaie plus tard.",
          });
        }

        const rawContent = result.choices[0]?.message?.content;
        const reply =
          typeof rawContent === "string"
            ? rawContent
            : Array.isArray(rawContent)
              ? rawContent.map((part) => (part.type === "text" ? part.text : "")).join("")
              : "";

        if (!reply.trim()) {
          throw new TRPCError({ code: "BAD_GATEWAY", message: "Moualim n'a pas pu générer de réponse. Réessaie." });
        }

        return { reply: reply.trim() };
      }),
  }),
});

export type AppRouter = typeof appRouter;
