import Logo from '@/components/Logo';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start space-y-4">
            <Logo className="h-10" />
            <p className="text-sm text-muted-foreground">
              Elegant Art & Interior Design for the Modern Lifestyle.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-2">
            <div>
              <h3 className="font-headline text-lg font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li><Link href="/gallery" className="text-sm text-muted-foreground hover:text-primary">Gallery</Link></li>
                <li><Link href="/our-service" className="text-sm text-muted-foreground hover:text-primary">Our Service</Link></li>
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Shipping</Link></li>
              </ul>
            </div>
             <div>
              <h3 className="font-headline text-lg font-semibold mb-4">Follow Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Instagram</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Pinterest</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-border/50" />
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cherif's Gallery. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
