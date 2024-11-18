import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { User } from '../../@types/user';

const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
});

export const authModel = {
  async initialize() {
    const db = await dbPromise;
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT,
        password TEXT,
        image TEXT
      )
    `);
  },
  async createUser(user: User) {
    const db = await dbPromise;
    const result = await db.run('INSERT INTO users (username, email, password, image) VALUES (?, ?, ?, ?)', [user.username, user.email, user.password, user.image]);
    const { id, ...userWithoutId } = user;
    return { id: result.lastID, ...userWithoutId };
  },
  async findUserByEmail(email: string) {
    const db = await dbPromise;
    return db.get<User>('SELECT * FROM users WHERE email = ?', [email]);
  },
  async getUser(id: number) {
    const db = await dbPromise;
    return db.get<User>('SELECT * FROM users WHERE id = ?', [id]);
  },
  async getAllUsers() {
    const db = await dbPromise;
    return db.all<User[]>('SELECT * FROM users');
  },
  async deleteUser(id: number) {
    const db = await dbPromise;
    return db.run('DELETE FROM users WHERE id = ?', [id]);
  },
  async updateUser(id: number, data: { fullName: string; email: string; profileImage: string }) {
    const db = await dbPromise;
    const result = await db.run(
      'UPDATE users SET username = ?, email = ?, image = ? WHERE id = ?',
      [data.fullName, data.email, data.profileImage, id]
    );
    return result;
  }
};