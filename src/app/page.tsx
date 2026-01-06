import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getCategories } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import GalleryCategoryPreview from '@/components/gallery/GalleryCategoryPreview';

export default async function HomePage() {
  const heroImage = getPlaceholderImage('hero-image');
  const categories = await getCategories();
  const featuredCategories = categories.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-3xl p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline text-white drop-shadow-lg">
            Art for Your Lifestyle
          </h1>
          <p className="mt-4 text-md md:text-xl max-w-2xl mx-auto font-body text-background/90 drop-shadow-md">
            Discover curated collections of fine art and decor that bring elegance and personality to your space.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/gallery">Explore The Gallery</Link>
          </Button>
        </div>
      </section>
      
      {/* Featured Categories Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground">Featured Collections</h2>
            <p className="mt-2 text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
              A glimpse into our diverse world of art. Find what speaks to you.
            </p>
          </div>
          <div className="space-y-16 md:space-y-20">
            {featuredCategories.map(async (category) => {
              return (
                <GalleryCategoryPreview key={category.id} category={category} />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
