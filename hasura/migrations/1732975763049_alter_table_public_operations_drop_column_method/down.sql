alter table "public"."operations" alter column "method" drop not null;
alter table "public"."operations" add column "method" operations_method;
