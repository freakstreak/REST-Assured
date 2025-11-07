ALTER TABLE "public"."applications" ALTER COLUMN "status" TYPE text;
alter table "public"."applications" alter column "status" set default 'pending';
