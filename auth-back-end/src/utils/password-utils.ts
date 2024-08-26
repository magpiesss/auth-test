import {randomBytes, scrypt, timingSafeEqual} from "node:crypto";
import {promisify} from 'util';

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buffer.toString('hex')}.${salt}`;
}

export async function comparePassword(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split(".");
    const hashedPasswordBuffer = Buffer.from(hashedPassword, "hex");
    const suppliedPasswordBuffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return timingSafeEqual(hashedPasswordBuffer, suppliedPasswordBuffer);
}

export function isPasswordValid(password: string | null): boolean {
    if (!password) return false;
    return password.length >= 8;
}

export function isEmailValid(email: string | null): boolean {
    if (!email) return false;
    return !!email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}