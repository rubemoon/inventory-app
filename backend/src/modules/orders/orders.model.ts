import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Order } from '../../@types/order';

const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
});

export const orderModel = {
  async initialize() {
    const db = await dbPromise;
    await db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        supplierId TEXT,
        status TEXT CHECK(status IN ('Pending', 'Completed')),
        total REAL CHECK(total > 0),
        FOREIGN KEY (supplierId) REFERENCES suppliers (id)
      );
    `);
  },
  async createOrder(order: Order) {
    const db = await dbPromise;
    const result = await db.run('INSERT INTO orders (id, date, supplierId, status, total) VALUES (?, ?, ?, ?, ?)', 
      [order.id, order.date, order.supplierId, order.status, order.total]);
    return { ...order, id: result.lastID };
  },
  async getOrder(id: string) {
    const db = await dbPromise;
    return db.get('SELECT * FROM orders WHERE id = ?', [id]);
  },
  async getAllOrders() {
    const db = await dbPromise;
    return db.all('SELECT * FROM orders');
  },
  async updateOrder(id: string, data: Partial<Order>) {
    const db = await dbPromise;
    const result = await db.run(
      'UPDATE orders SET date = ?, supplierId = ?, status = ?, total = ? WHERE id = ?',
      [data.date, data.supplierId, data.status, data.total, id]
    );
    return result;
  },
  async deleteOrder(id: string) {
    const db = await dbPromise;
    return db.run('DELETE FROM orders WHERE id = ?', [id]);
  }
};