import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const asyncScrypt = promisify(scrypt);

export default class Password {
    static async toHash(password: string): Promise<string> {
        const salt = randomBytes(8).toString("hex");
        const hashedPassword = (await asyncScrypt(password, salt, 64)) as Buffer;
        return `${hashedPassword.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
        const [hashedPassword, salt] = storedPassword.split('.');
        const calculatedHashed = (await asyncScrypt(suppliedPassword, salt, 64)) as Buffer;
        return hashedPassword === calculatedHashed.toString('hex');
    }
}
