import { prisma } from '@/lib/prisma';
import { ShoppingCart, Palette, Users, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getStats() {
    try {
        const artworkCount = await prisma.artwork.count();
        const orderCount = await prisma.order.count();
        const totalRevenue = await prisma.order.aggregate({
            _sum: { totalAmount: true },
            where: { status: 'PAID' }
        });

        return {
            artworks: artworkCount,
            orders: orderCount,
            revenue: totalRevenue._sum.totalAmount || 0,
        };
    } catch (e) {
        return { artworks: 0, orders: 0, revenue: 0 };
    }
}

export default async function AdminDashboard() {
    const stats = await getStats();

    const cards = [
        { label: 'Total Artworks', value: stats.artworks, icon: Palette, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Total Orders', value: stats.orders, icon: ShoppingCart, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Total Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Active Collectors', value: '12', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-4xl font-display font-bold mb-2">Dashboard Overview</h1>
                <p className="text-muted-foreground italic font-light">Your gallery's performance at a glance.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((card) => (
                    <div key={card.label} className="bg-white p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
                        <div className={`h-12 w-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                            <card.icon className="h-6 w-6" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{card.label}</p>
                        <p className="text-3xl font-display font-bold">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-border/50 p-8">
                    <h2 className="text-xl font-display font-bold mb-8">Recent Orders</h2>
                    <div className="space-y-6">
                        <p className="text-center py-20 text-muted-foreground italic font-light border-2 border-dashed border-muted rounded-xl">
                            No recent orders to display.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-border/50 p-8">
                    <h2 className="text-xl font-display font-bold mb-8">Quick Actions</h2>
                    <div className="space-y-4">
                        <button className="w-full bg-primary text-white p-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all">
                            Add New Artwork
                        </button>
                        <button className="w-full bg-muted text-primary p-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-muted/80 transition-all">
                            Generate Sales Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
