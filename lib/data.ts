import fs from 'fs';
import path from 'path';
import { Database, Product } from './types';

// Read and parse once, cache in memory
let cachedData: Database | null = null;

function getDatabase(): Database {
  if (cachedData) return cachedData;
  
  try {
    const filePath = path.join(process.cwd(), 'db.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    cachedData = JSON.parse(fileContents);
    
    if (!cachedData) {
      throw new Error('Failed to parse database');
    }
    
    return cachedData;
  } catch (error) {
    console.error('Error reading database:', error);
    throw error;
  }
}

export function getProductsByCategory(category: string): Product[] {
  const db = getDatabase();
  return db.data
    .filter(product => product.category === category)
    .sort((a, b) => {
      // New products first
      if (a.new && !b.new) return -1;
      if (!a.new && b.new) return 1;
      return 0;
    });
}

export function getAllProducts(): Product[] {
  const db = getDatabase();
  return db.data;
}

export function getProductBySlug(slug: string): Product | undefined {
  const db = getDatabase();
  return db.data.find(product => product.slug === slug);
}

export function getCategories(): string[] {
  const db = getDatabase();
  return [...new Set(db.data.map(product => product.category))];
}