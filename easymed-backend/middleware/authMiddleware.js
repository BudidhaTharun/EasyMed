import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if(!token) return res.status(401).json({ success: false, message: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch(e){ res.status(401).json({ success: false, message: 'Invalid token' }); }
};