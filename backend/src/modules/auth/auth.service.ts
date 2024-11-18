import { authModel } from './auth.model';
import { User } from '../../@types/user';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

declare module 'express-session' {
  interface Session {
    user?: User;
  }
}

export const authService = {
  async register(user: User) {
    return authModel.createUser(user);
  },
  async login(email: string, password: string) {
    const user = await authModel.findUserByEmail(email);
    if (user && user.password === password) {
      const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
      return token;
    }
    return null;
  },
  async findUser(id: number) {
    return authModel.getUser(id);
  },
  async listUsers() {
    return authModel.getAllUsers();
  },
  async removeUser(id: number) {
    return authModel.deleteUser(id);
  },
  async updateUser(id: number, data: { fullName: string; email: string; profileImage: string }) {
    return authModel.updateUser(id, data);
  },
  async getUserFromSession(req: Request) {
    const session = req.session;
    return session?.user || null;
  }
};