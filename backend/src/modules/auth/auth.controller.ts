import express, { Router, Request, Response } from 'express';
import { authService } from './auth.service';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

export const authRouter = Router();

const upload = multer({ dest: 'uploads/' });

authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).send('Failed to register user');
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    if (token) {
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Failed to login');
  }
});

authRouter.put('/update', async (req: Request, res: Response) => {
  const { id, fullName, email, profileImage } = req.body;
  try {
    await authService.updateUser(id, { fullName, email, profileImage });
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(500).send('Failed to update user');
  }
});

authRouter.get('/me', async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send('Authorization header missing');
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const user = await authService.findUser(decoded.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(401).send('Invalid token');
  }
});

authRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await authService.findUser(Number(req.params.id));
    user ? res.json(user) : res.status(404).send('User not found');
  } catch (error) {
    res.status(500).send('Failed to fetch user');
  }
});

authRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await authService.listUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send('Failed to fetch users');
  }
});

authRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await authService.removeUser(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Failed to delete user');
  }
});

// Image upload endpoint
authRouter.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

authRouter.use('/uploads', express.static(path.join(__dirname, 'uploads')));