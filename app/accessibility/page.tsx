export default function AccessibilityPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#13558D] mb-8 font-['Playfair_Display']">Accessibility Statement</h1>

                <div className="bg-white rounded-xl shadow-sm p-8 space-y-6 text-gray-700">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
                        <p className="mb-4">
                            AAA Academy is committed to ensuring digital accessibility for people with disabilities.
                            We are continually improving the user experience for everyone and keeping up to date with
                            relevant accessibility standards.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Measures to Support Accessibility</h2>
                        <p className="mb-4">
                            We take the following measures to ensure accessibility:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Include accessibility as part of our internal policies.</li>
                            <li>Integrate accessibility into our procurement practices.</li>
                            <li>Provide continual accessibility training for our staff.</li>
                            <li>Assign clear accessibility targets and responsibilities.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Conformance Status</h2>
                        <p className="mb-4">
                            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers
                            to improve accessibility for people with disabilities. It defines three levels of conformance:
                            Level A, Level AA, and Level AAA. AAA Academy is partially conformant with WCAG 2.1 level AA.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Feedback</h2>
                        <p>
                            We welcome your feedback on the accessibility of AAA Academy. Please let us know if you encounter
                            accessibility barriers:<br />
                            <br />
                            E-mail: <a href="mailto:info@aaa-accreditation.org" className="text-blue-600 hover:underline">info@aaa-accreditation.org</a><br />
                            Phone: +1 (571) 601 2616
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
