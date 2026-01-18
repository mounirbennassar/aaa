'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

// Type definitions
interface CourseCardProps {
  image?: string;
  icon?: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  enrollLink?: string;
}

interface EventCardProps {
  image: string;
  category: string;
  date: string;
  title: string;
  description: string;
  price: string;
  registerLink: string;
}

interface Webinar {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  price: number;
  currency: string;
  date: string;
  location: string;
  imageUrl?: string;
  slug: string;
  isActive: boolean;
  isVirtual: boolean;
}

interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  price: number;
  currency: string;
  date: string;
  location: string;
  imageUrl?: string;
  slug: string;
  isActive: boolean;
  isVirtual: boolean;
}

interface EventsResponse {
  events: Webinar[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface TrainingProgramsResponse {
  events: TrainingProgram[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Reusable components for better optimization
const CourseCard = ({ image, icon, title, description, features, price, color = 'primary', enrollLink = '/details' }: CourseCardProps) => {
  // Helper to check for valid Cloudinary image
  const isValidCloudinaryImage = (imageUrl: string) => {
    if (!imageUrl || imageUrl.trim() === '') return false;
    if (imageUrl.startsWith('http')) return false;
    return true;
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col h-full group">
      {/* Course Image */}
      <div className="relative overflow-hidden h-48 bg-gray-100 w-full">
        {image ? (
          isValidCloudinaryImage(image) ? (
            <CldImage
              src={image}
              alt={title}
              width={400}
              height={192}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              crop={{
                type: 'fill',
                source: true
              }}
            />
          ) : (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#13558D]/10 to-[#13558D]/5">
            <i className={`fas ${icon || 'fa-graduation-cap'} text-5xl text-[#13558D]/30`} />
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-grow items-center text-center">
        <h3 className="text-xl font-bold text-[#13558D] mb-4 font-['Playfair_Display'] tracking-wide">{title}</h3>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{description}</p>
        <div className="w-12 h-0.5 bg-gray-200 mb-6"></div>
        <ul className="space-y-3 mb-8 text-left w-full">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start text-sm text-gray-600">
              <i className="fas fa-check text-[#13558D] mt-1 mr-3 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6 border-t border-gray-50 w-full flex flex-col items-center">
          <span className="text-2xl font-extrabold text-[#13558D] mb-4 tracking-tight">{price}</span>
          <Link
            href={enrollLink}
            className="bg-[#dc2626] text-white px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-[#b91c1c] transition-colors tracking-wide uppercase shadow-lg"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ image, category, date, title, description, price, registerLink }: EventCardProps) => {
  // Helper function to check if image URL is valid for Cloudinary
  const isValidCloudinaryImage = (imageUrl: string) => {
    if (!imageUrl || imageUrl.trim() === '') return false;
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return false;
    return true;
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col h-full group">
      <div className="relative overflow-hidden h-48 bg-gray-100">
        {image ? (
          isValidCloudinaryImage(image) ? (
            <CldImage
              src={image}
              alt={title}
              width={400}
              height={192}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              crop={{
                type: 'fill',
                source: true
              }}
            />
          ) : (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#13558D]/10 to-[#13558D]/5">
            <i className="fas fa-calendar-alt text-5xl text-[#13558D]/30" />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#13558D] shadow-sm">
          {category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-gray-500 text-xs uppercase tracking-wider mb-3">
          <i className="fas fa-calendar mr-2" />
          {date}
        </div>
        <h3 className="text-lg font-bold text-[#13558D] mb-3 font-['Playfair_Display'] group-hover:text-[#1e7bc9] transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">{description}</p>
        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
          <span className="text-lg font-extrabold text-[#13558D] tracking-tight">{price}</span>
          <Link
            href={registerLink}
            className="bg-[#dc2626] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#b91c1c] transition-colors shadow-lg"
          >
            {price === 'Free' ? 'Register Now' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
};

// Import Testimonial Card
import TestimonialCard from '@/components/TestimonialCard'

interface Testimonial {
  id: string
  name: string
  role?: string
  company?: string
  content?: string
  imageUrl?: string
  videoUrl?: string
}

export default function Home() {
  // State for webinars, training programs, and testimonials
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingWebinars, setLoadingWebinars] = useState(true);
  const [loadingTrainingPrograms, setLoadingTrainingPrograms] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  // Fetch recent webinars and training programs
  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        // Updated sorting: created date desc (recent first)
        const response = await fetch('/api/events?category=WEBINAR&limit=3&sortBy=createdAt&order=desc&upcoming=true');
        if (response.ok) {
          const data: EventsResponse = await response.json();
          setWebinars(data.events);
        } else {
          console.error('Failed to fetch webinars');
        }
      } catch (error) {
        console.error('Error fetching webinars:', error);
      } finally {
        setLoadingWebinars(false);
      }
    };

    const fetchTrainingPrograms = async () => {
      try {
        // Updated sorting: created date desc (recent first)
        const response = await fetch('/api/events?category=COURSE&limit=3&sortBy=createdAt&order=desc&upcoming=true');
        if (response.ok) {
          const data: TrainingProgramsResponse = await response.json();
          setTrainingPrograms(data.events);
        } else {
          console.error('Failed to fetch training programs');
        }
      } catch (error) {
        console.error('Error fetching training programs:', error);
      } finally {
        setLoadingTrainingPrograms(false);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials?isActive=true&limit=10');
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoadingTestimonials(false);
      }
    }

    fetchWebinars();
    fetchTrainingPrograms();
    fetchTestimonials();
  }, []);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to convert webinar to event card props
  const webinarToEventCard = (webinar: Webinar): EventCardProps => ({
    image: webinar.imageUrl || '',
    category: 'Webinar',
    date: formatDate(webinar.date),
    title: webinar.title,
    description: webinar.description.length > 120
      ? webinar.description.substring(0, 120) + '...'
      : webinar.description,
    price: webinar.price === 0 ? 'Free' : `$${webinar.price}`,
    registerLink: `/details/${webinar.slug || webinar.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
  });

  // Helper function to convert training program to course card props
  const trainingProgramToCourseCard = (program: TrainingProgram, index: number): CourseCardProps => {
    const icons = ['fa-hospital', 'fa-shield-alt', 'fa-users', 'fa-graduation-cap', 'fa-award', 'fa-rocket'];

    return {
      image: program.imageUrl,
      icon: icons[index % icons.length],
      title: program.title,
      description: program.description.length > 100
        ? program.description.substring(0, 100) + '...'
        : program.description,
      features: [
        `Duration: ${program.duration}`,
        `Location: ${program.location}`,
        program.isVirtual ? 'Virtual Training' : 'In-Person Training'
      ],
      price: program.price === 0 ? 'Free' : `$${program.price}`,
      enrollLink: `/details/${program.slug || program.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
    };
  };

  // Convert training programs and webinars to display cards
  const featuredTrainingPrograms = trainingPrograms.map(trainingProgramToCourseCard);
  const eventCards = webinars.map(webinarToEventCard);

  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="pt-36 pb-20 relative overflow-hidden min-h-[calc(100vh-9rem)]">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Desktop Video */}
          <iframe
            src="https://www.youtube.com/embed/C193YkDYYVU?si=h21Mvu120CE4NiHJ&autoplay=1&mute=1&loop=1&playlist=C193YkDYYVU&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3"
            className="hidden md:block w-full h-full object-cover"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              transform: 'translate(-50%, -50%)',
              border: 'none'
            }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Background Video"
          />

          {/* Mobile Background - Static gradient instead of video for better performance */}
          <div className="md:hidden absolute inset-0 bg-gradient-to-br from-[#024985] via-[#013866] to-[#dc2626]"></div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-75" />

        <div className="mx-auto px-5 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-9rem)]">
            <div className="text-white pt-8 sm:pt-12 lg:pt-0">
              <div className="mb-6 mt-4">
                <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white mb-4">
                  🌟 Internationally Recognized Programs
                </div>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 leading-tight text-white">
                Transform Your{" "}
                <span className="text-[#dc2626]">
                  Professional
                </span>{" "}
                <span className="text-white">Future</span>
              </h1>

              <p className="text-xl lg:text-2xl text-white mb-10 leading-relaxed font-light">
                Join <span className="font-semibold text-[#dc2626]">1000+</span> professionals who have elevated their careers through our
                <span className="font-semibold"> structured three-step pathway</span> to excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <button
                  className="hero-start-button text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg border-0 outline-none relative z-20"
                >
                  <i className="fas fa-rocket mr-2"></i>
                  Start Your Journey
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Development Model Section */}
      {/* Value Framework Section */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="mx-auto px-5">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">
              AAA Academy Value Framework
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Empowering professionals through structured learning, accreditation,
              and leadership development aligned with international standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Knowledge Hub',
                subtitle: 'ACADEMIC & PROFESSIONAL CAPACITY BUILDING',
                image: '/knowledge-hub.jpg',
                content: 'Structured learning programs designed to build institutional and professional competence in accreditation systems aligned with international standards.',
                features: [
                  'Standards-based professional training',
                  'Expert-led technical sessions and case analysis',
                  'Practical frameworks for system implementation',
                  'Access to accredited learning resources'
                ]
              },
              {
                title: 'Official Certification',
                subtitle: 'INTERNATIONAL RECOGNITION & COMPLIANCE',
                image: '/certification.jpg',
                content: 'Formal certification validating technical competence, professional integrity, and compliance with international accreditation and ISO frameworks.',
                features: [
                  'Official AAA-issued certification',
                  'Alignment with ISO and global accreditation standards',
                  'Qualification for assessor and consultant roles',
                  'Recognized evidence of professional credibility'
                ]
              },
              {
                title: 'Career Development',
                subtitle: 'PROFESSIONAL PATHWAYS & LEADERSHIP',
                image: '/career-dev.jpg',
                content: 'Career advancement through structured engagement with the global accreditation community and professional development pathways.',
                features: [
                  'Access to international projects and opportunities',
                  'Mentorship from senior accreditation professionals',
                  'Inclusion in AAA professional networks',
                  'Progression toward advanced credentials and leadership roles'
                ]
              }
            ].map((item, index) => (
              <div key={index} className="group perspective-1000 h-[420px]">
                <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                  {/* Front Face */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-xl">
                    {/* Background Image with Overlay */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-${index === 0 ? '1522202176988-66273c2fd55f' : index === 1 ? '1434030216411-0b793f4b4173' : '1552664730-d307ca884978'}?w=600&q=80')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-[#13558D]/85" />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end p-8 text-white">
                      <div className="mb-auto pt-6">
                        <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                          {item.subtitle}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-3xl font-bold mb-4 font-['Playfair_Display']">{item.title}</h3>
                        <p className="text-white/90 leading-relaxed font-light text-sm mb-6">{item.content}</p>

                        <div className="flex items-center text-white/70 text-sm">
                          <span className="mr-2">Hover to explore</span>
                          <i className="fas fa-arrow-right animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-xl bg-white">
                    <div className="h-full flex flex-col p-8">
                      <div className="mb-6">
                        <span className="inline-block bg-[#13558D]/10 text-[#13558D] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                          What You&apos;ll Get
                        </span>
                        <h3 className="text-2xl font-bold text-[#13558D] font-['Playfair_Display']">{item.title}</h3>
                      </div>

                      <ul className="space-y-3 flex-grow">
                        {item.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-md bg-[#13558D]/10 flex items-center justify-center mr-3">
                              <i className="fas fa-check text-[#13558D] text-xs" />
                            </div>
                            <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-6 border-t border-gray-100">
                        <Link
                          href="/courses"
                          className="inline-flex items-center text-[#dc2626] font-bold hover:text-[#b91c1c] transition-colors"
                        >
                          Learn More
                          <i className="fas fa-arrow-right ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <Link
              href="/courses"
              className="inline-flex items-center bg-[#dc2626] text-white px-8 py-3 rounded-full hover:bg-[#b91c1c] transition-all duration-300 font-semibold tracking-wide uppercase text-sm shadow-lg"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>


      {/* Featured Training Programs Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto px-5">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">
              Featured Training Programs
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Choose from our most popular certification and training programs designed
              to enhance your professional development.
            </p>
          </div>

          {loadingTrainingPrograms ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#024985]"></div>
              <span className="ml-3 text-gray-600">Loading training programs...</span>
            </div>
          ) : featuredTrainingPrograms.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredTrainingPrograms.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-xl shadow-lg p-8 max-w-md mx-auto">
                <i className="fas fa-graduation-cap text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Training Programs Available</h3>
                <p className="text-gray-500 mb-6">Check back soon for new training program announcements!</p>
                <Link
                  href="/courses"
                  className="bg-[#dc2626] text-white px-6 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors shadow-lg"
                >
                  View All Training Programs
                </Link>
              </div>
            </div>
          )}

          {/* View All Link */}
          {featuredTrainingPrograms.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/courses"
                className="inline-flex items-center bg-[#dc2626] text-white px-8 py-3 rounded-lg hover:bg-[#b91c1c] transition-colors font-semibold shadow-lg"
              >
                <i className="fas fa-arrow-right mr-2"></i>
                View All Training Programs
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto px-5">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">
              Upcoming Events & Workshops
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Join our expert-led webinars and connect with professionals from around the world
            </p>
          </div>

          {loadingWebinars ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#024985]"></div>
              <span className="ml-3 text-gray-600">Loading upcoming webinars...</span>
            </div>
          ) : eventCards.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventCards.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                <i className="fas fa-calendar-alt text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Upcoming Webinars</h3>
                <p className="text-gray-500 mb-6">Check back soon for new webinar announcements!</p>
                <Link
                  href="/webinars"
                  className="bg-[#dc2626] text-white px-6 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors shadow-lg"
                >
                  View All Webinars
                </Link>
              </div>
            </div>
          )}

          {/* View All Link */}
          {eventCards.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/webinars"
                className="inline-flex items-center bg-[#dc2626] text-white px-8 py-3 rounded-lg hover:bg-[#b91c1c] transition-colors font-semibold shadow-lg"
              >
                <i className="fas fa-arrow-right mr-2"></i>
                View All Webinars
              </Link>
            </div>
          )}
        </div>
      </section>



      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white overflow-hidden">
        <div className="text-center mb-16 max-w-4xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">
            What Our Community Says
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-light">
            Hear from professionals who have transformed their careers with AAA Academy.
          </p>
        </div>

        {loadingTestimonials ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#024985]"></div>
            <span className="ml-3 text-gray-600">Loading testimonials...</span>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="relative w-full">
            {/* Gradient Overlays for smooth fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block"></div>

            {/* Marquee Container */}
            <div className="flex overflow-hidden group">
              {/* 
                  We need two sets of children for seamless looping. 
                  The animation moves the container to the left by 50% (width of one set).
               */}
              <div className="flex animate-marquee hover:[animation-play-state:paused] py-10">
                {/* First Set */}
                {testimonials.map((item, i) => (
                  <TestimonialCard
                    key={`t1-${item.id}`}
                    name={item.name}
                    role={item.role}
                    company={item.company}
                    content={item.content}
                    imageUrl={item.imageUrl}
                    videoUrl={item.videoUrl}
                  />
                ))}
                {/* Second Set (Duplicate) */}
                {testimonials.map((item, i) => (
                  <TestimonialCard
                    key={`t2-${item.id}`}
                    name={item.name}
                    role={item.role}
                    company={item.company}
                    content={item.content}
                    imageUrl={item.imageUrl}
                    videoUrl={item.videoUrl}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">Get in Touch</h2>
              <p className="text-xl text-gray-600 mb-8">
                Have questions about our programs? Our team is here to help you choose
                the right path for your professional development.
              </p>
              <div className="space-y-8">
                {[
                  { icon: 'fa-envelope', title: 'Email Us', info: 'info@aaaacademy.com' },
                  { icon: 'fa-phone', title: 'Call Us', info: '+1 (555) 123-4567' },
                  { icon: 'fa-map-marker-alt', title: 'Visit Us', info: '123 Professional Drive\nExcellence City, EX 12345' }
                ].map((contact, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-white w-12 h-12 rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.05)] flex items-center justify-center mr-6 border border-gray-100 flex-shrink-0">
                      <i className={`fas ${contact.icon} text-[#13558D]`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#13558D] mb-1 font-['Playfair_Display'] text-lg">{contact.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line text-sm font-light leading-relaxed">{contact.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#13558D] focus:border-[#13558D] bg-gray-50/50"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#13558D] focus:border-[#13558D] bg-gray-50/50"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024985] focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024985] focus:border-transparent"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#13558D] focus:border-[#13558D] bg-gray-50/50"
                />
                <button
                  type="submit"
                  className="w-full bg-[#dc2626] text-white py-3 rounded-full font-semibold hover:bg-[#b91c1c] transition-colors tracking-wide uppercase text-sm shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
