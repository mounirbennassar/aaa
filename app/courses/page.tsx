import Link from 'next/link'

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Professional Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of professional development courses designed
            to advance your career in accreditation and quality management.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-graduation-cap text-3xl text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Courses Coming Soon
          </h2>
          <p className="text-gray-600 mb-6">
            We&apos;re currently developing our comprehensive course catalog. 
            Check back soon for exciting new learning opportunities!
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
