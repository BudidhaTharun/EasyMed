import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from '../components/ DoctorCard';
import './AllDoctors.css'; 
import config from '../config';

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('');
  const [filterSpeciality, setFilterSpeciality] = useState('');

  useEffect(() => {
    axios
      .get(`${config}/api/patient/doctors`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
      })
      .then((res) => {
        if (res.data.success) setDoctors(res.data.doctors);
      })
      .catch((err) => {
        console.error(err);
        
        setDoctors([
          {
            _id: '1',
            name: 'Dr. Rajesh Kumar',
            image: 'https://via.placeholder.com/150',
            experience: 12,
            phone: '123-456-7890',
            specializations: ['General Physician', 'Cardiologist']
          },
          {
            _id: '2',
            name: 'Dr. Sunita Reddy',
            image: 'https://via.placeholder.com/150',
            experience: 10,
            phone: '987-654-3210',
            specializations: ['Gynecologist']
          }
        ]);
      });
  }, []);

  const sortedDoctors = () => {
    let sorted = [...doctors];
    if (sortCriteria === 'experience') {
      sorted.sort((a, b) => b.experience - a.experience);
    }
    if (filterSpeciality) {
      sorted = sorted.filter((doc) => doc.specializations.includes(filterSpeciality));
    }
    return sorted;
  };

  return (
    <div className="all-doctors-container">
      <h1>All Doctors</h1>
      <div className="filter-container">
        <div className="filter-group">
          <label>Sort by Experience:</label>
          <button className="sort-btn" onClick={() => setSortCriteria('experience')}>Sort</button>
        </div>
        <div className="filter-group">
          <label>Filter by Speciality:</label>
          <select onChange={(e) => setFilterSpeciality(e.target.value)} value={filterSpeciality}>
            <option value="">All</option>
            <option value="General Physician">General Physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>
      </div>
      <div className="doctor-cards-container">
        {sortedDoctors().map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default AllDoctors;
