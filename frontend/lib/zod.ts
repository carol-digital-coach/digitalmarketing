import {object, string, number, email, boolean} from "zod"

export const UserSignUpSchema = object({
    username: string().min(3, "User name too short!"), //required_error : "User name too short"
    email: email("Invalid user email."),
    password: string().min(4, "Password too short")
})

export const UserLoginSchema = object({
    email: email("Invalid user email."),
    password: string().min(4, "Password too short")
})