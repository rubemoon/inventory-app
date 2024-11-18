import { z } from 'zod';

export const settingsSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  profileImage: z.string().url('Invalid URL').optional(),
});