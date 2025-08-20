'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

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

interface EnrollmentForm {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  
  // Additional Information
  experience: string;
  motivation: string;
  specialNeeds: string;
  
  // Emergency Contact
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
}

interface PaymentForm {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  city: string;
  country: string;
  postalCode: string;
}

export default function EnrollmentPage() {
  const params = useParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [item, setItem] = useState<CourseWebinar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [enrollmentForm, setEnrollmentForm] = useState<EnrollmentForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    experience: '',
    motivation: '',
    specialNeeds: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: ''
  });

  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    country: '',
    postalCode: ''
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
        setError('Course/Webinar not found');
      }
    } catch (err) {
      setError('An error occurred while fetching details');
      console.error('Error fetching course/webinar:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEnrollmentFormChange = (field: keyof EnrollmentForm, value: string) => {
    setEnrollmentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentFormChange = (field: keyof PaymentForm, value: string) => {
    setPaymentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep1 = () => {
    const required = ['firstName', 'lastName', 'email', 'phone'];
    return required.every(field => enrollmentForm[field as keyof EnrollmentForm].trim() !== '');
  };

  const validateStep2 = () => {
    const required = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName', 'billingAddress', 'city', 'country'];
    return required.every(field => paymentForm[field as keyof PaymentForm].trim() !== '');
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    
    setIsSubmitting(true);
    
    // Mock payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      alert('🎉 Enrollment successful! You will receive a confirmation email shortly.');
      router.push(`/details/${params.slug}`);
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading enrollment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error || 'Course not found'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-48 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-900 mb-2">Course Enrollment</h1>
              <p className="text-gray-600">{item.title}</p>
            </div>
            <Link
              href={`/details/${item.slug}`}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </Link>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-6">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                {currentStep > 1 ? <i className="fas fa-check"></i> : '1'}
              </div>
              <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">Personal Information</span>
              <span className="text-sm text-gray-600">Payment Details</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-blue-900 mb-6">Personal Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={enrollmentForm.firstName}
                      onChange={(e) => handleEnrollmentFormChange('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your first name"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={enrollmentForm.lastName}
                      onChange={(e) => handleEnrollmentFormChange('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your last name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={enrollmentForm.email}
                      onChange={(e) => handleEnrollmentFormChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={enrollmentForm.phone}
                      onChange={(e) => handleEnrollmentFormChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      value={enrollmentForm.company}
                      onChange={(e) => handleEnrollmentFormChange('company', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your company name"
                    />
                  </div>

                  {/* Job Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={enrollmentForm.jobTitle}
                      onChange={(e) => handleEnrollmentFormChange('jobTitle', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your job title"
                    />
                  </div>
                </div>

                {/* Experience Level */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={enrollmentForm.experience}
                    onChange={(e) => handleEnrollmentFormChange('experience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (2-5 years)</option>
                    <option value="advanced">Advanced (5+ years)</option>
                    <option value="expert">Expert (10+ years)</option>
                  </select>
                </div>

                {/* Motivation */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What motivates you to take this course?
                  </label>
                  <textarea
                    value={enrollmentForm.motivation}
                    onChange={(e) => handleEnrollmentFormChange('motivation', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your goals and expectations..."
                  />
                </div>

                {/* Special Needs */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Accommodations
                  </label>
                  <textarea
                    value={enrollmentForm.specialNeeds}
                    onChange={(e) => handleEnrollmentFormChange('specialNeeds', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any special accommodations or dietary requirements..."
                  />
                </div>

                {/* Emergency Contact */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        value={enrollmentForm.emergencyName}
                        onChange={(e) => handleEnrollmentFormChange('emergencyName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Emergency contact name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={enrollmentForm.emergencyPhone}
                        onChange={(e) => handleEnrollmentFormChange('emergencyPhone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Emergency contact phone"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Relationship
                      </label>
                      <input
                        type="text"
                        value={enrollmentForm.emergencyRelation}
                        onChange={(e) => handleEnrollmentFormChange('emergencyRelation', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Relationship to emergency contact"
                      />
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleNextStep}
                    disabled={!validateStep1()}
                    className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                      validateStep1()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue to Payment
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-blue-900 mb-6">Payment Information</h2>
                
                {/* Payment Method */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Payment Method
                  </label>
                  <div className="flex items-center space-x-4 p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <i className="fas fa-credit-card text-blue-600 text-xl"></i>
                    <span className="font-medium text-blue-900">Credit/Debit Card</span>
                    <div className="flex space-x-2 ml-auto">
                      <i className="fab fa-cc-visa text-2xl text-blue-600"></i>
                      <i className="fab fa-cc-mastercard text-2xl text-red-600"></i>
                      <i className="fab fa-cc-amex text-2xl text-blue-600"></i>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Card Number */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={paymentForm.cardNumber}
                      onChange={(e) => handlePaymentFormChange('cardNumber', formatCardNumber(e.target.value))}
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  {/* Expiry Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={paymentForm.expiryDate}
                      onChange={(e) => handlePaymentFormChange('expiryDate', formatExpiryDate(e.target.value))}
                      maxLength={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/YY"
                    />
                  </div>

                  {/* CVV */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={paymentForm.cvv}
                      onChange={(e) => handlePaymentFormChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))}
                      maxLength={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="123"
                    />
                  </div>

                  {/* Cardholder Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={paymentForm.cardholderName}
                      onChange={(e) => handlePaymentFormChange('cardholderName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Name as it appears on card"
                    />
                  </div>
                </div>

                {/* Billing Address */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={paymentForm.billingAddress}
                        onChange={(e) => handlePaymentFormChange('billingAddress', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Street address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={paymentForm.city}
                        onChange={(e) => handlePaymentFormChange('city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={paymentForm.country}
                        onChange={(e) => handlePaymentFormChange('country', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="JP">Japan</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={paymentForm.postalCode}
                        onChange={(e) => handlePaymentFormChange('postalCode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Postal code"
                      />
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-shield-alt text-green-600 mr-3"></i>
                    <div>
                      <p className="text-sm text-green-800 font-medium">Secure Payment</p>
                      <p className="text-sm text-green-700">Your payment information is encrypted and secure.</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back
                  </button>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={!validateStep2() || isSubmitting}
                    className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                      validateStep2() && !isSubmitting
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        Complete Enrollment
                        <i className="fas fa-check ml-2"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Course Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Course Summary</h3>
              
              {item.imageUrl && (
                <CldImage
                  src={item.imageUrl}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                  crop={{
                    type: 'fill',
                    source: true
                  }}
                />
              )}
              
              <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
              
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <i className="fas fa-calendar mr-2 text-blue-500"></i>
                  {formatDate(item.date)}
                </div>
                <div className="flex items-center">
                  <i className="fas fa-clock mr-2 text-blue-500"></i>
                  {item.duration}
                </div>
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2 text-blue-500"></i>
                  {item.location}
                </div>
                <div className="flex items-center">
                  <i className="fas fa-globe mr-2 text-blue-500"></i>
                  {item.language}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Course Fee:</span>
                  <span className="text-xl font-bold text-blue-900">
                    {item.currency} {item.price}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>Processing Fee:</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-green-600">
                      {item.currency} {item.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Contact our support team for assistance with enrollment.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-envelope mr-2"></i>
                    support@aaa-academy.org
                  </div>
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-phone mr-2"></i>
                    +1 (555) 123-4567
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 