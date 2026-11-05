CREATE TABLE `teacherChatUsage` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`usageDate` varchar(10) NOT NULL,
	`messageCount` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teacherChatUsage_id` PRIMARY KEY(`id`)
);
