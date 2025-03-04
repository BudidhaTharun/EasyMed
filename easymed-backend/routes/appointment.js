import express from 'express';
import { bookAppointment, getPatientAppointments } from '../controllers/appointmentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/book', verifyToken, bookAppointment);
router.get('/', verifyToken, getPatientAppointments);
export default router;
