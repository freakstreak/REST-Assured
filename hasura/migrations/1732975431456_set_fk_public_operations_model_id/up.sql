alter table "public"."operations"
  add constraint "operations_model_id_fkey"
  foreign key ("model_id")
  references "public"."model"
  ("id") on update cascade on delete cascade;
