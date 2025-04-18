
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bksbzddptzjseiwyndpv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrc2J6ZGRwdHpqc2Vpd3luZHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2Mjk1MzAsImV4cCI6MjA2MDIwNTUzMH0.bu9wxhj1EdFaDpot41GsC1mw7r9JEz9DLHUBptyqFkw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
});
