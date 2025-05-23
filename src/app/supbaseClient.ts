import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://spgmxibxcyouukxypwog.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwZ214aWJ4Y3lvdXVreHlwd29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMjg0NDUsImV4cCI6MjA2MjcwNDQ0NX0.PgZGyVLioA-2K3UJm_5pO5SbI1O4HEQlga9kYdvlkUs";
export const supabase = createClient(supabaseUrl, supabaseKey);
