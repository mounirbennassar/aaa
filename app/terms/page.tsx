export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#13558D] mb-8 font-['Playfair_Display']">Terms & Conditions</h1>

                <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 text-gray-700">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="mb-4">
                            By accessing and using the AAA Academy website and services, you accept and agree to be bound by the terms
                            and provision of this agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Intellectual Property</h2>
                        <p className="mb-4">
                            All content provided on this site, including course materials, videos, and documents, is the property of
                            AAA Academy or its content suppliers and protected by international copyright laws. You may not reproduce,
                            distribute, or sell any content without our express written permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Conduct</h2>
                        <p className="mb-4">
                            You agree to use our site only for lawful purposes. You are prohibited from violating or attempting to
                            violate the security of the site or using the site to harass or harm others.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Payment & Refunds</h2>
                        <div className="space-y-4">
                            <p>
                                All fees are payable in advance. By completing a purchase, you agree to our strict <strong>No Refund Policy</strong>.
                            </p>
                            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm">
                                <p className="font-bold text-yellow-800 mb-1">No Refunds on Digital Content & Webinars</p>
                                <p>
                                    Due to the immediate access nature of our digital training materials and live webinar reservations,
                                    <strong> AAA Academy does not offer refunds</strong> once a purchase is completed. All sales are final.
                                </p>
                            </div>
                            <p>
                                <strong>Stripe Payments:</strong> All transactions are processed securely via Stripe. By completing a payment, you agree to this
                                no-refund policy and authorize the transaction. Chargebacks filed without cause will be contested with evidence of this agreement.
                            </p>
                            <p>
                                <strong>Course Cancellation:</strong> In the unlikely event that AAA Academy cancels a course or webinar, enrolled participants
                                will receive a full credit towards a future event or a full refund at our discretion.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
                        <p>
                            AAA Academy shall not be liable for any direct, indirect, incidental, special, or consequential damages
                            resulting from the use or inability to use our services.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
