-- Schema for recording Curious modal responses
create table if not exists curious_responses (
  id uuid primary key default gen_random_uuid(),
  session_id text unique not null,
  country_code text not null,
  question_id text not null,
  choice text not null check (choice in ('yes', 'no')),
  ip_address text,
  user_agent text,
  created_at timestamptz default now()
);
