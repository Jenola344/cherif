import { getCategories } from '@/lib/data';
import GalleryCategoryPreview from '@/components/gallery/GalleryCategoryPreview';

export const revalidate = 3600; // Revalidate every hour

export default async function GalleryPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground">Our Gallery</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Browse through our diverse collections, from contemporary abstracts to timeless photography. Each piece is carefully selected to inspire and transform your space.
        </p>
      </div>
      
      <div className="space-y-20">
        {categories.map(async (category) => {
          return (
            <GalleryCategoryPreview key={category.id} category={category} />
          );
        })}
      </div>
    </div>
  );
}
