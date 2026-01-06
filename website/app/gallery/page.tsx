import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getArtworks(categoryId?: string) {
    try {
        return await prisma.artwork.findMany({
            where: categoryId ? { categoryId } : {},
            include: { category: true },
        });
    } catch (e) {
        console.error("Gallery getArtworks error:", e);
        return [];
    }
}

async function getCategories() {
    try {
        return await prisma.category.findMany();
    } catch (e) {
        return [];
    }
}

export default async function GalleryPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const params = await searchParams;
    const categoryId = params.category;

    const artworks = await getArtworks(categoryId);
    const categories = await getCategories();

    return (
        <div className="bg-background min-h-screen py-12">
            <div className="container px-4">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Discovery Gallery</h1>
                    <p className="text-muted-foreground max-w-2xl font-light text-lg">
                        Browse our collection of hand-selected artworks. Use the filters below to find the perfect piece for your collection.
                    </p>
                </header>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-12 border-b border-border pb-8">
                    <Link
                        href="/gallery"
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${!categoryId ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            }`}
                    >
                        All Works
                    </Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/gallery?category=${cat.id}`}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${categoryId === cat.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                        >
                            {cat.title}
                        </Link>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {artworks.map((art) => {
                        let basePrice = 0;
                        try {
                            const prices = JSON.parse(art.prices || '{}');
                            basePrice = prices['Small'] || 0;
                        } catch (e) {
                            console.error("JSON parse error for artwork", art.id, e);
                        }

                        return (
                            <ProductCard
                                key={art.id}
                                id={art.id}
                                slug={art.slug}
                                title={art.title}
                                imageUrl={art.imageUrl}
                                category={art.category?.title || 'Uncategorized'}
                                price={basePrice}
                            />
                        );
                    })}
                </div>

                {artworks.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground">No artworks found in this category.</p>
                        <Link href="/gallery" className="text-primary font-bold hover:underline mt-4 inline-block italic">Clear filters</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
