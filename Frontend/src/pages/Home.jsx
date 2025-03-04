import React from 'react';
import './Pages.css';
import head from '../assets/header_img.png';
import './Styling.css'
import gp from '../assets/group_profiles.png';
import physician from '../assets/Doctors/General_physician.svg';
import Gynecologist from '../assets/Doctors/Gynecologist.svg'
import Gastroenterologist from '../assets/Doctors/Gastroenterologist.svg'
import Dermatologist from '../assets/Doctors/Dermatologist.svg'
import Neurologist from '../assets/Doctors/Neurologist.svg'
import Pediatricians from '../assets/Doctors/Pediatricians.svg'
import appointment_image from '../assets/appointment_img.png'

function Home() {
  const handleCreateaccount =()=>{
    window.location.href = "/authpage";
  }
  return (
    <div className="page">
      <div className='book'>
        <div className="book-left">
  <h2>
    Book Appointment <br /> With Trusted Doctors
  </h2>
  <span className="book-description">
    <img src={gp} alt="GP" className="desc-img" />
    <p>Simply browse through our extensive list of trusted doctors,
    schedule your appointment hassle-free.</p> 
  </span>
  <button className="btn">Book Appointment</button>
</div>
        <div className="book-right">
          <img src={head} alt="head image"/>
        </div>
      </div>
      <div className='book-down'>
        <h2>Find by Speciality</h2>
        <p style={{textAlign:"center"}}>Simply browse through our extensive list of trusted doctors,<br/>             
           schedule your appointment hassle-free.</p>
        
              <span className="doctor-container">
  <div className="doctor">
    <div className="doctor-img-container">
      <img src={physician} alt="General Physician" />
      <div className="designation">General Physician</div>
    </div>
  </div>
  <div className="doctor">
    <div className="doctor-img-container">
      <img src={Gynecologist} alt="Gynecologist" />
      <div className="designation">Gynecologist</div>
    </div>
  </div>
  <div className="doctor">
    <div className="doctor-img-container">
      <img src={Gastroenterologist} alt="Gastroenterologist" />
      <div className="designation">Gastroenterologist</div>
    </div>
  </div>
  <div className="doctor">
    <div className="doctor-img-container">
      <img src={Pediatricians} alt="Pediatricians" />
      <div className="designation">Pediatricians</div>
    </div>
  </div>
  <div className="doctor">
    <div className="doctor-img-container">
      <img src={Neurologist} alt="Neurologist" />
      <div className="designation">Neurologist</div>
    </div>
  </div>
  <div className="doctor">
    <div className="doctor-img-container">
      <img src={Dermatologist} alt="Dermatologist" />
      <div className="designation">Dermatologist</div>
    </div>
  </div>
</span>
      </div>

      <div className='book-down'>
        <h2>Top Doctors to book</h2>
        <p style={{textAlign:"center"}}>Simply browse through our extensive list of trusted doctors.</p>
        
             <div style={{marginTop:"2em" ,border:"2px solid white" ,borderRadius:"20px",paddingLeft:"2.8em" ,paddingRight:"2.8em" 
              ,paddingTop:"1.2em",paddingBottom:"1.2em", backgroundColor:"rgb(218, 224, 245)" , cursor:"pointer"}}>
             More</div>
      </div>

      <div className='book-down2'>
        <div className="book-left2">
       <h1> Book Appointment<br/>
       With 100+ Trusted Doctors</h1>
       <button style={{fontSize:"1.6em",paddingLeft:"1.3em",paddingRight:"1.3em",marginTop:"1.5em"  ,paddingTop:"0.8em",paddingBottom:"0.8em" ,borderRadius:"16px",backgroundColor:"rgb(73, 162, 227)",
        border:"none",cursor:"pointer",fontFamily:"serif" ,color:"white"
       }} onClick={handleCreateaccount}>Create Account</button>
</div>
        <div className="book-right2">
          <img src={appointment_image} alt="head image"/>
        </div>
      </div>
    </div>
  );
}

export default Home;
