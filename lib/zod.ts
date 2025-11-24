import {object, string, number, email, boolean} from "zod"

export const UserSignUpSchema = object({
    username: string({required: "Provide a username"}).min(3),
    email: email({required: "Provide a email"}),
    admin: boolean(),
    password: string({required: "Provide account password"}).min(4)
})

export const UserLoginSchema = object({
    email: email({required: "Provide a email"}),
    password: string({required: "Provide account password"}).min(4)
})