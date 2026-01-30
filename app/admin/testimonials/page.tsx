'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'

// Basic TS Type for Testimonial
type Testimonial = {
    id: string
    name: string
    role?: string
    company?: string
    content?: string
    imageUrl?: string
    videoUrl?: string
    isActive: boolean
}

export default function AdminTestimonialsPage() {
    const router = useRouter()
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        company: '',
        content: '',
        imageUrl: '',
        videoUrl: ''
    })

    useEffect(() => {
        fetchTestimonials()
    }, [])

    const fetchTestimonials = async () => {
        try {
            const res = await fetch('/api/testimonials')
            if (res.ok) {
                setTestimonials(await res.json())
            }
        } catch (error) {
            console.error('Error loading testimonials', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return

        try {
            // NOTE: DELETE endpoint not strictly in plan, but good for admin. 
            // I'll skip implementation details of DELETE API for now to stick to plan strictly, 
            // or just accept it might fail if API Update doesn't cover it.
            // For now, let's assume I shouldn't have added it or should add it to API.
            // Re-reading plan: "GET... POST...". No DELETE. 
            // I will implement a visual delete only or skip it. 
            // Let's stick to adding content first.
            alert("Delete functionality not yet implemented in API plan.")
        } catch (e) {
            console.error(e)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await fetch('/api/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                setShowForm(false)
                setFormData({
                    name: '',
                    role: '',
                    company: '',
                    content: '',
                    imageUrl: '',
                    videoUrl: ''
                })
                fetchTestimonials()
            } else {
                alert('Failed to save testimonial')
            }
        } catch (error) {
            console.error(error)
            alert('Error saving testimonial')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="admin-container min-h-screen p-8 pt-32">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
                        <p className="text-gray-500 mt-1">Manage what people say about AAA Academy</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
                    >
                        <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'}`}></i>
                        {showForm ? 'Cancel' : 'Add New'}
                    </button>
                </div>

                {/* Add Form */}
                {showForm && (
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-blue-100 animate-fade-in-down">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Add New Testimonial</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="e.g. John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="e.g. Senior Manager"
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="e.g. Global Tech Inc."
                                        value={formData.company}
                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (YouTube/Vimeo)</label>
                                    <input
                                        type="url"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="e.g. https://youtube.com/watch?v=..."
                                        value={formData.videoUrl}
                                        onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Providing a video URL will display the video instead of the quote text on the card.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Avatar / Thumbnail Image URL</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="https://..."
                                        value={formData.imageUrl}
                                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Content / Quote</label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="Testimonial text..."
                                        value={formData.content}
                                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2 flex justify-end mt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Testimonial'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full py-12 flex justify-center text-gray-500">
                            <i className="fas fa-spinner fa-spin mr-2"></i> Loading testimonials...
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="col-span-full py-12 text-center bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                            <p className="text-gray-500">No testimonials found. Add your first one!</p>
                        </div>
                    ) : (
                        testimonials.map(item => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="h-32 bg-gray-100 relative">
                                    {item.videoUrl ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                                            <i className="fas fa-video text-white text-3xl opacity-50"></i>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <i className="fas fa-quote-right text-gray-300 text-4xl"></i>
                                        </div>
                                    )}
                                    {item.imageUrl && (
                                        <img src={item.imageUrl} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-xs text-gray-500 mb-2">{item.role} {item.company && `at ${item.company}`}</p>
                                    {item.content && (
                                        <p className="text-sm text-gray-600 line-clamp-3">"{item.content}"</p>
                                    )}
                                    {item.videoUrl && (
                                        <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                                            <i className="fas fa-play-circle mr-1"></i> Video Linked
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    )
}
