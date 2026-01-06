'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { useState } from 'react';
import Logo from '@/components/Logo';
import { useCart } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { totalItems } = useCart();
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
            <div className="container px-4 h-20 flex items-center justify-between">
                <Link href="/">
                    <Logo />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-5">
                    <div className="hidden lg:flex items-center bg-muted/30 rounded-full px-4 py-2 border border-border/50 focus-within:border-primary/30 transition-all">
                        <Search className="h-4 w-4 text-muted-foreground mr-2" />
                        <input
                            type="text"
                            placeholder="Search artworks..."
                            className="bg-transparent border-none text-xs focus:ring-0 w-32 focus:w-48 transition-all"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    window.location.href = `/gallery?search=${(e.target as HTMLInputElement).value}`;
                                }
                            }}
                        />
                    </div>
                    <button className="lg:hidden text-muted-foreground hover:text-primary transition-colors">
                        <Search className="h-5 w-5" />
                    </button>
                    <Link href="/cart" className="relative text-muted-foreground hover:text-primary transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {session ? (
                        <div className="flex items-center space-x-4">
                            <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                                <User className="h-5 w-5" />
                            </Link>
                            {(session?.user as any)?.isAdmin && (
                                <Link href="/admin" className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 hidden lg:block"> Admin </Link>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
                            Sign In
                        </Link>
                    )}

                    <button
                        className="md:hidden text-primary"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-background border-b border-border pb-6 px-4">
                    <nav className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`text-lg font-medium ${pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
