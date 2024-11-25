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
        status TEXT CHECK(status IN ('Pending', 'Completed', 'Canceled')),
        total REAL CHECK(total >= 0),
        customerName TEXT NOT NULL,
        product TEXT NOT NULL,
        quantity INTEGER CHECK(quantity > 0)
      );
    `);
  },
  async createOrder(order: Order) {
    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO orders (id, date, supplierId, status, total, customerName, product, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
      [order.id, order.date, order.supplierId, order.status, order.total, order.customerName, order.product, order.quantity]
    );
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
      'UPDATE orders SET date = ?, supplierId = ?, status = ?, total = ?, customerName = ?, product = ?, quantity = ? WHERE id = ?',
      [data.date, data.supplierId, data.status, data.total, data.customerName, data.product, data.quantity, id]
    );
    return result;
  },
  async deleteOrder(id: string) {
    const db = await dbPromise;
    return db.run('DELETE FROM orders WHERE id = ?', [id]);
  },
  async getSalesData() {
    const db = await dbPromise;
    const salesData = await db.all(`
      SELECT 
        strftime('%Y-%m', date) as month,
        SUM(total) as totalSales,
        SUM(quantity) as totalQuantity
      FROM orders
      GROUP BY month
      ORDER BY month
    `);
    return salesData;
  }
};