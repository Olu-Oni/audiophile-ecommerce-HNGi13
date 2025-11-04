// lib/data.ts
import { Database, Product } from './types';

let cachedData: Database | null = null;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
async function getDatabase(): Promise<Database> {
  if (cachedData) return cachedData;

  const res = await fetch(`${baseUrl}/data/db.json`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to load database: ${res.status}`);
  }

  const data = await res.json();

  // Validate shape
  if (!data || typeof data !== 'object' || !Array.isArray(data.data)) {
    throw new Error('Invalid database format: missing or invalid "data" array');
  }
  const validatedData = data as Database;

  cachedData = validatedData;
  return cachedData;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const db = await getDatabase();
  return db.data
    .filter(p => p.category === category)
    .sort((a, b) => (a.new && !b.new) ? -1 : (!a.new && b.new) ? 1 : 0);
}

export async function getAllProducts(): Promise<Product[]> {
  const db = await getDatabase();
  return db.data;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const db = await getDatabase();
  return db.data.find(p => p.slug === slug);
}

export async function getCategories(): Promise<string[]> {
  const db = await getDatabase();
  return [...new Set(db.data.map(p => p.category))];
}