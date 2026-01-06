'use client';

import { useCart } from '@/context/CartContext';
import { processCheckout } from '@/app/actions';
import { useState } from 'react';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
    const { items, totalPrice, totalItems } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
            const result = await processCheckout(formData, items, totalPrice);
            if (result.success && result.checkoutUrl) {
                window.location.href = result.checkoutUrl;
            } else {
                setError(result.error || "Something went wrong. Please try again.");
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="container py-32 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Link href="/gallery" className="text-primary hover:underline">Return to gallery</Link>
            </div>
        );
    }

    return (
        <div className="bg-[#F9F7F2] min-h-screen py-20">
            <div className="container px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                    {/* Form */}
                    <div>
                        <Link href="/cart" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mb-12">
                            <ArrowLeft className="mr-2 h-3 w-3" /> Back to Cart
                        </Link>

                        <h1 className="text-4xl font-display font-bold mb-10 tracking-tight">Checkout</h1>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <section className="bg-white p-8 rounded-2xl border border-border/50">
                                <h2 className="text-xl font-display font-bold mb-6 flex items-center">
                                    <span className="bg-primary text-white h-6 w-6 rounded-full text-[10px] flex items-center justify-center mr-3 font-body">1</span>
                                    Contact Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                                        <input name="name" required className="w-full bg-muted/30 border-none rounded-lg p-3 text-sm" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                                        <input name="email" type="email" required className="w-full bg-muted/30 border-none rounded-lg p-3 text-sm" placeholder="john@example.com" />
                                    </div>
                                </div>
                            </section>

                            <section className="bg-white p-8 rounded-2xl border border-border/50">
                                <h2 className="text-xl font-display font-bold mb-6 flex items-center">
                                    <span className="bg-primary text-white h-6 w-6 rounded-full text-[10px] flex items-center justify-center mr-3 font-body">2</span>
                                    Delivery Address
                                </h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Street Address</label>
                                        <input name="address" required className="w-full bg-muted/30 border-none rounded-lg p-3 text-sm" placeholder="123 Gallery Lane" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">City</label>
                                            <input name="city" required className="w-full bg-muted/30 border-none rounded-lg p-3 text-sm" placeholder="Lagos" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                                            <input name="phone" required className="w-full bg-muted/30 border-none rounded-lg p-3 text-sm" placeholder="+234 ..." />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {error && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 italic">
                                    {error}
                                </div>
                            )}

                            <button
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:scale-[1.02] shadow-2xl shadow-primary/30 flex items-center justify-center disabled:opacity-50"
                            >
                                {loading ? "Processing..." : (
                                    <>
                                        <Lock className="h-4 w-4 mr-2" /> Pay ${totalPrice} Securely
                                    </>
                                )}
                            </button>

                            <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center">
                                <ShieldCheck className="h-3 w-3 mr-1 text-green-600" />
                                Secure payment powered by Monnify. Your data is protected.
                            </p>
                        </form>
                    </div>

                    {/* Right Summary */}
                    <div className="hidden lg:block">
                        <div className="bg-white border border-border/50 rounded-2xl p-10 sticky top-32">
                            <h2 className="text-2xl font-display font-bold mb-8">Selection Summary</h2>
                            <div className="space-y-6 mb-10 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                                {items.map(item => (
                                    <div key={item.id} className="flex space-x-4">
                                        <div className="relative h-20 w-20 overflow-hidden rounded-lg shrink-0">
                                            <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                                            <p className="text-[10px] text-muted-foreground uppercase">{item.size} • {item.frame}</p>
                                            <p className="text-xs font-bold mt-1 text-primary">{item.quantity} x ${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-border pt-8">
                                <div className="flex justify-between text-sm text-muted-foreground uppercase tracking-widest font-bold">
                                    <span>Subtotal</span>
                                    <span>${totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground uppercase tracking-widest font-bold">
                                    <span>Shipping</span>
                                    <span className="text-secondary tracking-tighter">FREE</span>
                                </div>
                                <div className="flex justify-between text-2xl font-display font-bold text-primary pt-4">
                                    <span>Total</span>
                                    <span>${totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
