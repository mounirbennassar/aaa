'use client';

import React, { useState } from 'react';
import { CldImage } from 'next-cloudinary';

interface SpeakerCardProps {
    name: string;
    title?: string;
    description?: string;
    imageUrl?: string;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({
    name,
    title,
    description,
    imageUrl
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 150; // Character limit for truncation

    // Helper to check for valid Cloudinary image
    const isValidCloudinaryImage = (url: string) => {
        if (!url || url.trim() === '') return false;
        if (url.startsWith('http')) return false;
        return true;
    };

    const shouldTruncate = description && description.length > MAX_LENGTH;
    const displayDescription = isExpanded ? description : description?.slice(0, MAX_LENGTH) + (shouldTruncate ? '...' : '');

    return (
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100 flex flex-col group h-full">
            {/* Speaker Image */}
            <div className="relative overflow-hidden h-72 bg-gray-100 flex-shrink-0">
                {imageUrl ? (
                    isValidCloudinaryImage(imageUrl) ? (
                        <CldImage
                            src={imageUrl}
                            alt={name}
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
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    )
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#13558D]/10 to-[#13558D]/5">
                        <i className="fas fa-user-tie text-6xl text-[#13558D]/30" />
                    </div>
                )}
            </div>

            {/* Speaker Info */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#13558D] mb-2 font-['Playfair_Display'] group-hover:text-[#1e7bc9] transition-colors">
                    {name}
                </h3>

                {title && (
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        {title}
                    </p>
                )}

                {description && (
                    <div className="mt-auto">
                        <p className="text-gray-600 text-sm leading-relaxed font-light">
                            {isExpanded ? description : description.slice(0, MAX_LENGTH)}
                            {shouldTruncate && (
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="inline-flex items-center ml-1 text-[#dc2626] hover:text-[#b91c1c] transition-colors focus:outline-none"
                                >
                                    {isExpanded ? (
                                        <i className="fas fa-chevron-up text-xs ml-1"></i>
                                    ) : (
                                        <>... <i className="fas fa-chevron-down text-xs ml-1"></i></>
                                    )}
                                </button>
                            )}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpeakerCard;
