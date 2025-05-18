import  { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://udlrlvlgxuhyncdghlso.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkbHJsdmxneHVoeW5jZGdobHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMjg4ODYsImV4cCI6MjA2MDcwNDg4Nn0.-O3zTK1XO93DEouVrb0M5jSM5M-dF0XfXXilEl7Iqbw";

export const supabase = createClient(supabaseUrl, supabaseKey);