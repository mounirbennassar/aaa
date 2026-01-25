
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div>
              <Image
                src="/aaa.png"
                alt="AAA Logo"
                width={64}
                height={64}
                className="h-14 w-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-4">AAA Academy</h3>
              <p className="text-blue-200 mb-6 text-sm leading-relaxed">
                American Accreditation Association (AAA) Academy provides world-class training
                and certification programs to advance global quality standards.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-200 hover:text-white transition-colors"><i className="fab fa-facebook-f" /></a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors"><i className="fab fa-linkedin-in" /></a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors"><i className="fab fa-twitter" /></a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors"><i className="fab fa-instagram" /></a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 border-b border-blue-800 pb-2 inline-block">Contact Us</h4>
              <ul className="space-y-4 text-blue-200 text-sm">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-3 text-yellow-400 flex-shrink-0" />
                  <span>
                    <strong>Headquarters:</strong><br />
                    8609 Westwood Center Drive<br />
                    Tysons Corner, VA 22182, USA
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-phone-alt mt-1 mr-3 text-yellow-400 flex-shrink-0" />
                  <span>
                    <strong>T:</strong> +1 (571) 601 2616<br />
                    <strong>Fax:</strong> +1 (571) 376 6582
                  </span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-3 text-yellow-400 flex-shrink-0" />
                  <a href="mailto:info@aaa-accreditation.org" className="hover:text-white transition-colors">
                    info@aaa-accreditation.org
                  </a>
                </li>
                <li className="flex items-start pt-2 border-t border-blue-800/50 mt-2">
                  <i className="fab fa-whatsapp mt-1 mr-3 text-green-400 flex-shrink-0" />
                  <span>
                    <strong>International Operations:</strong><br />
                    +44 (748) 755 0737
                  </span>
                </li>
              </ul>
            </div>

            {/* Our Menu */}
            <div>
              <h4 className="text-lg font-semibold mb-6 border-b border-blue-800 pb-2 inline-block">Our Menu</h4>
              <ul className="space-y-3 text-blue-200 text-sm">
                <li><a href="https://aaa-accreditation.org" className="hover:text-yellow-300 transition-colors flex items-center"><i className="fas fa-angle-right mr-2 text-xs" />Home</a></li>
                <li><a href="https://aaa-accreditation.org/about-aaa/" className="hover:text-yellow-300 transition-colors flex items-center"><i className="fas fa-angle-right mr-2 text-xs" />About Us</a></li>
                <li><a href="https://aaa-accreditation.org/role-of-accreditation-in-healthcare-system-bodies/" className="hover:text-yellow-300 transition-colors flex items-center"><i className="fas fa-angle-right mr-2 text-xs" />Accreditation Programs</a></li>
                <li><a href="https://aaa-accreditation.org/individual-membership/" className="hover:text-yellow-300 transition-colors flex items-center"><i className="fas fa-angle-right mr-2 text-xs" />Membership</a></li>
                <li><a href="https://aaa-accreditation.org/accredited-organizations/" className="hover:text-yellow-300 transition-colors flex items-center"><i className="fas fa-angle-right mr-2 text-xs" />Accredited Organizations</a></li>
                <li><a href="/adcp" className="hover:text-yellow-300 transition-colors flex items-center"><i className="fas fa-angle-right mr-2 text-xs" />Accredited Personnel</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-6 border-b border-blue-800 pb-2 inline-block">Resources</h4>
              <ul className="space-y-3 text-blue-200 text-sm">
                <li><Link href="/courses" className="hover:text-yellow-300 transition-colors flex items-center"><i className="fas fa-angle-right mr-2 text-xs" />Training Programs</Link></li>
                <li><Link href="/webinars" className="hover:text-yellow-300 transition-colors flex items-center"><i className="fas fa-angle-right mr-2 text-xs" />Webinars</Link></li>
                <li><Link href="/faq" className="hover:text-yellow-300 transition-colors flex items-center"><i className="fas fa-angle-right mr-2 text-xs" />FAQs</Link></li>
                <li><Link href="/sitemap" className="hover:text-yellow-300 transition-colors flex items-center"><i className="fas fa-angle-right mr-2 text-xs" />Sitemap</Link></li>
                <li><Link href="/contact" className="hover:text-yellow-300 transition-colors flex items-center"><i className="fas fa-angle-right mr-2 text-xs" />Contact Support</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-blue-300">
            <p className="mb-4 md:mb-0">
              © {new Date().getFullYear()} AAA Academy of Accreditation. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
              <Link href="/refund-policy" className="hover:text-white transition-colors font-semibold text-yellow-400">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        id="scrollTop"
        className="fixed bottom-6 right-6 bg-red-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-red-700 transition-colors hidden z-50 items-center justify-center"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-arrow-up" />
      </button>
    </>
  );
}