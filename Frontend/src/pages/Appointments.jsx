import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import defaultImage from '../assets/doctor1.jpeg';
import config from '../config';
const outerContainer = {
  backgroundColor: '#f2f2f2',
  minHeight: '100vh',
  padding: '20px',
};

const doctorInfoStyle = {
  backgroundColor: '#f2f2f2',
  border: '2px solid #f2f2f2',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
  margin: '0 auto 20px auto',
};

const scheduleContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
};

const scheduleBoxStyle = {
  backgroundColor: '#fff',
  border: '2px solid black',
  borderRadius: '8px',
  padding: '20px',
  width: 'calc(50% - 20px)',
  maxWidth: '500px',
};

const scheduleHeader = {
  textAlign: 'center',
  color: 'red',
  marginBottom: '10px',
};

const slotListStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

const slotItemStyle = (isSelected, status) => {
  const base = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    marginBottom: '10px',
    borderRadius: '5px',
    cursor: status === 'free' ? 'pointer' : 'default',
    transition: 'transform 0.2s',
  };
  let bgColor = '';
  switch (status) {
    case 'free':
      bgColor = '#1e90ff';
      break;
    case 'busy':
      bgColor = '#ff4d4d';
      break;
    case 'pending':
      bgColor = '#ffa500';
      break;
    case 'accepted':
    case 'completed':
      bgColor = '#32cd32';
      break;
    default:
      bgColor = '#1e90ff';
  }
  return {
    ...base,
    backgroundColor: bgColor,
    color: '#fff',
    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
  };
};

const buttonContainerStyle = {
  textAlign: 'center',
  marginTop: '20px',
};

const bookButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#1e90ff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const messageStyle = {
  textAlign: 'center',
  marginTop: '20px',
  fontWeight: 'bold',
  color: '#1e90ff',
};

const Appointments = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const token = localStorage.getItem('authToken');
  

  useEffect(() => {
    axios
      .get(`${config}/api/patient/doctors`, {
        headers: { Authorization: `Bearer ${token || ''}` },
      })
      .then((res) => {
        if (res.data.success) {
          const doc = res.data.doctors.find((d) => d._id === doctorId);
          setDoctor(doc);
        }
      })
      .catch(() => {
        setDoctor({
          _id: doctorId,
          name: 'Dr. Rajesh Kumar',
          image: 'https://via.placeholder.com/150',
          designation: 'General Physician',
          qualification: 'MBBS, MD',
          experience: 12,
        });
      });
    axios
      .get(`${config}/api/patient/doctor/${doctorId}/schedule`, {
        headers: { Authorization: `Bearer ${token || ''}` },
      })
      .then((res) => {
        if (res.data.success) setSchedules(res.data.schedules);
      })
      .catch(() => {
        setSchedules([
          {
            _id: 'schedule1',
            date: '2024-11-01',
            slots: [
              { time: '09:00 AM - 10:00 AM', status: 'free' },
              { time: '10:00 AM - 11:00 AM', status: 'free' },
              { time: '11:00 AM - 12:00 PM', status: 'busy' },
            ],
          },
        ]);
      });
  }, [doctorId, token]);

  const handleSlotSelect = (scheduleId, slotTime, status) => {
    if (status !== 'free') return;
    setSelectedBooking({ scheduleId, slotTime });
    setMessage('');
  };

  const handleBookSlot = () => {
    if (!token) {
      alert('Please login to book an appointment.');
      return;
    }
    if (!selectedBooking) {
      setMessage('Please select a free slot to book.');
      return;
    }
    axios
      .post(
        `${config}/api/appointment/book`,
        selectedBooking,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.success) {
          setMessage('Appointment booked successfully!');
          setSelectedBooking(null);
        }
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || 'Booking error');
      });
  };

  return (
    <div style={outerContainer}>
      {doctor && (
        <div style={doctorInfoStyle}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#1e90ff' ,fontSize:'30px' ,marginBottom:'2em' }}>Appointments with {doctor.name}</h2>
            <img
              src={doctor.image || defaultImage}
              alt={doctor.name}
              style={{
                width: '200px',
                borderRadius: '50%',
                border: '2px solid white',
                marginBottom: '10px',
              }}
            />
            <p ><strong> Experience: </strong> {doctor.experience} yrs</p>
            <p > <strong>Specialisation :</strong>{doctor.specializations.map((spec, index) => (
            <span key={index}>{spec}{index < doctor.specializations.length - 1 && ', '}</span>
          ))}</p>
             <p> <strong> phone : </strong> {doctor.phone}</p>
          </div>
        </div>
      )}

      <div style={scheduleContainer}>
        {schedules.map((schedule) => (
          <div key={schedule._id} style={scheduleBoxStyle}>
            <h4 style={scheduleHeader}>{new Date(schedule.date).toISOString().split('T')[0]}</h4>
            <ul style={slotListStyle}>
              {schedule.slots.map((slot, index) => {
                const isSelected =
                  selectedBooking &&
                  selectedBooking.scheduleId === schedule._id &&
                  selectedBooking.slotTime === slot.time;
                return (
                  <li
                    key={index}
                    style={slotItemStyle(isSelected, slot.status)}
                    onClick={() =>
                      handleSlotSelect(schedule._id, slot.time, slot.status)
                    }
                  >
                    {slot.time} - {slot.status.toUpperCase()}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {selectedBooking && (
        <div style={buttonContainerStyle}>
          <button style={bookButtonStyle} onClick={handleBookSlot}>
            Book Selected Slot
          </button>
        </div>
      )}

      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

export default Appointments;
