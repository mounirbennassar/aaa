'use client'

import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CldUploadWidget } from 'next-cloudinary'
import { CldImage } from 'next-cloudinary'

interface CloudinaryUploadResult {
  info?: string | {
    public_id: string;
    secure_url: string;
  };
}

interface Event {
  id: string
  title: string
  description: string
  category: string
  duration: string
  price: number
  currency: string
  date: string
  location: string
  language: string
  maxParticipants?: number
  imageUrl?: string
  galleryImages?: string[]
  keyLearningOutcomes?: string[]
  speakers?: Speaker[]
  courseHighlights?: string[]
  prerequisites?: string[]
  whyChoose?: string[]
  certificateDescription?: string
  certificateImageUrl?: string
  certificateUrl?: string
  calendlyUrl?: string
  slug: string
  isVirtual: boolean
  isActive: boolean
  createdAt: string
  creator: {
    name: string | null
    email: string
  }
}

interface Speaker {
  name: string
  title: string
  description: string
  imageUrl?: string
}

interface EventsResponse {
  events: Event[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

interface Analytics {
  totalEvents: number
  totalTrainingPrograms: number
  totalWebinars: number
  totalRevenue: number
  averagePrice: number
  upcomingEvents: number
  activeEvents: number
  monthlyRevenue: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [analytics, setAnalytics] = useState<Analytics>({
    totalEvents: 0,
    totalTrainingPrograms: 0,
    totalWebinars: 0,
    totalRevenue: 0,
    averagePrice: 0,
    upcomingEvents: 0,
    activeEvents: 0,
    monthlyRevenue: 0
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'training-programs' | 'webinars' | 'analytics'>('dashboard')
  const [showModal, setShowModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [modalType, setModalType] = useState<'course' | 'webinar'>('course')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'COURSE',
    duration: '',
    price: '',
    currency: 'USD',
    date: '',
    location: '',
    language: 'English',
    maxParticipants: '',
    imageUrl: '',
    galleryImages: [] as string[],
    isVirtual: false,
    isActive: true,
    keyLearningOutcomes: [''],
    speakers: [{ name: '', title: '', description: '', imageUrl: '' }] as Speaker[],
    courseHighlights: [''],
    prerequisites: [''],
    whyChoose: [''],
    certificateDescription: '',
    certificateImageUrl: '',
    certificateUrl: '',
    calendlyUrl: ''
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated') {
      fetchEvents()
      calculateAnalytics()
    }
  }, [status, router])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events?limit=100')
      if (response.ok) {
        const data: EventsResponse = await response.json()
        setEvents(data.events)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateAnalytics = async () => {
    try {
      const response = await fetch('/api/events?limit=1000')
      if (response.ok) {
        const data: EventsResponse = await response.json()
        const events = data.events
        
        const trainingPrograms = events.filter(e => e.category === 'COURSE')
        const webinars = events.filter(e => e.category === 'WEBINAR')
        const totalRevenue = events.reduce((sum, e) => sum + e.price, 0)
        const averagePrice = totalRevenue / events.length || 0
        const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).length
        const activeEvents = events.filter(e => e.isActive).length
        
        // Calculate monthly revenue (current month)
        const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear()
        const monthlyRevenue = events
          .filter(e => {
            const eventDate = new Date(e.date)
            return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
          })
          .reduce((sum, e) => sum + e.price, 0)

        setAnalytics({
          totalEvents: events.length,
          totalTrainingPrograms: trainingPrograms.length,
          totalWebinars: webinars.length,
          totalRevenue,
          averagePrice,
          upcomingEvents,
          activeEvents,
          monthlyRevenue
        })
      }
    } catch (error) {
      console.error('Error calculating analytics:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const eventData = {
        ...formData,
        price: parseFloat(formData.price),
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : null,
        keyLearningOutcomes: formData.keyLearningOutcomes.filter(item => item.trim() !== ''),
        speakers: formData.speakers.filter(speaker => speaker.name.trim() !== ''),
        courseHighlights: formData.courseHighlights.filter(item => item.trim() !== ''),
        prerequisites: formData.prerequisites.filter(item => item.trim() !== ''),
        whyChoose: formData.whyChoose.filter(item => item.trim() !== ''),
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }

      const method = editingEvent ? 'PUT' : 'POST'
      const url = editingEvent ? `/api/events/${editingEvent.id}` : '/api/events'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      })

      if (response.ok) {
        setShowModal(false)
        setEditingEvent(null)
        resetForm()
        await fetchEvents()
        await calculateAnalytics()
      } else {
        console.error('Error saving event')
      }
    } catch (error) {
      console.error('Error saving event:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'COURSE',
      duration: '',
      price: '',
      currency: 'USD',
      date: '',
      location: '',
      language: 'English',
      maxParticipants: '',
      imageUrl: '',
      galleryImages: [],
      isVirtual: false,
      isActive: true,
      keyLearningOutcomes: [''],
      speakers: [{ name: '', title: '', description: '', imageUrl: '' }] as Speaker[],
      courseHighlights: [''],
      prerequisites: [''],
      whyChoose: [''],
      certificateDescription: '',
      certificateImageUrl: '',
      certificateUrl: '',
      calendlyUrl: ''
    })
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setModalType(event.category.toLowerCase() as 'course' | 'webinar')
    setFormData({
      title: event.title,
      description: event.description,
      category: event.category,
      duration: event.duration,
      price: event.price.toString(),
      currency: event.currency,
      date: new Date(event.date).toISOString().slice(0, 16),
      location: event.location,
      language: event.language,
      maxParticipants: event.maxParticipants?.toString() || '',
      imageUrl: event.imageUrl || '',
      galleryImages: event.galleryImages || [],
      isVirtual: event.isVirtual,
      isActive: event.isActive,
      keyLearningOutcomes: event.keyLearningOutcomes || [''],
      speakers: event.speakers || [{ name: '', title: '', description: '', imageUrl: '' }],
      courseHighlights: event.courseHighlights || [''],
      prerequisites: event.prerequisites || [''],
      whyChoose: event.whyChoose || [''],
      certificateDescription: event.certificateDescription || '',
      certificateImageUrl: event.certificateImageUrl || '',
      certificateUrl: event.certificateUrl || '',
      calendlyUrl: event.calendlyUrl || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`/api/events/${eventId}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          await fetchEvents()
          await calculateAnalytics()
        }
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), '']
    }))
  }

  const updateArrayItem = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) => 
        i === index ? value : item
      )
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }))
  }

  const addSpeaker = () => {
    setFormData(prev => ({
      ...prev,
      speakers: [...prev.speakers, { name: '', title: '', description: '', imageUrl: '' }] as Speaker[]
    }))
  }

  const updateSpeaker = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      speakers: prev.speakers.map((speaker, i) => 
        i === index ? { ...speaker, [field]: value } : speaker
      )
    }))
  }

  const removeSpeaker = (index: number) => {
    setFormData(prev => ({
      ...prev,
      speakers: prev.speakers.filter((_, i) => i !== index)
    }))
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900"></div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg fixed h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
            
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-chart-line mr-3"></i>
                Dashboard
              </button>
              
              <button
                onClick={() => setActiveTab('training-programs')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'training-programs' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-graduation-cap mr-3"></i>
Training Programs
              </button>
              
              <button
                onClick={() => setActiveTab('webinars')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'webinars' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-video mr-3"></i>
                Webinars
              </button>
              
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'analytics' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-analytics mr-3"></i>
                Analytics
              </button>
            </nav>
          </div>
          
          <div className="absolute bottom-0 w-full p-6 border-t">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {session?.user?.name?.charAt(0) || 'A'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{session?.user?.name}</p>
                <p className="text-xs text-gray-500">{session?.user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 capitalize">
                {activeTab === 'dashboard' ? 'Overview' : activeTab}
              </h2>
              
              {(activeTab === 'training-programs' || activeTab === 'webinars') && (
                <button
                  onClick={() => {
                    setModalType(activeTab === 'training-programs' ? 'course' : 'webinar')
                    setFormData(prev => ({ ...prev, category: activeTab === 'training-programs' ? 'COURSE' : 'WEBINAR' }))
                    setShowModal(true)
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add New {activeTab === 'training-programs' ? 'Training Program' : 'Webinar'}
                </button>
              )}
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Events</p>
                        <p className="text-3xl font-bold text-gray-900">{analytics.totalEvents}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-calendar text-blue-600 text-xl"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Training Programs</p>
                        <p className="text-3xl font-bold text-gray-900">{analytics.totalTrainingPrograms}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-graduation-cap text-green-600 text-xl"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Webinars</p>
                        <p className="text-3xl font-bold text-gray-900">{analytics.totalWebinars}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-video text-purple-600 text-xl"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-3xl font-bold text-gray-900">${analytics.totalRevenue.toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-dollar-sign text-yellow-600 text-xl"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.upcomingEvents}</p>
                      </div>
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-clock text-indigo-600"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Events</p>
                        <p className="text-2xl font-bold text-gray-900">{analytics.activeEvents}</p>
                      </div>
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-check-circle text-green-600"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Average Price</p>
                        <p className="text-2xl font-bold text-gray-900">${analytics.averagePrice.toFixed(0)}</p>
                      </div>
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-chart-bar text-orange-600"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Events */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Events</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {events.slice(0, 5).map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            {event.imageUrl && (
                              <CldImage
                                src={event.imageUrl}
                                alt={event.title}
                                width={50}
                                height={50}
                                className="w-12 h-12 rounded-lg object-cover mr-4"
                              />
                            )}
                            <div>
                              <h4 className="font-medium text-gray-900">{event.title}</h4>
                              <p className="text-sm text-gray-600">{event.category} • {new Date(event.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">${event.price}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              event.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {event.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Training Programs Tab */}
            {activeTab === 'training-programs' && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Manage Training Programs</h3>
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        placeholder="Search training programs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Categories</option>
                        <option value="COURSE">Training Programs</option>
                        <option value="WEBINAR">Webinars</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Training Programs Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Course</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEvents.filter(event => event.category === 'COURSE').map((event) => (
                          <tr key={event.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                {event.imageUrl && (
                                  <CldImage
                                    src={event.imageUrl}
                                    alt={event.title}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-lg object-cover mr-3"
                                  />
                                )}
                                <div>
                                  <p className="font-medium text-gray-900">{event.title}</p>
                                  <p className="text-sm text-gray-600">{event.duration}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                {event.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {new Date(event.date).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 font-medium text-gray-900">
                              ${event.price}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                event.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {event.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEdit(event)}
                                  className="text-blue-600 hover:text-blue-800 p-1"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  onClick={() => handleDelete(event.id)}
                                  className="text-red-600 hover:text-red-800 p-1"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Webinars Tab */}
            {activeTab === 'webinars' && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Manage Webinars</h3>
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        placeholder="Search webinars..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  {/* Webinars Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Webinar</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEvents.filter(event => event.category === 'WEBINAR').map((event) => (
                          <tr key={event.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                {event.imageUrl && (
                                  <CldImage
                                    src={event.imageUrl}
                                    alt={event.title}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-lg object-cover mr-3"
                                  />
                                )}
                                <div>
                                  <p className="font-medium text-gray-900">{event.title}</p>
                                  <p className="text-sm text-gray-600">{event.location}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {new Date(event.date).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {event.duration}
                            </td>
                            <td className="py-3 px-4 font-medium text-gray-900">
                              {event.price === 0 ? 'Free' : `$${event.price}`}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                event.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {event.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEdit(event)}
                                  className="text-blue-600 hover:text-blue-800 p-1"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  onClick={() => handleDelete(event.id)}
                                  className="text-red-600 hover:text-red-800 p-1"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* Detailed Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">${analytics.monthlyRevenue.toLocaleString()}</p>
                      </div>
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-chart-line text-green-600"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Course Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${events.filter(e => e.category === 'COURSE').reduce((sum, e) => sum + e.price, 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-graduation-cap text-blue-600"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Webinar Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${events.filter(e => e.category === 'WEBINAR').reduce((sum, e) => sum + e.price, 0).toLocaleString()}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-video text-purple-600"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue Breakdown */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          {event.imageUrl && (
                            <CldImage
                              src={event.imageUrl}
                              alt={event.title}
                              width={50}
                              height={50}
                              className="w-12 h-12 rounded-lg object-cover mr-4"
                            />
                          )}
                          <div>
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <p className="text-sm text-gray-600">{event.category} • {new Date(event.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">${event.price}</p>
                          <p className="text-sm text-gray-600">{event.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Event */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingEvent ? 'Edit' : 'Add New'} {modalType === 'course' ? 'Course' : 'Webinar'}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setEditingEvent(null)
                    resetForm()
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Basic Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="COURSE">Course</option>
                      <option value="WEBINAR">Webinar</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g., 3 Days, 2 Hours"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({...formData, currency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                    <input
                      type="datetime-local"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g., Dubai, UAE or Online"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <input
                      type="text"
                      value={formData.language}
                      onChange={(e) => setFormData({...formData, language: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                    <input
                      type="number"
                      value={formData.maxParticipants}
                      onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isVirtual}
                      onChange={(e) => setFormData({...formData, isVirtual: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Virtual Event</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Images</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
                  <div className="flex items-center space-x-4">
                    {formData.imageUrl && (
                      <CldImage
                        src={formData.imageUrl}
                        alt="Main image"
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <CldUploadWidget
                      uploadPreset="academy_preset"
                      onSuccess={(results: CloudinaryUploadResult) => {
                        if (typeof results.info === 'object' && results.info && 'public_id' in results.info) {
                          setFormData({...formData, imageUrl: results.info.public_id})
                        }
                      }}
                    >
                      {({ open }) => (
                        <button
                          type="button"
                          onClick={() => open()}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Upload Main Image
                        </button>
                      )}
                    </CldUploadWidget>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
                  <div className="flex items-center space-x-4 mb-2">
                    {formData.galleryImages.map((imageId, index) => (
                      <div key={index} className="relative">
                        <CldImage
                          src={imageId}
                          alt={`Gallery image ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              galleryImages: formData.galleryImages.filter((_, i) => i !== index)
                            })
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <CldUploadWidget
                    uploadPreset="academy_preset"
                    onSuccess={(results: CloudinaryUploadResult) => {
                      if (typeof results.info === 'object' && results.info && 'public_id' in results.info) {
                        setFormData({
                          ...formData,
                          galleryImages: [...formData.galleryImages, results.info.public_id]
                        })
                      }
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Add Gallery Image
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

              {/* Key Learning Outcomes */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Key Learning Outcomes</h4>
                {formData.keyLearningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={outcome}
                      onChange={(e) => updateArrayItem('keyLearningOutcomes', index, e.target.value)}
                      placeholder="Enter learning outcome"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('keyLearningOutcomes', index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('keyLearningOutcomes')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Learning Outcome
                </button>
              </div>

              {/* Speakers */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Speakers</h4>
                {formData.speakers.map((speaker, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-gray-900">Speaker {index + 1}</h5>
                      <button
                        type="button"
                        onClick={() => removeSpeaker(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={speaker.name}
                          onChange={(e) => updateSpeaker(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={speaker.title}
                          onChange={(e) => updateSpeaker(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={speaker.description}
                        onChange={(e) => updateSpeaker(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Speaker Image</label>
                      <div className="flex items-center space-x-4">
                        {speaker.imageUrl && (
                          <CldImage
                            src={speaker.imageUrl}
                            alt={speaker.name}
                            width={60}
                            height={60}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        )}
                        <CldUploadWidget
                          uploadPreset="academy_preset"
                          onSuccess={(results: CloudinaryUploadResult) => {
                            if (typeof results.info === 'object' && results.info && 'public_id' in results.info) {
                              updateSpeaker(index, 'imageUrl', results.info.public_id)
                            }
                          }}
                        >
                          {({ open }) => (
                            <button
                              type="button"
                              onClick={() => open()}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                            >
                              Upload Image
                            </button>
                          )}
                        </CldUploadWidget>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSpeaker}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Speaker
                </button>
              </div>

              {/* Course Highlights */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Course Highlights</h4>
                {formData.courseHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => updateArrayItem('courseHighlights', index, e.target.value)}
                      placeholder="Enter course highlight"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('courseHighlights', index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('courseHighlights')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Highlight
                </button>
              </div>

              {/* Prerequisites */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Prerequisites</h4>
                {formData.prerequisites.map((prerequisite, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={prerequisite}
                      onChange={(e) => updateArrayItem('prerequisites', index, e.target.value)}
                      placeholder="Enter prerequisite"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('prerequisites', index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('prerequisites')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Prerequisite
                </button>
              </div>

              {/* Why Choose */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Why Choose This Course</h4>
                {formData.whyChoose.map((reason, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={reason}
                      onChange={(e) => updateArrayItem('whyChoose', index, e.target.value)}
                      placeholder="Enter reason"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('whyChoose', index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('whyChoose')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Reason
                </button>
              </div>

              {/* Certificate Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Certificate Information</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Description</label>
                  <textarea
                    value={formData.certificateDescription}
                    onChange={(e) => setFormData({...formData, certificateDescription: e.target.value})}
                    rows={3}
                    placeholder="Describe the certificate participants will receive"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Image</label>
                  <div className="flex items-center space-x-4">
                    {formData.certificateImageUrl && (
                      <CldImage
                        src={formData.certificateImageUrl}
                        alt="Certificate"
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <CldUploadWidget
                      uploadPreset="academy_preset"
                      onSuccess={(results: CloudinaryUploadResult) => {
                        if (typeof results.info === 'object' && results.info && 'public_id' in results.info) {
                          setFormData({...formData, certificateImageUrl: results.info.public_id})
                        }
                      }}
                    >
                      {({ open }) => (
                        <button
                          type="button"
                          onClick={() => open()}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Upload Certificate Image
                        </button>
                      )}
                    </CldUploadWidget>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certificate URL</label>
                  <input
                    type="url"
                    value={formData.certificateUrl}
                    onChange={(e) => setFormData({...formData, certificateUrl: e.target.value})}
                    placeholder="https://www.example.com/certificate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <i className="fas fa-calendar-alt mr-2 text-blue-600"></i>
                    Calendly Meeting Link
                  </label>
                  <input
                    type="url"
                    value={formData.calendlyUrl}
                    onChange={(e) => setFormData({...formData, calendlyUrl: e.target.value})}
                    placeholder="https://calendly.com/your-link"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    <i className="fas fa-info-circle mr-1"></i>
                    Users will be redirected to this Calendly link after successful payment
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingEvent(null)
                    resetForm()
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingEvent ? 'Update' : 'Create'} {modalType === 'course' ? 'Course' : 'Webinar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 