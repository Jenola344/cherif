'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import cloudinary from '@/lib/cloudinary';

export async function createArtworkAction(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const categoryId = formData.get('categoryId') as string;
    const basePrice = Number(formData.get('basePrice'));
    const stock = Number(formData.get('stock'));
    const featured = formData.get('featured') === 'on';

    const file = formData.get('image') as File;
    let imageUrl = '';

    if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                folder: 'cherif_gallery',
            }, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }).end(buffer);
        });

        imageUrl = (uploadResult as any).secure_url;
    } else {
        return { success: false, error: "Image is required" };
    }

    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

    try {
        await prisma.artwork.create({
            data: {
                title,
                slug,
                description,
                categoryId,
                imageUrl,
                stock,
                featured,
                availableSizes: JSON.stringify(['Small', 'Medium', 'Large']),
                prices: JSON.stringify({
                    'Small': basePrice,
                    'Medium': basePrice * 1.5,
                    'Large': basePrice * 2.5
                })
            }
        });

        revalidatePath('/admin/artworks');
        revalidatePath('/gallery');
        return { success: true };
    } catch (error: any) {
        console.error("Create artwork error", error);
        return { success: false, error: error.message };
    }
}
