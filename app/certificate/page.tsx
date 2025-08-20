'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

interface Certificate {
  id: string;
  courseTitle: string;
  courseSlug: string;
  certificateDescription: string;
  certificateImageUrl?: string;
  certificateUrl?: string;
  category: string;
  duration: string;
  price: number;
  currency: string;
}

interface EventFromAPI {
  id: string;
  title: string;
  slug: string;
  certificateDescription?: string;
  certificateImageUrl?: string;
  certificateUrl?: string;
  category: string;
  duration: string;
  price: number;
  currency: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        // Filter events that have certificate information
        const certificateData = data.events
          .filter((event: EventFromAPI) => event.certificateDescription || event.certificateImageUrl)
          .map((event: EventFromAPI) => ({
            id: event.id,
            courseTitle: event.title,
            courseSlug: event.slug,
            certificateDescription: event.certificateDescription || 'Professional certificate of completion',
            certificateImageUrl: event.certificateImageUrl,
            certificateUrl: event.certificateUrl,
            category: event.category,
            duration: event.duration,
            price: event.price,
            currency: event.currency
          }));
        setCertificates(certificateData);
      } else {
        setError('Failed to fetch certificates');
      }
    } catch {
      setError('An error occurred while fetching certificates');
    } finally {
      setLoading(false);
    }
  };

  const filteredCertificates = selectedCategory === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory);

  const categories = Array.from(new Set(certificates.map(cert => cert.category)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading certificates...</p>
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
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
              <i className="fas fa-certificate text-3xl"></i>
            </div>
            <h1 className="text-4xl font-bold mb-4">Professional Certificates</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Earn internationally recognized certificates that validate your expertise and 
              advance your career in accreditation, quality management, and professional development.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
                <i className="fas fa-globe text-3xl text-blue-200 mb-4"></i>
                <h3 className="text-lg font-semibold mb-2">Global Recognition</h3>
                <p className="text-blue-100 text-sm">Certificates recognized worldwide by industry leaders</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
                <i className="fas fa-shield-alt text-3xl text-blue-200 mb-4"></i>
                <h3 className="text-lg font-semibold mb-2">Verified Credentials</h3>
                <p className="text-blue-100 text-sm">Blockchain-verified certificates for authenticity</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
                <i className="fas fa-chart-line text-3xl text-blue-200 mb-4"></i>
                <h3 className="text-lg font-semibold mb-2">Career Growth</h3>
                <p className="text-blue-100 text-sm">Boost your career with industry-valued certifications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900">Filter by Category:</h2>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600">
              {filteredCertificates.length} certificate{filteredCertificates.length !== 1 ? 's' : ''} available
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-certificate text-3xl text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              No Certificates Available
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We&apos;re currently developing our certification programs. 
              Check back soon for exciting new certification opportunities!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Courses
              </Link>
              <Link
                href="/"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertificates.map((certificate) => (
              <div key={certificate.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 card-hover">
                {/* Certificate Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800">
                  {certificate.certificateImageUrl ? (
                    <CldImage
                      src={certificate.certificateImageUrl}
                      alt={`${certificate.courseTitle} Certificate`}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover"
                      crop={{
                        type: 'fill',
                        source: true
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <i className="fas fa-certificate text-6xl mb-4 opacity-50"></i>
                        <div className="text-sm font-medium opacity-75">Professional Certificate</div>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-900">
                      {certificate.category.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">
                    {certificate.courseTitle}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {certificate.certificateDescription}
                  </p>

                  {/* Certificate Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="fas fa-clock mr-2"></i>
                      Duration: {certificate.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="fas fa-dollar-sign mr-2"></i>
                      Course Fee: {certificate.currency} {certificate.price}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Link
                      href={`/details/${certificate.courseSlug}`}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
                    >
                      View Course Details
                    </Link>
                    
                    {certificate.certificateUrl && (
                      <a
                        href={certificate.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-center font-semibold"
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        View Sample Certificate
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Information Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Why Choose Our Certificates?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our certificates are designed to meet the highest industry standards and provide 
              you with the credentials you need to excel in your professional journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-award text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Industry Standard</h3>
              <p className="text-gray-600 text-sm">Certificates meet international industry standards and best practices</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-graduate text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Expert Training</h3>
              <p className="text-gray-600 text-sm">Learn from industry experts with years of practical experience</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-network-wired text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Professional Network</h3>
              <p className="text-gray-600 text-sm">Join our alumni network of certified professionals worldwide</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-sync-alt text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Continuous Support</h3>
              <p className="text-gray-600 text-sm">Ongoing support and resources to help you maintain your certification</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Certified?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Take the next step in your professional development. Browse our courses 
            and start your journey towards earning a recognized certificate today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse All Courses
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 