import { hash, compare } from "bcryptjs";

export async function hashedPassword(password) {
    const hashedPass = await hash(password, 12)
    return hashedPass
}

export async function verifyPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword)
    return isValid
}