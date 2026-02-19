'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [contactForm, setContactForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [contactLoading, setContactLoading] = useState(false);
    const [contactSuccess, setContactSuccess] = useState(false);
    const [contactError, setContactError] = useState('');

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setContactLoading(true);
        setContactError('');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${contactForm.firstName} ${contactForm.lastName}`.trim(),
                    email: contactForm.email,
                    phone: contactForm.phone,
                    message: contactForm.message
                })
            });
            if (response.ok) {
                setContactSuccess(true);
                setContactForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
            } else {
                setContactError('Failed to send message. Please try again.');
            }
        } catch {
            setContactError('An error occurred. Please try again.');
        } finally {
            setContactLoading(false);
        }
    };

    return (
        <main>
            {/* Hero Banner */}
            <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#024985' }}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)' }} />
                </div>
                <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Playfair_Display']">
                        Contact Us
                    </h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                        Have questions about our programs? Our team is here to help you choose the right path for your professional development.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-5">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">Get in Touch</h2>
                            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                Whether you&apos;re interested in our training programs, webinars, or accreditation services, we&apos;d love to hear from you. Reach out through any of the channels below.
                            </p>
                            <div className="space-y-8">
                                {[
                                    { icon: 'fa-envelope', title: 'Email Us', info: 'info@aaa-accreditation.org' },
                                    { icon: 'fa-phone', title: 'Call Us', info: '+1 (571) 601 2616\n+44 (748) 755 0737' },
                                    { icon: 'fa-map-marker-alt', title: 'Visit Us', info: '8609 Westwood Center Drive\nTysons Corner, VA 22182, USA' }
                                ].map((contact, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="bg-white w-12 h-12 rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.05)] flex items-center justify-center mr-6 border border-gray-100 flex-shrink-0">
                                            <i className={`fas ${contact.icon} text-[#13558D]`} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#13558D] mb-1 font-['Playfair_Display'] text-lg">{contact.title}</h3>
                                            <p className="text-gray-600 whitespace-pre-line text-sm font-light leading-relaxed">{contact.info}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Office Hours */}
                            <div className="mt-10 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-[#13558D] mb-3 font-['Playfair_Display'] text-lg">
                                    <i className="fas fa-clock mr-2 text-sm" />
                                    Office Hours
                                </h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><span className="font-medium text-gray-800">Monday – Friday:</span> 9:00 AM – 6:00 PM (EST)</p>
                                    <p><span className="font-medium text-gray-800">Saturday – Sunday:</span> Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100">
                            <h3 className="text-2xl font-bold text-[#13558D] mb-6 font-['Playfair_Display']">Send us a Message</h3>
                            {contactSuccess ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i className="fas fa-check text-green-600 text-2xl"></i>
                                    </div>
                                    <h4 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h4>
                                    <p className="text-gray-600 mb-6">Thank you! We will get back to you soon.</p>
                                    <button
                                        onClick={() => setContactSuccess(false)}
                                        className="text-[#13558D] font-medium hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleContactSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            required
                                            value={contactForm.firstName}
                                            onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13558D] focus:border-[#13558D] bg-gray-50/50"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            required
                                            value={contactForm.lastName}
                                            onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13558D] focus:border-[#13558D] bg-gray-50/50"
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        required
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13558D] focus:border-[#13558D] bg-gray-50/50"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={contactForm.phone}
                                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13558D] focus:border-[#13558D] bg-gray-50/50"
                                    />
                                    <textarea
                                        rows={4}
                                        placeholder="Your Message"
                                        required
                                        value={contactForm.message}
                                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13558D] focus:border-[#13558D] bg-gray-50/50"
                                    />
                                    {contactError && <p className="text-red-600 text-sm">{contactError}</p>}
                                    <button
                                        type="submit"
                                        disabled={contactLoading}
                                        className="w-full bg-red-600 text-white py-4 rounded-full font-bold hover:bg-red-700 hover:shadow-xl hover:-translate-y-0.5 transition-all tracking-wide uppercase text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {contactLoading ? (
                                            <><i className="fas fa-spinner fa-spin mr-2"></i>Sending...</>
                                        ) : (
                                            <><i className="fas fa-paper-plane mr-2"></i>Send Message</>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
