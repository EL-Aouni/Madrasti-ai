import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

const SUPERUSER_EMAILS = new Set(["mohamed01elaouni@gmail.com"]);

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.email && SUPERUSER_EMAILS.has(user.email.toLowerCase())) {
      values.role = "admin";
      updateSet.role = "admin";
    } else if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.


export async function createProfessorProfile(userId: number, gradeId?: string, avatarName?: string) {
  const db = await getDb();
  if (!db) return null;
  const { profiles } = await import("../drizzle/schema");
  await db.insert(profiles).values({ userId, workspaceRole: "professor", gradeId, avatarName });
  return true;
}

export async function createClassroom(data: { professorId: number; name: string; subject: string; gradeId: string; joinCode: string }) {
  const db = await getDb();
  if (!db) return null;
  const { classrooms } = await import("../drizzle/schema");
  const result = await db.insert(classrooms).values(data);
  return true;
}

export async function getProfessorClassrooms(professorId: number) {
  const db = await getDb();
  if (!db) return [];
  const { classrooms } = await import("../drizzle/schema");
  return db.select().from(classrooms).where(eq(classrooms.professorId, professorId));
}

export async function joinClassroom(classroomId: number, studentId: number) {
  const db = await getDb();
  if (!db) return null;
  const { classroomMembers } = await import("../drizzle/schema");
  await db.insert(classroomMembers).values({ classroomId, studentId });
  return true;
}

export async function createAssignment(data: { classroomId: number; professorId: number; kind: "course" | "exercise" | "exam"; title: string; body: string; dueAt?: Date }) {
  const db = await getDb();
  if (!db) return null;
  const { assignments } = await import("../drizzle/schema");
  const result = await db.insert(assignments).values(data);
  return true;
}

export async function getClassroomAssignments(classroomId: number) {
  const db = await getDb();
  if (!db) return [];
  const { assignments } = await import("../drizzle/schema");
  return db.select().from(assignments).where(eq(assignments.classroomId, classroomId));
}

export async function saveAssignmentProgress(data: { assignmentId: number; studentId: number; status: "not_started" | "in_progress" | "submitted" | "graded"; score?: number; feedback?: string }) {
  const db = await getDb();
  if (!db) return null;
  const { assignmentProgress } = await import("../drizzle/schema");
  await db.insert(assignmentProgress).values(data);
  return true;
}


export async function gradeProgress(data: { progressId: number; score: number; feedback: string }) {
  const db = await getDb();
  if (!db) return null;
  const { assignmentProgress, notifications } = await import("../drizzle/schema");
  const rows = await db.select().from(assignmentProgress).where(eq(assignmentProgress.id, data.progressId)).limit(1);
  const progress = rows[0];
  if (!progress) return null;
  await db.update(assignmentProgress).set({ status: "graded", score: data.score, feedback: data.feedback }).where(eq(assignmentProgress.id, data.progressId));
  await db.insert(notifications).values({ userId: progress.studentId, kind: "feedback", title: "Ton travail a été corrigé", body: `Ton professeur a donné ${data.score} points et ajouté un commentaire.` });
  return true;
}

export async function getStudentNotifications(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const { notifications } = await import("../drizzle/schema");
  return db.select().from(notifications).where(eq(notifications.userId, userId));
}

export async function markNotificationRead(notificationId: number, userId: number) {
  const db = await getDb();
  if (!db) return null;
  const { notifications } = await import("../drizzle/schema");
  await db.update(notifications).set({ read: true }).where(eq(notifications.id, notificationId));
  return true;
}


export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.email, email.trim().toLowerCase())).limit(1);
  return result[0];
}

export async function createPasswordUser(data: { name: string; email: string; passwordHash: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const normalizedEmail = data.email.trim().toLowerCase();
  const openId = `email:${normalizedEmail}`;
  await db.insert(users).values({ openId, name: data.name.trim(), email: normalizedEmail, passwordHash: data.passwordHash, loginMethod: "email" });
  return getUserByOpenId(openId);
}


export async function joinClassroomByCode(code: string, studentId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const { classrooms, classroomMembers, notifications } = await import("../drizzle/schema");
  const rows = await db.select().from(classrooms).where(eq(classrooms.joinCode, code.trim().toUpperCase())).limit(1);
  const classroom = rows[0];
  if (!classroom) throw new TRPCError({ code: "NOT_FOUND", message: "Code de classe introuvable." });
  await db.insert(classroomMembers).values({ classroomId: classroom.id, studentId });
  await db.insert(notifications).values({ userId: studentId, kind: "class", title: "Classe rejointe", body: `Tu as rejoint ${classroom.name}.` });
  return classroom;
}

export async function getStudentClassrooms(studentId: number) {
  const db = await getDb();
  if (!db) return [];
  const { classrooms, classroomMembers } = await import("../drizzle/schema");
  return db.select({ classroom: classrooms }).from(classroomMembers).innerJoin(classrooms, eq(classroomMembers.classroomId, classrooms.id)).where(eq(classroomMembers.studentId, studentId));
}


export async function getClassroomById(classroomId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { classrooms } = await import("../drizzle/schema");
  const result = await db.select().from(classrooms).where(eq(classrooms.id, classroomId)).limit(1);
  return result[0];
}

export async function savePronunciationAttempt(data: { userId: number; language: string; target: string; transcript: string; accuracy: number }) {
  const db = await getDb();
  if (!db) return null;
  const { pronunciationAttempts } = await import("../drizzle/schema");
  await db.insert(pronunciationAttempts).values(data);
  return true;
}

export async function getPronunciationAttempts(userId: number, language?: string) {
  const db = await getDb();
  if (!db) return [];
  const { pronunciationAttempts } = await import("../drizzle/schema");
  const rows = await db.select().from(pronunciationAttempts).where(eq(pronunciationAttempts.userId, userId));
  return language ? rows.filter((row) => row.language === language) : rows;
}

// Tracks how many Moualim (AI teacher) messages a student has sent today, so
// a shared free-tier API quota can't be exhausted by one heavy user. Returns
// allowed: false once dailyLimit is reached; the count only increments when
// the message is allowed through.
export async function incrementAndCheckTeacherChatUsage(
  userId: number,
  dailyLimit: number,
): Promise<{ allowed: boolean; count: number; limit: number }> {
  const db = await getDb();
  if (!db) return { allowed: true, count: 0, limit: dailyLimit }; // no DB configured (e.g. local/tests) — don't block
  const { teacherChatUsage } = await import("../drizzle/schema");
  const today = new Date().toISOString().slice(0, 10);

  const rows = await db
    .select()
    .from(teacherChatUsage)
    .where(and(eq(teacherChatUsage.userId, userId), eq(teacherChatUsage.usageDate, today)));
  const existing = rows[0];
  const currentCount = existing?.messageCount ?? 0;

  if (currentCount >= dailyLimit) {
    return { allowed: false, count: currentCount, limit: dailyLimit };
  }

  if (existing) {
    await db.update(teacherChatUsage).set({ messageCount: currentCount + 1 }).where(eq(teacherChatUsage.id, existing.id));
  } else {
    await db.insert(teacherChatUsage).values({ userId, usageDate: today, messageCount: 1 });
  }

  return { allowed: true, count: currentCount + 1, limit: dailyLimit };
}
