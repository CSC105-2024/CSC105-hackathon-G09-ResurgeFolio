import { db } from "../index.js";
import bcrypt from 'bcrypt'

const createUser = async(email:string,name:string,password:string) => {
   const existing = await db.user.findUnique({
    where: {email: email},
   })
   if(existing){
    throw new Error("Email already exists.")
   }
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
// we don't use it in integration 
const createHRUser = async (name: string, email: string, password: string) => {
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "HR", 
    },
  });

  return user;
};

const loginUser = async(email:string, password:string) => {
    const user = await db.user.findUnique({where:{email}})
    if(!user) return null;
    const passwordMatch = await bcrypt.compare(password,user.password);
    if(!passwordMatch) return null;
    return user;
}

const getUserById = async(id:number) => {
    const user = await db.user.findUnique({where: {id}})
    if(!user) return null;
    return user
}
const getUserByEmail = async(email:string)=> {
    const user = await db.user.findUnique({where: {email}})
    if(!user) return null;
    return user;
}

const updateUsername = async(id:number,newName:string) => {
    return db.user.update({
        where: {id},
        data: {
            name:newName
        }
    })
}

const updatePassword = async(id:number, newPassword:string) => {
    const hashPassword = await bcrypt.hash(newPassword,10);
    return db.user.update({
        where: {id},
        data: {
            password:hashPassword
        }
    })
}

const updateEmail = async (id: number, newEmail: string) => {
    const existingUser = await db.user.findUnique({
        where: { email: newEmail }
    });

    if (existingUser && existingUser.id !== id) {
        throw new Error("Email is already taken.");
    }

    return db.user.update({
        where: { id },
        data: { email: newEmail }
    });
};
const deleteUser = async (id: number) => {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) return null;

    return db.$transaction(async (prisma) => {
        await prisma.portfolio.deleteMany({
            where: { userId: id }
        });
        return prisma.user.delete({
            where: { id }
        });
    });
}


export default {createUser,createHRUser,loginUser,
    getUserById,getUserByEmail,
    updateUsername,updatePassword,updateEmail,
    deleteUser
}
