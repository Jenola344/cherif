'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { CartItem } from '@/lib/types';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    let message = "New Order from Cherif's Gallery:\n\n";
    items.forEach(item => {
      message += `----------------------------------------\n`;
      message += `Product: ${item.title}\n`;
      message += `Size: ${item.size}\n`;
      message += `Frame: ${item.frame}\n`;
      message += `Quantity: ${item.quantity}\n`;
      message += `Price: $${item.price.toFixed(2)}\n`;
      message += `Image: ${item.imageUrl}\n`;
    });
    message += `----------------------------------------\n`;
    message += `TOTAL: $${cartTotal.toFixed(2)}\n`;

    const customLink = "https://your-custom-checkout-link.com"; // To be replaced
    const encodedMessage = encodeURIComponent(message);
    
    router.push(`${customLink}?order=${encodedMessage}`);
    // clearCart(); // Optionally clear cart after redirecting
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-24 text-center">
        <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-headline">Your Cart is Empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added any art yet.</p>
        <Button asChild className="mt-6">
          <Link href="/gallery">Start Exploring</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-headline mb-8">Your Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item: CartItem) => (
            <div key={item.id} className="flex items-start gap-4 bg-secondary/20 p-4 rounded-lg flex-col sm:flex-row">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={100}
                height={125}
                className="rounded-md object-cover w-full sm:w-24 h-48 sm:h-32"
                data-ai-hint={item.imageHint}
              />
              <div className="flex-grow">
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-muted-foreground">{item.size}, {item.frame}</p>
                <p className="text-lg font-bold text-primary mt-2">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 self-center sm:self-auto">
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-bold">{item.quantity}</span>
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
                 <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="ml-2">
                  <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-secondary/20 p-6 rounded-lg sticky top-28">
            <h2 className="text-2xl font-headline mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Button size="lg" className="w-full mt-6" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
