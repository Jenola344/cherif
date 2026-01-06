import Link from 'next/link';
import { LayoutDashboard, Palette, ShoppingBag, Settings, LogOut, ExternalLink } from 'lucide-react';
import Logo from '@/components/Logo';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#FDFCFB]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-border flex flex-col sticky top-0 h-screen">
                <div className="p-8 border-b border-border">
                    <Logo />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mt-2 block">Admin Console</span>
                </div>

                <nav className="flex-grow p-6 space-y-2">
                    <Link href="/admin" className="flex items-center space-x-3 p-3 rounded-xl bg-primary text-white font-bold text-sm transition-all shadow-lg shadow-primary/20">
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/admin/artworks" className="flex items-center space-x-3 p-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-primary transition-all text-sm font-medium">
                        <Palette className="h-5 w-5" />
                        <span>Manage Artworks</span>
                    </Link>
                    <Link href="/admin/orders" className="flex items-center space-x-3 p-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-primary transition-all text-sm font-medium">
                        <ShoppingBag className="h-5 w-5" />
                        <span>Orders</span>
                    </Link>
                </nav>

                <div className="p-6 border-t border-border space-y-2">
                    <Link href="/" target="_blank" className="flex items-center space-x-3 p-3 rounded-xl text-muted-foreground hover:text-primary transition-all text-sm font-medium">
                        <ExternalLink className="h-5 w-5" />
                        <span>Live Site</span>
                    </Link>
                    <button className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all text-sm font-medium">
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-12 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
