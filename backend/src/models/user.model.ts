import { db } from "../index.js";
import bcrypt from 'bcrypt'

const createUser = async(email:string,name:string,password:string) => {
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await db.user.create({
        data: {
            email: email,
            name: name,
            password: hashedPassword,
        }
    })
    return user;
}