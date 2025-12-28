'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

// Type definitions
interface CourseCardProps {
  icon: string;
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
const CourseCard = ({ icon, title, description, features, price, color = 'primary', enrollLink = '/details' }: CourseCardProps) => {
  const colorStyles: Record<'primary' | 'secondary' | 'tertiary', string> = {
    primary: 'border-[#024985] bg-[#024985]',
    secondary: 'border-[#dc2626] bg-[#dc2626]',
    tertiary: 'border-[#024985] bg-[#024985]'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`h-1 ${colorStyles[color].split(' ')[0]}`} />
      <div className="p-8">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
          <i className={`fas ${icon} text-2xl text-[#024985]`} />
        </div>
        <h3 className="text-xl font-bold text-[#024985] mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-2 mb-6">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <i className="fas fa-check text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-[#024985]">{price}</span>
          <Link
            href={enrollLink}
            className={`${colorStyles[color].split(' ')[1]} text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity`}
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
    if (imageUrl === '/images/default-webinar.jpg') return false;

    // Check if it's a full URL (like Unsplash) - these won't work with CldImage
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl.includes('res.cloudinary.com') || imageUrl.includes('cloudinary.com');
    }

    // If it's just a public ID, it should be valid
    return true;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {image && isValidCloudinaryImage(image) && (
        <CldImage
          src={image}
          alt={title}
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
        <div className="flex items-center mb-4">
          <div className="bg-gray-50 text-[#024985] px-3 py-1 rounded-full text-sm font-semibold">
            {category}
          </div>
          <span className="ml-auto text-gray-500 text-sm">
            <i className="fas fa-calendar mr-1" />
            {date}
          </span>
        </div>
        <h3 className="text-lg font-bold text-[#024985] mb-3">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-[#024985]">{price}</span>
          <Link
            href={registerLink}
            className="bg-[#024985] text-white px-4 py-2 rounded-lg hover:bg-[#dc2626] transition-colors text-sm"
          >
            {price === 'Free' ? 'Register' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  // State for webinars and training programs
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>([]);
  const [loadingWebinars, setLoadingWebinars] = useState(true);
  const [loadingTrainingPrograms, setLoadingTrainingPrograms] = useState(true);

  // Fetch recent webinars and training programs
  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await fetch('/api/events?category=WEBINAR&limit=3&sortBy=date&order=desc');
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
        const response = await fetch('/api/events?category=COURSE&limit=3&sortBy=date&order=desc');
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

    fetchWebinars();
    fetchTrainingPrograms();
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
    const colors: ('primary' | 'secondary' | 'tertiary')[] = ['primary', 'secondary', 'tertiary'];

    return {
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
      color: colors[index % colors.length],
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
        <div className="absolute inset-0 bg-black opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-9rem)]">
            <div className="text-white">
              <div className="mb-6">
                <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white mb-4">
                  🌟 Internationally Recognized Programs
                </div>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 leading-tight text-[#024985]">
                Transform Your{" "}
                <span className="text-[#dc2626]">
                  Professional
                </span>{" "}
                <span className="text-[#024985]">Future</span>
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
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-[#024985] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              Our Proven Method
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-[#024985] mb-8 leading-tight">
              A <span className="text-[#dc2626]">Structured Approach</span><br />
              to Professional Growth
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 font-medium">Here&apos;s how it works:</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: '1',
                title: 'Knowledge Hub',
                subtitle: 'Build Expertise That Meets Global Standards',
                icon: 'fa-graduation-cap',
                content: 'Access specialized programs designed to equip professionals with the skills and frameworks required to implement and lead accreditation systems effectively.',
                features: [
                  'Intensive, standards-based training',
                  'Expert-led technical sessions and case studies',
                  'Practical tools for system improvement',
                  'Continuous learning through accredited resources'
                ]
              },
              {
                step: '2',
                title: 'Official Certification',
                subtitle: 'Gain Recognition That Strengthens Your Authority',
                icon: 'fa-award',
                content: 'Earn an internationally accredited certificate that verifies your technical competence and professional integrity in line with global accreditation requirements.',
                features: [
                  'Official AAA certification with international recognition',
                  'Verified compliance with ISO and accreditation frameworks',
                  'Qualification for professional assessor and consultant roles',
                  'Trusted proof of expertise for employers and institutions'
                ]
              },
              {
                step: '3',
                title: 'Career Development',
                subtitle: 'Turn Accreditation Knowledge Into Professional Growth',
                icon: 'fa-rocket',
                content: 'Advance your career through continuous engagement with the global accreditation community and leadership pathways offered by AAA.',
                features: [
                  'Access to professional opportunities and global projects',
                  'Mentorship from senior assessors and experts',
                  'Inclusion in AAA\'s professional network and consultant roster',
                  'Pathways to advanced credentials and leadership roles'
                ]
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-t-4 border-[#024985] group hover:-translate-y-2">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-br from-[#024985] to-[#dc2626] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <i className={`fas ${item.icon} text-3xl text-white`} />
                  </div>
                  <div className="bg-[#dc2626] text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-lg">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-[#024985] mb-2">{item.title}</h3>
                  <p className="text-[#dc2626] font-medium italic text-lg">{item.subtitle}</p>
                </div>
                <p className="text-gray-700 text-center mb-6 leading-relaxed font-medium">{item.content}</p>
                <ul className="space-y-3">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="bg-green-100 w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <i className="fas fa-check text-green-600 text-xs" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-[#024985] mb-4">Ready to Begin Your Journey?</h3>
              <p className="text-gray-600 mb-6">Start with our Knowledge Hub and transform your professional future today.</p>
              <div className="flex justify-center">
                <button
                  className="journey-cta-button text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  style={{ backgroundColor: '#024985' }}
                >
                  <i className="fas fa-play mr-2"></i>
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Training Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#024985] mb-6">
              Featured Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  className="bg-[#024985] text-white px-6 py-2 rounded-lg hover:bg-[#dc2626] transition-colors"
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
                className="inline-flex items-center bg-[#024985] text-white px-8 py-3 rounded-lg hover:bg-[#dc2626] transition-colors font-semibold"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#024985] mb-6">
              Upcoming Events & Workshops
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  className="bg-[#024985] text-white px-6 py-2 rounded-lg hover:bg-[#dc2626] transition-colors"
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
                className="inline-flex items-center bg-[#024985] text-white px-8 py-3 rounded-lg hover:bg-[#dc2626] transition-colors font-semibold"
              >
                <i className="fas fa-arrow-right mr-2"></i>
                View All Webinars
              </Link>
            </div>
          )}
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-[#024985] mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-600 mb-8">
                Have questions about our programs? Our team is here to help you choose
                the right path for your professional development.
              </p>
              <div className="space-y-6">
                {[
                  { icon: 'fa-envelope', title: 'Email Us', info: 'info@aaaacademy.com' },
                  { icon: 'fa-phone', title: 'Call Us', info: '+1 (555) 123-4567' },
                  { icon: 'fa-map-marker-alt', title: 'Visit Us', info: '123 Professional Drive\nExcellence City, EX 12345' }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                      <i className={`fas ${contact.icon} text-[#024985]`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#024985]">{contact.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line">{contact.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#024985] mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024985] focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024985] focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024985] focus:border-transparent resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#024985] text-white py-3 rounded-lg font-semibold hover:bg-[#dc2626] transition-colors"
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
