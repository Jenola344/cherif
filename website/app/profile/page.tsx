import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { User, Mail, ShoppingBag, Clock, Package, ChevronRight } from "lucide-react";

async function getUserOrders(userId: string) {
    return await prisma.order.findMany({
        where: { userId },
        include: {
            items: {
                include: {
                    artwork: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login?callback=/profile");
    }

    const userId = (session.user as any).id;
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        redirect("/login");
    }

    const orders = await getUserOrders(userId);

    return (
        <div className="bg-[#FDFCFB] min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Profile Header */}
                <div className="bg-white rounded-[2.5rem] border border-border/50 p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 shadow-sm">
                    <div className="h-32 w-32 bg-primary/5 rounded-full flex items-center justify-center border-4 border-white shadow-xl ring-1 ring-primary/10">
                        <User className="h-16 w-16 text-primary" />
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <h1 className="text-4xl font-display font-bold text-primary">{user.name}</h1>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                            <p className="text-muted-foreground flex items-center justify-center md:justify-start">
                                <Mail className="h-4 w-4 mr-2" /> {user.email}
                            </p>
                            <div className="hidden md:block h-1 w-1 bg-muted-foreground/30 rounded-full" />
                            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
                                Collector since {new Date(user.createdAt).getFullYear()}
                            </p>
                        </div>
                        {user.isAdmin && (
                            <div className="pt-4">
                                <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-primary/20">
                                    Gallery Administrator
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order History */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-2xl font-display font-bold text-primary flex items-center">
                            <ShoppingBag className="h-6 w-6 mr-3 text-secondary" /> Your Acquisitions
                        </h2>
                        <p className="text-sm text-muted-foreground font-light">{orders.length} orders total</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {orders.length === 0 ? (
                            <div className="bg-white rounded-[2rem] border border-dashed border-border p-20 text-center">
                                <Package className="h-12 w-12 text-muted-foreground/20 mx-auto mb-6" />
                                <h3 className="text-xl font-display font-bold text-muted-foreground">No orders yet</h3>
                                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">Start your collection by exploring our curated gallery.</p>
                                <a href="/gallery" className="inline-block mt-8 text-primary font-bold uppercase tracking-widest text-xs hover:underline underline-offset-8 transition-all">Explore Gallery</a>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-3xl border border-border/50 overflow-hidden hover:shadow-md transition-all group">
                                    <div className="p-8">
                                        <div className="flex flex-col md:flex-row justify-between mb-8 gap-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-12 w-12 bg-muted/50 rounded-2xl flex items-center justify-center">
                                                    <Clock className="h-6 w-6 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Order Ref</p>
                                                    <p className="font-display font-bold text-lg text-primary">#{order.id.slice(0, 8)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-8">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right mb-1">Status</p>
                                                    <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'PAID' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                                                                'bg-muted text-muted-foreground'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="border-l border-border pl-8 text-right">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Amount</p>
                                                    <p className="text-xl font-display font-bold text-primary">₦{order.totalAmount.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center justify-between py-3">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="h-10 w-10 bg-muted/30 rounded-lg overflow-hidden border border-border/30">
                                                            {item.artwork.imageUrl && <img src={item.artwork.imageUrl} className="w-full h-full object-cover" />}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm text-primary">{item.artwork.title}</p>
                                                            <p className="text-[10px] text-muted-foreground uppercase opacity-70">{item.size} • Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-muted/30 px-8 py-3 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 border-t border-border/30">
                                        <span>Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                                        <span>{order.paymentRef || 'Standard Transaction'}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
