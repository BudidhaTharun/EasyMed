import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, phone, skills, qualifications, specializations, experience } = req.body;
    if(!name || !email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
    const existing = await Doctor.findOne({ email });
    if(existing) return res.status(400).json({ success: false, message: 'Doctor exists' });
    const hashed = await bcrypt.hash(password, 10);
    const doctor = new Doctor({ name, email, password: hashed, phone, skills, qualifications, specializations: typeof specializations==='string'? specializations.split(',') : specializations, experience });
    await doctor.save();
    const token = jwt.sign({ id: doctor._id, role: 'doctor' }, JWT_SECRET);
    res.json({ success: true, token });
  } catch(e){ res.status(500).json({ success: false, message: e.message }); }
};
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if(!doctor) return res.status(400).json({ success: false, message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, doctor.password);
    if(!match) return res.status(400).json({ success: false, message: 'Invalid credentials' });
    const token = jwt.sign({ id: doctor._id, role: 'doctor' }, JWT_SECRET);
    res.json({ success: true, token });
  } catch(e){ res.status(500).json({ success: false, message: e.message }); }
};

export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, patient.password);
    if (!match) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: patient._id, role: 'patient' }, JWT_SECRET);
    res.json({
      success: true,
      token,
      patient: {
        name: patient.name,
        email: patient.email,
        phone: patient.phone
      }
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
export const registerPatient = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
    
    const existing = await Patient.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Patient exists' });

    const hashed = await bcrypt.hash(password, 10);
    const patient = new Patient({ name, email, password: hashed, phone });
    await patient.save();

    const token = jwt.sign({ id: patient._id, role: 'patient' }, JWT_SECRET);
    res.json({
      success: true,
      token,
      patient: {
        name: patient.name,
        email: patient.email,
        phone: patient.phone
      }
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
