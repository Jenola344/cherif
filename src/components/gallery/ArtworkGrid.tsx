'use client';

import { useState } from 'react';
import type { Artwork } from '@/lib/types';
import ArtworkCard from './ArtworkCard';
import ArtworkDetailModal from './ArtworkDetailModal';

interface ArtworkGridProps {
  artworks: Artwork[];
}

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const openModal = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} onArtworkClick={openModal} />
        ))}
      </div>
      
      <ArtworkDetailModal
        artwork={selectedArtwork}
        isOpen={!!selectedArtwork}
        onClose={closeModal}
      />
    </>
  );
}
