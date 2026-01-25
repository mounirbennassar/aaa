export default function SitemapPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#13558D] mb-8 font-['Playfair_Display']">Sitemap</h1>
                <div className="bg-white rounded-xl shadow-sm p-8 text-gray-700">
                    <p className="mb-6">Overview of the website structure.</p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4 text-[#13558D]">Main Pages</h3>
                            <ul className="space-y-2 text-blue-600">
                                <li><a href="/" className="hover:underline">Home</a></li>
                                <li><a href="/courses" className="hover:underline">Training Programs</a></li>
                                <li><a href="/webinars" className="hover:underline">Webinars</a></li>
                                <li><a href="/speakers" className="hover:underline">Speakers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4 text-[#13558D]">Legal & Support</h3>
                            <ul className="space-y-2 text-blue-600">
                                <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
                                <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
                                <li><a href="/refund-policy" className="hover:underline">Refund Policy</a></li>
                                <li><a href="/accessibility" className="hover:underline">Accessibility</a></li>
                                <li><a href="/faq" className="hover:underline">FAQ</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
