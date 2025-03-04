import Doctor from '../models/Doctor.js';
import Schedule from '../models/Schedule.js';
import User from '../models/Patient.js';
import Appointment from '../models/Appointment.js';
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json({ success: true, doctors });
  } catch(e){ res.status(500).json({ success: false, message: e.message }); }
};
export const getDoctorSchedule = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const schedules = await Schedule.find({ doctor: doctorId });
    res.json({ success: true, schedules });
  } catch(e){ res.status(500).json({ success: false, message: e.message }); }
};
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're extracting the user ID from the token
    const user = await User.findById(userId); // Fetch the user from the database

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      profile: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage || 'https://via.placeholder.com/150'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const updateProfile = async (req, res) => {
  console.log("Decoded User:", req.user);


  const { name, phone, profileImage } = req.body;

  try {
    const patient = await User.findById(req.user.id);
    if (!patient) {
      console.log("Patient not found in database");
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    console.log("Patient found:", patient);

    patient.name = name || patient.name;
    patient.phone = phone || patient.phone;
    patient.profileImage = profileImage || patient.profileImage;

    await patient.save();
    console.log("Profile updated successfully!");

    res.json({ success: true, message: 'Profile updated successfully!' });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ success: false, message: 'Profile update failed' });
  }
};
