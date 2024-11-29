CREATE TABLE "public"."users" ("name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "uuid" text NOT NULL, PRIMARY KEY ("uuid") , UNIQUE ("email"));
