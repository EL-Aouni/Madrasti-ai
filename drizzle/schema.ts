import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  passwordHash: varchar("passwordHash", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const profiles = mysqlTable("profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  workspaceRole: mysqlEnum("workspaceRole", ["student", "professor"]).default("student").notNull(),
  gradeId: varchar("gradeId", { length: 16 }),
  avatarName: varchar("avatarName", { length: 120 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const classrooms = mysqlTable("classrooms", {
  id: int("id").autoincrement().primaryKey(),
  professorId: int("professorId").notNull(),
  name: varchar("name", { length: 180 }).notNull(),
  subject: varchar("subject", { length: 80 }).notNull(),
  gradeId: varchar("gradeId", { length: 16 }).notNull(),
  joinCode: varchar("joinCode", { length: 24 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const classroomMembers = mysqlTable("classroomMembers", {
  id: int("id").autoincrement().primaryKey(),
  classroomId: int("classroomId").notNull(),
  studentId: int("studentId").notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
});

export const assignments = mysqlTable("assignments", {
  id: int("id").autoincrement().primaryKey(),
  classroomId: int("classroomId").notNull(),
  professorId: int("professorId").notNull(),
  kind: mysqlEnum("kind", ["course", "exercise", "exam"]).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  body: text("body").notNull(),
  dueAt: timestamp("dueAt"),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const assignmentProgress = mysqlTable("assignmentProgress", {
  id: int("id").autoincrement().primaryKey(),
  assignmentId: int("assignmentId").notNull(),
  studentId: int("studentId").notNull(),
  status: mysqlEnum("status", ["not_started", "in_progress", "submitted", "graded"]).default("not_started").notNull(),
  score: int("score"),
  feedback: text("feedback"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  kind: mysqlEnum("kind", ["assignment", "feedback", "class", "system"]).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  body: text("body").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const pronunciationAttempts = mysqlTable("pronunciationAttempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  language: varchar("language", { length: 16 }).notNull(),
  target: text("target").notNull(),
  transcript: text("transcript").notNull(),
  accuracy: int("accuracy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const teacherChatUsage = mysqlTable("teacherChatUsage", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  // Calendar day the count applies to, e.g. "2026-09-27", so the cap resets daily.
  usageDate: varchar("usageDate", { length: 10 }).notNull(),
  messageCount: int("messageCount").default(0).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Profile = typeof profiles.$inferSelect;
export type Classroom = typeof classrooms.$inferSelect;
export type ClassroomMember = typeof classroomMembers.$inferSelect;
export type Assignment = typeof assignments.$inferSelect;
export type AssignmentProgress = typeof assignmentProgress.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type PronunciationAttempt = typeof pronunciationAttempts.$inferSelect;
export type TeacherChatUsage = typeof teacherChatUsage.$inferSelect;
