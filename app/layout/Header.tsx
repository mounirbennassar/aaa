export default function Header() {
  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src="https://aaa-accreditation.org/wp-content/uploads/2020/04/AAA-Logo.png"
              alt="AAA Logo"
              className="h-10 w-auto"
            />
            <span className="ml-3 text-xl font-bold text-blue-900">Academy</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-900 font-medium"
            >
              Home
            </a>
            <a
              href="/details"
              className="text-gray-700 hover:text-blue-900 font-medium"
            >
              Events
            </a>
            <a
              href="/details"
              className="text-gray-700 hover:text-blue-900 font-medium"
            >
              Workshops
            </a>
            <a
              href="/details"
              className="text-gray-700 hover:text-blue-900 font-medium"
            >
              Training Courses
            </a>
            <a
              href="/details"
              className="text-gray-700 hover:text-blue-900 font-medium"
            >
              Webinars
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 