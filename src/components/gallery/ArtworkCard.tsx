'use client'

import Image from 'next/image';
import type { Artwork } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ArtworkCardProps {
  artwork: Artwork;
  onArtworkClick?: (artwork: Artwork) => void;
  className?: string;
}

export default function ArtworkCard({ artwork, onArtworkClick, className }: ArtworkCardProps) {
  const handleCardClick = () => {
    if (onArtworkClick) {
      onArtworkClick(artwork);
    }
  };

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${artwork.title}`}
    >
      <Image
        src={artwork.imageUrl}
        alt={artwork.title}
        width={500}
        height={625}
        className="object-cover w-full h-auto aspect-[4/5] transition-transform duration-300 group-hover:scale-105"
        data-ai-hint={artwork.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h4 className="text-sm font-bold text-white truncate">{artwork.title}</h4>
        <p className="text-xs text-white/80">{artwork.category}</p>
      </div>
    </div>
  );
}
