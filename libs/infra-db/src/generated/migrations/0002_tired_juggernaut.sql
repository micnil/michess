CREATE TABLE "ratings" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" text NOT NULL,
	"game_id" uuid,
	"variant" "variant" NOT NULL,
	"time_control_classification" time_control_classification NOT NULL,
	"rating" real NOT NULL,
	"deviation" real NOT NULL,
	"volatility" real NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_player_id_users_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_game_id_games_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("game_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_game_variant_tc_fk" FOREIGN KEY ("game_id","variant","time_control_classification") REFERENCES "public"."games"("game_id","variant","time_control_classification") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_ratings_player_variant_tc_created" ON "ratings" USING btree ("player_id","variant","time_control_classification","timestamp" DESC NULLS LAST);--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "game_variant_tc_unique" UNIQUE("game_id","variant","time_control_classification");