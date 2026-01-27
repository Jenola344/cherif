import Image from 'next/image';
import { ArrowRight, Award, Gem, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="bg-background min-h-screen">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-primary">
                <div
                    className="absolute inset-0 opacity-30 bg-cover bg-fixed grayscale"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2000')" }}
                />
                <div className="relative z-10 text-center px-4">
                    <span className="text-secondary font-display italic text-xl mb-4 block tracking-wider">Since 1994</span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">The Legacy of Cherif</h1>
                </div>
            </section>

            {/* Narrative */}
            <section className="py-24">
                <div className="container px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000"
                                alt="Interior Design"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary">Curating Sophistication</h2>
                            <p className="text-lg text-muted-foreground font-light leading-relaxed italic">
                                "Art is not what you see, but what you make others see." — Edgar Degas
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Founded in the heart of the artistic movement, Cherif Gallery has spent over three decades bridging the gap between historical mastery and contemporary innovation. Our mission is to transform spaces into living galleries, where every piece tells a story of heritage, culture, and refined taste.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-6">
                                <div className="space-y-2">
                                    <p className="text-3xl font-display font-bold text-primary">500+</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Original Pieces</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-3xl font-display font-bold text-primary">12k</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Happy Collectors</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-muted/30">
                <div className="container px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold mb-4">Our Core Philosophy</h2>
                        <div className="h-1 w-20 bg-secondary mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: Award, title: "Authenticity", text: "Every piece in our collection is strictly vetted and comes with a certified Certificate of Authenticity." },
                            { icon: Gem, title: "Exclusivity", text: "We partner with artists to bring you unique acquisitions that won't be found in mass-market retail." },
                            { icon: Users, title: "Consultancy", text: "Our curators work individually with you to find pieces that resonate with your personal style and space." }
                        ].map((v, i) => (
                            <div key={i} className="bg-white p-10 rounded-2xl border border-border/50 text-center hover:shadow-xl transition-all">
                                <div className="h-16 w-16 bg-primary/5 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                    <v.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-display font-bold mb-4">{v.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team/Founder */}
            <section className="py-24">
                <div className="container px-4 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-display font-bold mb-8 italic">"Our goal is to make fine art accessible to everyone who values the soul of a space."</h2>
                        <Link href="/gallery" className="inline-flex items-center text-primary font-bold uppercase tracking-widest border-b-2 border-primary pb-2 hover:opacity-70 transition-opacity">
                            Explore the Collection <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
