import Image from 'next/image';
import { Home, Ruler, Compass, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function InteriorPage() {
    return (
        <div className="bg-background min-h-screen">
            <section className="relative h-[80vh] py-5 flex items-center overflow-hidden">
                <div className="container px-4 relative z-10">
                    <div className="max-w-2xl bg-white/10 backdrop-blur-xl p-12 md:p-20 rounded-[3rem] border border-white/20 shadow-2xl">
                        <span className="text-secondary font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Bespoke Curation</span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-[0.9]">Elevating Every Corner</h1>
                        <p className="text-lg text-white/80 font-light mb-10 leading-relaxed max-w-lg">
                            We don't just sell art; we craft environments that inspire emotions and reflect your unique narrative.
                        </p>
                        <Link href="/contact" className="inline-flex items-center space-x-4 bg-secondary text-primary px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
                            <span>Book Consultation</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000"
                        alt="Modern Interior"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-primary/40"></div>
                </div>
            </section>

            <section className="py-24">
                <div className="container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            { icon: Ruler, title: 'Space Analysis', text: 'We evaluate your room dimensions, lighting conditions, and existing furniture to select the perfect scale.' },
                            { icon: Compass, title: 'Palette Design', text: 'Our curators create a cohesive color story that balances artistic impact with your interior theme.' },
                            { icon: Home, title: 'Installation', text: 'Professional hanging and placement to ensure every piece is displayed at its absolute best.' }
                        ].map((s, i) => (
                            <div key={i} className="space-y-6">
                                <div className="h-16 w-16 bg-primary text-white rounded-[2rem] flex items-center justify-center shadow-lg shadow-primary/20">
                                    <s.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-primary">{s.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {s.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-muted/30">
                <div className="container px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-primary">The Cherif Standard</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                                Our interior decoration team works with architects and homeowners globally to bring a sense of curated luxury to residential and commercial spaces. From single-room updates to full-scale mansion projects.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4 justify-center lg:justify-start">
                                    <Sparkles className="h-5 w-5 text-secondary" />
                                    <span className="font-bold text-sm uppercase tracking-widest">Hand-picked selections</span>
                                </div>
                                <div className="flex items-center space-x-4 justify-center lg:justify-start text-muted-foreground">
                                    <Sparkles className="h-5 w-5 text-secondary/40" />
                                    <span className="font-bold text-sm uppercase tracking-widest">Global shipping & handling</span>
                                </div>
                                <div className="flex items-center space-x-4 justify-center lg:justify-start text-muted-foreground">
                                    <Sparkles className="h-5 w-5 text-secondary/40" />
                                    <span className="font-bold text-sm uppercase tracking-widest">Post-installation support</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-12">
                                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image src="https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=800" alt="Detail 1" fill className="object-cover" />
                                </div>
                                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
                                    <Image src="https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?q=80&w=800" alt="Detail 2" fill className="object-cover" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
                                    <Image src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=800" alt="Detail 3" fill className="object-cover" />
                                </div>
                                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image src="https://images.unsplash.com/photo-1618221651343-8f0a28f80695?q=80&w=800" alt="Detail 4" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
