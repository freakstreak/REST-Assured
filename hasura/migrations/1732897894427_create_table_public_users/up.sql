CREATE TABLE "public"."users" ("uuid" uuid NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, PRIMARY KEY ("uuid") , UNIQUE ("email"));
