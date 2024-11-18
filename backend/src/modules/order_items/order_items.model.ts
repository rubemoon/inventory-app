import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { OrderItem } from '../../@types/order_item';

const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
});

export const orderItemModel = {
  async initialize() {
    const db = await dbPromise;
    await db.exec(`
      CREATE TABLE IF NOT EXISTS order_items (
        id TEXT PRIMARY KEY,
        orderId TEXT,
        productId TEXT,
        quantity INTEGER CHECK(quantity > 0),
        unitPrice REAL CHECK(unitPrice > 0),
        FOREIGN KEY (orderId) REFERENCES orders (id),
        FOREIGN KEY (productId) REFERENCES products (id)
      );
    `);
  },
  async createOrderItem(orderItem: OrderItem) {
    const db = await dbPromise;
    const result = await db.run('INSERT INTO order_items (id, orderId, productId, quantity, unitPrice) VALUES (?, ?, ?, ?, ?)', 
      [orderItem.id, orderItem.orderId, orderItem.productId, orderItem.quantity, orderItem.unitPrice]);
    return { ...orderItem, id: result.lastID };
  },
  async getOrderItem(id: string) {
    const db = await dbPromise;
    return db.get('SELECT * FROM order_items WHERE id = ?', [id]);
  },
  async getAllOrderItems() {
    const db = await dbPromise;
    return db.all('SELECT * FROM order_items');
  },
  async updateOrderItem(id: string, data: Partial<OrderItem>) {
    const db = await dbPromise;
    const result = await db.run(
      'UPDATE order_items SET orderId = ?, productId = ?, quantity = ?, unitPrice = ? WHERE id = ?',
      [data.orderId, data.productId, data.quantity, data.unitPrice, id]
    );
    return result;
  },
  async deleteOrderItem(id: string) {
    const db = await dbPromise;
    return db.run('DELETE FROM order_items WHERE id = ?', [id]);
  }
};