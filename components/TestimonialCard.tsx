'use client'

import React, { useState } from 'react'
import { CldImage } from 'next-cloudinary'

interface TestimonialCardProps {
    name: string
    role?: string | null
    company?: string | null
    content?: string | null
    imageUrl?: string | null
    videoUrl?: string | null
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    name,
    role,
    company,
    content,
    imageUrl,
    videoUrl
}) => {
    const [isPlaying, setIsPlaying] = useState(false)

    const getVideoId = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
            const match = url.match(regExp)
            return match && match[2].length === 11 ? match[2] : null
        } else if (url.includes('vimeo.com')) {
            const regExp = /vimeo\.com\/([0-9]+)/
            const match = url.match(regExp)
            return match ? match[1] : null
        }
        return null
    }

    const videoId = videoUrl ? getVideoId(videoUrl) : null
    const isYoutube = videoUrl?.includes('youtube') || videoUrl?.includes('youtu.be')
    const isVimeo = videoUrl?.includes('vimeo')

    // Get video thumbnail URL
    const getVideoThumbnail = () => {
        if (!videoId) return null
        if (isYoutube) {
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        }
        if (isVimeo) {
            return `https://vumbnail.com/${videoId}.jpg`
        }
        return null
    }

    const videoThumbnail = getVideoThumbnail()

    // Helper to check for valid Cloudinary image
    const isValidCloudinaryImage = (url: string) => {
        if (!url || url.trim() === '') return false;
        if (url.startsWith('http')) return false;
        return true;
    }

    // Determine which thumbnail to show (priority: imageUrl > video thumbnail > fallback)
    const thumbnailUrl = imageUrl || videoThumbnail

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex-shrink-0 w-[400px] mx-4 h-full flex flex-col">
            {videoUrl && videoId ? (
                <div className="relative aspect-video bg-gray-900 group">
                    {!isPlaying ? (
                        <>
                            {/* Thumbnail - use video platform thumbnail if no imageUrl */}
                            {thumbnailUrl ? (
                                imageUrl && isValidCloudinaryImage(imageUrl) ? (
                                    <CldImage
                                        src={imageUrl}
                                        width={400}
                                        height={225}
                                        alt={name}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                                    />
                                ) : (
                                    <img
                                        src={thumbnailUrl}
                                        alt={name}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                                    />
                                )
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                    <i className="fas fa-play-circle text-5xl text-white opacity-80"></i>
                                </div>
                            )}

                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    className="w-16 h-16 bg-[#dc2626] rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform group-hover:scale-110"
                                >
                                    <i className="fas fa-play ml-1"></i>
                                </button>
                            </div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <p className="font-bold text-lg">{name}</p>
                                {(role || company) && (
                                    <p className="text-xs opacity-90">{role}{role && company ? ' at ' : ''}{company}</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <iframe
                            width="100%"
                            height="100%"
                            src={
                                isYoutube
                                    ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
                                    : `https://player.vimeo.com/video/${videoId}?autoplay=1`
                            }
                            title={`${name} testimonial`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
            ) : (
                <div className="p-8 flex flex-col h-full relative">
                    <div className="absolute top-6 right-6 text-6xl text-[#13558D] opacity-10 font-serif">"</div>
                    <div className="flex-grow">
                        <p className="text-gray-600 italic leading-relaxed mb-6 font-light">"{content}"</p>
                    </div>

                    <div className="flex items-center pt-6 border-t border-gray-50 mt-auto">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-100 flex-shrink-0 border border-gray-200">
                            {imageUrl ? (
                                isValidCloudinaryImage(imageUrl) ? (
                                    <CldImage src={imageUrl} width={48} height={48} alt={name} className="w-full h-full object-cover" />
                                ) : (
                                    <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                                )
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#13558D] text-white font-bold">
                                    {name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="font-bold text-[#13558D] font-['Playfair_Display']">{name}</h4>
                            {(role || company) && (
                                <p className="text-xs text-gray-500 uppercase tracking-wide">{role}{role && company ? ', ' : ''}{company}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TestimonialCard
