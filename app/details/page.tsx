import Link from 'next/link';

export default function DetailsPage() {
  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-[#024985]">
                  <i className="fas fa-home" /> Home
                </Link>
              </li>
              <li>
                <i className="fas fa-chevron-right text-gray-400" />
              </li>
              <li>
                <Link href="/events" className="text-gray-500 hover:text-[#024985]">
                  Events
                </Link>
              </li>
              <li>
                <i className="fas fa-chevron-right text-gray-400" />
              </li>
              <li className="text-[#024985] font-medium">
                Healthcare Accreditation Mastery Workshop
              </li>
            </ol>
          </nav>
        </div>
      </div>
      
      {/* Page Header */}
      <div className="py-12" style={{ backgroundColor: '#013866' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Healthcare Accreditation Mastery Workshop
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Master the principles and practices of healthcare accreditation with industry experts
            </p>
          </div>
        </div>
      </div>
      
      {/* Event Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Workshop Overview
              </h2>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                  The Healthcare Accreditation Mastery Workshop is designed for
                  healthcare professionals, quality managers, and accreditation
                  coordinators who want to deepen their understanding of
                  accreditation standards and processes. This comprehensive 3-day
                  program combines theoretical knowledge with practical
                  applications.
                </p>
                <p className="text-gray-700 mb-6">
                  Participants will gain hands-on experience with real-world case
                  studies, interactive simulations, and direct feedback from
                  certified accreditation experts. The workshop covers the latest
                  updates in healthcare standards, regulatory compliance, and best
                  practices in quality management.
                </p>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  What You&apos;ll Learn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-3" />
                    <span>
                      Healthcare accreditation fundamentals and frameworks
                    </span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-3" />
                    <span>Quality management system implementation</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-3" />
                    <span>Survey preparation and documentation</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-3" />
                    <span>Risk assessment and patient safety protocols</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-3" />
                    <span>Continuous improvement methodologies</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-3" />
                    <span>Leadership and communication strategies</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Target Audience
                </h3>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Healthcare Quality Managers and Directors</li>
                  <li>Accreditation Coordinators and Specialists</li>
                  <li>Hospital Administrators and Department Heads</li>
                  <li>Compliance Officers and Risk Managers</li>
                  <li>Healthcare Consultants and Auditors</li>
                  <li>Nursing Leaders and Clinical Managers</li>
                </ul>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Prerequisites
                </h3>
                <p className="text-gray-700 mb-6">
                  Basic knowledge of healthcare operations and quality concepts is
                  recommended. No specific certifications required, but 2+ years of
                  healthcare experience is beneficial.
                </p>
              </div>
            </div>
            {/* Event Details Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Event Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <i className="fas fa-calendar-alt text-accent w-6" />
                    <div className="ml-3">
                      <p className="font-medium">Date</p>
                      <p className="text-gray-600">March 15-17, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-accent w-6" />
                    <div className="ml-3">
                      <p className="font-medium">Time</p>
                      <p className="text-gray-600">9:00 AM - 5:00 PM CST</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-accent w-6" />
                    <div className="ml-3">
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">
                        Chicago Marriott Downtown
                        <br />
                        540 N Michigan Ave
                        <br />
                        Chicago, IL 60611
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-laptop text-accent w-6" />
                    <div className="ml-3">
                      <p className="font-medium">Virtual Option</p>
                      <p className="text-gray-600">Live streaming available</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-language text-accent w-6" />
                    <div className="ml-3">
                      <p className="font-medium">Language</p>
                      <p className="text-gray-600">English</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-certificate text-accent w-6" />
                    <div className="ml-3">
                      <p className="font-medium">CEUs</p>
                      <p className="text-gray-600">24 Contact Hours</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Pricing Card */}
              <div className="early-bird rounded-xl p-6 relative">
                <div className="text-center mb-4">
                  <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg inline-flex items-center">
                    <i className="fas fa-fire mr-2" />
                    Early Bird Special
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
                  Registration Pricing
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Early Bird (Until Feb 15)</span>
                    <span className="font-bold text-accent">$1,299</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Regular Price</span>
                    <span className="line-through">$1,599</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Virtual Attendance</span>
                    <span className="font-bold">$899</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Group Discount (3+)</span>
                    <span>15% Off</span>
                  </div>
                </div>
                <button className="w-full btn-accent py-3 rounded-lg font-semibold mt-6 hover:shadow-lg transition-all">
                  Register Now &amp; Save $300
                </button>
                <p className="text-center text-sm text-gray-600 mt-2">
                  *All prices include materials and refreshments
                </p>
              </div>
              {/* Contact Card */}
              <div className="bg-primary text-white rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <i className="fas fa-phone w-5" />
                    <span className="ml-3">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-envelope w-5" />
                    <span className="ml-3">academy@aaa-accreditation.org</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-comments w-5" />
                    <span className="ml-3">Live Chat Available</span>
                  </div>
                </div>
                <button className="w-full border-2 border-white text-white py-2 rounded-lg font-medium mt-4 hover:bg-white hover:text-primary transition-all">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Workshop Agenda */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              3-Day Workshop Agenda
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive curriculum designed by industry experts
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Day 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-primary">
                  Day 1: Foundations
                </h3>
                <p className="text-gray-600">March 15, 2024</p>
              </div>
              <div className="agenda-timeline">
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    9:00 AM - Welcome &amp; Introductions
                  </h4>
                  <p className="text-sm text-gray-600">
                    Registration, networking breakfast
                  </p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    10:00 AM - Healthcare Accreditation Overview
                  </h4>
                  <p className="text-sm text-gray-600">
                    History, purpose, and global standards
                  </p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    12:00 PM - Lunch Break
                  </h4>
                  <p className="text-sm text-gray-600">Networking lunch provided</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    1:00 PM - Quality Management Systems
                  </h4>
                  <p className="text-sm text-gray-600">Implementation strategies</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    3:30 PM - Interactive Workshop
                  </h4>
                  <p className="text-sm text-gray-600">
                    Hands-on activities and Q&amp;A
                  </p>
                </div>
              </div>
            </div>
            {/* Day 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-primary">
                  Day 2: Applications
                </h3>
                <p className="text-gray-600">March 16, 2024</p>
              </div>
              <div className="agenda-timeline">
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    9:00 AM - Survey Preparation
                  </h4>
                  <p className="text-sm text-gray-600">
                    Documentation and readiness
                  </p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    10:30 AM - Case Study Analysis
                  </h4>
                  <p className="text-sm text-gray-600">Real-world scenarios</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    12:00 PM - Lunch Break
                  </h4>
                  <p className="text-sm text-gray-600">Networking lunch provided</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    1:00 PM - Risk Assessment
                  </h4>
                  <p className="text-sm text-gray-600">Patient safety protocols</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    3:30 PM - Mock Survey
                  </h4>
                  <p className="text-sm text-gray-600">
                    Practice assessment simulation
                  </p>
                </div>
              </div>
            </div>
            {/* Day 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-primary">Day 3: Mastery</h3>
                <p className="text-gray-600">March 17, 2024</p>
              </div>
              <div className="agenda-timeline">
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    9:00 AM - Leadership Strategies
                  </h4>
                  <p className="text-sm text-gray-600">Building quality culture</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    10:30 AM - Continuous Improvement
                  </h4>
                  <p className="text-sm text-gray-600">Methodologies and tools</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    12:00 PM - Lunch Break
                  </h4>
                  <p className="text-sm text-gray-600">Networking lunch provided</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    1:00 PM - Action Planning
                  </h4>
                  <p className="text-sm text-gray-600">Implementation roadmap</p>
                </div>
                <div className="agenda-item">
                  <div className="agenda-dot" />
                  <h4 className="font-semibold text-primary">
                    3:00 PM - Certificate Ceremony
                  </h4>
                  <p className="text-sm text-gray-600">
                    Recognition and networking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Expert Speakers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Expert Speakers &amp; Faculty
            </h2>
            <p className="text-lg text-gray-600">
              Learn from industry leaders with decades of experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center card-hover">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-md text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                Dr. Sarah Johnson, MD
              </h3>
              <p className="text-accent font-medium mb-3">Chief Quality Officer</p>
              <p className="text-gray-600 text-sm mb-4">
                25+ years in healthcare quality management. Former Joint Commission
                surveyor and healthcare accreditation expert.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  Healthcare Quality
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  Leadership
                </span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center card-hover">
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-tie text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                Michael Chen, MBA
              </h3>
              <p className="text-accent font-medium mb-3">
                Senior Accreditation Consultant
              </p>
              <p className="text-gray-600 text-sm mb-4">
                International accreditation expert with experience in 30+ countries.
                Specialist in quality system implementation.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                  International Standards
                </span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                  Consulting
                </span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center card-hover">
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-graduate text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                Dr. Emily Rodriguez, PhD
              </h3>
              <p className="text-accent font-medium mb-3">
                Risk Management Director
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Patient safety and risk assessment specialist. Published researcher
                in healthcare quality improvement methodologies.
              </p>
              <div className="flex justify-center space-x-2">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                  Risk Management
                </span>
                <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
                  Research
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              What Our Participants Say
            </h2>
            <p className="text-lg text-gray-600">
              Real feedback from healthcare professionals who attended our workshops
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Jennifer Martinez</h4>
                  <p className="text-gray-600 text-sm">
                    Quality Manager, St. Mary&apos;s Hospital
                  </p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
                              <p className="text-gray-700 italic">
                  &quot;Outstanding workshop! The practical approach and real-world case
                  studies made complex accreditation concepts easy to understand and
                  implement.&quot;
                </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">David Thompson</h4>
                  <p className="text-gray-600 text-sm">
                    Compliance Officer, Regional Medical Center
                  </p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
                              <p className="text-gray-700 italic">
                  &quot;The expert speakers provided invaluable insights. I immediately
                  applied what I learned to our accreditation preparation process with
                  excellent results.&quot;
                </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg card-hover">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Lisa Chen</h4>
                  <p className="text-gray-600 text-sm">
                    Director of Nursing, Community Health System
                  </p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
                              <p className="text-gray-700 italic">
                  &quot;Comprehensive, well-organized, and highly relevant. The networking
                  opportunities were as valuable as the educational content. Highly
                  recommended!&quot;
                </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Related Events &amp; Programs
            </h2>
            <p className="text-lg text-gray-600">
              Explore our other professional development opportunities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg card-hover">
              <div className="bg-primary text-white p-4">
                <h3 className="text-lg font-bold">
                  ISO 9001 Lead Auditor Certification
                </h3>
                <p className="text-blue-200 text-sm">5-Day Intensive Program</p>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-600 mb-3">
                  <i className="fas fa-calendar-alt mr-2" />
                  <span>April 10-14, 2024</span>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <i className="fas fa-map-marker-alt mr-2" />
                  <span>New York, NY</span>
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  Become a certified lead auditor with comprehensive quality
                  management system training.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-accent font-bold">$1,899</span>
                  <button className="btn-primary px-4 py-2 rounded">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg card-hover">
              <div className="bg-accent text-white p-4">
                <h3 className="text-lg font-bold">
                  Quality Management Webinar Series
                </h3>
                <p className="text-red-200 text-sm">Monthly Virtual Sessions</p>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-600 mb-3">
                  <i className="fas fa-calendar-alt mr-2" />
                  <span>Every 3rd Wednesday</span>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <i className="fas fa-laptop mr-2" />
                  <span>Virtual Attendance</span>
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  Monthly webinars covering latest trends and best practices in
                  quality management.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-accent font-bold">$99/month</span>
                  <button className="btn-primary px-4 py-2 rounded">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg card-hover">
              <div className="bg-green-600 text-white p-4">
                <h3 className="text-lg font-bold">Advanced Surveyor Training</h3>
                <p className="text-green-200 text-sm">Professional Certification</p>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-600 mb-3">
                  <i className="fas fa-calendar-alt mr-2" />
                  <span>May 5-7, 2024</span>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <i className="fas fa-map-marker-alt mr-2" />
                  <span>Los Angeles, CA</span>
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  Advanced training for healthcare surveyors and assessment
                  professionals.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-accent font-bold">$1,499</span>
                  <button className="btn-primary px-4 py-2 rounded">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Registration CTA */}
      <section className="py-16 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Master Healthcare Accreditation?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 500+ healthcare professionals who have advanced their careers
            through our comprehensive training programs.
          </p>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-accent">24</div>
                <div className="text-blue-200">Contact Hours</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">3</div>
                <div className="text-blue-200">Days Intensive</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">50</div>
                <div className="text-blue-200">Max Participants</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-accent px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all">
              <i className="fas fa-user-plus mr-2" />
              Register Now - Save $300
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-all">
              <i className="fas fa-phone mr-2" />
              Call for Group Rates
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-6">
            Early Bird pricing ends February 15, 2024 | Full refund available until
            14 days before event
          </p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img
                src="https://aaa-accreditation.org/wp-content/uploads/2020/04/AAA-Logo.png"
                alt="AAA Academy"
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-400 mb-4">
                American Accreditation Association Academy - Advancing healthcare
                quality through professional education and training.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    All Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Training Programs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Faculty
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Registration Help
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Group Discounts
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center">
                  <i className="fas fa-phone w-5" />
                  <span className="ml-3">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope w-5" />
                  <span className="ml-3">academy@aaa-accreditation.org</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt w-5" />
                  <span className="ml-3">Chicago, IL</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              © 2024 AAA Academy of Accreditation. All rights reserved. |
              International Accreditation... Accepted Globally
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
