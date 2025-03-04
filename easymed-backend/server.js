import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import doctorRoutes from './routes/doctor.js';
import appointmentRoutes from './routes/appointment.js';
import patientRoutes from './routes/patient.js';
import uploadRoutes from './routes/upload.js';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 
app.use('/api/auth', authRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/patient', patientRoutes);
//app.use('/api/upload', uploadRoutes);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));
app.listen(process.env.PORT || 4000, () => console.log('Server started on PORT:', process.env.PORT || 4000 ,process.env.JWT_SECRET));
