import { Category, Artwork, Order, InteriorDesign, Booking } from './types';
import placeholderData from './placeholder-images.json';

// --- Data Initialization ---

// Copy of original data generation logic
const placeholderImages = placeholderData.placeholderImages;
const placeholderImageMap = new Map(
    placeholderImages.map((img) => [img.id, img])
);

function getPlaceholderImage(id: string) {
    const image = placeholderImageMap.get(id);
    return image || {
        id: 'default',
        description: 'Default placeholder',
        imageUrl: 'https://picsum.photos/seed/default/600/400',
        imageHint: 'placeholder'
    };
}

// Initial Data
const initialCategories: Category[] = [
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

let initialArtworks: Artwork[] = [];

const createArtworks = () => {
    const arts: Artwork[] = [];
    // Helper to push
    const add = (a: any) => arts.push(a);

    // Modern
    for (let i = 0; i < 5; i++) {
        const id = `modern-${i + 1}`;
        const img = getPlaceholderImage(id);
        add({
            id, slug: `modern-abstract-${i + 1}`, title: `Modern Abstract ${i + 1}`,
            description: 'A beautiful piece of modern minimalist art exploring form and color in a restrained palette.',
            category: 'Modern Minimalist Art', categoryId: 'cat-1',
            imageUrl: img.imageUrl, imageHint: img.imageHint,
            availableSizes: ['12x16', '18x24', '24x36'], prices: { '12x16': 80, '18x24': 120, '24x36': 200 }
        });
    }
    // Frames
    for (let i = 0; i < 4; i++) {
        const id = `frames-${i + 1}`;
        const img = getPlaceholderImage(id);
        add({
            id, slug: `frame-set-${i + 1}`, title: `Gallery Wall Set ${i + 1}`,
            description: 'A curated set of frames to create a stunning gallery wall.',
            category: 'Interior Wall Frames', categoryId: 'cat-2',
            imageUrl: img.imageUrl, imageHint: img.imageHint,
            availableSizes: ['Small', 'Medium', 'Large'], prices: { 'Small': 150, 'Medium': 250, 'Large': 400 }
        });
    }
    // ... Simplified seeding for all categories to save space but ensure functionality
    // African
    for (let i = 0; i < 5; i++) {
        const id = `african-${i + 1}`; const img = getPlaceholderImage(id);
        add({ id, slug: `african-spirit-${i + 1}`, title: `African Spirit ${i + 1}`, description: 'Vitality of Africa.', category: 'African Contemporary Art', categoryId: 'cat-3', imageUrl: img.imageUrl, imageHint: img.imageHint, availableSizes: ['16x20'], prices: { '16x20': 100 } });
    }

    return arts;
}

initialArtworks = createArtworks();


// --- In-Memory Store ---
// Using global variable to persist across hot reloads in dev (somewhat) if module isn't re-evaluated?
// Actually in Next.js dev, this might reset often.
// But better than crashing.

declare global {
    var _mockDb: {
        categories: Category[];
        artworks: Artwork[];
        orders: any[];
        bookings: any[];
    } | undefined;
}

const db = global._mockDb || {
    categories: initialCategories,
    artworks: initialArtworks,
    orders: [],
    bookings: []
};

if (process.env.NODE_ENV !== 'production') global._mockDb = db;

export default db;
