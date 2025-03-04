import express from 'express';
import { registerDoctor, loginDoctor, registerPatient, loginPatient } from '../controllers/authController.js';
const router = express.Router();
router.post('/doctor/register', registerDoctor);
router.post('/doctor/login', loginDoctor);
router.post('/patient/register', registerPatient);
router.post('/patient/login', loginPatient);
export default router;
