import express from 'express';
import uploadMiddleware from '../middleware/uploadMiddleware.js';
import { uploadImage } from '../controllers/uploadController.js';
const router = express.Router();
router.post('/', uploadMiddleware.single('image'), uploadImage);
export default router;
