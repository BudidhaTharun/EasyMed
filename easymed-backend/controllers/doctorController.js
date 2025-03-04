import Doctor from '../models/Doctor.js';
import Schedule from '../models/Schedule.js';
import Appointment from '../models/Appointment.js';
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, phone, skills, qualifications, specializations, experience, profileImage } = req.body;
    const update = { name, phone, skills, qualifications, specializations: typeof specializations==='string'? specializations.split(',') : specializations, experience, profileImage };
    const doctor = await Doctor.findByIdAndUpdate(id, update, { new: true });
    res.json({ success: true, doctor });
  } catch(e){ res.status(500).json({ success: false, message: e.message }); }
};
export const setSchedule = async (req, res) => {
  try {
    const { id } = req.user;
    const { date, slots } = req.body;
    let scheduleDate = new Date(date);
    if((scheduleDate.getTime()-new Date().getTime())/(1000*3600*24)>3) return res.status(400).json({ success: false, message: 'Schedule can be set for max 3 days' });
    let slotObjs = slots.map(time => ({ time, status: 'free' }));
    let schedule = new Schedule({ doctor: id, date: scheduleDate, slots: slotObjs });
    await schedule.save();
    res.json({ success: true, schedule });
  } catch(e){ res.status(500).json({ success: false, message: e.message }); }
};
export const acceptAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await Appointment.findById(appointmentId);
    if(!appointment) return res.status(400).json({ success: false, message: 'Appointment not found' });
    if(appointment.status!=='pending') return res.status(400).json({ success: false, message: 'Cannot accept' });
    appointment.status = 'accepted';
    await appointment.save();
    res.json({ success: true, appointment });
  } catch(e){ res.status(500).json({ success: false, message: e.message }); }
};
export const rejectAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await Appointment.findById(appointmentId);
    if(!appointment) return res.status(400).json({ success: false, message: 'Appointment not found' });
    if(appointment.status!=='pending') return res.status(400).json({ success: false, message: 'Cannot reject' });
    appointment.status = 'rejected';
    await appointment.save();
    res.json({ success: true, appointment });
  } catch(e){ res.status(500).json({ success: false, message: e.message }); }
};
export const markBusy = async (req, res) => {
  try {
    const { scheduleId, slotTime } = req.body;
    let schedule = await Schedule.findById(scheduleId);
    if(!schedule) return res.status(400).json({ success: false, message: 'Schedule not found' });
    let slot = schedule.slots.find(s => s.time===slotTime && s.status==='free');
    if(!slot) return res.status(400).json({ success: false, message: 'Slot not available' });
    slot.status = 'busy';
    schedule.markModified('slots');
    await schedule.save();
    res.json({ success: true, schedule });
  } catch(e){ res.status(500).json({ success: false, message: e.message }); }
};
export const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await Appointment.findById(appointmentId);
    if(!appointment) return res.status(400).json({ success: false, message: 'Appointment not found' });
    if(appointment.status!=='accepted') return res.status(400).json({ success: false, message: 'Cannot complete' });
    appointment.status = 'completed';
    await appointment.save();
    res.json({ success: true, appointment });
  } catch(e){ res.status(500).json({ success: false, message: e.message }); }
};
export const getDoctorAppointments = async (req, res) => {
  try {
    const { id } = req.user;
    const appointments = await Appointment.find({ doctor: id });
    res.json({ success: true, appointments });
  } catch(e){ res.status(500).json({ success: false, message: e.message }); }
};
