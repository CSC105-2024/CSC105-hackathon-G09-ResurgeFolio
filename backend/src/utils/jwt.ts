//สร้าง กับ ยืนยัน JWT
import jwt from 'jsonwebtoken';
type Payload ={
    id:number
}

export const generateToken = (payload: Payload, expiresIn: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  if(expiresIn === '7d'){
    return jwt.sign(payload, secret, { expiresIn: '7d' });
  }
  return jwt.sign(payload, secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string): Payload | null => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }
  try {
    return jwt.verify(token, secret) as Payload
  } catch (error) {
    return null
  }
}