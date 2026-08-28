CREATE TABLE `unanswered_searches` (
	`id` text PRIMARY KEY NOT NULL,
	`query` text NOT NULL,
	`normalized_query` text NOT NULL,
	`search_count` integer DEFAULT 1 NOT NULL,
	`first_seen_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`last_seen_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`status` text DEFAULT 'unreviewed' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unanswered_searches_normalized_query_unique` ON `unanswered_searches` (`normalized_query`);