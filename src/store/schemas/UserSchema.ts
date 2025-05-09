// schemas/user.ts
import { z } from 'zod'

const Name = z.string().min(2, "Имя должно быть длиннее 2х символов").transform(val => val.trim())
const Surname = z.string().min(2, "Фамилия должна быть длиннее 2х символов").transform(val => val.trim())
const MaiEmail = z.string().email("Неверный формат почты")
  .transform(val => val.trim().toLowerCase())
  .refine(
    (email) => email.endsWith('@mai.education'),
    "Почта должна содержать @mai.education"
  )
const Password = z.string().min(8, "Пароль должен содержать хотя бы 8 символов").transform(val => val.trim())

export const UserSchema = z.object({
  id: z.string(),
  name: Name,
  surname: Surname,
  email: MaiEmail
})

export const NameSchema = z.object({
  name: Name,
  surname: Surname
})

export const LoginSchema = z.object({
  email: MaiEmail,
  password: Password
})

export const RegisterSchema = z.object({
  name: Name,
  surname: Surname,
  email: MaiEmail,
  password: Password
})

export type User = z.infer<typeof UserSchema>
export type LoginPayload = z.infer<typeof LoginSchema>
export type RegisterPayload = z.infer<typeof RegisterSchema>