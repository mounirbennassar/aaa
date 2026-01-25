'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ThankYouContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const courseName = searchParams.get('course');

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] pt-48 pb-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Success Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50">
                    {/* Header with animation */}
                    <div className="bg-gradient-to-r from-[#13558D] to-[#1e7bc9] p-10 text-center relative overflow-hidden">
                        {/* Animated background circles */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
                        </div>

                        {/* Success Icon */}
                        <div className="relative">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                                <i className="fas fa-check text-4xl text-green-500"></i>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-['Playfair_Display']">
                                Payment Successful!
                            </h1>
                            <p className="text-white/80 text-lg">
                                Thank you for your purchase
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-10">
                        {/* Order Details */}
                        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                            <h2 className="text-lg font-bold text-[#13558D] mb-4 flex items-center">
                                <i className="fas fa-receipt mr-3 text-[#dc2626]"></i>
                                Order Details
                            </h2>

                            {courseName && (
                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                    <span className="text-gray-600">Course:</span>
                                    <span className="font-semibold text-gray-900 text-right max-w-[60%]">
                                        {decodeURIComponent(courseName)}
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="text-gray-600">Amount Paid:</span>
                                <span className="font-bold text-[#13558D] text-lg">$480.00 USD</span>
                            </div>

                            {orderId && (
                                <div className="flex justify-between items-center py-3">
                                    <span className="text-gray-600">Order ID:</span>
                                    <span className="font-mono text-sm text-gray-500">{orderId}</span>
                                </div>
                            )}
                        </div>

                        {/* What's Next */}
                        <div className="mb-8">
                            <h2 className="text-lg font-bold text-[#13558D] mb-4 flex items-center">
                                <i className="fas fa-clipboard-list mr-3 text-[#dc2626]"></i>
                                What&apos;s Next?
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-[#13558D]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-[#13558D] font-bold text-sm">1</span>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-semibold text-gray-900">Confirmation Email</h3>
                                        <p className="text-gray-600 text-sm">
                                            Check your inbox for a confirmation email with your order details and receipt.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-[#13558D]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-[#13558D] font-bold text-sm">2</span>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-semibold text-gray-900">Course Access</h3>
                                        <p className="text-gray-600 text-sm">
                                            Our team will contact you within 24 hours with course access details and instructions.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-[#13558D]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-[#13558D] font-bold text-sm">3</span>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-semibold text-gray-900">Prepare for Learning</h3>
                                        <p className="text-gray-600 text-sm">
                                            Review the course materials and prepare for an enriching learning experience.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Support Info */}
                        <div className="bg-[#13558D]/5 rounded-xl p-5 mb-8">
                            <p className="text-gray-700 text-sm">
                                <i className="fas fa-info-circle mr-2 text-[#13558D]"></i>
                                <strong>Need help?</strong> Contact our support team at{' '}
                                <a href="mailto:support@aaaacademy.com" className="text-[#13558D] hover:underline">
                                    support@aaaacademy.com
                                </a>
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/courses"
                                className="flex-1 bg-gradient-to-r from-[#13558D] to-[#1e7bc9] text-white px-6 py-4 rounded-xl font-bold text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <i className="fas fa-graduation-cap mr-2"></i>
                                Browse More Courses
                            </Link>
                            <Link
                                href="/"
                                className="flex-1 bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-bold text-center hover:bg-gray-200 transition-all duration-300"
                            >
                                <i className="fas fa-home mr-2"></i>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Trust Footer */}
                <div className="mt-8 text-center">
                    <div className="flex items-center justify-center space-x-6 text-gray-400 mb-3">
                        <i className="fab fa-cc-visa text-3xl"></i>
                        <i className="fab fa-cc-mastercard text-3xl"></i>
                        <i className="fab fa-cc-amex text-3xl"></i>
                        <i className="fas fa-shield-alt text-3xl"></i>
                    </div>
                    <p className="text-sm text-gray-500">
                        <i className="fas fa-lock mr-1"></i>
                        Your payment was securely processed by Stripe
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] pt-48 pb-20">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#13558D] border-t-transparent mx-auto"></div>
                    <p className="mt-6 text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <ThankYouContent />
        </Suspense>
    );
}
