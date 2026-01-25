export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#13558D] mb-8 font-['Playfair_Display']">Privacy Policy</h1>

                <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 text-gray-700">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information Collection</h2>
                        <p className="mb-4">
                            We collect information you provide directly to us when you register for an account,
                            purchase a course, subscribe to our newsletter, or communicate with us. This may include your name,
                            email address, postal address, phone number, and payment information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Use of Information</h2>
                        <p className="mb-4">
                            We use the information we collect to facilitate your training, process payments via Stripe,
                            issue certificates, and communicate with you about your account and courses.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                        <p className="mb-4">
                            We do not sell your personal data. We may share your information with third-party service providers
                            (like Stripe for payments) strictly for the purpose of operating our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                        <p className="mb-4">
                            We implement appropriate technical and organizational measures to protect your personal data
                            against unauthorized access or processing.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@aaa-accreditation.org" className="text-blue-600 hover:underline">info@aaa-accreditation.org</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
