// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pnwakyibtpncjosghlbh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBud2FreWlidHBuY2pvc2dobGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNTg5MjcsImV4cCI6MjA2MzYzNDkyN30.Ij5Ct5jsxQmzU9GCnuujCATNaCPpgPf64pzKmNBmpBQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);