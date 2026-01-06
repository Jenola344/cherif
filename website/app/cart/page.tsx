'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    if (items.length === 0) {
        return (
            <div className="container px-4 py-32 text-center">
                <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                    <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <h1 className="text-4xl font-display font-bold mb-6">Your cart is empty</h1>
                <p className="text-muted-foreground mb-12 max-w-md mx-auto italic font-light">
                    It looks like you haven't added any masterpieces to your collection yet.
                </p>
                <Link
                    href="/gallery"
                    className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 inline-block"
                >
                    Browse Gallery
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen py-20">
            <div className="container px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <Link
                            href="/gallery"
                            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mb-6 transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-3 w-3" /> Back to Shopping
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-display font-bold">Shopping Cart</h1>
                    </div>
                    <p className="text-muted-foreground font-light italic mt-4 md:mt-0">
                        {totalItems} masterpieces in your selection
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-8">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row items-start sm:items-center p-6 border border-border/50 rounded-2xl bg-white hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/5"
                            >
                                <div className="relative h-32 w-full sm:w-32 bg-muted rounded-lg overflow-hidden shrink-0 mb-6 sm:mb-0">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="sm:ml-8 flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-display font-bold text-xl">{item.title}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-muted-foreground hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                                        <span className="bg-muted px-2 py-1 rounded">Size: {item.size}</span>
                                        <span className="bg-muted px-2 py-1 rounded">Frame: {item.frame}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center border border-border rounded-full p-1 bg-muted/30">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="w-10 text-center font-bold text-sm tracking-tighter">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                        <span className="text-xl font-display font-bold text-primary">
                                            ${item.price * item.quantity}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-muted/30 border border-border rounded-2xl p-8 sticky top-32">
                            <h2 className="text-2xl font-display font-bold mb-8">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-bold font-display text-lg">${totalPrice}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-secondary font-bold uppercase tracking-tighter">Calculated at Checkout</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Originality Certified</span>
                                    <span className="text-green-600 font-bold uppercase tracking-tighter text-[10px]">Free</span>
                                </div>
                            </div>

                            <div className="border-t border-border pt-6 mb-10">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-3xl font-display font-bold text-primary">${totalPrice}</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider italic font-light">
                                    Tax included in displayed prices
                                </p>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] inline-block text-center shadow-xl shadow-primary/20"
                            >
                                Proceed to Checkout
                            </Link>

                            <div className="mt-8 flex items-center justify-center space-x-4 opacity-40">
                                <div className="h-8 w-12 bg-gray-400 rounded-md" /> {/* Card icon placeholder */}
                                <div className="h-8 w-12 bg-gray-400 rounded-md" /> {/* Card icon placeholder */}
                                <div className="h-8 w-12 bg-gray-400 rounded-md" /> {/* Card icon placeholder */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
