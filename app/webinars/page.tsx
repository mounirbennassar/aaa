'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

interface Speaker {
  name: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface Webinar {
  id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  date: string;
  location: string;
  price: number;
  currency: string;
  duration: string;
  imageUrl?: string;
  galleryImages?: string[];
  keyLearningOutcomes?: string[];
  speakers?: Speaker[];
  courseHighlights?: string[];
  prerequisites?: string[];
  whyChoose?: string[];
  certificateDescription?: string;
  certificateImageUrl?: string;
  certificateUrl?: string;
  calendlyUrl?: string;
  slug: string;
  isActive?: boolean;
  isVirtual?: boolean;
}

export default function WebinarsPage() {
  const [allWebinars, setAllWebinars] = useState<Webinar[]>([]);
  const [filteredWebinars, setFilteredWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Admin controls: only logged-in staff see the active/inactive toggle.
  const { data: session } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;
  const isAdmin = role === 'ADMIN' || role === 'MANAGER';
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    priceRange: 'all',
    location: 'all',
    duration: 'all',
    showInactive: false
  });

  const fetchWebinars = async () => {
    try {
      const response = await fetch('/api/events?category=WEBINAR&sortBy=orderThenDate&limit=100');
      if (response.ok) {
        const data = await response.json();
        setAllWebinars(data.events || []);
      } else {
        setError('Failed to fetch webinars');
      }
    } catch (err) {
      console.error('Error fetching webinars:', err);
      setError('An error occurred while fetching webinars');
    } finally {
      setLoading(false);
    }
  };

