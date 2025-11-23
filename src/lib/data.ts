import type { Artwork, Category } from './types';
import { getPlaceholderImage } from './placeholder-images';

const categories: Category[] = [
  { id: 'cat-1', slug: 'modern-minimalist-art', title: 'Modern Minimalist Art', description: 'Clean lines, simple forms, and a neutral palette define this collection of contemporary art.' },
  { id: 'cat-2', slug: 'interior-wall-frames', title: 'Interior Wall Frames', description: 'Curated sets of frames and prints to instantly elevate your home decor.' },
  { id:  'cat-3', slug: 'african-contemporary-art', title: 'African Contemporary Art', description: 'Vibrant, powerful, and diverse works from the continent\'s most exciting artists.' },
  { id: 'cat-4', slug: 'east-asian-art', title: 'East Asian Art', description: 'Experience the tranquility and elegance of traditional and modern East Asian aesthetics.' },
  { id: 'cat-5', slug: 'drawings-sketches', title: 'Drawings & Sketches', description: 'The raw and intimate beauty of art in its foundational form, from pencil to charcoal.' },
  { id: 'cat-6', slug: 'middle-eastern-art', title: 'Middle Eastern Art', description: 'Rich in history and culture, this collection showcases intricate patterns and calligraphy.' },
  { id: 'cat-7', slug: 'photography', title: 'Photography', description: 'Capture moments in time with our stunning collection of fine art photography.' },
  { id: 'cat-8', slug: 'abstract-collections', title: 'Abstract Collections', description: 'Explore art that transcends the literal, focusing on color, form, and emotion.' },
  { id: 'cat-9', slug: 'lifestyle-decor', title: 'Lifestyle & Decor', description: 'Artful objects and decor pieces that bring creativity into every corner of your life.' },
  { id: 'cat-10', slug: 'limited-edition-prints', title: 'Limited Edition Prints', description: 'Exclusive, signed, and numbered prints from world-renowned artists.' },
];

