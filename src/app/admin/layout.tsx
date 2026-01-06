import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-primary-foreground p-6">
                <h2 className="text-2xl font-bold mb-8">Admin Portal</h2>
                <nav className="space-y-4">
                    <Link href="/admin" className="block hover:underline">Dashboard</Link>
                    <Link href="/admin/artworks" className="block hover:underline">Manage Artworks</Link>
                    <Link href="/admin/orders" className="block hover:underline">Orders</Link>
                    <Link href="/admin/bookings" className="block hover:underline">Bookings</Link>
                    <div className="pt-8 border-t border-primary-foreground/20">
                        <Link href="/" className="block hover:underline text-sm">Back to Site</Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
