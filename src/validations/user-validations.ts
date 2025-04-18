import { fileTypeFromBuffer } from 'file-type';
import {z} from 'zod';

export const preferencesValidator = z.array(

    z.string().min(1)).min(1)


export const updateValidator = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})