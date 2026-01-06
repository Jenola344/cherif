import db from './db-mock';
import type { Artwork, Category } from './types';

export async function getCategories(): Promise<Category[]> {
  await new Promise(res => setTimeout(res, 100)); // Simulate latency
  return db.categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  await new Promise(res => setTimeout(res, 100));
  return db.categories.find((c) => c.slug === slug);
}

export async function getArtworks(options?: { categoryId?: string; limit?: number }): Promise<Artwork[]> {
  await new Promise(res => setTimeout(res, 100));
  let results = db.artworks;
  if (options?.categoryId) {
    results = results.filter((a) => a.categoryId === options.categoryId);
  }
  if (options?.limit) {
    results = results.slice(0, options.limit);
  }
  return results;
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | undefined> {
  await new Promise(res => setTimeout(res, 100));
  return db.artworks.find((a) => a.slug === slug);
}

export async function searchArtworks(query: string): Promise<Artwork[]> {
  if (!query) return [];
  const lowercasedQuery = query.toLowerCase();
  return db.artworks.filter(
    (a) =>
      a.title.toLowerCase().includes(lowercasedQuery) ||
      a.description.toLowerCase().includes(lowercasedQuery) ||
      a.category.toLowerCase().includes(lowercasedQuery)
  );
}
