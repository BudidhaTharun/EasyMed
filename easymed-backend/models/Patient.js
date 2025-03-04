import mongoose from 'mongoose';
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  profileImage: String
});
export default mongoose.model('Patient', patientSchema);
