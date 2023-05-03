const {createClient} = require('@supabase/supabase-js')

const supabaseUrl = 'https://hrezsdnpshedssqzmsup.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyZXpzZG5wc2hlZHNzcXptc3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgwMDE0MDksImV4cCI6MTk3MzU3NzQwOX0.EyPtH1jh9Gp87gL-rZBwMTOvwE0tn6cMRg5uk6NYdHo'
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase;