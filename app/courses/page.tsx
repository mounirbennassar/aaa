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
      // Sort by createdAt descending (recent first) to match home page
      const response = await fetch('/api/events?category=COURSE&sortBy=createdAt&order=desc&limit=100');
      if (response.ok) {
        const data = await response.json();
        setAllPrograms(data.events || []);
      } else {
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

  const isValidCloudinaryImage = (imageUrl: string) => {
    if (!imageUrl || imageUrl.trim() === '') return false;
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return false;
    return true;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] pt-48 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#13558D] border-t-transparent mx-auto"></div>
            <p className="mt-6 text-gray-600 font-light">Loading training programs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] pt-48 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl inline-block">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] pt-48 pb-20">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-[#13558D]/10 rounded-full blur-3xl"></div>
          <span className="inline-block bg-[#13558D]/10 text-[#13558D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <i className="fas fa-graduation-cap mr-2"></i>
            Professional Development
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-[#13558D] mb-6 font-['Playfair_Display'] leading-tight">
            Training Programs
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
            Explore our comprehensive range of professional development training programs designed
            to advance your career in accreditation and quality management.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 sticky top-24 border border-white/50">
              <h3 className="text-xl font-bold text-[#13558D] mb-8 font-['Playfair_Display'] flex items-center">
                <i className="fas fa-filter mr-3 text-[#dc2626]"></i>
                Filter Programs
              </h3>

              {/* Search */}
              <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Search</label>
                <div className="relative">
                  <i className="fas fa-search absolute left-4 top-3.5 text-gray-400 text-sm"></i>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    placeholder="Search courses..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13558D]/20 focus:border-[#13558D] text-sm transition-all"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13558D]/20 focus:border-[#13558D] text-sm transition-all cursor-pointer"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free</option>
                  <option value="under500">Under $500</option>
                  <option value="under1000">$500 - $1000</option>
                  <option value="over1000">Over $1000</option>
                </select>
              </div>

              {/* Location */}
              <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13558D]/20 focus:border-[#13558D] text-sm transition-all cursor-pointer"
                >
                  <option value="all">All Locations</option>
                  <option value="online">Online</option>
                  <option value="offline">In-Person</option>
                </select>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Duration</label>
                <select
                  value={filters.duration}
                  onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13558D]/20 focus:border-[#13558D] text-sm transition-all cursor-pointer"
                >
                  <option value="all">All Durations</option>
                  <option value="short">Short (1 day or less)</option>
                  <option value="medium">Medium (2-3 days)</option>
                  <option value="long">Long (4+ days)</option>
                </select>
              </div>

              {/* Show Expired */}
              <div className="mb-8 pt-6 border-t border-gray-100">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.showExpired}
                    onChange={(e) => setFilters({ ...filters, showExpired: e.target.checked })}
                    className="mr-3 w-5 h-5 text-[#13558D] focus:ring-[#13558D] rounded border-gray-300 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-[#13558D] transition-colors">Show expired programs</span>
                </label>
              </div>

              {/* Results Count */}
              <div className="bg-[#13558D]/5 rounded-xl p-4 text-center">
                <span className="text-2xl font-bold text-[#13558D]">{filteredPrograms.length}</span>
                <span className="text-xs text-gray-500 block mt-1">of {allPrograms.length} programs</span>
              </div>
            </div>
          </div>

          {/* Enhanced Course Grid */}
          <div className="lg:col-span-3">
            {filteredPrograms.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-white/50">
                <div className="bg-[#13558D]/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                  <i className="fas fa-graduation-cap text-4xl text-[#13558D]" />
                </div>
                <h2 className="text-3xl font-bold text-[#13558D] mb-4 font-['Playfair_Display']">
                  No Training Programs Found
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto font-light">
                  Try adjusting your filters or check back soon for new learning opportunities!
                </p>
                <Link
                  href="/"
                  className="bg-[#dc2626] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#b91c1c] transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Back to Home
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredPrograms.map((course) => {
                  const expired = isExpired(course.date);
                  return (
                    <div
                      key={course.id}
                      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] transition-all duration-500 border border-white/50 flex flex-col h-full group ${expired ? 'opacity-60 grayscale' : 'hover:-translate-y-2'}`}
                    >
                      {/* Course Image */}
                      <div className="relative overflow-hidden h-52 bg-gradient-to-br from-[#13558D]/10 to-[#13558D]/5">
                        {course.imageUrl ? (
                          isValidCloudinaryImage(course.imageUrl) ? (
                            <CldImage
                              src={course.imageUrl}
                              alt={course.title}
                              width={400}
                              height={208}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              crop={{
                                type: 'fill',
                                source: true
                              }}
                            />
                          ) : (
                            <img
                              src={course.imageUrl}
                              alt={course.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="fas fa-book text-6xl text-[#13558D]/20" />
                          </div>
                        )}

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-[#13558D] shadow-lg">
                            {course.isVirtual ? (
                              <><i className="fas fa-video mr-1.5"></i>Virtual</>
                            ) : (
                              <><i className="fas fa-building mr-1.5"></i>In-Person</>
                            )}
                          </span>
                        </div>

                        {expired && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                            <i className="fas fa-clock mr-1.5"></i>Expired
                          </div>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        {/* Date */}
                        <div className="flex items-center text-xs font-medium text-[#dc2626] mb-3">
                          <i className="fas fa-calendar-alt mr-2"></i>
                          {formatDate(course.date)}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-[#13558D] mb-3 font-['Playfair_Display'] group-hover:text-[#1e7bc9] transition-colors leading-tight">
                          {course.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow line-clamp-3 font-light">
                          {course.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 mb-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
                          <div className="flex items-center">
                            <i className="fas fa-globe text-[#13558D] mr-1.5"></i>
                            <span className="font-medium">{course.language}</span>
                          </div>
                          <div className="flex items-center">
                            <i className="fas fa-map-marker-alt text-[#13558D] mr-1.5"></i>
                            <span className="font-medium">{course.location}</span>
                          </div>
                          <div className="flex items-center">
                            <i className="fas fa-clock text-[#13558D] mr-1.5"></i>
                            <span className="font-medium">{course.duration}</span>
                          </div>
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                          <div>
                            {course.price === 0 ? (
                              <span className="text-2xl font-extrabold text-green-600">Free</span>
                            ) : (
                              <span className="text-2xl font-extrabold text-[#13558D]">${course.price}</span>
                            )}
                          </div>
                          <Link
                            href={`/details/${course.slug || course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                            className="bg-[#dc2626] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#b91c1c] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center"
                          >
                            View Details
                            <i className="fas fa-arrow-right ml-2 text-xs"></i>
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
