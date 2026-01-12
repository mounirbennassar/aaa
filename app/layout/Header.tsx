'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = (menuName: string) => {
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed w-full z-50" style={{ backgroundColor: '#024985' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 relative">
          <div className="absolute left-0 flex items-center">
            <Image
              src="https://aaa-accreditation.org/wp-content/uploads/2020/04/AAA-Logo.png"
              alt="AAA Logo"
              width={56}
              height={56}
              className="h-14 w-auto"
            />
          </div>

          <div className="hidden md:flex space-x-1">
            {/* Home */}
            <div>
              <a
                href="https://aaa-accreditation.org"
                className="text-white hover:text-yellow-300 font-medium text-sm px-3 py-2 flex items-center"
              >
                Home
              </a>
            </div>

            {/* About Us */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('about')}
                className="text-white hover:text-yellow-300 font-medium text-sm px-3 py-2 flex items-center"
              >
                About Us
                <i className="fas fa-chevron-down ml-1 text-xs" />
              </button>
              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
                  <div className="py-2">
                    <a href="https://aaa-accreditation.org/about-aaa/" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      About AAA
                    </a>
                    <a href="https://aaa-accreditation.org/index.php/news/" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      AAA News
                    </a>
                    <a href="https://aaa-accreditation.org/?page_id=6381" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Advisory Technical Committees
                    </a>
                    <a href="https://aaa-accreditation.org/about-accreditation/" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      About Accreditation
                    </a>
                    <a href="https://aaa-accreditation.org/national-international-partnership/" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      National & International Partnership
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Accreditation Programs */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('programs')}
                className="text-white hover:text-yellow-300 font-medium text-sm px-3 py-2 flex items-center"
              >
                Accreditation Programs
                <i className="fas fa-chevron-down ml-1 text-xs" />
              </button>
              {activeDropdown === 'programs' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10">
                  <div className="py-2">
                    <a href="https://aaa-accreditation.org/role-of-accreditation-in-healthcare-system-bodies/" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Healthcare Accreditation
                    </a>
                    <a href="https://aaa-accreditation.org/conformity-assessment-bodies-accreditation/" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Conformity Assessment Bodies Accreditation
                    </a>
                    <a href="https://aaa-accreditation.org/training-education-providers-accreditation/" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Training & Education Providers Accreditation
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Membership */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('membership')}
                className="text-white hover:text-yellow-300 font-medium text-sm px-3 py-2 flex items-center"
              >
                Membership
                <i className="fas fa-chevron-down ml-1 text-xs" />
              </button>
              {activeDropdown === 'membership' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
                  <div className="py-2">
                    <a href="https://aaa-accreditation.org/individual-membership/" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Individual Membership
                    </a>
                    <a href="https://aaa-accreditation.org/organizational-membership/" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Organizational Membership
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Accredited Organizations */}
            <div>
              <a
                href="https://aaa-accreditation.org/accredited-organizations/"
                className="text-white hover:text-yellow-300 font-medium text-sm px-3 py-2 flex items-center"
              >
                Accredited Organizations
              </a>
            </div>

            {/* Accredited Personnel */}
            <div>
              <a
                href="/adcp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-300 font-medium text-sm px-3 py-2 flex items-center"
              >
                Accredited Personnel
              </a>
            </div>
          </div>

          <div className="absolute right-0 flex items-center space-x-4">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Apply Now
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white hover:text-yellow-300 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop to close dropdown when clicking outside */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={closeDropdown}
        />
      )}

      {/* Academy Secondary Navigation */}
      <div className="hidden md:block shadow-sm" style={{ marginTop: '14px', backgroundColor: '#013866' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-10">
            <div className="flex space-x-6">
              <Link
                href="/"
                className="text-white hover:text-yellow-300 font-medium text-sm px-3 py-2 rounded-md transition-colors"
              >
                <i className="fas fa-graduation-cap mr-2" />
                Academy
              </Link>
              <a
                href="/courses"
                className="text-white hover:text-yellow-300 font-medium text-sm px-3 py-2 rounded-md transition-colors"
              >
                <i className="fas fa-book mr-2" />
                Training Programs
              </a>
              <a
                href="/webinars"
                className="text-white hover:text-yellow-300 font-medium text-sm px-3 py-2 rounded-md transition-colors"
              >
                <i className="fas fa-video mr-2" />
                Webinars
              </a>
              <a
                href="/certificate"
                className="text-white hover:text-yellow-300 font-medium text-sm px-3 py-2 rounded-md transition-colors"
              >
                <i className="fas fa-certificate mr-2" />
                Certificate
              </a>
              <a
                href="/speakers"
                className="text-white hover:text-yellow-300 font-medium text-sm px-3 py-2 rounded-md transition-colors"
              >
                <i className="fas fa-chalkboard-teacher mr-2" />
                Speakers
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeMobileMenu}></div>
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: '#024985' }}>
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="text-white hover:text-yellow-300 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Navigation */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Main Navigation</h3>
              <div className="space-y-2">
                <a
                  href="https://aaa-accreditation.org"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Home
                </a>

                <div className="space-y-1">
                  <button
                    onClick={() => toggleDropdown('about')}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span>About Us</span>
                    <i className={`fas fa-chevron-${activeDropdown === 'about' ? 'up' : 'down'} text-sm`} />
                  </button>
                  {activeDropdown === 'about' && (
                    <div className="ml-4 space-y-1">
                      <a href="https://aaa-accreditation.org/about-aaa/" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">About AAA</a>
                      <a href="https://aaa-accreditation.org/index.php/news/" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">AAA News</a>
                      <a href="https://aaa-accreditation.org/?page_id=6381" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Advisory Technical Committees</a>
                      <a href="https://aaa-accreditation.org/about-accreditation/" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">About Accreditation</a>
                      <a href="https://aaa-accreditation.org/national-international-partnership/" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">National & International Partnership</a>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => toggleDropdown('programs')}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span>Accreditation Programs</span>
                    <i className={`fas fa-chevron-${activeDropdown === 'programs' ? 'up' : 'down'} text-sm`} />
                  </button>
                  {activeDropdown === 'programs' && (
                    <div className="ml-4 space-y-1">
                      <a href="https://aaa-accreditation.org/role-of-accreditation-in-healthcare-system-bodies/" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Healthcare Accreditation</a>
                      <a href="https://aaa-accreditation.org/conformity-assessment-bodies-accreditation/" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Conformity Assessment Bodies Accreditation</a>
                      <a href="https://aaa-accreditation.org/training-education-providers-accreditation/" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Training & Education Providers Accreditation</a>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => toggleDropdown('membership')}
                    className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span>Membership</span>
                    <i className={`fas fa-chevron-${activeDropdown === 'membership' ? 'up' : 'down'} text-sm`} />
                  </button>
                  {activeDropdown === 'membership' && (
                    <div className="ml-4 space-y-1">
                      <a href="https://aaa-accreditation.org/individual-membership/" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Individual Membership</a>
                      <a href="https://aaa-accreditation.org/organizational-membership/" onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Organizational Membership</a>
                    </div>
                  )}
                </div>

                <a
                  href="https://aaa-accreditation.org/accredited-organizations/"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Accredited Organizations
                </a>

                <a
                  href="/adcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Accredited Personnel
                </a>
              </div>
            </div>

            {/* Academy Secondary Navigation */}
            <div className="p-4 border-t border-gray-200" style={{ backgroundColor: '#f8f9fa' }}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Academy</h3>
              <div className="space-y-2">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="fas fa-graduation-cap mr-3 text-blue-600" />
                  Academy
                </Link>
                <a
                  href="/courses"
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="fas fa-book mr-3 text-blue-600" />
                  Training Programs
                </a>
                <a
                  href="/webinars"
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="fas fa-video mr-3 text-blue-600" />
                  Webinars
                </a>
                <a
                  href="/certificate"
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="fas fa-certificate mr-3 text-blue-600" />
                  Certificate
                </a>
                <a
                  href="/speakers"
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="fas fa-chalkboard-teacher mr-3 text-blue-600" />
                  Speakers
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Marquee News Bar */}
      <div className="bg-[#dc2626] text-white py-1.5 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            <span className="mx-6">100% of participants rated trainers' subject-matter knowledge as Very Good to Excellent</span>
            <span className="mx-6">Over 90% rated clarity of content presentation as Excellent</span>
            <span className="mx-6">More than 90% rated participant engagement as Excellent</span>
            <span className="mx-6">100% confirmed training met or exceeded expectations</span>
            <span className="mx-6">Over 90% reported significant improvement in ISO 15189 understanding</span>
            <span className="mx-6">~90% reported high confidence in applying knowledge at workplace</span>
            <span className="mx-6">More than 85% rated theory-practice balance as Excellent</span>
            <span className="mx-6">85-90% rated pre-course communication as Very Good to Excellent</span>
            <span className="mx-6">100% rated registration process as smooth</span>
            <span className="mx-6">100% rated online platform as easy to use and accessible</span>
            <span className="mx-6">Over 90% rated course as well organized and on time</span>
            <span className="mx-6">100% rated technical support as Very Good to Excellent</span>
            <span className="mx-6">More than 90% expressed overall satisfaction</span>
            <span className="mx-6">Over 95% would recommend the course to colleagues</span>
            {/* Duplicate for seamless loop */}
            <span className="mx-6">100% of participants rated trainers' subject-matter knowledge as Very Good to Excellent</span>
            <span className="mx-6">Over 90% rated clarity of content presentation as Excellent</span>
            <span className="mx-6">More than 90% rated participant engagement as Excellent</span>
            <span className="mx-6">100% confirmed training met or exceeded expectations</span>
            <span className="mx-6">Over 90% reported significant improvement in ISO 15189 understanding</span>
            <span className="mx-6">~90% reported high confidence in applying knowledge at workplace</span>
            <span className="mx-6">More than 85% rated theory-practice balance as Excellent</span>
            <span className="mx-6">85-90% rated pre-course communication as Very Good to Excellent</span>
            <span className="mx-6">100% rated registration process as smooth</span>
            <span className="mx-6">100% rated online platform as easy to use and accessible</span>
            <span className="mx-6">Over 90% rated course as well organized and on time</span>
            <span className="mx-6">100% rated technical support as Very Good to Excellent</span>
            <span className="mx-6">More than 90% expressed overall satisfaction</span>
            <span className="mx-6">Over 95% would recommend the course to colleagues</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }
        .marquee-content {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee 120s linear infinite;
        }
        .marquee-content span {
          font-size: 0.75rem;
          font-weight: 500;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>
    </nav >
  );
} 