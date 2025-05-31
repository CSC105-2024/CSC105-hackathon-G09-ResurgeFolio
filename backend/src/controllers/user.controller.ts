import type { Context } from "hono";
import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt'
import { generateToken,verifyToken } from "../utils/jwt.js";

const createUser = async(c:Context) => {
    try {
        const body = await c.req.json();
        if(!body.name || !body.password || !body.email) {
            return c.json({
                error: "Missing name, email or password"
            },400);
        }
        const newUser = await userModel.createUser(body.email,body.name,body.password);
        const token = generateToken({id:newUser.id, role: newUser.role},"1d");
        c.header('Set-Cookie', `userToken=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`);
        return c.json({
            success: true,
            message: "User created!",
            user: newUser
        })
    } catch (error:any) {
        console.error("Create user error: ",error);
        if(error.message == "Email already exists."){
            return c.json({
                error: "This email is already registered."
            },400)
        }
        return c.json({
            error: "Internal server error"
        },500)
        
    }
}

const createHRUser = async (c: Context) => {
  try {
    const body = await c.req.json();

    if (!body.name || !body.email || !body.password) {
      return c.json({ error: "Missing name, email or password" }, 400);
    }

    const newUser = await userModel.createHRUser(body.name, body.email, body.password);

    const token = generateToken({ id: newUser.id, role: newUser.role }, "1d");
    c.header("Set-Cookie", `userToken=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`);

    return c.json({
      success: true,
      message: "HR user created!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error: any) {
    console.error("Create HR user error:", error);
    if (error.message === "Email already exists.") {
      return c.json({ error: "This email is already registered." }, 400);
    }
    return c.json({ error: "Internal server error" }, 500);
  }
};

const loginUser = async(c:Context) => {
    try {
        const body = await c.req.json();
        const {email,password,rememberMe} = body;
        if(!email || !password){
            return c.json({
                error: "Missing email or password."
            },400)
        }
        const USER = await userModel.getUserByEmail(email);
        if(!USER) {
            return c.json({
                error: "Invalid email or password."
            },401)
        }
        const user = await userModel.loginUser(email,password);
        if(!user){
            return c.json({
                error: "Invalid email or password.",
                bodyPassword: password,
                user:user
            },401);
        }
        const expiresIn = rememberMe ? "7d" : "1d";
        const token = generateToken({id: user.id, role:user.role},expiresIn);
        let cookie = `userToken=${token}; HttpOnly; Path=/; SameSite=Strict`;
        if(rememberMe){
            const maxAge = 60*60*24*7;
            cookie += `; Max-Age=${maxAge}`;
        }
        c.header("Set-Cookie",cookie);
        return c.json({
            success: true,
            message: "Login Successful!",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            }
        })
    } catch (error) {
        console.error("Login error: ",error);
        return c.json({
            error: "Internal server error."
        },500)
    }
}

const updateName = async(c:Context) => {
    try {
        const body = await c.req.json();
        const user = c.get("user"); 
        const userId = user.id;
        if(!body.newName){
            return c.json({
                error: "New name is required."
            },400)
        }
        const updateUser = await userModel.updateUsername(userId,body.newName);
        return c.json({
            message: "Update name successfully.",
            user: {
                id: updateUser.id,
                name: updateUser.name
            }
        })
    } catch (error) {
        console.error("Update name error:",error);
        return c.json({
            error: "Internal server error", 
        },500)
    }
}

const updatePassword = async (c: Context) => {
    try {
        const body = await c.req.json();
        const user = c.get("user");
        const userId = user.id;
        const { currentPassword, newPassword } = body;
        if (!currentPassword || !newPassword) {
            return c.json({ error: "Current and new password are required." }, 400);
        }
        const foundUser = await userModel.getUserById(userId);
        if (!foundUser) {
            return c.json({ error: "User not found." }, 404);
        }
        const isMatch = await bcrypt.compare(currentPassword, foundUser.password);
        if (!isMatch) {
            return c.json({ 
                error: "Current password is incorrect.",
                isMatch: false,
            }, 401);
        }
        await userModel.updatePassword(userId, newPassword);
        return c.json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Update password error:", error);
        return c.json({ error: "Internal server error." }, 500);
    }
};

const updateEmail = async(c: Context) => {
    try {
        const body = await c.req.json();
        const user = c.get("user");
        const userId = user.id;

        if (!body.newEmail) {
            return c.json({
                error: "New email is required."
            }, 400);
        }

        const updateUser = await userModel.updateEmail(userId, body.newEmail);

        return c.json({
            message: "Email updated successfully.",
            user: {
                id: updateUser.id,
                email: updateUser.email
            }
        });
    } catch (error: any) {
        console.error("Update email error:", error);

        if (error.message === "Email is already taken.") {
            return c.json({
                error: "This email is already in use."
            }, 400);
        }

        return c.json({
            error: "Internal server error"
        }, 500);
    }
};

const logoutUser = async(c:Context) => {
    try {
        c.header("Set-Cookie","userToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict")
        return c.json({
            message: "Logged out successfully."
        })
    } catch (error) {
        console.error("Logout error:",error);
        return c.json({
            error: "Internal server error."
        },500)
    }
}

const deleteUser = async (c: Context) => {
  try {
    const user = c.get("user");
    const userId = user.id;
    const deleteUser = await userModel.deleteUser(userId);
    if(!deleteUser){
      return c.json({
        error: "Fail to delete user's account."
      },400)
    }
    return c.json({
      message: "Delete account successful.",
      isDeleted: true,
      user: deleteUser
    })
  } catch (error) {
    console.log(error);
    return c.json({
      error: "Internal server error"
    },500)
  }
};

export {createUser,createHRUser,loginUser,logoutUser,
    updateName,updatePassword,updateEmail,
    deleteUser

}