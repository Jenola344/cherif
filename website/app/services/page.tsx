import Link from 'next/link';
import { Palette, Home, PenTool, ArrowRight, Monitor, Sparkles } from 'lucide-react';
import Image from 'next/image';

const services = [
    {
        id: 'interior',
        title: 'Interior Decoration',
        description: 'Our expert designers help you transform your space with bespoke art curation and tailored interior solutions.',
        icon: Home,
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000',
        href: '/services/interior'
    },
    {
        id: 'visualizer',
        title: 'Paint Your Room',
        description: 'Visualize how our artworks will look on your walls with our advanced digital room visualizer tool.',
        icon: Monitor,
        image: 'https://images.unsplash.com/photo-1594913785162-e678ac0570b2?q=80&w=1000',
        href: '/services/visualizer'
    },
    {
        id: 'custom',
        title: 'Custom Commissions',
        description: 'Collaborate with our portfolio of artists to create a unique piece specifically designed for your vision.',
        icon: PenTool,
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000',
        href: '/services/custom'
    }
];

export default function ServicesPage() {
    return (
        <div className="bg-background min-h-screen">
            {/* Header */}
            <section className="bg-primary py-24 text-white">
                <div className="container px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Expert Services</h1>
                    <p className="text-secondary/80 max-w-2xl mx-auto font-light text-xl italic">
                        Elevating your environment through art, technology, and design.
                    </p>
                </div>
            </section>

            {/* List */}
            <section className="py-24">
                <div className="container px-4">
                    <div className="space-y-32">
                        {services.map((service, index) => (
                            <div key={service.id} className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="flex-1 w-full relative aspect-square rounded-2xl overflow-hidden shadow-2xl group">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors"></div>
                                </div>
                                <div className="flex-1 space-y-8">
                                    <div className="h-16 w-16 bg-primary/5 text-primary rounded-full flex items-center justify-center">
                                        <service.icon className="h-8 w-8" />
                                    </div>
                                    <h2 className="text-4xl font-display font-bold text-primary">{service.title}</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>
                                    <Link
                                        href={service.href}
                                        className="inline-flex items-center space-x-3 bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
                                    >
                                        <span>Discover More</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to action */}
            <section className="py-24 bg-muted/30">
                <div className="container px-4">
                    <div className="bg-white rounded-[3rem] p-12 md:p-20 text-center shadow-sm border border-border/50 relative overflow-hidden">
                        <Sparkles className="absolute -top-10 -right-10 h-40 w-40 text-secondary/10" />
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 relative z-10 text-primary">Need a personalized consultation?</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
                            Our design experts are available for virtual and on-site visits to help you curate the perfect collection.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block border-2 border-primary text-primary px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all"
                        >
                            Speak to an Expert
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
