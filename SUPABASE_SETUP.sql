-- ═══════════════════════════════════════════════
--  YogAyur Bliss - Supabase Database Setup
--  Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════

-- 1. Photos table
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('hero','services','programs','gallery','blog','team','about')),
  alt TEXT NOT NULL,
  title TEXT,
  order_index BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  category TEXT,
  author TEXT DEFAULT 'YogAyur Bliss Team',
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','confirmed','completed','cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (but allow service role full access)
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public can read published blogs and photos
CREATE POLICY "Public can view published blogs" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public can view photos" ON photos FOR SELECT USING (true);
-- Anyone can submit a booking
CREATE POLICY "Anyone can submit booking" ON bookings FOR INSERT WITH CHECK (true);
-- Service role (admin) has full access - handled by supabaseAdmin client

-- 5. Create Storage bucket for photos
-- Go to Storage in Supabase dashboard and create bucket named: yogayur-photos
-- Set it to PUBLIC
-- Add policy: Allow authenticated uploads (service role)

