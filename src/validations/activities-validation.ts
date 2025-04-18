import {z} from 'zod';

export const createValidation = z.object({
    title: z.string(),
    description: z.string(),
    type: z.string(),
    address: z.string(),
    scheduledDate: z.string(),
    isPrivate: z.string()
})

export const idValidation = z.string().uuid()

export const updateValidation = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.string(),
  address: z.string(),
  scheduledDate: z.string(),
  isPrivate: z.string()
})