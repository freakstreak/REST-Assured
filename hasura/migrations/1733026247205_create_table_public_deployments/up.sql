CREATE TABLE "public"."deployments" ("id" serial NOT NULL, "application_id" integer NOT NULL, "log_json" jsonb, "status" text NOT NULL DEFAULT 'pending', "created_at" timestamptz DEFAULT now(), "updated_at" timestamptz DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON UPDATE cascade ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_deployments_updated_at"
BEFORE UPDATE ON "public"."deployments"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_deployments_updated_at" ON "public"."deployments"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
