import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Product } from '../../@types/product';

const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
});

export const productModel = {
  async initialize() {
    const db = await dbPromise;
    await db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        price REAL CHECK(price > 0),
        quantity INTEGER CHECK(quantity >= 0),
        image TEXT
      );
    `);
  },
  async createProduct(product: Product) {
    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO products (id, name, description, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?)', 
      [product.id, product.name, product.description, product.price, product.quantity, product.image]
    );
    return { ...product, id: result.lastID };
  },
  async getProduct(id: string) {
    const db = await dbPromise;
    return db.get('SELECT * FROM products WHERE id = ?', [id]);
  },
  async getAllProducts() {
    const db = await dbPromise;
    return db.all('SELECT * FROM products');
  },
  async updateProduct(id: string, data: Partial<Product>) {
    const db = await dbPromise;
    const result = await db.run(
      'UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, image = ? WHERE id = ?',
      [data.name, data.description, data.price, data.quantity, data.image, id]
    );
    return result;
  },
  async deleteProduct(id: string) {
    const db = await dbPromise;
    return db.run('DELETE FROM products WHERE id = ?', [id]);
  }
};