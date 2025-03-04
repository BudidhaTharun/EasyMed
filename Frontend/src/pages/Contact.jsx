import React from 'react';

function Contact() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src="https://res.cloudinary.com/tharunbudidha/image/upload/v1739903740/EasyMed/patient/kf2zp9egkhs1k4y8yoaz.jpg"
          alt="Tharun Budidha"
          style={styles.profileImage}
        />
        <h1 style={styles.heading}>
          Hi, I'm <span style={styles.name}>Tharun Budidha</span> 👋
        </h1>
        <p style={styles.subtitle}>Full Stack Developer | Passionate about Problem-Solving</p>

        <div style={styles.details}>
          <p>☕ Fueled by coffee</p>
          <p>📍 Based in India</p>
          <p>💼  MERN stack Developer</p>
          <p>📧 
  <a 
   href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=tharunbudidha@gmail.com" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={styles.link}
  >
    tharunbudidha@gmail.com
  </a>
</p>

          <p>📞 <a href="tel:+919948672403" style={styles.link}>+91 99486 72403</a></p>
        </div>

        <div style={styles.socialIcons}>
          <a href="https://www.linkedin.com/in/tharun-budidha/" style={styles.icon}>🔗 LinkedIn</a>
          <a href="https://github.com/BudidhaTharun" style={styles.icon}>💻 GitHub</a>
        </div>
      </div>
    </div>
  );
}

// Styles with a clean white background, shadows & smooth animations
const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',  // Clean white background
  },
  card: {
    textAlign: 'center',
    background: '#ffffff',
    padding: '50px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', // Smooth shadow
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    width: '400px',
  },
  cardHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
  },
  profileImage: {
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    border: '3px solid #007bff',
    transition: 'transform 0.3s',
  },
  heading: {
    fontSize: '26px',
    margin: '15px 0',
    fontWeight: 'bold',
    color: '#333',
  },
  name: {
    color: '#007bff',
  },
  subtitle: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
  },
  details: {
    fontSize: '16px',
    color: '#444',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  },
  socialIcons: {
    marginTop: '20px',
  },
  icon: {
    display: 'inline-block',
    margin: '0 10px',
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s, transform 0.2s',
  },
};

// Adding hover effects dynamically
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector('.card');
  if (card) {
    card.addEventListener("mouseenter", () => {
      Object.assign(card.style, styles.cardHover);
    });
    card.addEventListener("mouseleave", () => {
      Object.assign(card.style, styles.card);
    });
  }
});

export default Contact;
