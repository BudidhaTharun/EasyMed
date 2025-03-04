import { useNavigate } from 'react-router-dom';
import './DoctorCard.css'; 
import defaultImage from '../assets/doctor1.jpeg';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/appointments/${doctor._id}`);
  };

  return (
    <div className="doctor-card">
      <img 
        src={defaultImage} 
        alt={doctor.name} 
        className="doctor-image" 
      />
      <div className="doctor-info">
        <h3 className="doctor-name">{doctor.name}</h3>
        <p className="doctor-phone">Phone: {doctor.phone}</p>
        <p className="doctor-experience">Experience: {doctor.experience} years</p>
        <div className="doctor-specializations">
          <p><strong>Specializations:</strong></p>
          {doctor.specializations.map((spec, index) => (
            <span key={index}>{spec}{index < doctor.specializations.length - 1 && ', '}</span>
          ))}
        </div>
      </div>
      <button className="view-appointments-btn" onClick={handleClick}>View Appointments</button>
    </div>
  );
};

export default DoctorCard;
