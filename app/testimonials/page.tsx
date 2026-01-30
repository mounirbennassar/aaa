'use client';

import { useState, useEffect } from 'react';
import TestimonialCard from '@/components/TestimonialCard';

interface Testimonial {
    id: string;
    name: string;
    role?: string;
    company?: string;
    content?: string;
    imageUrl?: string;
    videoUrl?: string;
    isActive: boolean;
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('/api/testimonials?isActive=true');
                if (response.ok) {
                    const data = await response.json();
                    setTestimonials(data);
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Split testimonials into columns for a masonry-like grid effect if needed,
    // or simply use a flexible grid. For simplicity and consistency with design, 
    // we'll use a responsive grid.

    return (
        <main className="min-h-screen bg-gray-50 pt-36 pb-20">
            <div className="mx-auto px-5 max-w-7xl">
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <div className="inline-block bg-[#13558D]/10 px-4 py-2 rounded-full text-[#13558D] font-semibold text-sm mb-6">
                        User Success Stories
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">
                        What Our Community Says
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed font-light">
                        Discover how AAA Academy has empowered professionals and organizations worldwide to achieve excellence in accreditation and quality standards.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#13558D]"></div>
                        <span className="ml-3 text-gray-600">Loading testimonials...</span>
                    </div>
                ) : testimonials.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((item) => (
                            <div key={item.id} className="h-full">
                                <TestimonialCard
                                    name={item.name}
                                    role={item.role}
                                    company={item.company}
                                    content={item.content}
                                    imageUrl={item.imageUrl}
                                    videoUrl={item.videoUrl}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <i className="fas fa-comment-slash text-4xl text-gray-300 mb-4"></i>
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No Testimonials Yet</h3>
                        <p className="text-gray-500">Check back soon for updates from our community.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
