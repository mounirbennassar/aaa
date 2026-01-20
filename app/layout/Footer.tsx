import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <footer className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Image
                src="/aaa.png"
                alt="AAA Logo"
                width={64}
                height={64}
                className="h-14 w-auto mb-4 filter brightness-0 invert"
              />
              <h3 className="text-xl font-bold mb-4">AAA Academy</h3>
              <p className="text-blue-200 mb-4">
                Advancing careers through internationally recognized accreditation
                and professional development programs.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-200 hover:text-white">
                  <i className="fab fa-facebook" />
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <i className="fab fa-linkedin" />
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Healthcare Accreditation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    ISO Management Systems
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Training Provider Certification
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Custom Corporate Training
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Event Calendar
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Student Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Downloads &amp; Documents
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Career Services
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <i className="fas fa-phone mr-2" />
                  +1 (555) 123-4567
                </li>
                <li>
                  <i className="fas fa-envelope mr-2" />
                  academy@aaa-accreditation.org
                </li>
                <li>
                  <i className="fas fa-map-marker-alt mr-2" />
                  123 Accreditation Avenue
                  <br />
                  Professional District, NY 10001
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200">
              © 2025 AAA Academy of Accreditation. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-blue-200 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-blue-200 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-blue-200 hover:text-white text-sm">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Scroll to Top Button */}
      <button
        id="scrollTop"
        className="fixed bottom-6 right-6 bg-red-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-red-700 transition-colors hidden"
      >
        <i className="fas fa-arrow-up" />
      </button>
    </>
  );
} 