CREATE TABLE `contractor_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`business_name` text NOT NULL,
	`contact_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`postcode` text NOT NULL,
	`service_radius` text NOT NULL,
	`years_experience` integer NOT NULL,
	`company_number` text DEFAULT '' NOT NULL,
	`insurance_confirmed` integer DEFAULT false NOT NULL,
	`services` text DEFAULT '[]' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`postcode` text NOT NULL,
	`town` text DEFAULT '' NOT NULL,
	`category` text NOT NULL,
	`urgency` text NOT NULL,
	`property_type` text NOT NULL,
	`description` text NOT NULL,
	`photo_keys` text DEFAULT '[]' NOT NULL,
	`consent` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'submitted' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
