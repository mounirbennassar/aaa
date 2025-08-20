import LearnMoreButton from './components/LearnMoreButton';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="gradient-bg pt-28 pb-16 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-yellow-300">Advance with Confidence</span> to get
                <span className="text-yellow-300"> Certified by Global Experts</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                The AAA Accreditation Academy is a premier destination for professionals looking for
                organized, effective, and globally recognized learning in accreditation. It delivers high-impact
                training courses, certification sessions, webinars, workshops and more. Our focus
                is on quality improvement and helping professionals navigate various accreditation and
                international standards application or assessment principles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg">
                  <i className="fas fa-graduation-cap mr-2" />
                  Explore Programs
                </button>
                <LearnMoreButton />
              </div>
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">+6000</div>
                  <div className="text-blue-100">Program Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">+200</div>
                  <div className="text-blue-100">Expert Instructors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">+55</div>
                  <div className="text-blue-100">Countries Served</div>
                </div>
              </div>
            </div>
            <div className="relative animate-float">
              <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">
                  Quick Registration
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select Program Interest</option>
                    <option>Healthcare Accreditation</option>
                    <option>Quality Management</option>
                    <option>Training Provider Certification</option>
                    <option>ISO Standards Training</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  >
                    Get Started Today
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-800 opacity-10 transform rotate-12 translate-x-1/2" />
      </section>

      {/* Academy Overview Section */}
      <section id="academy-overview" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Academy Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Knowledge to Career Growth: Your Path with AAA Academy
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
            {/* Step 1: Knowledge Hub */}
            <div className="bg-white rounded-xl shadow-lg p-8 card-hover border-t-4 border-blue-600">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-book text-2xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">1. Knowledge Hub</h3>
                <p className="text-blue-600 font-semibold">Learn from the Best</p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Your journey begins at our <strong>Knowledge</strong> Hub — a central space offering high-impact training
                courses, expert-led webinars, hands-on workshops, and more. Each program is carefully
                crafted by professionals with deep experience in accreditation, international standards,
                and quality improvement. Whether you&apos;re new to the field or looking to expand your
                expertise, our content ensures practical, up-to-date learning aligned with global practices.
              </p>
            </div>

            {/* Step 2: Official Certificate */}
            <div className="bg-white rounded-xl shadow-lg p-8 card-hover border-t-4 border-red-600">
              <div className="text-center mb-6">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-certificate text-2xl text-red-600" />
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

            {/* Step 3: Career Development */}
            <div className="bg-white rounded-xl shadow-lg p-8 card-hover border-t-4 border-green-600">
              <div className="text-center mb-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-line text-2xl text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">3. Career Development</h3>
                <p className="text-green-600 font-semibold">Grow with Confidence</p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                The final step in your journey is where the real transformation happens. With certified
                expertise in hand, you can take strategic steps in your career — apply for new roles, lead
                quality initiatives, or strengthen your profile in a competitive market. Our alumni have gone
                on to secure leadership positions, consultancy opportunities, and specialized roles in both
                local and international organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Professional Development Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive certification programs designed to enhance your
              expertise and advance your career in accreditation and quality
              management.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border-t-4 border-red-600">
              <div className="p-8">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-heartbeat text-2xl text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Healthcare Accreditation Specialist
                </h3>
                <p className="text-gray-600 mb-6">
                  Master the principles of healthcare quality and safety standards,
                  accreditation processes, and regulatory compliance.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check text-green-500 mr-2" />
                    Joint Commission Standards
                  </li>
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check text-green-500 mr-2" />
                    Patient Safety Protocols
                  </li>
                  <li className="flex items-center text-gray-700">
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
                  <i className="fas fa-certificate text-2xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  ISO Management Systems
                </h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive training on ISO standards implementation, auditing,
                  and continuous improvement methodologies.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check text-green-500 mr-2" />
                    ISO 9001 Quality Management
                  </li>
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check text-green-500 mr-2" />
                    ISO 14001 Environmental
                  </li>
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check text-green-500 mr-2" />
                    ISO 45001 Safety
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
                  <i className="fas fa-chalkboard-teacher text-2xl text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Training Provider Certification
                </h3>
                <p className="text-gray-600 mb-6">
                  Become a certified training provider with expertise in adult
                  learning, curriculum development, and assessment.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check text-green-500 mr-2" />
                    Adult Learning Principles
                  </li>
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check text-green-500 mr-2" />
                    Curriculum Design
          </li>
                  <li className="flex items-center text-gray-700">
                    <i className="fas fa-check text-green-500 mr-2" />
                    Assessment Methods
          </li>
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-900">$899</span>
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
      <section id="events" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Upcoming Events &amp; Workshops
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our exclusive events, workshops, and networking sessions designed
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
                    <i className="far fa-calendar mr-1" />
                    June 25, 2025
                  </span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Advanced Healthcare Quality Workshop
                </h3>
                <p className="text-gray-600 mb-4">
                  Deep dive into advanced healthcare quality management principles
                  and practical implementation strategies.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 text-sm">
                    <i className="fas fa-clock mr-1" />
                    9:00 AM - 5:00 PM
                  </div>
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
                    <i className="far fa-calendar mr-1" />
                    June 9, 2025
                  </span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  World Accreditation Day Celebration
                </h3>
                <p className="text-gray-600 mb-4">
                  Join us for a special celebration of World Accreditation Day with
                  keynote speakers and networking.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 text-sm">
                    <i className="fas fa-clock mr-1" />
                    2:00 PM - 6:00 PM
                  </div>
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
                    <i className="far fa-calendar mr-1" />
                    July 15, 2025
                  </span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Surveyor Certification Training
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive training program for healthcare accreditation
                  surveyors and quality assessors.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 text-sm">
                    <i className="fas fa-clock mr-1" />
                    3-Day Program
                  </div>
                  <Link href="/details" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Register
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-48 flex items-center justify-center">
                <i className="fas fa-users text-6xl text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Networking
                  </div>
                  <span className="ml-auto text-gray-500 text-sm">
                    <i className="far fa-calendar mr-1" />
                    Monthly
                  </span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Professional Networking Mixer
                </h3>
                <p className="text-gray-600 mb-4">
                  Monthly networking events for accreditation professionals to
                  connect and share best practices.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 text-sm">
                    <i className="fas fa-clock mr-1" />
                    6:00 PM - 8:00 PM
                  </div>
                  <Link href="/details" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    Join Us
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 h-48 flex items-center justify-center">
                <i className="fas fa-laptop-code text-6xl text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Webinar
                  </div>
                  <span className="ml-auto text-gray-500 text-sm">
                    <i className="far fa-calendar mr-1" />
                    Weekly
                  </span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Expert Webinar Series
                </h3>
                <p className="text-gray-600 mb-4">
                  Weekly webinars featuring industry experts discussing latest
                  trends and best practices.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 text-sm">
                    <i className="fas fa-clock mr-1" />1 Hour Sessions
                  </div>
                  <Link href="/details" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                    Attend
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-48 flex items-center justify-center">
                <i className="fas fa-trophy text-6xl text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Competition
                  </div>
                  <span className="ml-auto text-gray-500 text-sm">
                    <i className="far fa-calendar mr-1" />
                    Annual
                  </span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Excellence Awards Ceremony
                </h3>
                <p className="text-gray-600 mb-4">
                  Annual recognition ceremony celebrating outstanding achievements
                  in accreditation and quality management.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 text-sm">
                    <i className="fas fa-clock mr-1" />
                    Full Day Event
                  </div>
                  <Link href="/details" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm">
                    Nominate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section id="faculty" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Meet Our Expert Faculty
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from industry leaders and experienced professionals who bring
              real-world expertise to your learning journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-user-md text-4xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Dr. Sarah Johnson
              </h3>
              <p className="text-red-600 font-semibold mb-3">
                Healthcare Quality Director
              </p>
              <p className="text-gray-600 text-sm mb-4">
                25+ years in healthcare accreditation with expertise in Joint
                Commission standards and patient safety protocols.
              </p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <i className="fab fa-linkedin" />
                </Link>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-envelope" />
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-teal-600 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-certificate text-4xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Michael Chen</h3>
              <p className="text-red-600 font-semibold mb-3">
                ISO Standards Expert
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Lead auditor and consultant specializing in ISO management systems
                implementation across multiple industries.
              </p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <i className="fab fa-linkedin" />
                </Link>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-envelope" />
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-chalkboard-teacher text-4xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Dr. Maria Rodriguez
              </h3>
              <p className="text-red-600 font-semibold mb-3">
                Training Development Specialist
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Adult education expert with focus on curriculum design and
                competency-based training programs.
              </p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <i className="fab fa-linkedin" />
                </Link>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-envelope" />
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-600 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-search text-4xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Robert Thompson
              </h3>
              <p className="text-red-600 font-semibold mb-3">
                Quality Assessment Expert
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Senior surveyor and assessment specialist with extensive experience
                in organizational evaluation and improvement.
              </p>
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <i className="fab fa-linkedin" />
                </Link>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-envelope" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from professionals who have transformed their careers through our
              academy programs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 card-hover">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900">Jennifer Adams</h4>
                  <p className="text-gray-600 text-sm">
                    Quality Manager, Regional Medical Center
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;The Healthcare Accreditation Specialist program gave me the
                knowledge and confidence to lead our hospital&apos;s accreditation
                efforts. The practical approach and expert instructors made all the
                difference.&quot;
              </p>
              <div className="flex text-yellow-400">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 card-hover">
              <div className="flex items-center mb-6">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900">David Park</h4>
                  <p className="text-gray-600 text-sm">
                    ISO Consultant, Park Quality Solutions
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;The ISO Management Systems program provided comprehensive training
                that helped me establish my own consulting practice. The
                certification opened doors I never thought possible.&quot;
              </p>
              <div className="flex text-yellow-400">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 card-hover">
              <div className="flex items-center mb-6">
                <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900">Lisa Williams</h4>
                  <p className="text-gray-600 text-sm">
                    Training Director, TechSkills Institute
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;The Training Provider Certification program transformed how we
                design and deliver our courses. Our student satisfaction scores have
                increased dramatically since implementing what I learned.&quot;
              </p>
              <div className="flex text-yellow-400">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Advance Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who have enhanced their expertise and
            accelerated their careers through AAA Academy&apos;s internationally
            recognized programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg">
              <i className="fas fa-graduation-cap mr-2" />
              Start Your Journey
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors">
              <i className="fas fa-phone mr-2" />
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Ready to take the next step in your professional development?
                Contact our admissions team to learn more about our programs and how
                we can help you achieve your career goals.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-phone text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Email</h4>
                    <p className="text-gray-600">academy@aaa-accreditation.org</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-map-marker-alt text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Address</h4>
                    <p className="text-gray-600">
                      123 Accreditation Avenue
                      <br />
                      Professional District, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">
                Send us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Select Program of Interest</option>
                  <option>Healthcare Accreditation Specialist</option>
                  <option>ISO Management Systems</option>
                  <option>Training Provider Certification</option>
                  <option>Custom Corporate Training</option>
                </select>
                <textarea
                  rows={4}
                  placeholder="Tell us about your goals and how we can help..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
    </>
  );
}