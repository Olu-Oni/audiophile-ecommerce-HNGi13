// lib/data.ts
import { Database, Product } from './types';
import fs from 'fs';
import path from 'path';

let cachedData: Database | null = null;

async function getDatabase(): Promise<Database> {
  if (cachedData) return cachedData;

  // Read from public directory
  const filePath = path.join(process.cwd(), 'public', 'data', 'db.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);

  // Validate shape
  if (!data || typeof data !== 'object' || !Array.isArray(data.data)) {
    throw new Error('Invalid database format: missing or invalid "data" array');
  }
  
  const validatedData = data as Database;
  cachedData = validatedData;
  return cachedData;
}

// Helper function to clean image paths (remove leading spaces)
function cleanImagePaths(product: Product): Product {
  return {
    ...product,
    image: {
      mobile: product.image.mobile.trim(),
      tablet: product.image.tablet.trim(),
      desktop: product.image.desktop.trim(),
    },
    categoryImage: {
      mobile: product.categoryImage.mobile.trim(),
      tablet: product.categoryImage.tablet.trim(),
      desktop: product.categoryImage.desktop.trim(),
    },
    gallery: {
      first: {
        mobile: product.gallery.first.mobile.trim(),
        tablet: product.gallery.first.tablet.trim(),
        desktop: product.gallery.first.desktop.trim(),
      },
      second: {
        mobile: product.gallery.second.mobile.trim(),
        tablet: product.gallery.second.tablet.trim(),
        desktop: product.gallery.second.desktop.trim(),
      },
      third: {
        mobile: product.gallery.third.mobile.trim(),
        tablet: product.gallery.third.tablet.trim(),
        desktop: product.gallery.third.desktop.trim(),
      },
    },
    others: product.others.map(other => ({
      ...other,
      image: {
        mobile: other.image.mobile.trim(),
        tablet: other.image.tablet.trim(),
        desktop: other.image.desktop.trim(),
      },
    })),
  };
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const db = await getDatabase();
  return db.data
    .filter(p => p.category === category)
    .map(cleanImagePaths)
    .sort((a, b) => (a.new && !b.new) ? -1 : (!a.new && b.new) ? 1 : 0);
}

export async function getAllProducts(): Promise<Product[]> {
  const db = await getDatabase();
  return db.data.map(cleanImagePaths);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const db = await getDatabase();
  const product = db.data.find(p => p.slug === slug);
  return product ? cleanImagePaths(product) : undefined;
}

export async function getCategories(): Promise<string[]> {
  const db = await getDatabase();
  return [...new Set(db.data.map(p => p.category))];
}