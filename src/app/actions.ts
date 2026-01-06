'use server';

import { redirect } from 'next/navigation';
import db from '@/lib/db-mock';
import type { Artwork } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function createArtwork(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const categoryId = formData.get('categoryId') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const priceSmall = Number(formData.get('priceSmall'));

    // Basic validation
    if (!title || !description || !categoryId || !imageUrl) {
        throw new Error('Missing required fields');
    }

    const category = db.categories.find(c => c.id === categoryId);
    if (!category) throw new Error('Invalid category');

    const newArtwork: Artwork = {
        id: `art-${Date.now()}`,
        slug: title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        title,
        description,
        category: category.title, // Flattened logic match
        categoryId,
        imageUrl,
        imageHint: title,
        prices: {
            'Small': priceSmall,
            'Medium': priceSmall * 1.5,
            'Large': priceSmall * 2.5
        },
        availableSizes: ['Small', 'Medium', 'Large']
    };

    db.artworks.push(newArtwork);

    revalidatePath('/admin/artworks');
    revalidatePath('/gallery');
    redirect('/admin/artworks');
}
