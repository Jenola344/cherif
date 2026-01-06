'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string; // unique combination of artwork + size + frame
    artworkId: string;
    title: string;
    price: number;
    size: string;
    frame: string;
    quantity: number;
    imageUrl: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity' | 'id'>) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initial Load - STRICT CLIENT ONLY
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('cherif_cart');
            if (saved) {
                try {
                    setItems(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse cart", e);
                }
            }
            setIsInitialized(true);
        }
    }, []);

    // Save on Change - STRICT CLIENT ONLY
    useEffect(() => {
        if (isInitialized && typeof window !== 'undefined') {
            localStorage.setItem('cherif_cart', JSON.stringify(items));
        }
    }, [items, isInitialized]);

    const addToCart = (newItem: Omit<CartItem, 'quantity' | 'id'>) => {
        const id = `${newItem.artworkId}-${newItem.size}-${newItem.frame}`;

        setItems((prev) => {
            const existing = prev.find((item) => item.id === id);
            if (existing) {
                return prev.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...newItem, id, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
}
