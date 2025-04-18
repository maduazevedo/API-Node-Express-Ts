import {z} from 'zod';

export const authRegister = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string().regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/),
    password: z.string().min(6)
})

export const authValidation = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

