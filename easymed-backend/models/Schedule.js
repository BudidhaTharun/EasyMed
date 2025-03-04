import mongoose from 'mongoose';
const slotSchema = new mongoose.Schema({
  time: { type: String, required: true },
  status: { type: String, enum: ['free','pending','booked','busy'], default: 'free' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: null },
  updatedAt: { type: Date, default: null }
});
const scheduleSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  slots: [slotSchema]
});
export default mongoose.model('Schedule', scheduleSchema);
