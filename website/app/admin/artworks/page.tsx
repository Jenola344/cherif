import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminArtworksPage() {
    const artworks = await prisma.artwork.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-display font-bold mb-2">Collection Management</h1>
                    <p className="text-muted-foreground italic font-light">Add, edit, or remove pieces from your digital gallery.</p>
                </div>
                <Link
                    href="/admin/artworks/new"
                    className="bg-primary text-white h-12 px-6 rounded-full flex items-center font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus className="h-4 w-4 mr-2" /> New Acquisition
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-muted/50 text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em] border-b border-border">
                            <th className="p-6">Artwork</th>
                            <th className="p-6">Category</th>
                            <th className="p-6">Stock</th>
                            <th className="p-6">Featured</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {artworks.map((art: any) => (
                            <tr key={art.id} className="hover:bg-muted/10 transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                                            <Image src={art.imageUrl} alt={art.title} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{art.title}</p>
                                            <p className="text-[10px] text-muted-foreground font-mono">{art.id.split('-')[0]}...</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-1 rounded">
                                        {art.category.title}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <span className={`text-sm font-bold ${art.stock < 3 ? 'text-red-500' : 'text-primary'}`}>
                                        {art.stock} items
                                    </span>
                                </td>
                                <td className="p-6">
                                    {art.featured ? (
                                        <span className="h-2 w-2 rounded-full bg-green-500 block animate-pulse" />
                                    ) : (
                                        <span className="h-2 w-2 rounded-full bg-muted block" />
                                    )}
                                </td>
                                <td className="p-6 border-l border-border/10">
                                    <div className="flex justify-end space-x-2">
                                        <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {artworks.length === 0 && (
                    <div className="text-center py-24 text-muted-foreground italic font-light">
                        Your collection is currently empty.
                    </div>
                )}
            </div>
        </div>
    );
}
