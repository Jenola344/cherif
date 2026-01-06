export default function TermsPage() {
    return (
        <div className="bg-[#FDFCFB] min-h-screen py-24">
            <div className="container px-4 max-w-4xl mx-auto">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">Terms of Service</h1>
                    <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Last Updated: January 2026</p>
                </header>

                <div className="prose prose-brown max-w-none space-y-12 text-muted-foreground leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-display font-bold text-primary">1. Terms</h2>
                        <p>
                            By accessing the website at Cherif Gallery, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-display font-bold text-primary">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily download one copy of the materials (information or software) on Cherif Gallery's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Modify or copy the materials.</li>
                            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).</li>
                            <li>Attempt to decompile or reverse engineer any software contained on Cherif Gallery's website.</li>
                            <li>Remove any copyright or other proprietary notations from the materials.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-display font-bold text-primary">3. Disclaimer</h2>
                        <p>
                            The materials on Cherif Gallery's website are provided on an 'as is' basis. Cherif Gallery makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-display font-bold text-primary">4. Limitations</h2>
                        <p>
                            In no event shall Cherif Gallery or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Cherif Gallery's website, even if Cherif Gallery or a Cherif Gallery authorized representative has been notified orally or in writing of the possibility of such damage.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-display font-bold text-primary">5. Governing Law</h2>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of Nigeria and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