  // Flip a webinar's active status via the staff-only PATCH endpoint.
  const toggleActive = async (webinar: Webinar) => {
    const newStatus = webinar.isActive === false; // currently inactive -> activate
    setTogglingId(webinar.id);
    try {
      const res = await fetch(`/api/events/${webinar.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus }),
      });
      if (res.ok) {
        setAllWebinars(prev =>
          prev.map(w => (w.id === webinar.id ? { ...w, isActive: newStatus } : w))
        );
      } else {
        alert('Could not update status. Make sure you are signed in as an admin.');
      }
    } catch {
      alert('Error updating status. Please try again.');
    } finally {
      setTogglingId(null);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = [...allWebinars];

    if (filters.search) {
      filtered = filtered.filter(webinar =>
        webinar.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        webinar.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(webinar => {
        switch (filters.priceRange) {
          case 'free': return webinar.price === 0;
          case 'under50': return webinar.price > 0 && webinar.price < 50;
          case 'under100': return webinar.price >= 50 && webinar.price < 100;
          case 'over100': return webinar.price >= 100;
          default: return true;
        }
      });
    }

    if (filters.location !== 'all') {
      filtered = filtered.filter(webinar => {
        if (filters.location === 'online') {
          return webinar.isVirtual || webinar.location.toLowerCase().includes('online');
        } else if (filters.location === 'offline') {
          return !webinar.isVirtual && !webinar.location.toLowerCase().includes('online');
        }
        return true;
      });
    }

    if (filters.duration !== 'all') {
      filtered = filtered.filter(webinar => {
        const duration = webinar.duration.toLowerCase();
        switch (filters.duration) {
          case 'short': return duration.includes('hour') || duration.includes('1 hour');
          case 'medium': return duration.includes('1.5 hour') || duration.includes('2 hour');
          case 'long': return duration.includes('3 hour') || duration.includes('day');
          default: return true;
        }
      });
    }

    // Admins always see inactive webinars (so they can re-activate them);
    // regular visitors only see them when the filter is toggled on.
    if (!filters.showInactive && !isAdmin) {
      filtered = filtered.filter(webinar => webinar.isActive !== false);
    }

    setFilteredWebinars(filtered);
    setVisibleCount(9);
  }, [allWebinars, filters, isAdmin]);

  useEffect(() => {
    fetchWebinars();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Infinite scroll: reveal 9 more webinars whenever the sentinel near the
  // bottom of the list scrolls into view (starts ~300px early for smoothness).
  useEffect(() => {
    if (visibleCount >= filteredWebinars.length) return;
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 9, filteredWebinars.length));
        }
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, filteredWebinars.length]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpired = (dateString: string) => {
    const webinarDate = new Date(dateString);
    const today = new Date();
    return webinarDate < today;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isValidCloudinaryImage = (imageUrl: string) => {
    if (!imageUrl || imageUrl.trim() === '') return false;
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return false;
    return true;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading webinars...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-48 pb-20">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">
            Professional Webinars
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-light">
            Join our interactive webinars led by industry experts covering the latest trends
            and best practices in accreditation and quality management.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sticky top-24 border border-gray-100">
              <h3 className="text-xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">Filter Webinars</h3>

              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Search</label>
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-3 text-gray-400 text-sm"></i>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    placeholder="Search webinars..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#13558D] text-sm"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Duration</label>
                <select
                  value={filters.duration}
                  onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#13558D] text-sm appearance-none"
                  style={{ backgroundImage: 'none' }}
                >
                  <option value="all">All Durations</option>
                  <option value="short">Short (1 hour)</option>
                  <option value="medium">Medium (1.5-2 hours)</option>
                  <option value="long">Long (3+ hours)</option>
                </select>
              </div>

              <div className="mb-6 pt-4 border-t border-gray-100">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.showInactive}
                    onChange={(e) => setFilters({ ...filters, showInactive: e.target.checked })}
                    className="mr-3 text-[#13558D] focus:ring-[#13558D] rounded"
                  />
                  <span className="text-sm text-gray-600">Show inactive webinars</span>
                </label>
              </div>

              <div className="text-xs text-gray-400 text-center uppercase tracking-widest">
                Showing {Math.min(visibleCount, filteredWebinars.length)} of {filteredWebinars.length} webinars
              </div>
            </div>
          </div>

          {/* Webinar Grid */}
          <div className="lg:col-span-3">
            {filteredWebinars.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-video text-3xl text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  No Webinars Available
                </h2>
                <p className="text-gray-600 mb-6">
                  We&apos;re currently planning our webinar schedule.
                  Check back soon for exciting new learning sessions!
                </p>
                <Link
                  href="/"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredWebinars.slice(0, visibleCount).map((webinar) => {
                    const inactive = webinar.isActive === false;
                    return (
                      <div key={webinar.id} className={`bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col h-full group ${inactive ? 'opacity-60 grayscale' : ''}`}>
                        <div className="relative overflow-hidden h-48 bg-gray-100">
                          {webinar.imageUrl ? (
                            isValidCloudinaryImage(webinar.imageUrl) ? (
                              <CldImage
                                src={webinar.imageUrl}
                                alt={webinar.title}
                                width={400}
                                height={192}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                crop={{ type: 'fill', source: true }}
                              />
                            ) : (
                              <img src={webinar.imageUrl} alt={webinar.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            )
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#13558D]/10 to-[#13558D]/5">
                              <i className="fas fa-video text-5xl text-[#13558D]/30" />
                            </div>
                          )}
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#13558D] shadow-sm">
                            {webinar.isVirtual ? 'Online' : 'In-Person'}
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-wider text-gray-500">
                            <div className="flex items-center">
                              <i className="fas fa-calendar mr-2" />
                              {formatDate(webinar.date)}
                            </div>
                            {isAdmin ? (
                              <button
                                onClick={() => toggleActive(webinar)}
                                disabled={togglingId === webinar.id}
                                title="Click to change active status"
                                className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-normal normal-case transition-colors disabled:opacity-50 ${inactive ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                              >
                                {togglingId === webinar.id
                                  ? 'Saving…'
                                  : inactive
                                    ? 'Inactive · Activate'
                                    : 'Active · Deactivate'}
                              </button>
                            ) : (
                              inactive && <span className="text-red-500 font-bold">Inactive</span>
                            )}
                          </div>

                          <Link
                            href={`/details/${webinar.slug || webinar.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                            className="block group"
                          >
                            <h3 className="text-lg font-bold text-[#13558D] mb-3 font-['Playfair_Display'] group-hover:text-[#1e7bc9] transition-colors">
                              {webinar.title}
                            </h3>
                          </Link>

                          <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow line-clamp-3 font-light">
                            {webinar.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 mb-6 pt-4 border-t border-gray-50 text-xs text-gray-500 font-medium">
                            <div className="flex items-center">
                              <i className="fas fa-globe text-[#13558D] mr-1.5" />
                              {webinar.language}
                            </div>
                            <div className="flex items-center">
                              <i className="fas fa-clock text-[#13558D] mr-1.5" />
                              {formatTime(webinar.date)} (1 Hour)
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-auto">
                            <div className="text-lg font-extrabold text-[#13558D] tracking-tight">
                              Free
                            </div>
                            {webinar.calendlyUrl ? (
                              <a
                                href={webinar.calendlyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#dc2626] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#b91c1c] transition-colors shadow-lg"
                              >
                                Join Webinar
                              </a>
                            ) : (
                              <Link
                                href={`/details/${webinar.slug || webinar.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                                className="bg-[#dc2626] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#b91c1c] transition-colors shadow-lg"
                              >
                                View Details
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {visibleCount < filteredWebinars.length && (
                  <div ref={loaderRef} className="flex flex-col items-center justify-center mt-12 py-8 gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#13558D]"></div>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">Loading more webinars…</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}