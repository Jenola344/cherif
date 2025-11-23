import { getCategoryBySlug, getArtworks, getCategories } from '@/lib/data';
import { notFound } from 'next/navigation';
import ArtworkGrid from '@/components/gallery/ArtworkGrid';

type CategoryPageProps = {
  params: {
    categorySlug: string;
  };
};

export const revalidate = 3600; // Revalidate every hour

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.categorySlug);
  if (!category) {
    notFound();
  }

  const artworks = await getArtworks({ categoryId: category.id });

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground">{category.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          {category.description}
        </p>
      </div>
      
      {/* TODO: Search and filter UI would go here */}

      <ArtworkGrid artworks={artworks} />
    </div>
  );
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    categorySlug: category.slug,
  }));
}
