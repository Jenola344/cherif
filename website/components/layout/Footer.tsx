import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Footer() {
    return (
        <footer className="bg-muted py-20 mt-auto">
            <div className="container px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <Logo className="mb-6" />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Curating exceptional art and interior design experiences for modern spaces. Discover pieces that speak to your soul.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-display text-lg font-bold mb-6">Gallery</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/gallery?category=cat-1" className="hover:text-primary transition-colors">Modern Minimalist</Link></li>
                            <li><Link href="/gallery?category=cat-3" className="hover:text-primary transition-colors">Contemporary African</Link></li>
                            <li><Link href="/gallery?category=cat-5" className="hover:text-primary transition-colors">Drawings & Sketches</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display text-lg font-bold mb-6">Services</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/services/interior" className="hover:text-primary transition-colors">Interior Design</Link></li>
                            <li><Link href="/services/visualizer" className="hover:text-primary transition-colors">Room Visualizer</Link></li>
                            <li><Link href="/services/custom" className="hover:text-primary transition-colors">Custom Comissions</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display text-lg font-bold mb-6">Connect</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-muted-foreground uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} CHERIF GALLERY. ALL RIGHTS RESERVED.</p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
