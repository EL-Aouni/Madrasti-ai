CREATE TABLE `assignmentProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`assignmentId` int NOT NULL,
	`studentId` int NOT NULL,
	`status` enum('not_started','in_progress','submitted','graded') NOT NULL DEFAULT 'not_started',
	`score` int,
	`feedback` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `assignmentProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `assignments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`classroomId` int NOT NULL,
	`professorId` int NOT NULL,
	`kind` enum('course','exercise','exam') NOT NULL,
	`title` varchar(180) NOT NULL,
	`body` text NOT NULL,
	`dueAt` timestamp,
	`published` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `assignments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `classroomMembers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`classroomId` int NOT NULL,
	`studentId` int NOT NULL,
	`joinedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `classroomMembers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `classrooms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`professorId` int NOT NULL,
	`name` varchar(180) NOT NULL,
	`subject` varchar(80) NOT NULL,
	`gradeId` varchar(16) NOT NULL,
	`joinCode` varchar(24) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `classrooms_id` PRIMARY KEY(`id`),
	CONSTRAINT `classrooms_joinCode_unique` UNIQUE(`joinCode`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`workspaceRole` enum('student','professor') NOT NULL DEFAULT 'student',
	`gradeId` varchar(16),
	`avatarName` varchar(120),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profiles_id` PRIMARY KEY(`id`)
);
