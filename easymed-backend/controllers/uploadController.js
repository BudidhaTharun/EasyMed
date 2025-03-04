import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
const storage = multer.memoryStorage();
export const uploadImage = async (req, res) => {
  try {
    const fileStr = req.file.buffer.toString('base64');
    const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${fileStr}`);
    res.json({ success: true, url: result.secure_url });
  } catch(e){ res.status(500).json({ success: false, message: e.message }); }
};
