'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Removed unused Speaker interface

export default function AdminCoursesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    type: 'COURSE' as 'COURSE' | 'WEBINAR',
    language: 'English',
    date: '',
    location: '',
    price: '',
    description: '',
    keyLearningOutcomes: '',
    speakers: '',
    courseHighlights: '',
    prerequisites: '',
    whyChoose: '',
    certificateDescription: '',
    certificateImageUrl: '',
    certificateUrl: '',
    duration: '',
    maxParticipants: '',
    imageUrl: '',
    galleryImages: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Parse JSON fields
      const processedData = {
        ...formData,
        category: formData.type,
        price: parseFloat(formData.price),
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : null,
        keyLearningOutcomes: formData.keyLearningOutcomes 
          ? formData.keyLearningOutcomes.split('\n').filter(item => item.trim())
          : [],
        speakers: formData.speakers 
          ? formData.speakers.split('\n---\n').map(speakerText => {
              const lines = speakerText.trim().split('\n');
              const description = lines.slice(2, -1).join('\n') || lines.slice(2).join('\n') || '';
              const lastLine = lines[lines.length - 1];
              const imageUrl = lastLine?.startsWith('IMAGE:') ? lastLine.replace('IMAGE:', '').trim() : '';
              
              return {
                name: lines[0] || '',
                title: lines[1] || '',
                description: imageUrl ? description : lines.slice(2).join('\n') || '',
                imageUrl: imageUrl || ''
              };
            }).filter(speaker => speaker.name)
          : [],
        courseHighlights: formData.courseHighlights 
          ? formData.courseHighlights.split('\n').filter(item => item.trim())
          : [],
        prerequisites: formData.prerequisites 
          ? formData.prerequisites.split('\n').filter(item => item.trim())
          : [],
        whyChoose: formData.whyChoose 
          ? formData.whyChoose.split('\n').filter(item => item.trim())
          : [],
        galleryImages: formData.galleryImages 
          ? formData.galleryImages.split('\n').filter(item => item.trim())
          : [],
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        isVirtual: formData.location.toLowerCase().includes('online')
      };

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        alert('Course/Webinar created successfully!');
        router.push('/admin/courses');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to create course/webinar'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the course/webinar');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Course/Webinar</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="COURSE">Course</option>
                  <option value="WEBINAR">Webinar</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language *
                </label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 2 days, 3 hours"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Participants
                </label>
                <input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Learning Outcomes (one per line)
              </label>
              <textarea
                name="keyLearningOutcomes"
                value={formData.keyLearningOutcomes}
                onChange={handleChange}
                rows={6}
                placeholder="Introduction and AAA overview&#10;Principle of surveying and Survey approach&#10;AAA accreditation standards manual"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speakers (Format: Name, Title, Description, [IMAGE:cloudinary_id] separated by --- for multiple speakers)
              </label>
              <textarea
                name="speakers"
                value={formData.speakers}
                onChange={handleChange}
                rows={10}
                placeholder="Wendy Danicourt&#10;Manager, Healthcare Accreditation Department&#10;With over 30 years of experience in Healthcare Accreditation...&#10;IMAGE:speaker-wendy&#10;---&#10;Shakti Derbar&#10;Member, Accreditation Committee&#10;Shakti is a member of AAA Accreditation committee...&#10;IMAGE:speaker-shakti"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Add &quot;IMAGE:cloudinary_public_id&quot; on the last line for each speaker (optional)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Highlights (one per line)
              </label>
              <textarea
                name="courseHighlights"
                value={formData.courseHighlights}
                onChange={handleChange}
                rows={6}
                placeholder="Comprehensive & Practical Curriculum&#10;Expert-Led Training&#10;Flexible Learning Options"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prerequisites (one per line)
              </label>
              <textarea
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleChange}
                rows={4}
                placeholder="A minimum of a bachelor's degree in healthcare&#10;At least five years of professional experience&#10;Familiarity with healthcare systems"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why Choose This Course (one per line)
              </label>
              <textarea
                name="whyChoose"
                value={formData.whyChoose}
                onChange={handleChange}
                rows={4}
                placeholder="Approved as surveyors for AAA accreditation&#10;Comprehensive & Practical Curriculum&#10;Expert-Led Training"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Certificate Section */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Verified Training Certificates</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Description
                </label>
                <textarea
                  name="certificateDescription"
                  value={formData.certificateDescription}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the certificate participants will receive..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Image (Cloudinary ID)
                </label>
                <input
                  type="text"
                  name="certificateImageUrl"
                  value={formData.certificateImageUrl}
                  onChange={handleChange}
                  placeholder="e.g., certificate-sample"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Link (optional)
                </label>
                <input
                  type="url"
                  name="certificateUrl"
                  value={formData.certificateUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/certificate-info"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Image URL (optional)
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="e.g., cld-sample-5 or your Cloudinary public ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Use Cloudinary public ID (e.g., &quot;cld-sample-5&quot;) or full URL
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Images (optional)
              </label>
              <textarea
                name="galleryImages"
                value={formData.galleryImages}
                onChange={handleChange}
                placeholder="Enter one Cloudinary public ID per line&#10;e.g.:&#10;cld-sample-1&#10;cld-sample-2&#10;cld-sample-3"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter one Cloudinary public ID per line for gallery images
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Course/Webinar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 