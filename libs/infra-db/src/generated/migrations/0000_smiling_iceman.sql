CREATE TYPE "public"."action_type" AS ENUM('accept_draw', 'offer_draw', 'resign');--> statement-breakpoint
CREATE TYPE "public"."color" AS ENUM('white', 'black');--> statement-breakpoint
CREATE TYPE "public"."game_status" AS ENUM('empty', 'waiting', 'ready', 'in-progress', 'end');--> statement-breakpoint
CREATE TYPE "public"."result" AS ENUM('1-0', '0-1', '1/2-1/2', '0-0');--> statement-breakpoint
CREATE TYPE "public"."result_reason" AS ENUM('checkmate', 'stalemate', 'timeout', 'resignation', 'abandoned');--> statement-breakpoint
CREATE TYPE "public"."time_control_classification" AS ENUM('correspondence', 'blitz', 'bullet', 'rapid', 'no_clock');--> statement-breakpoint
CREATE TYPE "public"."variant" AS ENUM('standard');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "actions" (
	"action_id" serial PRIMARY KEY NOT NULL,
	"game_id" uuid NOT NULL,
	"color" "color" NOT NULL,
	"move_number" smallint NOT NULL,
	"type" "action_type" NOT NULL,
	"payload" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "games" (
	"game_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"variant" "variant" DEFAULT 'standard' NOT NULL,
	"is_private" boolean DEFAULT false NOT NULL,
	"white_player_id" text,
	"black_player_id" text,
	"time_control_classification" time_control_classification DEFAULT 'no_clock' NOT NULL,
	"time_control" jsonb,
	"status" "game_status" DEFAULT 'empty' NOT NULL,
	"result" "result" DEFAULT '0-0' NOT NULL,
	"result_reason" "result_reason",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"started_at" timestamp,
	"ended_at" timestamp,
	CONSTRAINT "time_control_standard_check" CHECK ((
        "games"."time_control_classification" NOT IN ('bullet', 'blitz', 'rapid')
        OR (
          "games"."time_control" IS NOT NULL
          AND "games"."time_control"->>'initial' IS NOT NULL
          AND "games"."time_control"->>'increment' IS NOT NULL
        )
      )),
	CONSTRAINT "time_control_correspondence_check" CHECK ((
        "games"."time_control_classification" != 'correspondence'
        OR (
          "games"."time_control" IS NOT NULL
          AND "games"."time_control"->>'daysPerMove' IS NOT NULL
        )
      )),
	CONSTRAINT "time_control_no_clock_check" CHECK ((
        "games"."time_control_classification" != 'no_clock'
        OR "games"."time_control" IS NULL
      ))
);
--> statement-breakpoint
CREATE TABLE "moves" (
	"move_id" serial PRIMARY KEY NOT NULL,
	"game_id" uuid NOT NULL,
	"uci" varchar(10) NOT NULL,
	"moved_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_anonymous" boolean,
	"username" text,
	"display_username" text,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "actions" ADD CONSTRAINT "actions_game_id_games_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("game_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_white_player_id_users_id_fk" FOREIGN KEY ("white_player_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_black_player_id_users_id_fk" FOREIGN KEY ("black_player_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "moves" ADD CONSTRAINT "moves_game_id_games_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("game_id") ON DELETE cascade ON UPDATE no action;