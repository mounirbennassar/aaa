import React from 'react';
import LearnMoreButton from './components/LearnMoreButton';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <section
        id="home"
        className="gradient-bg pt-28 pb-16 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Advance Your{" "}
                <span className="text-gradient bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  Career
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Join thousands of professionals who have elevated their careers
                through our internationally recognized accreditation and training
                programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <LearnMoreButton />
                <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                  Explore Courses
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">1000+</div>
                  <div className="text-blue-200 text-sm">Certified Professionals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">50+</div>
                  <div className="text-blue-200 text-sm">Training Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">25+</div>
                  <div className="text-blue-200 text-sm">Countries Served</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl animate-float">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Start Your Journey</h3>
                  <p className="text-blue-200">Choose your path to excellence</p>
                </div>
                <div className="space-y-4">
                  <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg">
                    Professional Certification
                  </button>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                    Skills Development
                  </button>
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg">
                    Leadership Training
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Model Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Our Development Model
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A structured approach to professional growth
            </p>
          </div>

          <div className="mb-12">
            <p className="text-lg text-gray-700 max-w-5xl mx-auto text-center leading-relaxed">
              At the Accreditation Academy, we believe in structured, meaningful progress — not just
              learning for the sake of learning. That&apos;s why our development model is built around a
              powerful, three-step pathway: <strong>Knowledge Hub → Official Certificate → Career
              Development</strong>. Here&apos;s how it works:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 card-hover border-t-4 border-red-600">
              <div className="text-center mb-6">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-book text-2xl text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">1. Knowledge Hub</h3>
                <p className="text-red-600 font-semibold">Learn & Grow</p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Your journey begins at our <strong>Knowledge</strong> Hub — a central space offering high-impact training
                courses, expert-led webinars, hands-on workshops, and more. Each program is carefully
                crafted by professionals with deep experience in accreditation, international standards,
                and quality improvement. Whether you&apos;re new to the field or looking to expand your
                expertise, our content ensures practical, up-to-date learning aligned with global practices.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 card-hover border-t-4 border-blue-600">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-certificate text-2xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">2. Official Certificate</h3>
                <p className="text-red-600 font-semibold">Prove Your Expertise</p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                After completing your selected course or training, you&apos;ll receive an <strong>official, internationally
                recognized certificate</strong>. This isn&apos;t just a document — it&apos;s a mark of quality and credibility.
                Our certificates demonstrate that you&apos;ve met specific learning objectives and gained the
                skills required to contribute meaningfully to your field, especially in the context of
                accreditation and standard-based systems.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 card-hover border-t-4 border-green-600">
              <div className="text-center mb-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-rocket text-2xl text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">3. Career Development</h3>
                <p className="text-red-600 font-semibold">Transform Your Future</p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                With your new credentials in hand, you&apos;ll have access to our professional network,
                career guidance resources, and ongoing support to help you leverage your certification
                for maximum career impact. This isn&apos;t where your journey ends — it&apos;s where your
                professional transformation truly begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Featured Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our most popular certification and training programs designed
              to enhance your professional development.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="p-8">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-hospital text-2xl text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  Healthcare Accreditation Mastery
                </h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive training in healthcare quality standards and accreditation processes.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    Patient Safety Standards
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    Risk Management
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    Quality Improvement
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-900">$1,299</span>
                  <Link href="/details" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border-t-4 border-blue-600">
              <div className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-shield-alt text-2xl text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  Quality Management Systems
                </h3>
                <p className="text-gray-600 mb-6">
                  Master ISO standards and quality management principles for organizational excellence.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    ISO 9001:2015
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    Process Improvement
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    Audit Techniques
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-900">$999</span>
                  <Link href="/details" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border-t-4 border-green-600">
              <div className="p-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-users text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  Leadership in Accreditation
                </h3>
                <p className="text-gray-600 mb-6">
                  Develop leadership skills specific to managing accreditation programs and teams.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    Strategic Planning
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    Team Management
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-check text-green-500 mr-2" />
                    Change Management
                  </li>
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-900">$1,499</span>
                  <Link href="/details" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Upcoming Events & Workshops
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our expert-led sessions and connect with professionals from around the world
              to enhance your professional development.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <Image
                src="https://aaa-accreditation.org/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-20-at-5.50.14-PM.jpeg"
                alt="Healthcare Accreditation Event"
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Healthcare
                  </div>
                  <span className="ml-auto text-gray-500 text-sm">
                    <i className="fas fa-calendar mr-1" />
                    March 15, 2024
                  </span>
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-3">
                  Healthcare Accreditation Standards Workshop
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive workshop covering the latest healthcare accreditation standards and implementation strategies.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-900">Free</span>
                  <Link href="/details" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                    Register
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <Image
                src="https://aaa-accreditation.org/wp-content/uploads/2025/06/Screenshot-2025-06-10-at-01.05.49.png"
                alt="World Accreditation Day"
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Special Event
                  </div>
                  <span className="ml-auto text-gray-500 text-sm">
                    <i className="fas fa-calendar mr-1" />
                    June 9, 2024
                  </span>
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-3">
                  World Accreditation Day Celebration
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Join us in celebrating World Accreditation Day with special presentations and networking opportunities.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-900">Free</span>
                  <Link href="/details" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Register
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <Image
                src="https://aaa-accreditation.org/wp-content/uploads/2025/06/survyors.png"
                alt="Surveyor Training"
                width={400}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Training
                  </div>
                  <span className="ml-auto text-gray-500 text-sm">
                    <i className="fas fa-calendar mr-1" />
                    Ongoing
                  </span>
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-3">
                  Professional Surveyor Training Program
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive training program for aspiring and current surveyors in accreditation processes.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-900">$2,499</span>
                  <Link href="/details" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Training Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Specialized Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expand your expertise with our specialized certification programs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 card-hover border border-gray-200">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-microscope text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-3">Laboratory Accreditation</h3>
              <p className="text-gray-600 text-sm mb-4">
                Master ISO/IEC 17025 and laboratory quality management systems.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-900">$899</span>
                <Link href="/details" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  View Details
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 card-hover border border-gray-200">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-industry text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-3">Manufacturing Excellence</h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn lean manufacturing principles and continuous improvement methodologies.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-900">$1,199</span>
                <Link href="/details" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                  View Details
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 card-hover border border-gray-200">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-leaf text-teal-600" />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-3">Environmental Management</h3>
              <p className="text-gray-600 text-sm mb-4">
                ISO 14001 environmental management systems and sustainability practices.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-900">$799</span>
                <Link href="/details" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who have advanced their careers through our
            internationally recognized programs. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Browse All Programs
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-600 mb-8">
                Have questions about our programs? Our team is here to help you choose
                the right path for your professional development.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">Email Us</h3>
                    <p className="text-gray-600">info@aaaacademy.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-phone text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">Visit Us</h3>
                    <p className="text-gray-600">123 Professional Drive<br />Excellence City, EX 12345</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  defaultValue={""}
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
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