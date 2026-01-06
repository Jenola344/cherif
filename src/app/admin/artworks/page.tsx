import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import db from '@/lib/db-mock';
import type { Artwork } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminArtworksPage() {
    const artworks = db.artworks;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Artworks</h1>
                <Button asChild>
                    <Link href="/admin/artworks/new">Add New Artwork</Link>
                </Button>
            </div>

            <div className="border rounded-lg bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Prices</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {artworks.map((artwork: Artwork) => (
                            <TableRow key={artwork.id}>
                                <TableCell>
                                    <div className="relative w-12 h-12 rounded overflow-hidden">
                                        <Image
                                            src={artwork.imageUrl}
                                            alt={artwork.title}
                                            fill
                                            className="object-cover"
                                            sizes="48px"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{artwork.title}</TableCell>
                                <TableCell>{artwork.category}</TableCell>
                                <TableCell>
                                    {Object.entries(artwork.prices).map(([size, price]) => (
                                        <div key={size} className="text-sm text-muted-foreground">
                                            {size}: ${price}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {artworks.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No artworks found. Use the seeding tool or add one manually.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
