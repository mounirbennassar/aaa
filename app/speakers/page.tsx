'use client';

import { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';

interface Speaker {
    name: string;
    title: string;
    description: string;
    imageUrl?: string;
}

interface Course {
    id: string;
    speakers?: Speaker[];
}

export default function SpeakersPage() {
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSpeakers();
    }, []);

    const fetchSpeakers = async () => {
        try {
            const response = await fetch('/api/events?category=COURSE&limit=100');
            if (response.ok) {
                const data = await response.json();
                const courses: Course[] = data.events || [];

                // Extract all speakers from courses and deduplicate by name
                const allSpeakers: Speaker[] = [];
                const seenNames = new Set<string>();

                courses.forEach((course) => {
                    if (course.speakers && Array.isArray(course.speakers)) {
                        course.speakers.forEach((speaker) => {
                            if (speaker.name && !seenNames.has(speaker.name)) {
                                seenNames.add(speaker.name);
                                allSpeakers.push(speaker);
                            }
                        });
                    }
                });

                setSpeakers(allSpeakers);
            }
        } catch (error) {
            console.error('Error fetching speakers:', error);
        } finally {
            setLoading(false);
        }
    };

    const isValidCloudinaryImage = (imageUrl: string) => {
        if (!imageUrl || imageUrl.trim() === '') return false;
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return false;
        return true;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#13558D] mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading speakers...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-48 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <h1 className="text-4xl lg:text-5xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">
                        Meet Our Global Team of Experts
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed font-light">
                        Meet our distinguished faculty of industry experts and certified professionals who bring real-world experience to every training program.
                    </p>
                </div>

                {/* Speakers Grid */}
                {speakers.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-12 text-center border border-gray-100">
                        <div className="bg-[#13558D]/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-chalkboard-teacher text-4xl text-[#13558D]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#13558D] mb-4 font-['Playfair_Display']">
                            No Speakers Available
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Our expert instructors will be featured here soon. Check back later!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {speakers.map((speaker, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col group"
                            >
                                {/* Speaker Image */}
                                <div className="relative overflow-hidden h-72 bg-gray-100">
                                    {speaker.imageUrl && isValidCloudinaryImage(speaker.imageUrl) ? (
                                        <CldImage
                                            src={speaker.imageUrl}
                                            alt={speaker.name}
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            crop={{
                                                type: 'fill',
                                                source: true,
                                                gravity: 'face'
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#13558D]/10 to-[#13558D]/5">
                                            <i className="fas fa-user-tie text-6xl text-[#13558D]/30" />
                                        </div>
                                    )}
                                </div>

                                {/* Speaker Info */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-[#13558D] mb-2 font-['Playfair_Display'] group-hover:text-[#1e7bc9] transition-colors">
                                        {speaker.name}
                                    </h3>

                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                        {speaker.title}
                                    </p>

                                    {speaker.description && (
                                        <p className="text-gray-600 text-sm leading-relaxed font-light line-clamp-4">
                                            {speaker.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats Section */}
                {speakers.length > 0 && (
                    <div className="mt-20 text-center">
                        <div className="inline-flex items-center justify-center bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-8 py-4 border border-gray-100">
                            <i className="fas fa-users text-[#13558D] text-2xl mr-4" />
                            <div className="text-left">
                                <div className="text-3xl font-bold text-[#13558D] font-['Playfair_Display']">
                                    {speakers.length}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    Expert Instructors
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
