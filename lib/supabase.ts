import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Booking = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status?: string;
  created_at?: string;
};

export type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author: string;
  published: boolean;
  created_at?: string;
};

export type Photo = {
  id?: string;
  url: string;
  section: string;
  alt: string;
  title: string;
  order_index: number;
  created_at?: string;
};
