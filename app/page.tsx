import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Type definitions
interface CourseCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  color?: 'primary' | 'secondary' | 'tertiary';
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

// Reusable components for better optimization
const CourseCard = ({ icon, title, description, features, price, color = 'primary' }: CourseCardProps) => {
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
            href="/details" 
            className={`${colorStyles[color].split(' ')[1]} text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity`}
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ image, category, date, title, description, price, registerLink }: EventCardProps) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="relative h-48 w-full">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
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

export default function Home() {
  // Data arrays for cleaner code
  const featuredCourses: CourseCardProps[] = [
    {
      icon: 'fa-hospital',
      title: 'Healthcare Accreditation Mastery',
      description: 'Comprehensive training in healthcare quality standards and accreditation processes.',
      features: ['Patient Safety Standards', 'Risk Management', 'Quality Improvement'],
      price: '$1,299',
      color: 'primary'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Quality Management Systems',
      description: 'Master ISO standards and quality management principles for organizational excellence.',
      features: ['ISO 9001:2015', 'Process Improvement', 'Audit Techniques'],
      price: '$999',
      color: 'secondary'
    },
    {
      icon: 'fa-users',
      title: 'Leadership in Accreditation',
      description: 'Develop leadership skills specific to managing accreditation programs and teams.',
      features: ['Strategic Planning', 'Team Management', 'Change Management'],
      price: '$1,499',
      color: 'tertiary'
    }
  ];

  const events: EventCardProps[] = [
    {
      image: '/images/healthcare-event.jpg',
      category: 'Healthcare',
      date: 'March 15, 2024',
      title: 'Healthcare Accreditation Standards Workshop',
      description: 'Comprehensive workshop covering the latest healthcare accreditation standards and implementation strategies.',
      price: 'Free',
      registerLink: '/events/healthcare-workshop'
    },
    {
      image: '/images/world-accreditation-day.jpg',
      category: 'Special Event',
      date: 'June 9, 2024',
      title: 'World Accreditation Day Celebration',
      description: 'Join us in celebrating World Accreditation Day with special presentations and networking opportunities.',
      price: 'Free',
      registerLink: '/events/world-accreditation-day'
    },
    {
      image: '/images/surveyor-training.jpg',
      category: 'Training',
      date: 'Ongoing',
      title: 'Professional Surveyor Training Program',
      description: 'Comprehensive training program for aspiring and current surveyors in accreditation processes.',
      price: '$2,499',
      registerLink: '/programs/surveyor-training'
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="pt-36 pb-20 relative overflow-hidden min-h-[calc(100vh-9rem)]">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/fEef2_WC5JI?si=IWDMz76gbKoApBkL&autoplay=1&mute=1&loop=1&playlist=fEef2_WC5JI&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3"
            className="w-full h-full object-cover"
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
              
              <p className="text-xl lg:text-2xl text-stone-900 mb-10 leading-relaxed font-light">
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
                subtitle: 'Learn & Grow',
                icon: 'fa-graduation-cap',
                content: 'Begin your journey at our Knowledge Hub — your central space for transformation.',
                features: [
                  'High-impact training courses',
                  'Expert-led webinars',
                  'Hands-on workshops',
                  'Industry-specific content'
                ]
              },
              {
                step: '2',
                title: 'Official Certificate',
                subtitle: 'Prove Your Expertise',
                icon: 'fa-award',
                content: 'Earn your internationally recognized certificate — your mark of professional excellence.',
                features: [
                  'Globally recognized credentials',
                  'Quality assurance validation',
                  'Professional credibility boost',
                  'Career advancement proof'
                ]
              },
              {
                step: '3',
                title: 'Career Development',
                subtitle: 'Transform Your Future',
                icon: 'fa-rocket',
                content: 'Leverage your new credentials for maximum career impact and professional growth.',
                features: [
                  'Professional network access',
                  'Career guidance resources',
                  'Ongoing support system',
                  'Industry connections'
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

      {/* Featured Courses Section */}
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
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
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
              Join our expert-led sessions and connect with professionals from around the world
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
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
