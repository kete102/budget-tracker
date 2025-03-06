ALTER TABLE "users" ADD COLUMN "balance" numeric(20, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "total_income" numeric(20, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "total_expenses" numeric(20, 2) DEFAULT '0' NOT NULL;