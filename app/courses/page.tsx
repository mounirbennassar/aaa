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

interface Course {
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

export default function TrainingProgramsPage() {
  const [allPrograms, setAllPrograms] = useState<Course[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Course[]>([]);
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

  const fetchPrograms = async () => {
    try {
      console.log('Fetching training programs...');
      const response = await fetch('/api/events?category=COURSE&sortBy=date&order=asc&limit=100');
      console.log('Response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        console.log('Events array:', data.events);
        console.log('Events length:', data.events?.length);
        setAllPrograms(data.events || []);
      } else {
        console.error('Failed to fetch training programs:', response.statusText);
        setError('Failed to fetch training programs');
      }
    } catch (err) {
      console.error('Error fetching training programs:', err);
      setError('An error occurred while fetching training programs');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    console.log('Applying filters to training programs:', allPrograms.length);
    let filtered = [...allPrograms];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Price filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(course => {
        switch (filters.priceRange) {
          case 'free':
            return course.price === 0;
          case 'under500':
            return course.price > 0 && course.price < 500;
          case 'under1000':
            return course.price >= 500 && course.price < 1000;
          case 'over1000':
            return course.price >= 1000;
          default:
            return true;
        }
      });
    }

    // Location filter
    if (filters.location !== 'all') {
      filtered = filtered.filter(course => {
        if (filters.location === 'online') {
          return course.isVirtual || course.location.toLowerCase().includes('online');
        } else if (filters.location === 'offline') {
          return !course.isVirtual && !course.location.toLowerCase().includes('online');
        }
        return true;
      });
    }

    // Duration filter
    if (filters.duration !== 'all') {
      filtered = filtered.filter(course => {
        const duration = course.duration.toLowerCase();
        switch (filters.duration) {
          case 'short':
            return duration.includes('hour') || duration.includes('1 day');
          case 'medium':
            return duration.includes('2 day') || duration.includes('3 day');
          case 'long':
            return duration.includes('4 day') || duration.includes('5 day') || duration.includes('week');
          default:
            return true;
        }
      });
    }

    // Expired filter
    if (!filters.showExpired) {
      filtered = filtered.filter(course => !isExpired(course.date));
    }

    console.log('Filtered training programs:', filtered.length);
    setFilteredPrograms(filtered);
  }, [allPrograms, filters]);

  useEffect(() => {
    fetchPrograms();
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
    const courseDate = new Date(dateString);
    const today = new Date();
    return courseDate < today;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading training programs...</p>
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Professional Training Programs</h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Explore our comprehensive range of professional development training programs designed
                to advance your career in accreditation and quality management.
              </p>
              <div className="mt-6 flex items-center space-x-6">
                <div className="flex items-center">
                  <i className="fas fa-users text-blue-200 mr-2"></i>
                  <span className="text-blue-100">Expert Instructors</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-certificate text-blue-200 mr-2"></i>
                  <span className="text-blue-100">Verified Certificates</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-globe text-blue-200 mr-2"></i>
                  <span className="text-blue-100">Global Recognition</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white bg-opacity-20 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold">{allPrograms.length}</div>
                <div className="text-blue-100">Available Programs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Training Programs</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Search training programs..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free</option>
                  <option value="under500">Under $500</option>
                  <option value="under1000">$500 - $1000</option>
                  <option value="over1000">Over $1000</option>
                </select>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Locations</option>
                  <option value="online">Online</option>
                  <option value="offline">In-Person</option>
                </select>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select
                  value={filters.duration}
                  onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Durations</option>
                  <option value="short">Short (1 day or less)</option>
                  <option value="medium">Medium (2-3 days)</option>
                  <option value="long">Long (4+ days)</option>
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
                  <span className="text-sm text-gray-700">Show expired programs</span>
                </label>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600">
                Showing {filteredPrograms.length} of {allPrograms.length} training programs
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="lg:col-span-3">
            {filteredPrograms.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-graduation-cap text-3xl text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  No Training Programs Available
                </h2>
                <p className="text-gray-600 mb-6">
                  We&apos;re currently developing our course catalog.
                  Check back soon for exciting new learning opportunities!
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
                {filteredPrograms.map((course) => {
                  const expired = isExpired(course.date);
                  return (
                    <div key={course.id} className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${expired ? 'opacity-50' : ''}`}>
                      {course.imageUrl && (
                        <CldImage
                          src={course.imageUrl}
                          alt={course.title}
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
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold ${expired ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                            {expired ? 'Expired' : 'Course'}
                          </div>
                          <div className="text-gray-500 text-sm">
                            <i className="fas fa-calendar mr-1" />
                            {formatDate(course.date)}
                          </div>
                        </div>

                        {expired && (
                          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                            <div className="flex items-center">
                              <i className="fas fa-exclamation-triangle text-red-500 mr-2" />
                              <p className="text-red-700 text-sm">
                                This training program has finished. Subscribe to our newsletter for upcoming programs or choose other available options.
                              </p>
                            </div>
                          </div>
                        )}

                        <h3 className="text-md font-bold text-blue-900 mb-3">
                          {course.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {course.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <i className="fas fa-globe mr-2" />
                            {course.language}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <i className="fas fa-map-marker-alt mr-2" />
                            {course.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <i className="fas fa-clock mr-2" />
                            {course.duration}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-md font-bold text-blue-900">
                            from ${course.price}
                          </div>
                          <Link
                            href={`/details/${course.slug || course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                          >
                            View Details
                          </Link>
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
