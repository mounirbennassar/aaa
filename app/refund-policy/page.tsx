export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#13558D] mb-8 font-['Playfair_Display']">Refund Policy</h1>

                <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 text-gray-700">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">No Refunds Policy</h2>
                        <p className="mb-4">
                            All sales are final. Please review our policy carefully before purchasing any course or webinar.
                        </p>
                        <p className="mb-4 font-medium p-4 bg-yellow-50 border-l-4 border-yellow-400">
                            Due to the immediate access nature of our digital training materials and live webinar reservations,
                            <strong> AAA Academy does not offer refunds</strong> once a purchase is completed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Stripe Payments</h2>
                        <p className="mb-4">
                            All transactions are processed securely via Stripe. By completing a payment, you agree to our no-refund policy
                            and authorize the transaction for the stated amount. Chargebacks filed without cause will be contested
                            with evidence of this policy agreement and proof of service delivery/access.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Cancellation</h2>
                        <p className="mb-4">
                            In the unlikely event that AAA Academy cancels a course or webinar, enrolled participants will receive
                            a full credit towards a future event or a full refund at our discretion.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contacting Support</h2>
                        <p>
                            If you experience technical issues accessing your purchased content, please contact our support team immediately
                            at <a href="mailto:info@aaa-accreditation.org" className="text-blue-600 hover:underline">info@aaa-accreditation.org</a>
                            for assistance. Technical issues do not automatically qualify for a refund but we will work diligently to resolve them.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
