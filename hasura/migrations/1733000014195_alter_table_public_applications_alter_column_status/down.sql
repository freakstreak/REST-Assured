alter table "public"."applications" alter column "status" set default 'active'::application_status;
ALTER TABLE "public"."applications" ALTER COLUMN "status" TYPE USER-DEFINED;
