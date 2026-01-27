import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Palette, PenTool, ImageIcon, Send } from "lucide-react";
import Image from "next/image";

export default function CustomCommissionsPage() {
    return (
        <div className="bg-[#FDFCFB] min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2000"
                    alt="Artist Palette"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="container relative z-10 px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-primary mb-6">Custom Commissions</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
                        Bring your unique vision to life through a bespoke masterpiece created specifically for your space.
                    </p>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 bg-white">
                <div className="container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Palette className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-primary">1. Conceptualize</h3>
                            <p className="text-muted-foreground font-light">
                                Share your ideas, preferred color palettes, and style inspirations. We'll discuss the scale and medium that best fits your vision.
                            </p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <PenTool className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-primary">2. Refine</h3>
                            <p className="text-muted-foreground font-light">
                                Our artists will provide sketches and digital concepts for your approval, ensuring the direction aligns perfectly with your expectations.
                            </p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ImageIcon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-primary">3. Create</h3>
                            <p className="text-muted-foreground font-light">
                                Watch as your artwork comes to life. We provide periodic updates throughout the creative process until the final reveal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section className="py-24">
                <div className="container px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-1/2 relative bg-primary p-12 text-white flex flex-col justify-center">
                            <h2 className="text-4xl font-display font-bold mb-6">Start Your Journey</h2>
                            <p className="text-primary-foreground/80 mb-8 font-light leading-relaxed">
                                Complete the form and our curation team will contact you within 48 hours to discuss your project in detail.
                            </p>
                            <div className="space-y-4 text-sm">
                                <p className="opacity-70 italic">"Art is not what you see, but what you make others see."</p>
                                <p className="font-bold">— Edgar Degas</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 p-12">
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                                    <Input placeholder="John Doe" className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                                    <Input type="email" placeholder="john@example.com" className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Budget Range (Optional)</label>
                                    <Input placeholder="₦500,000 - ₦2,000,000" className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Project Details</label>
                                    <Textarea placeholder="Tell us about your vision..." className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all min-h-[120px]" />
                                </div>
                                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-lg font-bold group">
                                    Submit Inquiry
                                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
