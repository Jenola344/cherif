'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ArtworkPurchaseProps {
    artwork: {
        id: string;
        title: string;
        imageUrl: string;
        prices: Record<string, number>;
        availableSizes: string[];
    };
}

export default function ArtworkPurchase({ artwork }: ArtworkPurchaseProps) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState(artwork.availableSizes[0]);
    const [selectedFrame, setSelectedFrame] = useState('none');
    const [isAdding, setIsAdding] = useState(false);

    const price = artwork.prices[selectedSize] || 0;
    const framePrice = selectedFrame === 'wood' ? 50 : selectedFrame === 'black' ? 40 : 0;
    const totalPrice = price + framePrice;

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart({
            artworkId: artwork.id,
            title: artwork.title,
            imageUrl: artwork.imageUrl,
            price: totalPrice,
            size: selectedSize,
            frame: selectedFrame
        });
        setTimeout(() => setIsAdding(false), 1500);
    };

    return (
        <div className="space-y-8">
            <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-4">Select Size</label>
                <div className="grid grid-cols-3 gap-3">
                    {artwork.availableSizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`py-3 px-4 border text-sm font-medium transition-all ${selectedSize === size
                                    ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'border-border bg-white text-muted-foreground hover:border-primary/30'
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-4">Frame Options</label>
                <div className="space-y-3">
                    {[
                        { id: 'none', label: 'No Frame', price: 0 },
                        { id: 'wood', label: 'Premium Oak Wood', price: 50 },
                        { id: 'black', label: 'Sleek Black Matte', price: 40 },
                    ].map((frame) => (
                        <button
                            key={frame.id}
                            onClick={() => setSelectedFrame(frame.id)}
                            className={`w-full flex justify-between items-center p-4 border transition-all ${selectedFrame === frame.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border bg-white hover:border-primary/20'
                                }`}
                        >
                            <div className="flex items-center">
                                <div className={`h-4 w-4 rounded-full border flex items-center justify-center mr-3 ${selectedFrame === frame.id ? 'border-primary bg-primary' : 'border-border'
                                    }`}>
                                    {selectedFrame === frame.id && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                                </div>
                                <span className="text-sm font-medium">{frame.label}</span>
                            </div>
                            <span className="text-xs font-bold">
                                {frame.price === 0 ? 'FREE' : `+$${frame.price}`}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-border flex items-end justify-between">
                <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Total Price</span>
                    <span className="text-4xl font-display font-bold text-primary">${totalPrice}</span>
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest flex items-center transition-all active:scale-95 disabled:opacity-70"
                >
                    {isAdding ? (
                        <>
                            <Check className="mr-2 h-4 w-4" /> Added
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
