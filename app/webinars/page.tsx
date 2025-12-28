'use client';

import { useState, useEffect, useCallback } from 'react';
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

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    priceRange: 'all',
    location: 'all',
    duration: 'all',
    showExpired: false
  });

  const fetchWebinars = async () => {
    try {
      console.log('Fetching webinars...');
      const response = await fetch('/api/events?category=WEBINAR');
      console.log('Response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        console.log('Events array:', data.events);
        console.log('Events length:', data.events?.length);
        setAllWebinars(data.events || []);
      } else {
        console.error('Failed to fetch webinars:', response.statusText);
        setError('Failed to fetch webinars');
      }
    } catch (err) {
      console.error('Error fetching webinars:', err);
      setError('An error occurred while fetching webinars');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    console.log('Applying filters to webinars:', allWebinars.length);
    let filtered = [...allWebinars];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(webinar =>
        webinar.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        webinar.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Price filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(webinar => {
        switch (filters.priceRange) {
          case 'free':
            return webinar.price === 0;
          case 'under50':
            return webinar.price > 0 && webinar.price < 50;
          case 'under100':
            return webinar.price >= 50 && webinar.price < 100;
          case 'over100':
            return webinar.price >= 100;
          default:
            return true;
        }
      });
    }

    // Location filter (webinars are typically online)
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

    // Duration filter
    if (filters.duration !== 'all') {
      filtered = filtered.filter(webinar => {
        const duration = webinar.duration.toLowerCase();
        switch (filters.duration) {
          case 'short':
            return duration.includes('hour') || duration.includes('1 hour');
          case 'medium':
            return duration.includes('1.5 hour') || duration.includes('2 hour');
          case 'long':
            return duration.includes('3 hour') || duration.includes('day');
          default:
            return true;
        }
      });
    }

    // Expired filter
    if (!filters.showExpired) {
      filtered = filtered.filter(webinar => !isExpired(webinar.date));
    }

    console.log('Filtered webinars:', filtered.length);
    setFilteredWebinars(filtered);
  }, [allWebinars, filters]);

  useEffect(() => {
    fetchWebinars();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Professional Webinars</h1>
              <p className="text-xl text-green-100 max-w-2xl">
                Join our interactive webinars led by industry experts covering the latest trends
                and best practices in accreditation and quality management.
              </p>
              <div className="mt-6 flex items-center space-x-6">
                <div className="flex items-center">
                  <i className="fas fa-video text-green-200 mr-2"></i>
                  <span className="text-green-100">Live Sessions</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-users text-green-200 mr-2"></i>
                  <span className="text-green-100">Interactive Q&A</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-download text-green-200 mr-2"></i>
                  <span className="text-green-100">Resources Included</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white bg-opacity-20 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold">{allWebinars.length}</div>
                <div className="text-green-100">Available Webinars</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Webinars</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Search webinars..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>



              {/* Duration */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select
                  value={filters.duration}
                  onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Durations</option>
                  <option value="short">Short (1 hour)</option>
                  <option value="medium">Medium (1.5-2 hours)</option>
                  <option value="long">Long (3+ hours)</option>
                </select>
              </div>

              {/* Show Expired */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showExpired}
                    onChange={(e) => setFilters({ ...filters, showExpired: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Show expired webinars</span>
                </label>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600">
                Showing {filteredWebinars.length} of {allWebinars.length} webinars
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredWebinars.map((webinar) => {
                  const expired = isExpired(webinar.date);
                  return (
                    <div key={webinar.id} className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${expired ? 'opacity-50' : ''}`}>
                      {webinar.imageUrl && (
                        <CldImage
                          src={webinar.imageUrl}
                          alt={webinar.title}
                          width={400}
                          height={192}
                          className="w-full h-48 object-cover"
                          crop={{
                            type: 'fill',
                            source: true
                          }}
                        />
                      )}

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${expired ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            <i className={`fas ${expired ? 'fa-exclamation-triangle' : 'fa-video'} mr-1`} />
                            {expired ? 'Expired' : 'Webinar'}
                          </div>
                          <div className="text-gray-500 text-sm">
                            <i className="fas fa-calendar mr-1" />
                            {formatDate(webinar.date)}
                          </div>
                        </div>

                        <Link
                          href={`/details/${webinar.slug || webinar.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                          className="block"
                        >
                          <h3 className="text-md font-bold text-blue-900 mb-3 hover:text-green-600 transition-colors cursor-pointer">
                            {webinar.title}
                          </h3>
                        </Link>

                        {expired && (
                          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                            <div className="flex items-center">
                              <i className="fas fa-exclamation-triangle text-red-500 mr-2" />
                              <p className="text-red-700 text-sm">
                                This webinar has finished. Subscribe to our newsletter for upcoming webinars or choose other available options.
                              </p>
                            </div>
                          </div>
                        )}

                        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                          {webinar.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <i className="fas fa-globe mr-2" />
                            {webinar.language}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <i className="fas fa-clock mr-2" />
                            {formatTime(webinar.date)} (1 Hour)
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <i className="fas fa-desktop mr-2" />
                            Online
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-green-600">
                            Free
                          </div>
                          {webinar.calendlyUrl ? (
                            <a
                              href={webinar.calendlyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                            >
                              Join Webinar
                            </a>
                          ) : (
                            <Link
                              href={`/details/${webinar.slug || webinar.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 