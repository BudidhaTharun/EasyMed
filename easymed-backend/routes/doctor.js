import express from 'express';
import { updateProfile, setSchedule, acceptAppointment, rejectAppointment, markBusy, completeAppointment, getDoctorAppointments } from '../controllers/doctorController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();
router.put('/profile', verifyToken, updateProfile);
router.post('/schedule', verifyToken, setSchedule);
router.post('/appointment/accept', verifyToken, acceptAppointment);
router.post('/appointment/reject', verifyToken, rejectAppointment);
router.post('/schedule/markbusy', verifyToken, markBusy);
router.post('/appointment/complete', verifyToken, completeAppointment);
router.get('/appointments', verifyToken, getDoctorAppointments);
export default router;
