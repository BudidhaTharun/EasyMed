import mongoose from 'mongoose';
const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true },
  slotTime: { type: String, required: true },
  status: { type: String, enum: ['pending','accepted','rejected','completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Appointment', appointmentSchema);
