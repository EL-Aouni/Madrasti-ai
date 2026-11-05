CREATE TABLE `pronunciationAttempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`language` varchar(16) NOT NULL,
	`target` text NOT NULL,
	`transcript` text NOT NULL,
	`accuracy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pronunciationAttempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `passwordHash` varchar(255);