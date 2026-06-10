'use client';

import { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard, Image, FileText, Calendar, BarChart2,
  LogOut, Upload, Trash2, Plus, Edit2, Check, X,
  Phone, Mail, RefreshCw, MessageSquare, Eye, EyeOff,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'yogayur_secret_token_2024';

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  created_at: string;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author: string;
  published: boolean;
  created_at: string;
};

type Photo = {
  id: string;
  url: string;
  section: string;
  alt: string;
  title: string;
  order_index: number;
};

const STATUS_COLORS: Record<string, string> = {
  new: '#00BCD4',
  contacted: '#FFD700',
  confirmed: '#00A86B',
  completed: '#7B2D8B',
  cancelled: '#ef4444',
};

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'photos', label: 'Photos', icon: Image },
  { id: 'blog', label: 'Blog Posts', icon: FileText },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [uploadSection, setUploadSection] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const authHeaders = { Authorization: `Bearer ${ADMIN_TOKEN}` };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, use a proper auth system)
    if (password === 'YogAyur@Admin2024' || password === ADMIN_TOKEN) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, pRes, blRes] = await Promise.all([
        fetch('/api/bookings', { headers: authHeaders }),
        fetch('/api/photos', { headers: authHeaders }),
        fetch('/api/blog?published=false', { headers: authHeaders }),
      ]);
      const [{ data: b }, { data: p }, { data: bl }] = await Promise.all([bRes.json(), pRes.json(), blRes.json()]);
      if (b) setBookings(b);
      if (p) setPhotos(p);
      if (bl) setBlogPosts(bl);
    } catch { /* silently handle */ } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  const updateBookingStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { ...authHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setBookings(b => b.map(bk => bk.id === id ? { ...bk, status } : bk));
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Delete this booking?')) return;
    await fetch(`/api/bookings/${id}`, { method: 'DELETE', headers: authHeaders });
    setBookings(b => b.filter(bk => bk.id !== id));
  };

  const deletePhoto = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    await fetch(`/api/photos/${id}`, { method: 'DELETE', headers: authHeaders });
    setPhotos(p => p.filter(ph => ph.id !== id));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('section', uploadSection);
    fd.append('alt', file.name);
    fd.append('title', file.name);
    const res = await fetch('/api/photos', { method: 'POST', headers: authHeaders, body: fd });
    const { data } = await res.json();
    if (data) setPhotos(p => [data, ...p]);
  };

  const savePost = async () => {
    if (!editingPost?.title) return;
    const slug = editingPost.slug || editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = { ...editingPost, slug };

    if (editingPost.id) {
      const res = await fetch(`/api/blog/${editingPost.id}`, {
        method: 'PATCH',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const { data } = await res.json();
      if (data) setBlogPosts(posts => posts.map(p => p.id === data.id ? data : p));
    } else {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, author: 'Admin' }),
      });
      const { data } = await res.json();
      if (data) setBlogPosts(posts => [data, ...posts]);
    }
    setEditingPost(null);
  };

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/blog/${id}`, { method: 'DELETE', headers: authHeaders });
    setBlogPosts(p => p.filter(post => post.id !== id));
  };

  // Analytics data
  const statusData = Object.entries(
    bookings.reduce((acc, b) => ({ ...acc, [b.status]: (acc[b.status] || 0) + 1 }), {} as Record<string, number>)
  ).map(([status, count]) => ({ status: status.charAt(0).toUpperCase() + status.slice(1), count }));

  const serviceData = Object.entries(
    bookings.reduce((acc, b) => {
      const key = b.service || 'Not specified';
      return { ...acc, [key]: (acc[key] || 0) + 1 };
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([service, count]) => ({ service: service.length > 20 ? service.slice(0, 20) + '...' : service, count }));

  const thisWeek = bookings.filter(b => {
    const d = new Date(b.created_at);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  const filteredBookings = statusFilter === 'all' ? bookings : bookings.filter(b => b.status === statusFilter);

  // Login Screen
  if (!authenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0a0015, #1a0a2e, #001a0a)' }}
      >
        <div className="w-full max-w-md px-4">
          <div
            className="p-8 rounded-3xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}
          >
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">🌸</div>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                YogAyur Bliss Admin
              </h1>
              <p className="text-gray-400 text-sm mt-1">Enter your password to continue</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Admin Password"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {authError && <p className="text-red-400 text-sm">{authError}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
              >
                Login to Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#0f0f1a', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col" style={{ background: '#1a1a2e', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}>🌸</div>
            <div>
              <div className="text-white font-bold text-sm">YogAyur Bliss</div>
              <div className="text-gray-400 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: activeTab === tab.id ? 'linear-gradient(135deg, #FF6B3520, #FFD70010)' : 'transparent',
                  color: activeTab === tab.id ? '#FFD700' : '#9ca3af',
                  border: activeTab === tab.id ? '1px solid rgba(255,107,53,0.3)' : '1px solid transparent',
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4">
          <button
            onClick={() => setAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between" style={{ background: 'rgba(15,15,26,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
          <h1 className="text-white font-bold text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            {tabs.find(t => t.id === activeTab)?.label}
          </h1>
          <button onClick={fetchData} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white transition-colors" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        <div className="p-8">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Bookings', value: bookings.length, icon: '📅', color: '#FF6B35' },
                  { label: 'New This Week', value: thisWeek, icon: '🆕', color: '#00A86B' },
                  { label: 'Photos Uploaded', value: photos.length, icon: '📸', color: '#FFD700' },
                  { label: 'Blog Posts', value: blogPosts.length, icon: '✍️', color: '#7B2D8B' },
                ].map(stat => (
                  <div key={stat.label} className="p-6 rounded-2xl" style={{ background: '#1a1a2e', border: `1px solid ${stat.color}30` }}>
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, serif', color: stat.color }}>{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Bookings */}
              <div className="rounded-2xl overflow-hidden" style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <h2 className="text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Recent Bookings</h2>
                  <button onClick={() => setActiveTab('bookings')} className="text-orange-400 text-sm hover:text-orange-300">View All →</button>
                </div>
                <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  {bookings.slice(0, 5).map(b => (
                    <div key={b.id} className="px-6 py-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}>
                        {b.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium text-sm truncate">{b.name}</div>
                        <div className="text-gray-400 text-xs truncate">{b.service || 'General inquiry'}</div>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium text-white flex-shrink-0" style={{ background: STATUS_COLORS[b.status] || '#666' }}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                  {bookings.length === 0 && <div className="px-6 py-8 text-center text-gray-400 text-sm">No bookings yet.</div>}
                </div>
              </div>
            </div>
          )}

          {/* PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              {/* Upload Bar */}
              <div className="p-6 rounded-2xl flex flex-wrap items-center gap-4" style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)' }}>
                <select
                  value={uploadSection}
                  onChange={e => setUploadSection(e.target.value)}
                  className="px-4 py-2 rounded-xl text-white text-sm"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', colorScheme: 'dark' }}
                >
                  {['hero', 'about', 'services', 'programs', 'gallery', 'blog', 'team'].map(s => (
                    <option key={s} value={s} className="bg-gray-900">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-white text-sm font-medium transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
                >
                  <Upload size={16} /> Upload Photo
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                <span className="text-gray-400 text-sm">{photos.length} photos total</span>
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {photos.map(photo => (
                  <div key={photo.id} className="group relative rounded-2xl overflow-hidden aspect-square" style={{ background: '#1a1a2e' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                      <span className="text-white text-xs font-medium text-center">{photo.section}</span>
                      <button onClick={() => deletePhoto(photo.id)} className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                        <Trash2 size={14} className="text-white" />
                      </button>
                    </div>
                  </div>
                ))}
                {photos.length === 0 && (
                  <div className="col-span-5 text-center py-16 text-gray-400">
                    No photos yet. Upload your first photo above.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BLOG */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">{blogPosts.length} posts</p>
                <button
                  onClick={() => setEditingPost({ title: '', slug: '', excerpt: '', content: '', cover_image: '', category: 'Ayurveda', author: 'Admin', published: false })}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-white text-sm font-medium"
                  style={{ background: 'linear-gradient(135deg, #FF6B35, #FFD700)' }}
                >
                  <Plus size={16} /> New Post
                </button>
              </div>

              {/* Post Editor */}
              {editingPost && (
                <div className="p-6 rounded-2xl space-y-4" style={{ background: '#1a1a2e', border: '1px solid rgba(255,107,53,0.3)' }}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {editingPost.id ? 'Edit Post' : 'New Post'}
                    </h3>
                    <button onClick={() => setEditingPost(null)}><X size={20} className="text-gray-400 hover:text-white" /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      placeholder="Post Title *"
                      value={editingPost.title || ''}
                      onChange={e => setEditingPost({ ...editingPost, title: e.target.value })}
                      className="px-4 py-3 rounded-xl text-white text-sm"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                    />
                    <input
                      placeholder="Slug (auto-generated)"
                      value={editingPost.slug || ''}
                      onChange={e => setEditingPost({ ...editingPost, slug: e.target.value })}
                      className="px-4 py-3 rounded-xl text-white text-sm"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                    />
                    <input
                      placeholder="Author"
                      value={editingPost.author || ''}
                      onChange={e => setEditingPost({ ...editingPost, author: e.target.value })}
                      className="px-4 py-3 rounded-xl text-white text-sm"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                    />
                    <select
                      value={editingPost.category || 'Ayurveda'}
                      onChange={e => setEditingPost({ ...editingPost, category: e.target.value })}
                      className="px-4 py-3 rounded-xl text-white text-sm"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', colorScheme: 'dark' }}
                    >
                      {['Ayurveda', 'Yoga', 'Wellness', "Women's Health", 'Meditation', 'Nutrition'].map(c => (
                        <option key={c} value={c} className="bg-gray-900">{c}</option>
                      ))}
                    </select>
                    <input
                      placeholder="Cover Image URL"
                      value={editingPost.cover_image || ''}
                      onChange={e => setEditingPost({ ...editingPost, cover_image: e.target.value })}
                      className="px-4 py-3 rounded-xl text-white text-sm sm:col-span-2"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                    />
                  </div>
                  <textarea
                    placeholder="Short excerpt..."
                    value={editingPost.excerpt || ''}
                    onChange={e => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl text-white text-sm resize-none"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  />
                  <textarea
                    placeholder="Full article content..."
                    value={editingPost.content || ''}
                    onChange={e => setEditingPost({ ...editingPost, content: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl text-white text-sm resize-none"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingPost.published || false}
                        onChange={e => setEditingPost({ ...editingPost, published: e.target.checked })}
                        className="rounded"
                      />
                      Publish this post
                    </label>
                    <button
                      onClick={savePost}
                      className="flex items-center gap-2 px-5 py-2 rounded-xl text-white text-sm font-medium"
                      style={{ background: '#00A86B' }}
                    >
                      <Check size={16} /> Save Post
                    </button>
                  </div>
                </div>
              )}

              {/* Posts List */}
              <div className="space-y-3">
                {blogPosts.map(post => (
                  <div key={post.id} className="p-5 rounded-2xl flex items-center gap-4" style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium text-sm truncate">{post.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${post.published ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <div className="text-gray-400 text-xs">{post.category} • {post.author} • {new Date(post.created_at).toLocaleDateString()}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => setEditingPost(post)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-yellow-400 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => deletePost(post.id)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {blogPosts.length === 0 && <div className="text-center py-16 text-gray-400">No blog posts yet. Create your first post above.</div>}
              </div>
            </div>
          )}

          {/* BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {/* Filter */}
              <div className="flex flex-wrap gap-2">
                {['all', 'new', 'contacted', 'confirmed', 'completed', 'cancelled'].map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                    style={{
                      background: statusFilter === s ? (STATUS_COLORS[s] || '#FF6B35') : 'rgba(255,255,255,0.05)',
                      color: statusFilter === s ? 'white' : '#9ca3af',
                      border: `1px solid ${statusFilter === s ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                    }}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)} {s !== 'all' && `(${bookings.filter(b => b.status === s).length})`}
                  </button>
                ))}
              </div>

              {/* Bookings Table */}
              <div className="space-y-3">
                {filteredBookings.map(b => (
                  <div key={b.id} className="p-6 rounded-2xl" style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{b.name}</span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ background: STATUS_COLORS[b.status] || '#666' }}>
                            {b.status}
                          </span>
                          <span className="text-gray-400 text-xs">{new Date(b.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-300 mb-3">
                          <span>📧 {b.email}</span>
                          <span>📱 {b.phone}</span>
                          <span>🌿 {b.service || 'Not specified'}</span>
                        </div>
                        {b.message && <p className="text-gray-400 text-sm p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>{b.message}</p>}
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        {/* Status update */}
                        <select
                          value={b.status}
                          onChange={e => updateBookingStatus(b.id, e.target.value)}
                          className="px-3 py-1.5 rounded-lg text-white text-xs"
                          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', colorScheme: 'dark' }}
                        >
                          {['new', 'contacted', 'confirmed', 'completed', 'cancelled'].map(s => (
                            <option key={s} value={s} className="bg-gray-900">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                        {/* Action buttons */}
                        <div className="flex gap-2">
                          <a
                            href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=Hi ${encodeURIComponent(b.name)}, this is YogAyur Bliss!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-medium"
                            style={{ background: '#25D366' }}
                            title="WhatsApp"
                          >
                            <MessageSquare size={12} />
                          </a>
                          <a
                            href={`mailto:${b.email}?subject=Your YogAyur Bliss Consultation`}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-medium"
                            style={{ background: '#FF6B35' }}
                            title="Email"
                          >
                            <Mail size={12} />
                          </a>
                          <a
                            href={`tel:${b.phone}`}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-medium"
                            style={{ background: '#00BCD4' }}
                            title="Call"
                          >
                            <Phone size={12} />
                          </a>
                          <button
                            onClick={() => deleteBooking(b.id)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-medium"
                            style={{ background: '#ef4444' }}
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredBookings.length === 0 && <div className="text-center py-16 text-gray-400">No bookings found.</div>}
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {['new', 'contacted', 'confirmed', 'completed', 'cancelled'].map(s => (
                  <div key={s} className="p-5 rounded-2xl text-center" style={{ background: '#1a1a2e', border: `1px solid ${STATUS_COLORS[s]}40` }}>
                    <div className="text-2xl font-bold mb-1" style={{ color: STATUS_COLORS[s], fontFamily: 'Playfair Display, serif' }}>
                      {bookings.filter(b => b.status === s).length}
                    </div>
                    <div className="text-gray-400 text-xs capitalize">{s}</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl" style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="text-white font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Bookings by Status</h3>
                  {statusData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={statusData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="status" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                        <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                          {statusData.map((entry, index) => (
                            <Cell key={index} fill={STATUS_COLORS[entry.status.toLowerCase()] || '#FF6B35'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No booking data yet.</div>
                  )}
                </div>

                <div className="p-6 rounded-2xl" style={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="text-white font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Popular Services</h3>
                  {serviceData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={serviceData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                        <YAxis type="category" dataKey="service" tick={{ fill: '#9ca3af', fontSize: 10 }} width={120} />
                        <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} />
                        <Bar dataKey="count" fill="#FF6B35" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-48 text-gray-400 text-sm">No service data yet.</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
