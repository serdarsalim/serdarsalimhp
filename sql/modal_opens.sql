-- Table to track when users open the curious modal
CREATE TABLE IF NOT EXISTS modal_opens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  country_code TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for querying by session
CREATE INDEX IF NOT EXISTS idx_modal_opens_session ON modal_opens(session_id);

-- Index for querying by question
CREATE INDEX IF NOT EXISTS idx_modal_opens_question ON modal_opens(question_id);

-- Index for analytics by country
CREATE INDEX IF NOT EXISTS idx_modal_opens_country ON modal_opens(country_code);

-- Index for time-based queries
CREATE INDEX IF NOT EXISTS idx_modal_opens_created_at ON modal_opens(created_at);

-- Enable RLS
ALTER TABLE modal_opens ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts from API
CREATE POLICY "Allow API to insert modal opens"
  ON modal_opens
  FOR INSERT
  WITH CHECK (true);

-- Policy to allow reads for analytics (adjust based on your needs)
CREATE POLICY "Allow authenticated users to read modal opens"
  ON modal_opens
  FOR SELECT
  USING (true);
