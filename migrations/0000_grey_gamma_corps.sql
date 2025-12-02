CREATE TYPE "public"."game_role" AS ENUM('tank', 'dps', 'support', 'healer', 'flex', 'any');--> statement-breakpoint
CREATE TYPE "public"."skill_level" AS ENUM('beginner', 'intermediate', 'advanced', 'expert', 'pro');--> statement-breakpoint
CREATE TYPE "public"."user_rank" AS ENUM('member', 'company_director', 'leadership_council', 'operations_manager', 'rs_trust_safety_director', 'team_member', 'administrator', 'senior_administrator', 'moderator', 'community_moderator', 'community_senior_moderator', 'community_developer', 'bronze_vip', 'sapphire_vip', 'diamond_vip', 'founders_edition_vip', 'customer_relations', 'rs_volunteer_staff');--> statement-breakpoint
CREATE TYPE "public"."vip_tier" AS ENUM('none', 'bronze', 'sapphire', 'diamond', 'founders');--> statement-breakpoint
CREATE TABLE "achievements" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" text,
	"icon" varchar,
	"criteria" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "achievements_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "announcements" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"content" text NOT NULL,
	"type" varchar DEFAULT 'update' NOT NULL,
	"details" text,
	"is_published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "blocks" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"blocked_user_id" varchar NOT NULL,
	"blocked_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "build_votes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"build_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"is_upvote" boolean NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "builds" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author_id" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"game" varchar NOT NULL,
	"character" varchar,
	"category" varchar,
	"content" text NOT NULL,
	"image_url" varchar,
	"upvotes" integer DEFAULT 0,
	"downvotes" integer DEFAULT 0,
	"view_count" integer DEFAULT 0,
	"is_featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "challenge_participants" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"challenge_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"progress" integer DEFAULT 0,
	"completed" boolean DEFAULT false,
	"joined_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "challenges" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"objective" text,
	"reward" integer DEFAULT 0,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"participant_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sender_id" varchar NOT NULL,
	"recipient_id" varchar,
	"clan_id" varchar,
	"content" text NOT NULL,
	"is_read" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "clans" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"tag" varchar(6) NOT NULL,
	"description" text,
	"logo_url" varchar,
	"banner_url" varchar,
	"owner_id" varchar NOT NULL,
	"is_recruiting" boolean DEFAULT true,
	"member_count" integer DEFAULT 1,
	"max_members" integer DEFAULT 50,
	"discord_invite" varchar,
	"primary_game" varchar,
	"requirements" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "clans_name_unique" UNIQUE("name"),
	CONSTRAINT "clans_tag_unique" UNIQUE("tag")
);
--> statement-breakpoint
CREATE TABLE "creator_analytics" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"creator_id" varchar NOT NULL,
	"total_views" integer DEFAULT 0,
	"total_earnings" integer DEFAULT 0,
	"total_sales" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "daily_rewards" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"last_claimed_at" timestamp,
	"streak" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "forum_categories" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" text,
	"icon" varchar,
	"color" varchar,
	"order" integer DEFAULT 0,
	"thread_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "forum_replies" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"thread_id" varchar NOT NULL,
	"author_id" varchar NOT NULL,
	"content" text NOT NULL,
	"upvotes" integer DEFAULT 0,
	"parent_reply_id" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "forum_threads" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" varchar NOT NULL,
	"author_id" varchar NOT NULL,
	"title" varchar NOT NULL,
	"content" text NOT NULL,
	"is_pinned" boolean DEFAULT false,
	"is_locked" boolean DEFAULT false,
	"view_count" integer DEFAULT 0,
	"reply_count" integer DEFAULT 0,
	"upvotes" integer DEFAULT 0,
	"last_reply_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "friendships" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id_1" varchar NOT NULL,
	"user_id_2" varchar NOT NULL,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "knowledge_base" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"content" text NOT NULL,
	"category" varchar NOT NULL,
	"view_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lfg_participants" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lfg_post_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"role" "game_role" DEFAULT 'any',
	"joined_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lfg_posts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author_id" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"game" varchar NOT NULL,
	"platform" varchar NOT NULL,
	"region" varchar,
	"skill_level" "skill_level" DEFAULT 'intermediate',
	"role_needed" "game_role" DEFAULT 'any',
	"players_needed" integer DEFAULT 1,
	"players_joined" integer DEFAULT 0,
	"scheduled_at" timestamp,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "magic_link_tokens" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"token" varchar NOT NULL,
	"expires_at" timestamp NOT NULL,
	"used_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "magic_link_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "marketplace_items" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author_id" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"category" varchar NOT NULL,
	"image_url" varchar,
	"is_featured" boolean DEFAULT false,
	"sales_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "meta_database" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"game" varchar NOT NULL,
	"character" varchar,
	"title" varchar NOT NULL,
	"content" text NOT NULL,
	"tier" varchar,
	"win_rate" integer,
	"view_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"type" varchar NOT NULL,
	"related_user_id" varchar,
	"message" text,
	"is_read" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"vip_tier" varchar NOT NULL,
	"amount" integer NOT NULL,
	"status" varchar DEFAULT 'processing',
	"stripe_payment_intent_id" varchar,
	"card_last_4" varchar,
	"card_brand" varchar,
	"billing_name" varchar,
	"billing_email" varchar,
	"billing_address" text,
	"billing_city" varchar,
	"billing_state" varchar,
	"billing_zip" varchar,
	"billing_country" varchar,
	"error_message" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" text,
	"game_type" varchar NOT NULL,
	"location" varchar,
	"image_url" varchar,
	"status" varchar DEFAULT 'active',
	"order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"referrer_id" varchar NOT NULL,
	"referred_id" varchar NOT NULL,
	"reward_earned" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "referrals_referred_id_unique" UNIQUE("referred_id")
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reporter_id" varchar NOT NULL,
	"target_user_id" varchar,
	"content_type" varchar,
	"content_id" varchar,
	"reason" text NOT NULL,
	"status" varchar DEFAULT 'open' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reputation_points" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"total_points" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" varchar PRIMARY KEY DEFAULT 'main' NOT NULL,
	"is_offline" boolean DEFAULT false,
	"offline_message" text DEFAULT 'We''re currently performing maintenance. We''ll be back online shortly!',
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"text" text NOT NULL,
	"rating" integer NOT NULL,
	"is_featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_achievements" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"achievement_id" varchar NOT NULL,
	"unlocked_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar,
	"password" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"username" varchar,
	"bio" text,
	"vip_tier" "vip_tier" DEFAULT 'none',
	"stripe_customer_id" varchar,
	"stripe_subscription_id" varchar,
	"discord_id" varchar,
	"discord_username" varchar,
	"discord_avatar" varchar,
	"discord_linked_at" timestamp,
	"roblox_id" varchar,
	"roblox_username" varchar,
	"roblox_display_name" varchar,
	"roblox_linked_at" timestamp,
	"games_played" integer DEFAULT 0,
	"total_posts" integer DEFAULT 0,
	"reputation" integer DEFAULT 0,
	"clan_id" varchar,
	"clan_role" varchar,
	"user_rank" "user_rank" DEFAULT 'member',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_discord_id_unique" UNIQUE("discord_id"),
	CONSTRAINT "users_roblox_id_unique" UNIQUE("roblox_id")
);
--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "sessions" USING btree ("expire");