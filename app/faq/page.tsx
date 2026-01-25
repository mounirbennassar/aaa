export default function FAQPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#13558D] mb-8 font-['Playfair_Display']">Frequently Asked Questions</h1>

                <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 text-gray-700">
                    <div className="space-y-4">
                        <details className="group border-b border-gray-200 pb-4">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-lg text-[#13558D]">
                                <span>How do I access my course materials?</span>
                                <span className="transition group-open:rotate-180">
                                    <i className="fas fa-chevron-down text-sm"></i>
                                </span>
                            </summary>
                            <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                                Once enrolled, you will receive an email with login credentials to our student portal where you can access all course materials instantly.
                            </p>
                        </details>

                        <details className="group border-b border-gray-200 pb-4">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-lg text-[#13558D]">
                                <span>Are the certificates internationally recognized?</span>
                                <span className="transition group-open:rotate-180">
                                    <i className="fas fa-chevron-down text-sm"></i>
                                </span>
                            </summary>
                            <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                                Yes, AAA Academy certificates are recognized globally and accredited by relevant international bodies depending on the specific program.
                            </p>
                        </details>

                        <details className="group border-b border-gray-200 pb-4">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-lg text-[#13558D]">
                                <span>What is the refund policy?</span>
                                <span className="transition group-open:rotate-180">
                                    <i className="fas fa-chevron-down text-sm"></i>
                                </span>
                            </summary>
                            <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                                Due to the immediate digital nature of our content, all sales are final and non-refundable. Please refer to our <a href="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</a> for more details.
                            </p>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}
