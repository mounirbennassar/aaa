'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

interface Speaker {
  name: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface CourseWebinar {
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
  slug: string;
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<CourseWebinar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      fetchCourseWebinar(params.slug as string);
    }
  }, [params.slug]);

  const fetchCourseWebinar = async (slug: string) => {
    try {
      const response = await fetch(`/api/events/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setItem(data);
      } else {
        setError('Course/Webinar not found');
      }
    } catch (err) {
      setError('An error occurred while fetching details');
      console.error('Error fetching course/webinar:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Removed unused formatTime function

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error || 'Course/Webinar not found'}
            </div>
            <button
              onClick={() => router.back()}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-42">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {item.imageUrl && (
            <CldImage
              src={item.imageUrl}
              alt={item.title}
              width={800}
              height={256}
              className="w-full h-64 object-cover"
              crop={{
                type: 'fill',
                source: true
              }}
            />
          )}
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                item.category === 'COURSE' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-green-100 text-green-600'
              }`}>
                {item.category === 'COURSE' ? 'Course' : 'Webinar'}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-900">
                  {item.price === 0 ? 'Free' : `from $${item.price}`}
                </div>
                <div className="text-gray-600">Price Starting</div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              {item.title}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Language:</h3>
                <p className="text-gray-600">{item.language}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Date:</h3>
                <p className="text-gray-600">{formatDate(item.date)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Location:</h3>
                <p className="text-gray-600">{item.location}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Duration:</h3>
                <p className="text-gray-600">{item.duration}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mr-4">
                Inquire Now
              </button>
              <Link
                href={item.category === 'COURSE' ? '/courses' : '/webinars'}
                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Back to {item.category === 'COURSE' ? 'Training Programs' : 'Webinars'}
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>

            {/* Gallery */}
            {item.galleryImages && item.galleryImages.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {item.galleryImages.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <CldImage
                        src={imageUrl}
                        alt={`${item.title} - Image ${index + 1}`}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
                        crop={{
                          type: 'fill',
                          source: true
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Learning Outcomes */}
            {item.keyLearningOutcomes && item.keyLearningOutcomes.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Key Learning Outcomes</h2>
                <ul className="space-y-3">
                  {item.keyLearningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check-circle text-green-500 mr-3 mt-1" />
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Speakers */}
            {item.speakers && item.speakers.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Speakers and Trainers</h2>
                <p className="text-gray-700 mb-6">
                  The Program is delivered by AAA training Academy approved trainers and international experts who have a strong working knowledge of training and {item.category === 'COURSE' ? 'Course' : 'Webinar'} delivery.
                </p>
                <div className="space-y-6">
                  {item.speakers.map((speaker, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-6">
                      <div className="flex items-start space-x-6">
                        {speaker.imageUrl && (
                          <div className="flex-shrink-0">
                            <CldImage
                              src={speaker.imageUrl}
                              alt={speaker.name}
                              width={120}
                              height={120}
                              className="w-24 h-24 rounded-full object-cover"
                              crop={{
                                type: 'fill',
                                source: true
                              }}
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-blue-900 mb-2">{speaker.name}</h3>
                          <p className="text-red-600 font-semibold mb-3">{speaker.title}</p>
                          <p className="text-gray-700">{speaker.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Highlights */}
            {item.courseHighlights && item.courseHighlights.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  {item.category === 'COURSE' ? 'Course' : 'Webinar'} Highlights
                </h2>
                <ul className="space-y-3">
                  {item.courseHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-star text-yellow-500 mr-3 mt-1" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites */}
            {item.prerequisites && item.prerequisites.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Prerequisites</h2>
                <p className="text-gray-700 mb-4">
                  To enroll in this {item.category.toLowerCase()}, participants should meet the following requirements:
                </p>
                <ul className="space-y-3">
                  {item.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-graduation-cap text-blue-500 mr-3 mt-1" />
                      <span className="text-gray-700">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Why Choose This Course */}
            {item.whyChoose && item.whyChoose.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  Why Choose This {item.category === 'COURSE' ? 'Course' : 'Webinar'}?
                </h2>
                <ul className="space-y-3">
                  {item.whyChoose.map((reason, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-thumbs-up text-green-500 mr-3 mt-1" />
                      <span className="text-gray-700">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Certificate */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Verified Training Certificates</h3>
              <p className="text-gray-700 mb-4">
                {item.certificateDescription || 'Upon successfully completing the program, participants will receive a Certificate of Completion. These certificates have a unique URL code and can be verified through the dedicated verification feature available on the AAA Platform.'}
              </p>
              
              {item.certificateImageUrl && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Certificate Example:</p>
                  <CldImage
                    src={item.certificateImageUrl}
                    alt="Certificate Example"
                    width={300}
                    height={200}
                    className="w-full rounded-lg shadow-md"
                    crop={{
                      type: 'fit',
                      source: true
                    }}
                  />
                </div>
              )}
              
              {item.certificateUrl && (
                <div className="mt-4">
                  <a 
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold"
                  >
                    <i className="fas fa-external-link-alt mr-2"></i>
                    Learn More About Certificates
                  </a>
                </div>
              )}
            </div>

            {/* Registration */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Ready to Register?</h3>
              <p className="mb-6">
                Join this {item.category.toLowerCase()} and advance your career with internationally recognized training.
              </p>
              <Link 
                href={`/enroll/${item.slug}`}
                className="block w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 