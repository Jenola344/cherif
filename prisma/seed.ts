import { PrismaClient } from '@prisma/client';
import placeholderData from '../src/lib/placeholder-images.json';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "file:./dev.db"
        }
    }
});

const placeholderImages = placeholderData.placeholderImages;
const placeholderImageMap = new Map(
    placeholderImages.map((img) => [img.id, img])
);

function getPlaceholderImage(id: string) {
    const image = placeholderImageMap.get(id);
    if (!image) {
        return {
            id: 'default',
            description: 'Default placeholder image',
            imageUrl: 'https://picsum.photos/seed/default/600/400',
            imageHint: 'placeholder',
        };
    }
    return image;
}

const categories = [
    { id: 'cat-1', slug: 'modern-minimalist-art', title: 'Modern Minimalist Art', description: 'Clean lines, simple forms, and a neutral palette define this collection of contemporary art.' },
    { id: 'cat-2', slug: 'interior-wall-frames', title: 'Interior Wall Frames', description: 'Curated sets of frames and prints to instantly elevate your home decor.' },
    { id: 'cat-3', slug: 'african-contemporary-art', title: 'African Contemporary Art', description: 'Vibrant, powerful, and diverse works from the continent\'s most exciting artists.' },
    { id: 'cat-4', slug: 'east-asian-art', title: 'East Asian Art', description: 'Experience the tranquility and elegance of traditional and modern East Asian aesthetics.' },
    { id: 'cat-5', slug: 'drawings-sketches', title: 'Drawings & Sketches', description: 'The raw and intimate beauty of art in its foundational form, from pencil to charcoal.' },
    { id: 'cat-6', slug: 'middle-eastern-art', title: 'Middle Eastern Art', description: 'Rich in history and culture, this collection showcases intricate patterns and calligraphy.' },
    { id: 'cat-7', slug: 'photography', title: 'Photography', description: 'Capture moments in time with our stunning collection of fine art photography.' },
    { id: 'cat-8', slug: 'abstract-collections', title: 'Abstract Collections', description: 'Explore art that transcends the literal, focusing on color, form, and emotion.' },
    { id: 'cat-9', slug: 'lifestyle-decor', title: 'Lifestyle & Decor', description: 'Artful objects and decor pieces that bring creativity into every corner of your life.' },
    { id: 'cat-10', slug: 'limited-edition-prints', title: 'Limited Edition Prints', description: 'Exclusive, signed, and numbered prints from world-renowned artists.' },
];

