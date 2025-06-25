import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AAA Academy Events - Professional Development & Training Events',
  description: 'Join our professional development events, workshops, seminars, and certification programs. Advance your career with AAA Academy.',
};

export default function EventsPage() {
  return (
    <>
      {/* Header */}
      <header className="gradient-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              AAA Academy Events
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Professional Development &amp; Training Events
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Search events..."
                  className="w-full md:w-80 px-4 py-3 pl-12 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-600"
                />
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                <i className="fas fa-calendar-plus mr-2" />
                View All Events
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="px-6 py-2 rounded-full bg-blue-900 text-white hover:bg-blue-600 transition-colors"
              data-filter="all"
            >
              All Events
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
              data-filter="workshop"
            >
              Workshops
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
              data-filter="seminar"
            >
              Seminars
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
              data-filter="certification"
            >
              Certification
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
              data-filter="webinar"
            >
              Webinars
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
              data-filter="conference"
            >
              Conferences
            </button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          id="eventsGrid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Event Card 1 */}
          <div
            className="card-hover bg-white rounded-xl shadow-lg overflow-hidden"
            data-category="certification"
            data-title="Healthcare Accreditation Certification Program"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-48 flex items-center justify-center">
              <i className="fas fa-hospital-alt text-6xl text-white" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Certification
                </span>
                <span className="text-sm text-gray-500">5 Days</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Healthcare Accreditation Certification Program
              </h3>
              <p className="text-gray-600 mb-4">
                Comprehensive training program for healthcare professionals seeking
                accreditation expertise.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-calendar mr-2 text-red-600" />
                  <span>March 15-19, 2024</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-map-marker-alt mr-2 text-red-600" />
                  <span>New York, NY</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-users mr-2 text-red-600" />
                  <span>25 Participants Max</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">$1,299</span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>

          {/* Event Card 2 */}
          <div
            className="card-hover bg-white rounded-xl shadow-lg overflow-hidden"
            data-category="workshop"
            data-title="Quality Management Systems Workshop"
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 h-48 flex items-center justify-center">
              <i className="fas fa-cogs text-6xl text-white" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Workshop
                </span>
                <span className="text-sm text-gray-500">2 Days</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Quality Management Systems Workshop
              </h3>
              <p className="text-gray-600 mb-4">
                Master the fundamentals of ISO 9001 and quality management
                implementation.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-calendar mr-2 text-red-600" />
                  <span>March 22-23, 2024</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-laptop mr-2 text-red-600" />
                  <span>Virtual Event</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-users mr-2 text-red-600" />
                  <span>50 Participants Max</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">$599</span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>

          {/* Event Card 3 */}
          <div
            className="card-hover bg-white rounded-xl shadow-lg overflow-hidden"
            data-category="seminar"
            data-title="Advanced Auditing Techniques Seminar"
          >
            <div className="bg-gradient-to-r from-green-600 to-green-800 h-48 flex items-center justify-center">
              <i className="fas fa-search text-6xl text-white" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Seminar
                </span>
                <span className="text-sm text-gray-500">1 Day</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Advanced Auditing Techniques Seminar
              </h3>
              <p className="text-gray-600 mb-4">
                Learn cutting-edge auditing methodologies and best practices from
                industry experts.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-calendar mr-2 text-red-600" />
                  <span>April 5, 2024</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-map-marker-alt mr-2 text-red-600" />
                  <span>Chicago, IL</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-users mr-2 text-red-600" />
                  <span>40 Participants Max</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">$399</span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>

          {/* Event Card 4 */}
          <div
            className="card-hover bg-white rounded-xl shadow-lg overflow-hidden"
            data-category="webinar"
            data-title="Global Accreditation Trends Webinar"
          >
            <div className="bg-gradient-to-r from-orange-600 to-orange-800 h-48 flex items-center justify-center">
              <i className="fas fa-globe text-6xl text-white" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  Webinar
                </span>
                <span className="text-sm text-gray-500">2 Hours</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Global Accreditation Trends Webinar
              </h3>
              <p className="text-gray-600 mb-4">
                Explore emerging trends and future directions in international
                accreditation.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-calendar mr-2 text-red-600" />
                  <span>April 12, 2024</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-laptop mr-2 text-red-600" />
                  <span>Online Event</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-users mr-2 text-red-600" />
                  <span>Unlimited</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">Free</span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>

          {/* Event Card 5 */}
          <div
            className="card-hover bg-white rounded-xl shadow-lg overflow-hidden"
            data-category="conference"
            data-title="Annual Accreditation Excellence Conference"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-800 h-48 flex items-center justify-center">
              <i className="fas fa-trophy text-6xl text-white" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  Conference
                </span>
                <span className="text-sm text-gray-500">3 Days</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Annual Accreditation Excellence Conference
              </h3>
              <p className="text-gray-600 mb-4">
                Join industry leaders for networking, innovation, and excellence in
                accreditation.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-calendar mr-2 text-red-600" />
                  <span>May 15-17, 2024</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-map-marker-alt mr-2 text-red-600" />
                  <span>Las Vegas, NV</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-users mr-2 text-red-600" />
                  <span>500 Participants Max</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">$899</span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>

          {/* Event Card 6 */}
          <div
            className="card-hover bg-white rounded-xl shadow-lg overflow-hidden"
            data-category="workshop"
            data-title="Risk Management in Accreditation Workshop"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 h-48 flex items-center justify-center">
              <i className="fas fa-shield-alt text-6xl text-white" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  Workshop
                </span>
                <span className="text-sm text-gray-500">1 Day</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Risk Management in Accreditation Workshop
              </h3>
              <p className="text-gray-600 mb-4">
                Comprehensive approach to identifying and managing risks in
                accreditation processes.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-calendar mr-2 text-red-600" />
                  <span>April 28, 2024</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-map-marker-alt mr-2 text-red-600" />
                  <span>Boston, MA</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-users mr-2 text-red-600" />
                  <span>30 Participants Max</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">$449</span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>

          {/* Event Card 7 */}
          <div
            className="card-hover bg-white rounded-xl shadow-lg overflow-hidden"
            data-category="certification"
            data-title="Lead Auditor Certification Program"
          >
            <div className="bg-gradient-to-r from-teal-600 to-teal-800 h-48 flex items-center justify-center">
              <i className="fas fa-user-graduate text-6xl text-white" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                  Certification
                </span>
                <span className="text-sm text-gray-500">7 Days</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Lead Auditor Certification Program
              </h3>
              <p className="text-gray-600 mb-4">
                Intensive training program to become a certified lead auditor with
                hands-on experience.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-calendar mr-2 text-red-600" />
                  <span>June 3-9, 2024</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-map-marker-alt mr-2 text-red-600" />
                  <span>Washington, DC</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-users mr-2 text-red-600" />
                  <span>20 Participants Max</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">$1,799</span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>

          {/* Event Card 8 */}
          <div
            className="card-hover bg-white rounded-xl shadow-lg overflow-hidden"
            data-category="seminar"
            data-title="Digital Transformation in Healthcare Seminar"
          >
            <div className="bg-gradient-to-r from-pink-600 to-pink-800 h-48 flex items-center justify-center">
              <i className="fas fa-digital-tachograph text-6xl text-white" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                  Seminar
                </span>
                <span className="text-sm text-gray-500">Half Day</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Digital Transformation in Healthcare Seminar
              </h3>
              <p className="text-gray-600 mb-4">
                Explore how digital technologies are reshaping healthcare
                accreditation processes.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-calendar mr-2 text-red-600" />
                  <span>May 8, 2024</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-laptop mr-2 text-red-600" />
                  <span>Hybrid Event</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-users mr-2 text-red-600" />
                  <span>100 Participants Max</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">$299</span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>

          {/* Event Card 9 */}
          <div
            className="card-hover bg-white rounded-xl shadow-lg overflow-hidden"
            data-category="webinar"
            data-title="Regulatory Updates and Compliance Webinar"
          >
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 h-48 flex items-center justify-center">
              <i className="fas fa-balance-scale text-6xl text-white" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Webinar
                </span>
                <span className="text-sm text-gray-500">1.5 Hours</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Regulatory Updates and Compliance Webinar
              </h3>
              <p className="text-gray-600 mb-4">
                Stay current with the latest regulatory changes affecting
                accreditation standards.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-calendar mr-2 text-red-600" />
                  <span>Monthly - Next: April 20, 2024</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-laptop mr-2 text-red-600" />
                  <span>Online Event</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-users mr-2 text-red-600" />
                  <span>Unlimited</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">$49</span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* No Results Message */}
        <div id="noResults" className="hidden text-center py-12">
          <i className="fas fa-search text-6xl text-gray-300 mb-4" />
          <h3 className="text-2xl font-bold text-gray-600 mb-2">No Events Found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </main>
    </>
  );
}
