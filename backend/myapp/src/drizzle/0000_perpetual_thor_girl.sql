CREATE TABLE `todo` (
	`id` integer PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`done` integer DEFAULT 0 NOT NULL
);
