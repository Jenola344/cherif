export default function PrivacyPage() {
    return (
        <div className="bg-[#FDFCFB] min-h-screen py-24">
            <div className="container px-4 max-w-4xl mx-auto">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">Privacy Policy</h1>
                    <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Last Updated: January 2026</p>
                </header>

                <div className="prose prose-brown max-w-none space-y-12 text-muted-foreground leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-display font-bold text-primary">Introduction</h2>
                        <p>
                            Welcome to Cherif Gallery. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-display font-bold text-primary">The Data We Collect</h2>
                        <p>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Identity Data</strong> includes first name, last name, and username.</li>
                            <li><strong>Contact Data</strong> includes email address, telephone numbers, and billing/shipping address.</li>
                            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-display font-bold text-primary">How We Use Your Data</h2>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To register you as a new customer.</li>
                            <li>To process and deliver your order including managing payments, fees and charges.</li>
                            <li>To manage our relationship with you.</li>
                            <li>To enable you to partake in a prize draw, competition or complete a survey.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-display font-bold text-primary">Data Security</h2>
                        <p>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-display font-bold text-primary">Contact Us</h2>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at:
                        </p>
                        <p className="font-bold text-primary italic">privacy@cherif.com</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
