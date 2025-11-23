import Link from 'next/link';
import type { Category, Artwork } from '@/lib/types';
import { getArtworks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import ArtworkCard from './ArtworkCard';

interface GalleryCategoryPreviewProps {
  category: Category;
}

export default async function GalleryCategoryPreview({ category }: GalleryCategoryPreviewProps) {
  const artworks = await getArtworks({ categoryId: category.id, limit: 4 });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-headline text-foreground">{category.title}</h3>
          <p className="mt-2 text-muted-foreground max-w-2xl">{category.description}</p>
        </div>
        <Button asChild variant="outline" className="shrink-0">
          <Link href={`/gallery/${category.slug}`}>Explore Collection</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}
