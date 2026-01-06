import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
    id: string;
    slug: string;
    title: string;
    imageUrl: string;
    category: string;
    price: number;
}

export default function ProductCard({ id, slug, title, imageUrl, category, price }: ProductCardProps) {
    return (
        <div className="group bg-white rounded-xl overflow-hidden border border-border/50 hover:border-primary/20 transition-all hover:shadow-2xl hover:shadow-primary/5">
            <div className="relative h-80 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                    <Link
                        href={`/gallery/${slug}`}
                        className="bg-white text-primary p-3 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg"
                    >
                        <Eye className="h-5 w-5" />
                    </Link>
                    <button className="bg-white text-primary p-3 rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg">
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border border-primary/10">
                        {category}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <Link href={`/gallery/${slug}`}>
                    <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
                </Link>
                <p className="text-primary font-bold text-xl">${price}</p>
            </div>
        </div>
    );
}
