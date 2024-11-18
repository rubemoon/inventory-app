import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Supplier } from '../../@types/supplier';

const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
});

export const supplierModel = {
  async initialize() {
    const db = await dbPromise;
    await db.exec(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        contact TEXT,
        address TEXT
      );
    `);
  },
  async createSupplier(supplier: Supplier) {
    const db = await dbPromise;
    const result = await db.run('INSERT INTO suppliers (id, name, contact, address) VALUES (?, ?, ?, ?)', 
      [supplier.id, supplier.name, supplier.contact, supplier.address]);
    return { ...supplier, id: result.lastID };
  },
  async getSupplier(id: string) {
    const db = await dbPromise;
    return db.get('SELECT * FROM suppliers WHERE id = ?', [id]);
  },
  async getAllSuppliers() {
    const db = await dbPromise;
    return db.all('SELECT * FROM suppliers');
  },
  async updateSupplier(id: string, data: Partial<Supplier>) {
    const db = await dbPromise;
    const result = await db.run(
      'UPDATE suppliers SET name = ?, contact = ?, address = ? WHERE id = ?',
      [data.name, data.contact, data.address, id]
    );
    return result;
  },
  async deleteSupplier(id: string) {
    const db = await dbPromise;
    return db.run('DELETE FROM suppliers WHERE id = ?', [id]);
  }
};