import mongoose from 'mongoose';
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  profileImage: String,
  skills: String,
  qualifications: String,
  specializations: [String],
  experience: Number,
  available: { type: Boolean, default: true }
});
export default mongoose.model('Doctor', doctorSchema);
