'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        // Mock submission
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    return (
        <div className="bg-background min-h-screen">
            {/* Hero */}
            <section className="bg-muted py-24">
                <div className="container px-4 text-center">
                    <h1 className="text-5xl font-display font-bold mb-6">Contact Us</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        Whether you're looking for a specific piece, need a consultation, or just want to say hello, we'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="container px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Info */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-display font-bold mb-8">Get in Touch</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Our gallery is located in the vibrant Victorian Island district. We welcome walk-ins and private appointments.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-6">
                                    <div className="h-12 w-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-1">Our Gallery</h4>
                                        <p className="text-muted-foreground text-sm">12 Admiralty Way, Lekki Phase 1,<br />Lagos, Nigeria</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="h-12 w-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-1">Call Us</h4>
                                        <p className="text-muted-foreground text-sm">+234 (0) 800 CHERIF<br />+234 (0) 901 234 5678</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="h-12 w-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-1">Email Us</h4>
                                        <p className="text-muted-foreground text-sm">inquiry@cherifgallery.com<br />concierge@cherifgallery.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-border">
                                <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Opening Hours</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="font-bold">Mon - Fri</p>
                                        <p className="text-muted-foreground">09:00 AM - 07:00 PM</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Sat - Sun</p>
                                        <p className="text-muted-foreground">11:00 AM - 05:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white p-12 rounded-[2rem] shadow-2xl shadow-primary/5 border border-border/50">
                            {status === 'success' ? (
                                <div className="text-center py-20 space-y-6">
                                    <div className="h-20 w-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle2 className="h-10 w-10" />
                                    </div>
                                    <h3 className="text-3xl font-display font-bold text-primary">Message Sent</h3>
                                    <p className="text-muted-foreground">Thank you for reaching out. One of our curators will contact you within 24 hours.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="text-primary font-bold uppercase tracking-widest text-xs border-b-2 border-primary pb-1"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                                            <input required type="text" className="w-full bg-muted/30 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                                            <input required type="email" className="w-full bg-muted/30 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Subject / Service</label>
                                        <select className="w-full bg-muted/30 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all">
                                            <option>General Inquiry</option>
                                            <option>Interior Decoration</option>
                                            <option>Room Visualizer Help</option>
                                            <option>Custom Commission</option>
                                            <option>Order Support</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Message</label>
                                        <textarea required rows={5} className="w-full bg-muted/30 border-none rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="How can we help you today?"></textarea>
                                    </div>
                                    <button
                                        disabled={status === 'loading'}
                                        type="submit"
                                        className="w-full bg-primary text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center space-x-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                                    >
                                        {status === 'loading' ? 'Sending...' : (
                                            <>
                                                <span>Send Message</span>
                                                <Send className="h-4 w-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
