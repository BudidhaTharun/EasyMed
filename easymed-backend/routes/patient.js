import express from 'express';
import { getDoctors, getDoctorSchedule ,getProfile,updateProfile  } from '../controllers/patientController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/profile', verifyToken, getProfile);  
router.put('/profile', verifyToken, updateProfile);  
router.get('/doctors', getDoctors);
router.get('/doctor/:doctorId/schedule', getDoctorSchedule);
export default router;
