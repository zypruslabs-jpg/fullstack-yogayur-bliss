import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase (for frontend)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase with full access (for admin API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export type Photo = {
  id: string
  url: string
  section: 'hero' | 'services' | 'programs' | 'gallery' | 'blog' | 'team' | 'about'
  alt: string
  title?: string
  order_index: number
  created_at: string
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  category: string
  author: string
  published: boolean
  created_at: string
  updated_at: string
}

export type Booking = {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  status: 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
}

export type Analytics = {
  id: string
  page: string
  event: string
  created_at: string
}
