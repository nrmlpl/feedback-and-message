import { z } from 'zod';

export const userNameValidation = z
    .string()
    .min(3, "Username must be of at least 3 characters")
    .max(20, "Username must be of at most 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username can only contain alphanumeric characters");


export const signUpSchema = z.object({
    username: userNameValidation,
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: "Password must be of at least 8 characters" })
})