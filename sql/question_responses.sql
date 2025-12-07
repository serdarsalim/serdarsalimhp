-- Schema for recording Question modal responses
create table if not exists question_responses (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  country_code text not null,
  question_id text not null,
  answer_text text not null,
  user_name text,
  ip_address text,
  user_agent text,
  created_at timestamptz default now(),
  is_hidden boolean not null default false,
  -- Create a unique constraint on session_id + question_id to prevent duplicate submissions
  unique(session_id, question_id)
);

-- Create an index on question_id for faster lookups
create index if not exists idx_question_responses_question_id on question_responses(question_id);

-- Create an index on session_id for faster duplicate checks
create index if not exists idx_question_responses_session_id on question_responses(session_id);

-- Create an index on ip_address for duplicate detection
create index if not exists idx_question_responses_ip_address on question_responses(ip_address);

-- Create an index on created_at for time-based queries
create index if not exists idx_question_responses_created_at on question_responses(created_at desc);

-- Enable Row Level Security (RLS)
alter table question_responses enable row level security;

-- Policy: Allow anonymous users to insert their own responses
-- This allows the API to insert responses using service role key
create policy "Allow service role to insert question responses"
  on question_responses
  for insert
  to service_role
  with check (true);

-- Policy: Allow service role to select for duplicate checking
create policy "Allow service role to select question responses"
  on question_responses
  for select
  to service_role
  using (true);

-- Policy: No public read access (responses are private)
-- If you want to allow public reading in the future, you can add:
-- create policy "Allow public to read question responses"
--   on question_responses
--   for select
--   to anon, authenticated
--   using (true);