async function main() {
    console.log('Start seeding ...');

    // Clean up existing data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.artwork.deleteMany();
    await prisma.category.deleteMany();

    // Create Categories
    for (const cat of categories) {
        await prisma.category.create({
            data: cat,
        });
    }

    // Create Artworks
    // Modern
    for (let i = 0; i < 5; i++) {
        const id = `modern-${i + 1}`;
        const img = getPlaceholderImage(id);
        await prisma.artwork.create({
            data: {
                id: id,
                slug: `modern-abstract-${i + 1}`,
                title: `Modern Abstract ${i + 1}`,
                description: 'A beautiful piece of modern minimalist art exploring form and color in a restrained palette. Perfect for contemporary interiors seeking a touch of sophistication.',
                categoryId: 'cat-1',
                imageUrl: img.imageUrl,
                imageHint: img.imageHint,
                availableSizes: JSON.stringify(['12x16', '18x24', '24x36']),
                prices: JSON.stringify({ '12x16': 80, '18x24': 120, '24x36': 200 }),
                stock: 10,
                featured: i < 2,
            }
        });
    }

    // Frames
    for (let i = 0; i < 4; i++) {
        const id = `frames-${i + 1}`;
        const img = getPlaceholderImage(id);
        await prisma.artwork.create({
            data: {
                id: id,
                slug: `frame-set-${i + 1}`,
                title: `Gallery Wall Set ${i + 1}`,
                description: 'A curated set of frames to create a stunning gallery wall. Includes high-quality prints that complement each other, taking the guesswork out of home decor.',
                categoryId: 'cat-2',
                imageUrl: img.imageUrl,
                imageHint: img.imageHint,
                availableSizes: JSON.stringify(['Small', 'Medium', 'Large']),
                prices: JSON.stringify({ 'Small': 150, 'Medium': 250, 'Large': 400 }),
                stock: 5,
                featured: i === 0,
            }
        });
    }

    // African
    for (let i = 0; i < 5; i++) {
        const id = `african-${i + 1}`;
        const img = getPlaceholderImage(id);
        await prisma.artwork.create({
            data: {
                id: id,
                slug: `african-spirit-${i + 1}`,
                title: `African Spirit ${i + 1}`,
                description: 'A vibrant expression of contemporary African culture, this piece uses bold colors and dynamic patterns to convey energy and resilience.',
                categoryId: 'cat-3',
                imageUrl: img.imageUrl,
                imageHint: img.imageHint,
                availableSizes: JSON.stringify(['16x20', '20x30', '30x40']),
                prices: JSON.stringify({ '16x20': 110, '20x30': 180, '30x40': 320 }),
                stock: 8,
                featured: i === 0,
            }
        });
    }

    // East Asian
    for (let i = 0; i < 4; i++) {
        const id = `e-asian-${i + 1}`;
        const img = getPlaceholderImage(id);
        await prisma.artwork.create({
            data: {
                id: id,
                slug: `zen-ink-${i + 1}`,
                title: `Zen Ink ${i + 1}`,
                description: 'Minimalist ink wash painting inspired by Zen principles of simplicity and harmony. A calming influence for any room.',
                categoryId: 'cat-4',
                imageUrl: img.imageUrl,
                imageHint: img.imageHint,
                availableSizes: JSON.stringify(['12x18', '20x30']),
                prices: JSON.stringify({ '12x18': 95, '20x30': 160 }),
                stock: 6,
                featured: i === 0,
            }
        });
    }

    // Sketches
    for (let i = 0; i < 5; i++) {
        const id = `sketch-${i + 1}`;
        const img = getPlaceholderImage(id);
        await prisma.artwork.create({
            data: {
                id: id,
                slug: `charcoal-figure-${i + 1}`,
                title: `Charcoal Figure ${i + 1}`,
                description: 'A dynamic charcoal sketch capturing the raw energy and emotion of the human form. Showcases the artist\'s masterful draftsmanship.',
                categoryId: 'cat-5',
                imageUrl: img.imageUrl,
                imageHint: img.imageHint,
                availableSizes: JSON.stringify(['11x14', '16x20']),
                prices: JSON.stringify({ '11x14': 60, '16x20': 90 }),
                stock: 12,
            }
        });
    }

    // Middle Eastern
    for (let i = 0; i < 4; i++) {
        const id = `m-eastern-${i + 1}`;
        const img = getPlaceholderImage(id);
        await prisma.artwork.create({
            data: {
                id: id,
                slug: `islamic-geometry-${i + 1}`,
                title: `Islamic Geometry ${i + 1}`,
                description: 'An intricate geometric pattern based on traditional Islamic art, representing unity and order. A timeless piece of cultural heritage.',
                categoryId: 'cat-6',
                imageUrl: img.imageUrl,
                imageHint: img.imageHint,
                availableSizes: JSON.stringify(['12x12', '20x20', '28x28']),
                prices: JSON.stringify({ '12x12': 75, '20x20': 140, '28x28': 250 }),
                stock: 7,
            }
        });
    }

    // Photography
    for (let i = 0; i < 6; i++) {
        const id = `photo-${i + 1}`;
        const img = getPlaceholderImage(id);
        await prisma.artwork.create({
            data: {
                id: id,
                slug: `urban-light-${i + 1}`,
                title: `Urban Light ${i + 1}`,
                description: 'A fine art photograph capturing the mesmerizing play of light and shadow in an urban landscape at dusk.',
                categoryId: 'cat-7',
                imageUrl: img.imageUrl,
                imageHint: img.imageHint,
                availableSizes: JSON.stringify(['8x10', '16x20', '24x30']),
                prices: JSON.stringify({ '8x10': 50, '16x20': 100, '24x30': 180 }),
                stock: 20,
            }
        });
    }

    // Abstract
    for (let i = 0; i < 5; i++) {
        const id = `abstract-${i + 1}`;
        const img = getPlaceholderImage(id);
        await prisma.artwork.create({
            data: {
                id: id,
                slug: `color-field-${i + 1}`,
                title: `Color Field ${i + 1}`,
                description: 'An immersive abstract painting exploring the emotional power of color through large, flat areas of solid color. A statement piece for any collection.',
                categoryId: 'cat-8',
                imageUrl: img.imageUrl,
                imageHint: img.imageHint,
                availableSizes: JSON.stringify(['18x24', '36x48']),
                prices: JSON.stringify({ '18x24': 130, '36x48': 450 }),
                stock: 4,
                featured: i === 0,
            }
        });
    }

    // Decor
    for (let i = 0; i < 3; i++) {
        const id = `decor-${i + 1}`;
        const img = getPlaceholderImage(id);
        await prisma.artwork.create({
            data: {
                id: id,
                slug: `artisan-object-${i + 1}`,
                title: `Artisan Object ${i + 1}`,
                description: 'A handcrafted decorative object that doubles as a sculptural piece. Perfect for shelves, coffee tables, or as a unique gift.',
                categoryId: 'cat-9',
                imageUrl: img.imageUrl,
                imageHint: img.imageHint,
                availableSizes: JSON.stringify(['One Size']),
                prices: JSON.stringify({ 'One Size': 125 }),
                stock: 15,
            }
        });
    }

    // Limited
    for (let i = 0; i < 4; i++) {
        const id = `limited-${i + 1}`;
        const img = getPlaceholderImage(id);
        await prisma.artwork.create({
            data: {
                id: id,
                slug: `signed-print-${i + 1}`,
                title: `Signed Print #${i + 1}`,
                description: 'A limited edition, signed and numbered print. Only 50 available worldwide, making it a valuable addition for serious collectors.',
                categoryId: 'cat-10',
                imageUrl: img.imageUrl,
                imageHint: img.imageHint,
                availableSizes: JSON.stringify(['24x36']),
                prices: JSON.stringify({ '24x36': 500 }),
                stock: 50,
                featured: i === 0,
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
