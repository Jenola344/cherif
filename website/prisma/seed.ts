import { PrismaClient } from '@prisma/client';
import placeholderData from '../lib/placeholder-images.json';

const prisma = new PrismaClient();

const categories = [
    { id: 'cat-1', slug: 'modern-minimalist-art', title: 'Modern Minimalist Art', description: 'Clean lines, simple forms, and a neutral palette.' },
    { id: 'cat-2', slug: 'interior-wall-frames', title: 'Interior Wall Frames', description: 'Curated sets of frames and prints.' },
    { id: 'cat-3', slug: 'african-contemporary-art', title: 'African Contemporary Art', description: 'Vibrant, powerful, and diverse works.' },
    { id: 'cat-4', slug: 'east-asian-art', title: 'East Asian Art', description: 'Tranquility and elegance.' },
    { id: 'cat-5', slug: 'drawings-sketches', title: 'Drawings & Sketches', description: 'Raw and intimate beauty.' },
];

async function main() {
    console.log('Start seeding ...');

    // Clean up
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.artwork.deleteMany();
    await prisma.category.deleteMany();

    // Create Categories
    for (const c of categories) {
        await prisma.category.create({ data: c });
    }

    // Create Artworks (Simplified for demo)
    const cat1 = categories[0];

    for (let i = 0; i < 5; i++) {
        await prisma.artwork.create({
            data: {
                title: `Modern Artwork ${i + 1}`,
                slug: `modern-artwork-${i + 1}`,
                description: `A beautiful modern piece #${i + 1}`,
                categoryId: cat1.id,
                imageUrl: `https://picsum.photos/seed/art${i}/600/800`,
                imageHint: 'Abstract',
                availableSizes: JSON.stringify(['Small', 'Medium', 'Large']),
                prices: JSON.stringify({ Small: 100, Medium: 200, Large: 350 }),
                featured: i < 2,
                stock: 10
            }
        });
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
