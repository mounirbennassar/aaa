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
    <header className="w-full z-50 relative">
      {/* Slim Topbar - AAA main site links */}
      <nav style={{ backgroundColor: '#01325a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-between h-8">
            <div className="flex items-center space-x-0.5 text-xs">
              <a href="https://aaa-accreditation.org" className="text-gray-300 hover:text-white px-2 py-1 transition-colors">
                Home
              </a>
              <span className="text-gray-500">|</span>

              {/* About Us */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('about')}
                  className="text-gray-300 hover:text-white px-2 py-1 flex items-center transition-colors"
                >
                  About Us
                  <i className="fas fa-chevron-down ml-1" style={{ fontSize: '8px' }} />
                </button>
                {activeDropdown === 'about' && (
                  <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-md shadow-xl z-50 border border-gray-100">
                    <div className="py-1">
                      <a href="https://aaa-accreditation.org/about-aaa/" onClick={closeDropdown} className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700">About AAA</a>
                      <a href="https://aaa-accreditation.org/index.php/news/" onClick={closeDropdown} className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700">AAA News</a>
                      <a href="https://aaa-accreditation.org/?page_id=6381" onClick={closeDropdown} className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700">Advisory Technical Committees</a>
                      <a href="https://aaa-accreditation.org/about-accreditation/" onClick={closeDropdown} className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700">About Accreditation</a>
                      <a href="https://aaa-accreditation.org/national-international-partnership/" onClick={closeDropdown} className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700">National & International Partnership</a>
                    </div>
                  </div>
                )}
              </div>
              <span className="text-gray-500">|</span>

              {/* Accreditation Programs */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('programs')}
                  className="text-gray-300 hover:text-white px-2 py-1 flex items-center transition-colors"
                >
                  Accreditation Programs
                  <i className="fas fa-chevron-down ml-1" style={{ fontSize: '8px' }} />
                </button>
                {activeDropdown === 'programs' && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-md shadow-xl z-50 border border-gray-100">
                    <div className="py-1">
                      <a href="https://aaa-accreditation.org/role-of-accreditation-in-healthcare-system-bodies/" onClick={closeDropdown} className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700">Healthcare Accreditation</a>
                      <a href="https://aaa-accreditation.org/conformity-assessment-bodies-accreditation/" onClick={closeDropdown} className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700">Conformity Assessment Bodies Accreditation</a>
                      <a href="https://aaa-accreditation.org/training-education-providers-accreditation/" onClick={closeDropdown} className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700">Training & Education Providers Accreditation</a>
                    </div>
                  </div>
                )}
              </div>
              <span className="text-gray-500">|</span>

              {/* Membership */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('membership')}
                  className="text-gray-300 hover:text-white px-2 py-1 flex items-center transition-colors"
                >
                  Membership
                  <i className="fas fa-chevron-down ml-1" style={{ fontSize: '8px' }} />
                </button>
                {activeDropdown === 'membership' && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-md shadow-xl z-50 border border-gray-100">
                    <div className="py-1">
                      <a href="https://aaa-accreditation.org/individual-membership/" onClick={closeDropdown} className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700">Individual Membership</a>
                      <a href="https://aaa-accreditation.org/organizational-membership/" onClick={closeDropdown} className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700">Organizational Membership</a>
                    </div>
                  </div>
                )}
              </div>
              <span className="text-gray-500">|</span>

              <a href="https://aaa-accreditation.org/accredited-organizations/" className="text-gray-300 hover:text-white px-2 py-1 transition-colors">
                Accredited Organizations
              </a>
              <span className="text-gray-500">|</span>
              <a href="/adcp" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white px-2 py-1 transition-colors">
                Accredited Personnel
              </a>
            </div>

            <a
              href="https://aaa-accreditation.org/apply"
              className="bg-red-600 text-white px-4 py-1 rounded text-xs font-semibold hover:bg-red-700 transition-colors"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile: just Apply + hamburger */}
          <div className="flex md:hidden items-center justify-between h-10">
            <Link href="/">
              <Image src="/aaa.png" alt="AAA" width={36} height={36} className="h-7 w-auto" />
            </Link>
            <div className="flex items-center space-x-3">
              <a href="https://aaa-accreditation.org/apply" className="bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-700">
                Apply Now
              </a>
              <button onClick={toggleMobileMenu} className="text-white hover:text-yellow-300 p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Logo + Main Academy Nav combined */}
      <div style={{ backgroundColor: '#024985' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/aaa.png"
                alt="AAA Academy Logo"
                width={56}
                height={56}
                className="h-12 w-auto drop-shadow-lg"
              />
            </Link>

            {/* Academy Navigation - Main */}
            <div className="flex items-center space-x-1">
              <Link
                href="/"
                className="text-white hover:bg-white/10 font-medium text-sm px-4 py-2 rounded-md transition-all flex items-center"
              >
                <i className="fas fa-graduation-cap mr-2 text-white/70" />
                Academy
              </Link>
              <a
                href="/courses"
                className="text-white hover:bg-white/10 font-medium text-sm px-4 py-2 rounded-md transition-all flex items-center"
              >
                <i className="fas fa-book mr-2 text-white/70" />
                Training Programs
              </a>
              <a
                href="/webinars"
                className="text-white hover:bg-white/10 font-medium text-sm px-4 py-2 rounded-md transition-all flex items-center"
              >
                <i className="fas fa-video mr-2 text-white/70" />
                Webinars
              </a>
              <a
                href="/testimonials"
                className="text-white hover:bg-white/10 font-medium text-sm px-4 py-2 rounded-md transition-all flex items-center"
              >
                <i className="fas fa-quote-right mr-2 text-white/70" />
                Testimonials
              </a>
              <a
                href="/speakers"
                className="text-white hover:bg-white/10 font-medium text-sm px-4 py-2 rounded-md transition-all flex items-center"
              >
                <i className="fas fa-chalkboard-teacher mr-2 text-white/70" />
                Speakers
              </a>
            </div>

            {/* Contact CTA */}
            <a
              href="/faq"
              className="text-white hover:text-yellow-300 text-sm font-medium transition-colors"
            >
              FAQ
            </a>
          </div>
        </div>
      </div>

      {/* Backdrop to close dropdown */}
      {activeDropdown && (
        <div className="fixed inset-0 z-40" onClick={closeDropdown} />
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={closeMobileMenu}></div>
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: '#024985' }}>
              <h2 className="text-lg font-bold text-white">Menu</h2>
              <button onClick={closeMobileMenu} className="text-white hover:text-yellow-300 p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Academy Links First */}
            <div className="p-4 border-b" style={{ backgroundColor: '#f0f7ff' }}>
              <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3">Academy</h3>
              <div className="space-y-1">
                <Link href="/" onClick={closeMobileMenu} className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors text-sm">
                  <i className="fas fa-graduation-cap mr-3 text-blue-600 w-4" />
                  Academy Home
                </Link>
                <a href="/courses" onClick={closeMobileMenu} className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors text-sm">
                  <i className="fas fa-book mr-3 text-blue-600 w-4" />
                  Training Programs
                </a>
                <a href="/webinars" onClick={closeMobileMenu} className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors text-sm">
                  <i className="fas fa-video mr-3 text-blue-600 w-4" />
                  Webinars
                </a>
                <a href="/testimonials" onClick={closeMobileMenu} className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors text-sm">
                  <i className="fas fa-quote-right mr-3 text-blue-600 w-4" />
                  Testimonials
                </a>
                <a href="/speakers" onClick={closeMobileMenu} className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors text-sm">
                  <i className="fas fa-chalkboard-teacher mr-3 text-blue-600 w-4" />
                  Speakers
                </a>
              </div>
            </div>

            {/* AAA Main Links */}
            <div className="p-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">AAA Main Site</h3>
              <div className="space-y-1">
                <a href="https://aaa-accreditation.org" onClick={closeMobileMenu} className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                  Home
                </a>

                <div>
                  <button
                    onClick={() => toggleDropdown('about')}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <span>About Us</span>
                    <i className={`fas fa-chevron-${activeDropdown === 'about' ? 'up' : 'down'} text-xs text-gray-400`} />
                  </button>
                  {activeDropdown === 'about' && (
                    <div className="ml-4 space-y-0.5 mt-1">
                      <a href="https://aaa-accreditation.org/about-aaa/" onClick={closeMobileMenu} className="block px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg">About AAA</a>
                      <a href="https://aaa-accreditation.org/index.php/news/" onClick={closeMobileMenu} className="block px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg">AAA News</a>
                      <a href="https://aaa-accreditation.org/?page_id=6381" onClick={closeMobileMenu} className="block px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg">Advisory Technical Committees</a>
                      <a href="https://aaa-accreditation.org/about-accreditation/" onClick={closeMobileMenu} className="block px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg">About Accreditation</a>
                      <a href="https://aaa-accreditation.org/national-international-partnership/" onClick={closeMobileMenu} className="block px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg">National & International Partnership</a>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => toggleDropdown('programs')}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <span>Accreditation Programs</span>
                    <i className={`fas fa-chevron-${activeDropdown === 'programs' ? 'up' : 'down'} text-xs text-gray-400`} />
                  </button>
                  {activeDropdown === 'programs' && (
                    <div className="ml-4 space-y-0.5 mt-1">
                      <a href="https://aaa-accreditation.org/role-of-accreditation-in-healthcare-system-bodies/" onClick={closeMobileMenu} className="block px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg">Healthcare Accreditation</a>
                      <a href="https://aaa-accreditation.org/conformity-assessment-bodies-accreditation/" onClick={closeMobileMenu} className="block px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg">Conformity Assessment Bodies Accreditation</a>
                      <a href="https://aaa-accreditation.org/training-education-providers-accreditation/" onClick={closeMobileMenu} className="block px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg">Training & Education Providers Accreditation</a>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => toggleDropdown('membership')}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <span>Membership</span>
                    <i className={`fas fa-chevron-${activeDropdown === 'membership' ? 'up' : 'down'} text-xs text-gray-400`} />
                  </button>
                  {activeDropdown === 'membership' && (
                    <div className="ml-4 space-y-0.5 mt-1">
                      <a href="https://aaa-accreditation.org/individual-membership/" onClick={closeMobileMenu} className="block px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg">Individual Membership</a>
                      <a href="https://aaa-accreditation.org/organizational-membership/" onClick={closeMobileMenu} className="block px-3 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg">Organizational Membership</a>
                    </div>
                  )}
                </div>

                <a href="https://aaa-accreditation.org/accredited-organizations/" onClick={closeMobileMenu} className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                  Accredited Organizations
                </a>
                <a href="/adcp" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                  Accredited Personnel
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Marquee News Bar */}
      <div className="bg-white text-[#013866] py-1 overflow-hidden border-b border-gray-200">
        <div className="marquee-container">
          <div className="marquee-content">
            <span className="mx-4">100% of participants rated trainers&apos; subject-matter knowledge as Very Good to Excellent</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">Over 90% rated clarity of content presentation as Excellent</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">More than 90% rated participant engagement as Excellent</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">100% confirmed training met or exceeded expectations</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">Over 90% reported significant improvement in ISO 15189 understanding</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">~90% reported high confidence in applying knowledge at workplace</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">More than 85% rated theory-practice balance as Excellent</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">85-90% rated pre-course communication as Very Good to Excellent</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">100% rated registration process as smooth</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">100% rated online platform as easy to use and accessible</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">Over 90% rated course as well organized and on time</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">100% rated technical support as Very Good to Excellent</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">More than 90% expressed overall satisfaction</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">Over 95% would recommend the course to colleagues</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            {/* Duplicate for seamless loop */}
            <span className="mx-4">100% of participants rated trainers&apos; subject-matter knowledge as Very Good to Excellent</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">Over 90% rated clarity of content presentation as Excellent</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">More than 90% rated participant engagement as Excellent</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">100% confirmed training met or exceeded expectations</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">Over 90% reported significant improvement in ISO 15189 understanding</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">~90% reported high confidence in applying knowledge at workplace</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">More than 85% rated theory-practice balance as Excellent</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">85-90% rated pre-course communication as Very Good to Excellent</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">100% rated registration process as smooth</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">100% rated online platform as easy to use and accessible</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">Over 90% rated course as well organized and on time</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">100% rated technical support as Very Good to Excellent</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">More than 90% expressed overall satisfaction</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
            <span className="mx-4">Over 95% would recommend the course to colleagues</span>
            <img src="/aaaico.png" alt="" className="h-3.5 w-3.5 mx-2 inline-block" />
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
          font-size: 0.7rem;
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
    </header>
  );
}