-- Schema for storing Serdar's personal questions and answers
create table if not exists personal_questions (
  id serial primary key,
  question text not null,
  answers text[] not null default array[]::text[],
  admin_email text not null default 'slmxyz@gmail.com',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table personal_questions
  add column if not exists is_default boolean not null default false;

create index if not exists idx_personal_questions_admin_email on personal_questions(admin_email);
create unique index if not exists idx_personal_questions_default_true on personal_questions ((is_default)) where is_default;

alter table personal_questions enable row level security;

drop policy if exists "Allow service role to manage personal questions" on personal_questions;

create policy "Allow service role to manage personal questions"
  on personal_questions
  for all
  to service_role
  using (true)
  with check (true);

drop trigger if exists trg_personal_questions_updated_at on personal_questions;

drop function if exists personal_questions_updated_at cascade;

create function personal_questions_updated_at() returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

create trigger trg_personal_questions_updated_at
  before update on personal_questions
  for each row
  execute procedure personal_questions_updated_at();
