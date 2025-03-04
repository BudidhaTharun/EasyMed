import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Schedule from '../models/Schedule.js';
export const bookAppointment = async (req, res) => {
  try {
    const { id } = req.user;
    const { scheduleId, slotTime } = req.body;
    let schedule = await Schedule.findById(scheduleId);
    if(!schedule) return res.status(400).json({ success: false, message: 'Schedule not found' });
    let slot = schedule.slots.find(s => s.time===slotTime && s.status==='free');
    if(!slot) return res.status(400).json({ success: false, message: 'Slot not available' });
    slot.status = 'pending';
    slot.patient = id;
    schedule.markModified('slots');
    await schedule.save();
    let appointment = new Appointment({ doctor: schedule.doctor, patient: id, schedule: scheduleId, slotTime, status: 'pending' });
    await appointment.save();
    res.json({ success: true, appointment });
  } catch(e){ res.status(500).json({ success: false, message: e.message }); }
 };
export const getPatientAppointments = async (req, res) => {
  try {
    const { id } = req.user; 

    const appointments = await Appointment.find({ patient: id })
      .populate({
        path: 'doctor',              
        select: 'name email phone profileImage skills qualifications'  
      })
      .populate({
        path: 'schedule',             
        select: 'date'              
      })
      .exec();

    if (appointments.length === 0) {
      return res.status(404).json({ success: false, message: 'No appointments found for the patient.' });
    }

    const formattedAppointments = appointments.map(appointment => ({
      doctorName: appointment.doctor.name,
      doctorEmail: appointment.doctor.email,
      doctorPhone: appointment.doctor.phone,
      doctorProfileImage: appointment.doctor.profileImage,
      doctorSkills: appointment.doctor.skills,
      doctorQualifications: appointment.doctor.qualifications,
      scheduleDate: appointment.schedule.date,
      slotTime: appointment.slotTime,
      status: appointment.status,
      createdAt: appointment.createdAt
    }));

    res.json({ success: true, appointments: formattedAppointments });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: e.message });
  }
};