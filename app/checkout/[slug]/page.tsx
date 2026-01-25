'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CourseWebinar {
    id: string;
    title: string;
    description: string;
    category: string;
    language: string;
    date: string;
    location: string;
    price: number;
    currency: string;
    duration: string;
    imageUrl?: string;
    slug: string;
}

interface CheckoutFormData {
    name: string;
    email: string;
    phone: string;
}

// Checkout Form Component (inside Elements provider)
function CheckoutForm({
    formData,
    courseName,
    courseId,
    onSuccess
}: {
    formData: CheckoutFormData;
    courseName: string;
    courseId: string;
    onSuccess: (orderId: string) => void;
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/thank-you`,
                receipt_email: formData.email,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An error occurred during payment.');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Payment successful
            onSuccess(paymentIntent.id);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">
                    <i className="fas fa-credit-card mr-3 text-[#dc2626]"></i>
                    Payment Details
                </h2>

                <div className="mb-6">
                    <PaymentElement
                        options={{
                            layout: 'tabs',
                        }}
                    />
                </div>

                {errorMessage && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm flex items-center">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            {errorMessage}
                        </p>
                    </div>
                )}

                {/* Security Notice */}
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                        <i className="fas fa-shield-alt text-green-600 mr-3 text-xl"></i>
                        <div>
                            <p className="text-sm text-green-800 font-medium">Secure Payment</p>
                            <p className="text-sm text-green-700">Your payment is encrypted and processed securely by Stripe.</p>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${isProcessing || !stripe
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white hover:shadow-xl hover:-translate-y-0.5'
                        }`}
                >
                    {isProcessing ? (
                        <>
                            <i className="fas fa-spinner fa-spin mr-3"></i>
                            Processing Payment...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-lock mr-3"></i>
                            Pay $480.00 USD
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}

export default function CheckoutPage() {
    const params = useParams();
    const router = useRouter();
    const [item, setItem] = useState<CourseWebinar | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [step, setStep] = useState(1); // 1 = form, 2 = payment

    const [formData, setFormData] = useState<CheckoutFormData>({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (params.slug) {
            fetchCourseWebinar(params.slug as string);
        }
    }, [params.slug]);

    const fetchCourseWebinar = async (slug: string) => {
        try {
            const response = await fetch(`/api/events/${slug}`);
            if (response.ok) {
                const data = await response.json();
                setItem(data);
            } else {
                setError('Course not found');
            }
        } catch (err) {
            setError('An error occurred while fetching details');
            console.error('Error fetching course:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (field: keyof CheckoutFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const validateForm = () => {
        return formData.name.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.phone.trim() !== '' &&
            formData.email.includes('@');
    };

    const handleContinueToPayment = async () => {
        if (!validateForm() || !item) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/checkout/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: item.id,
                    courseName: item.title,
                    customerName: formData.name,
                    customerEmail: formData.email,
                    customerPhone: formData.phone,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setClientSecret(data.clientSecret);
                setOrderId(data.orderId);
                setStep(2);
            } else {
                setError('Failed to initialize payment. Please try again.');
            }
        } catch (err) {
            console.error('Error creating payment intent:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = (paymentId: string) => {
        // Redirect to thank you page with order details
        router.push(`/thank-you?orderId=${orderId}&course=${encodeURIComponent(item?.title || '')}`);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading && !item) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] pt-48 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#13558D] border-t-transparent mx-auto"></div>
                        <p className="mt-6 text-gray-600 font-light">Loading checkout...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error && !item) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] pt-48 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl inline-block">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            {error}
                        </div>
                        <div className="mt-6">
                            <Link
                                href="/courses"
                                className="bg-[#dc2626] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#b91c1c] transition-all duration-300"
                            >
                                Browse Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!item) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] pt-48 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-white/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-[#13558D] mb-2 font-['Playfair_Display']">
                                <i className="fas fa-shopping-cart mr-3 text-[#dc2626]"></i>
                                Secure Checkout
                            </h1>
                            <p className="text-gray-600">{item.title}</p>
                        </div>
                        <Link
                            href={`/details/${item.slug}`}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </Link>
                    </div>

                    {/* Progress Steps */}
                    <div className="mt-6">
                        <div className="flex items-center">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 1 ? 'bg-[#13558D] text-white' : 'bg-gray-300 text-gray-600'
                                }`}>
                                {step > 1 ? <i className="fas fa-check"></i> : '1'}
                            </div>
                            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-[#13558D]' : 'bg-gray-300'}`}></div>
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? 'bg-[#13558D] text-white' : 'bg-gray-300 text-gray-600'
                                }`}>
                                2
                            </div>
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                            <span className={step === 1 ? 'text-[#13558D] font-semibold' : 'text-gray-500'}>
                                Your Information
                            </span>
                            <span className={step === 2 ? 'text-[#13558D] font-semibold' : 'text-gray-500'}>
                                Payment
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {step === 1 && (
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50">
                                <h2 className="text-xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">
                                    <i className="fas fa-user mr-3 text-[#dc2626]"></i>
                                    Your Information
                                </h2>

                                <div className="space-y-6">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleFormChange('name', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13558D]/20 focus:border-[#13558D] transition-all"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleFormChange('email', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13558D]/20 focus:border-[#13558D] transition-all"
                                            placeholder="Enter your email address"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Confirmation and receipt will be sent to this email
                                        </p>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleFormChange('phone', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13558D]/20 focus:border-[#13558D] transition-all"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>

                                    {error && (
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                            <p className="text-red-700 text-sm flex items-center">
                                                <i className="fas fa-exclamation-circle mr-2"></i>
                                                {error}
                                            </p>
                                        </div>
                                    )}

                                    {/* Continue Button */}
                                    <button
                                        onClick={handleContinueToPayment}
                                        disabled={!validateForm() || loading}
                                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${validateForm() && !loading
                                                ? 'bg-gradient-to-r from-[#13558D] to-[#1e7bc9] text-white hover:shadow-xl hover:-translate-y-0.5'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {loading ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin mr-3"></i>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Continue to Payment
                                                <i className="fas fa-arrow-right ml-3"></i>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && clientSecret && (
                            <Elements
                                stripe={stripePromise}
                                options={{
                                    clientSecret,
                                    appearance: {
                                        theme: 'stripe',
                                        variables: {
                                            colorPrimary: '#13558D',
                                            colorBackground: '#ffffff',
                                            colorText: '#1a1a1a',
                                            colorDanger: '#dc2626',
                                            fontFamily: 'system-ui, sans-serif',
                                            borderRadius: '12px',
                                        },
                                    },
                                }}
                            >
                                <div className="mb-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="text-[#13558D] hover:text-[#1e7bc9] font-medium transition-colors"
                                    >
                                        <i className="fas fa-arrow-left mr-2"></i>
                                        Back to Information
                                    </button>
                                </div>
                                <CheckoutForm
                                    formData={formData}
                                    courseName={item.title}
                                    courseId={item.id}
                                    onSuccess={handlePaymentSuccess}
                                />
                            </Elements>
                        )}
                    </div>

                    {/* Sidebar - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sticky top-24 border border-white/50">
                            <h3 className="text-lg font-bold text-[#13558D] mb-4 font-['Playfair_Display']">
                                Order Summary
                            </h3>

                            {item.imageUrl && (
                                <CldImage
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={300}
                                    height={200}
                                    className="w-full h-36 object-cover rounded-xl mb-4"
                                    crop={{
                                        type: 'fill',
                                        source: true,
                                    }}
                                />
                            )}

                            <h4 className="font-semibold text-gray-900 mb-3">{item.title}</h4>

                            <div className="space-y-3 text-sm text-gray-600 mb-6">
                                <div className="flex items-center">
                                    <i className="fas fa-calendar w-5 text-[#13558D]"></i>
                                    <span className="ml-2">{formatDate(item.date)}</span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-clock w-5 text-[#13558D]"></i>
                                    <span className="ml-2">{item.duration}</span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-map-marker-alt w-5 text-[#13558D]"></i>
                                    <span className="ml-2">{item.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-globe w-5 text-[#13558D]"></i>
                                    <span className="ml-2">{item.language}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Course Fee:</span>
                                    <span className="text-lg font-bold text-[#13558D]">$480.00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                    <span>Processing Fee:</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-900">Total:</span>
                                        <span className="text-2xl font-extrabold text-[#dc2626]">$480.00</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">USD • One-time payment</p>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-center space-x-6 text-gray-400">
                                    <i className="fab fa-cc-visa text-3xl"></i>
                                    <i className="fab fa-cc-mastercard text-3xl"></i>
                                    <i className="fab fa-cc-amex text-3xl"></i>
                                </div>
                                <p className="text-center text-xs text-gray-500 mt-3">
                                    <i className="fas fa-lock mr-1"></i>
                                    Secured by Stripe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
