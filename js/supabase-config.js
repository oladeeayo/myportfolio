// Supabase configuration for universal data persistence.
// With this set up, changes made on any device will sync across all devices.
//
// STEP 1: Sign up at https://supabase.com (free tier, no credit card)
// STEP 2: Create a new project (choose any region)
// STEP 3: Go to Project Settings > API and copy the "Project URL" and "anon public" key
// STEP 4: Fill them in below
// STEP 5: In the Supabase SQL Editor, run:
//
//   CREATE TABLE portfolio_data (
//     id TEXT PRIMARY KEY DEFAULT 'main',
//     data JSONB DEFAULT '{}'::jsonb,
//     posts JSONB DEFAULT '[]'::jsonb,
//     updated_at TIMESTAMPTZ DEFAULT NOW()
//   );
//
//   INSERT INTO portfolio_data (id) VALUES ('main');
//
//   ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;
//   CREATE POLICY "allow_select" ON portfolio_data FOR SELECT USING (true);
//   CREATE POLICY "allow_insert" ON portfolio_data FOR INSERT WITH CHECK (true);
//   CREATE POLICY "allow_update" ON portfolio_data FOR UPDATE USING (true);
//
//   -- ⚠️ WARNING: The RLS above allows public read/write since the anon key
//   -- is visible in client-side code. For a portfolio site this is acceptable.
//   -- The admin password still protects the admin UI.
//
// STEP 6: Deploy the site to Vercel. Changes will now sync across all devices!
// Leave url and anonKey empty ('') to use only localStorage (no cross-device sync).

window.SUPABASE_CONFIG = {
  url: '',
  anonKey: ''
};