const artworks: Artwork[] = [
  // Modern Minimalist
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `modern-${i + 1}`, slug: `modern-abstract-${i + 1}`, title: `Modern Abstract ${i + 1}`,
    description: 'A beautiful piece of modern minimalist art exploring form and color in a restrained palette. Perfect for contemporary interiors seeking a touch of sophistication.', category: 'Modern Minimalist Art', categoryId: 'cat-1',
    imageUrl: getPlaceholderImage(`modern-${i + 1}`).imageUrl, imageHint: getPlaceholderImage(`modern-${i + 1}`).imageHint,
    availableSizes: ['12x16', '18x24', '24x36'], prices: { '12x16': 80, '18x24': 120, '24x36': 200 }
  })),
  // Interior Wall Frames
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `frames-${i + 1}`, slug: `frame-set-${i + 1}`, title: `Gallery Wall Set ${i + 1}`,
    description: 'A curated set of frames to create a stunning gallery wall. Includes high-quality prints that complement each other, taking the guesswork out of home decor.', category: 'Interior Wall Frames', categoryId: 'cat-2',
    imageUrl: getPlaceholderImage(`frames-${i + 1}`).imageUrl, imageHint: getPlaceholderImage(`frames-${i + 1}`).imageHint,
    availableSizes: ['Small', 'Medium', 'Large'], prices: { 'Small': 150, 'Medium': 250, 'Large': 400 }
  })),
  // African Contemporary
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `african-${i + 1}`, slug: `african-spirit-${i + 1}`, title: `African Spirit ${i + 1}`,
    description: 'A vibrant expression of contemporary African culture, this piece uses bold colors and dynamic patterns to convey energy and resilience.', category: 'African Contemporary Art', categoryId: 'cat-3',
    imageUrl: getPlaceholderImage(`african-${i + 1}`).imageUrl, imageHint: getPlaceholderImage(`african-${i + 1}`).imageHint,
    availableSizes: ['16x20', '20x30', '30x40'], prices: { '16x20': 110, '20x30': 180, '30x40': 320 }
  })),
  // East Asian Art
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `e-asian-${i + 1}`, slug: `zen-ink-${i + 1}`, title: `Zen Ink ${i + 1}`,
    description: 'Minimalist ink wash painting inspired by Zen principles of simplicity and harmony. A calming influence for any room.', category: 'East Asian Art', categoryId: 'cat-4',
    imageUrl: getPlaceholderImage(`e-asian-${i + 1}`).imageUrl, imageHint: getPlaceholderImage(`e-asian-${i + 1}`).imageHint,
    availableSizes: ['12x18', '20x30'], prices: { '12x18': 95, '20x30': 160 }
  })),
  // Drawings & Sketches
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `sketch-${i + 1}`, slug: `charcoal-figure-${i + 1}`, title: `Charcoal Figure ${i + 1}`,
    description: 'A dynamic charcoal sketch capturing the raw energy and emotion of the human form. Showcases the artist\'s masterful draftsmanship.', category: 'Drawings & Sketches', categoryId: 'cat-5',
    imageUrl: getPlaceholderImage(`sketch-${i + 1}`).imageUrl, imageHint: getPlaceholderImage(`sketch-${i + 1}`).imageHint,
    availableSizes: ['11x14', '16x20'], prices: { '11x14': 60, '16x20': 90 }
  })),
  // Middle Eastern Art
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `m-eastern-${i + 1}`, slug: `islamic-geometry-${i + 1}`, title: `Islamic Geometry ${i + 1}`,
    description: 'An intricate geometric pattern based on traditional Islamic art, representing unity and order. A timeless piece of cultural heritage.', category: 'Middle Eastern Art', categoryId: 'cat-6',
    imageUrl: getPlaceholderImage(`m-eastern-${i + 1}`).imageUrl, imageHint: getPlaceholderImage(`m-eastern-${i + 1}`).imageHint,
    availableSizes: ['12x12', '20x20', '28x28'], prices: { '12x12': 75, '20x20': 140, '28x28': 250 }
  })),
  // Photography
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `photo-${i + 1}`, slug: `urban-light-${i + 1}`, title: `Urban Light ${i + 1}`,
    description: 'A fine art photograph capturing the mesmerizing play of light and shadow in an urban landscape at dusk.', category: 'Photography', categoryId: 'cat-7',
    imageUrl: getPlaceholderImage(`photo-${i + 1}`).imageUrl, imageHint: getPlaceholderImage(`photo-${i + 1}`).imageHint,
    availableSizes: ['8x10', '16x20', '24x30'], prices: { '8x10': 50, '16x20': 100, '24x30': 180 }
  })),
  // Abstract Collections
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `abstract-${i + 1}`, slug: `color-field-${i + 1}`, title: `Color Field ${i + 1}`,
    description: 'An immersive abstract painting exploring the emotional power of color through large, flat areas of solid color. A statement piece for any collection.', category: 'Abstract Collections', categoryId: 'cat-8',
    imageUrl: getPlaceholderImage(`abstract-${i + 1}`).imageUrl, imageHint: getPlaceholderImage(`abstract-${i + 1}`).imageHint,
    availableSizes: ['18x24', '36x48'], prices: { '18x24': 130, '36x48': 450 }
  })),
  // Lifestyle & Decor
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `decor-${i + 1}`, slug: `artisan-object-${i + 1}`, title: `Artisan Object ${i + 1}`,
    description: 'A handcrafted decorative object that doubles as a sculptural piece. Perfect for shelves, coffee tables, or as a unique gift.', category: 'Lifestyle & Decor', categoryId: 'cat-9',
    imageUrl: getPlaceholderImage(`decor-${i + 1}`).imageUrl, imageHint: getPlaceholderImage(`decor-${i + 1}`).imageHint,
    availableSizes: ['One Size'], prices: { 'One Size': 125 }
  })),
  // Limited Edition
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `limited-${i + 1}`, slug: `signed-print-${i + 1}`, title: `Signed Print #${i + 1}`,
    description: 'A limited edition, signed and numbered print. Only 50 available worldwide, making it a valuable addition for serious collectors.', category: 'Limited Edition Prints', categoryId: 'cat-10',
    imageUrl: getPlaceholderImage(`limited-${i + 1}`).imageUrl, imageHint: getPlaceholderImage(`limited-${i + 1}`).imageHint,
    availableSizes: ['24x36'], prices: { '24x36': 500 }
  })),
];

// --- Data Fetching Functions ---

export async function getCategories(): Promise<Category[]> {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 200));
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return categories.find((c) => c.slug === slug);
}

export async function getArtworks(options?: { categoryId?: string; limit?: number }): Promise<Artwork[]> {
  // Simulate network delay
  if(options?.limit) await new Promise(res => setTimeout(res, 300));
  let results = artworks;
  if (options?.categoryId) {
    results = results.filter((a) => a.categoryId === options.categoryId);
  }
  if (options?.limit) {
    results = results.slice(0, options.limit);
  }
  return results;
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | undefined> {
  return artworks.find((a) => a.slug === slug);
}

export async function searchArtworks(query: string): Promise<Artwork[]> {
  if (!query) return [];
  const lowercasedQuery = query.toLowerCase();
  return artworks.filter(
    (a) =>
      a.title.toLowerCase().includes(lowercasedQuery) ||
      a.description.toLowerCase().includes(lowercasedQuery) ||
      a.category.toLowerCase().includes(lowercasedQuery)
  );
}
