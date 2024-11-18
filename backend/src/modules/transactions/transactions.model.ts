import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Transaction } from '../../@types/transaction';

const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
});

export const transactionModel = {
  async initialize() {
    const db = await dbPromise;
    await db.exec(`
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        type TEXT CHECK(type IN ('In', 'Out')),
        value REAL CHECK(value > 0),
        productId TEXT,
        orderId TEXT,
        FOREIGN KEY (productId) REFERENCES products (id),
        FOREIGN KEY (orderId) REFERENCES orders (id)
      );
    `);
  },
  async createTransaction(transaction: Transaction) {
    const db = await dbPromise;
    const result = await db.run('INSERT INTO transactions (id, date, type, value, productId, orderId) VALUES (?, ?, ?, ?, ?, ?)', 
      [transaction.id, transaction.date, transaction.type, transaction.value, transaction.productId, transaction.orderId]);
    return { ...transaction, id: result.lastID };
  },
  async getTransaction(id: string) {
    const db = await dbPromise;
    return db.get('SELECT * FROM transactions WHERE id = ?', [id]);
  },
  async getAllTransactions() {
    const db = await dbPromise;
    return db.all('SELECT * FROM transactions');
  },
  async updateTransaction(id: string, data: Partial<Transaction>) {
    const db = await dbPromise;
    const result = await db.run(
      'UPDATE transactions SET date = ?, type = ?, value = ?, productId = ?, orderId = ? WHERE id = ?',
      [data.date, data.type, data.value, data.productId, data.orderId, id]
    );
    return result;
  },
  async deleteTransaction(id: string) {
    const db = await dbPromise;
    return db.run('DELETE FROM transactions WHERE id = ?', [id]);
  }
};