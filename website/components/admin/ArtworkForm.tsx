'use client';

import { useState } from 'react';
import { createArtworkAction } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';

interface Category {
    id: string;
    title: string;
}

export default function ArtworkForm({ categories }: { categories: Category[] }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await createArtworkAction(formData);

        if (result.success) {
            router.push('/admin/artworks');
        } else {
            setError(result.error || "Failed to create artwork");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Artwork Title</label>
                    <input name="title" required className="w-full bg-muted/30 border-none rounded-xl p-4 text-sm focus:ring-2 ring-primary/20" placeholder="E.g. Strokes of Midnight" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                    <select name="categoryId" required className="w-full bg-muted/30 border-none rounded-xl p-4 text-sm focus:ring-2 ring-primary/20">
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                <textarea name="description" required rows={4} className="w-full bg-muted/30 border-none rounded-xl p-4 text-sm focus:ring-2 ring-primary/20" placeholder="Describe the artistic vision..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2 lg:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Image URL (Unsplash/Picsum)</label>
                    <input name="imageUrl" required className="w-full bg-muted/30 border-none rounded-xl p-4 text-sm focus:ring-2 ring-primary/20" placeholder="https://images.unsplash.com/..." />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Base Price (USD)</label>
                    <input name="basePrice" type="number" required className="w-full bg-muted/30 border-none rounded-xl p-4 text-sm focus:ring-2 ring-primary/20" placeholder="100" />
                </div>
            </div>

            <div className="flex items-center space-x-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Initial Stock</label>
                    <input name="stock" type="number" defaultValue={5} required className="w-full bg-muted/30 border-none rounded-xl p-4 text-sm focus:ring-2 ring-primary/20 w-32" />
                </div>
                <div className="flex items-center space-x-3 pt-6">
                    <input name="featured" type="checkbox" id="featured" className="h-5 w-5 rounded border-muted text-primary focus:ring-primary/20" />
                    <label htmlFor="featured" className="text-sm font-bold text-muted-foreground">Featured Piece</label>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm italic border border-red-100">
                    {error}
                </div>
            )}

            <div className="pt-6 border-t border-border flex justify-end space-x-4">
                <button type="button" onClick={() => router.back()} className="px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest text-muted-foreground hover:bg-muted transition-all">
                    Cancel
                </button>
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-primary text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                >
                    {loading ? "Registering..." : "Add to Collection"}
                </button>
            </div>
        </form>
    );
}
