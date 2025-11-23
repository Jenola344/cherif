'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Artwork } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArtworkDetailModal({ artwork, isOpen, onClose }: ArtworkDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedFrame, setSelectedFrame] = useState<'Unframed' | 'Framed'>('Unframed');
  const { addToCart } = useCart();

  // Reset state when artwork changes or modal opens
  useEffect(() => {
    if (artwork) {
      setSelectedSize(artwork.availableSizes[0]);
      setSelectedFrame('Unframed');
    }
  }, [artwork]);
  
  const currentPrice = useMemo(() => {
    if (!artwork || !selectedSize) return 0;
    let price = artwork.prices[selectedSize] || 0;
    if (selectedFrame === 'Framed') {
      price += 50; // Add a flat fee for framing
    }
    return price;
  }, [artwork, selectedSize, selectedFrame]);

  if (!artwork) return null;

  const handleAddToCart = () => {
    addToCart({
      artworkId: artwork.id,
      title: artwork.title,
      imageUrl: artwork.imageUrl,
      imageHint: artwork.imageHint,
      size: selectedSize,
      frame: selectedFrame,
      price: currentPrice,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-96 md:h-auto min-h-[400px]">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              data-ai-hint={artwork.imageHint}
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-3xl font-headline">{artwork.title}</DialogTitle>
              <DialogDescription className="text-base pt-2">{artwork.description}</DialogDescription>
            </DialogHeader>
            <Separator className="my-6" />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {artwork.availableSizes.map(size => (
                      <SelectItem key={size} value={size}>{size}{!size.toLowerCase().includes('size') && ' inches'}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Frame</Label>
                <RadioGroup
                  defaultValue="Unframed"
                  className="flex items-center space-x-4 pt-2"
                  value={selectedFrame}
                  onValueChange={(value: 'Unframed' | 'Framed') => setSelectedFrame(value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Unframed" id="r1" />
                    <Label htmlFor="r1">Unframed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Framed" id="r2" />
                    <Label htmlFor="r2">Framed (+$50)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex-grow"></div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl font-bold font-headline text-primary">
                  ${currentPrice.toFixed(2)}
                </span>
              </div>
              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
