const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dzosxvshjfhybwlgtyxz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6b3N4dnNoamZoeWJ3bGd0eXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5Nzc3MDQsImV4cCI6MjA0NjU1MzcwNH0.aFnChYrIJB320wrI8xkMPu0iCjEExCGQs6OnbQ41sKw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;