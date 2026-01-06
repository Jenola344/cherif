import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ArtworkPurchase from '@/components/ArtworkPurchase';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getArtworkBySlug(slug: string) {
    try {
        return await prisma.artwork.findUnique({
            where: { slug },
            include: { category: true },
        });
    } catch (e) {
        return null;
    }
}

export default async function ArtworkDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const artwork = await getArtworkBySlug(slug);

    if (!artwork) notFound();

    const prices = JSON.parse(artwork.prices);
    const availableSizes = JSON.parse(artwork.availableSizes);

    return (
        <div className="bg-background min-h-screen py-12">
            <div className="container px-4">
                <Link
                    href="/gallery"
                    className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mb-12 group transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Gallery
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Image Gallery */}
                    <div className="space-y-6">
                        <div className="relative aspect-[4/5] bg-muted rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={artwork.imageUrl}
                                alt={artwork.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <button className="absolute top-6 right-6 bg-white/80 backdrop-blur-md p-3 rounded-full text-primary hover:bg-white transition-colors shadow-lg">
                                <Heart className="h-5 w-5" />
                            </button>
                        </div>
                        {/* Thumbnails Placeholder */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden border border-border/50 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                                    <Image src={artwork.imageUrl} alt={artwork.title} width={200} height={200} className="object-cover grayscale" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <span className="text-secondary font-display italic text-lg mb-2 block tracking-wider">
                                {artwork.category.title}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">{artwork.title}</h1>
                            <div className="flex items-center space-x-4">
                                <div className="flex text-yellow-500">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">4.9 (24 Reviews)</span>
                            </div>
                        </div>

                        <div className="prose prose-stone mb-12">
                            <p className="text-muted-foreground leading-relaxed text-lg font-light">
                                {artwork.description}
                            </p>
                        </div>

                        <ArtworkPurchase
                            artwork={{
                                id: artwork.id,
                                title: artwork.title,
                                imageUrl: artwork.imageUrl,
                                prices,
                                availableSizes
                            }}
                        />

                        <div className="mt-12 pt-12 border-t border-border space-y-6">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Estimate Shipping</span>
                                <span className="font-bold">2-4 Business Days</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Originality</span>
                                <span className="font-bold">Authenticated Certificate Included</span>
                            </div>
                            <button className="flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">
                                <Share2 className="mr-2 h-4 w-4" /> Share this piece
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
