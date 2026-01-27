import { prisma } from '@/lib/prisma';
import { ShoppingBag, User, Mail, Calendar, CreditCard, Tag } from 'lucide-react';

async function getOrders() {
    return await prisma.order.findMany({
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

export default async function AdminOrdersPage() {
    const orders = await getOrders();

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-display font-bold text-primary mb-2">Order Management</h1>
                    <p className="text-muted-foreground font-light">Track and manage every acquisition in your gallery.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {orders.length === 0 ? (
                    <div className="bg-white p-20 rounded-[2rem] border border-border/50 text-center">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground/20 mx-auto mb-6" />
                        <h3 className="text-xl font-display font-bold text-muted-foreground">No orders found yet</h3>
                    </div>
                ) : (
                    orders.map((order: any) => (
                        <div key={order.id} className="bg-white rounded-[2rem] border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-8 md:p-10">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-14 w-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
                                            <ShoppingBag className="h-7 w-7" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Order Reference</p>
                                            <p className="font-display font-bold text-xl text-primary">#{order.id.slice(0, 8)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-8">
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</p>
                                            <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mt-1 ${order.status === 'PAID' ? 'bg-green-100 text-green-700' :
                                                order.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-muted text-muted-foreground'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="text-right border-l border-border pl-8">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Amount</p>
                                            <p className="text-2xl font-display font-bold text-primary">₦{order.totalAmount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center">
                                            <User className="h-3 w-3 mr-2" /> Customer Details
                                        </h4>
                                        <div className="space-y-3">
                                            <p className="font-bold text-sm">{order.customerName}</p>
                                            <p className="text-sm text-muted-foreground flex items-center">
                                                <Mail className="h-3.5 w-3.5 mr-2" /> {order.customerEmail}
                                            </p>
                                            <p className="text-sm text-muted-foreground flex items-center">
                                                <Calendar className="h-3.5 w-3.5 mr-2" /> {order.createdAt.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-6 col-span-2">
                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center">
                                            <Tag className="h-3 w-3 mr-2" /> Artworks Acquired
                                        </h4>
                                        <div className="grid grid-cols-1 gap-4">
                                            {order.items.map((item: any) => (
                                                <div key={item.id} className="flex items-center justify-between bg-muted/30 p-4 rounded-xl">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="h-12 w-12 bg-white rounded-lg overflow-hidden border border-border/50 relative">
                                                            {item.artwork.imageUrl && <img src={item.artwork.imageUrl} className="object-cover w-full h-full" />}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm">{item.artwork.title}</p>
                                                            <p className="text-[10px] text-muted-foreground uppercase">{item.size} • Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-bold text-sm text-primary">₦{item.price.toLocaleString()}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted/50 px-8 py-4 border-t border-border/50 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                                <div className="flex items-center space-x-6">
                                    <span className="flex items-center"><CreditCard className="h-3 w-3 mr-2" /> Payment Ref: {order.paymentRef || 'N/A'}</span>
                                </div>
                                <div className="flex space-x-6 mt-4 md:mt-0">
                                    <button className="hover:text-primary transition-colors">Ship Order</button>
                                    <button className="hover:text-primary transition-colors text-red-400">Cancel</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
