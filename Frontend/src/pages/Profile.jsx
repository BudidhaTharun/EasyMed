import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import config from '../config';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    profileImage: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${config}/api/patient/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        const { name, email, phone, profileImage } = response.data.profile;
        setProfile({ name, email, phone, profileImage });
      } else {
        setMessage('Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setMessage('Error fetching profile data. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadPreset = "patient_upload";
  const cloudName = "tharunbudidha";

  const handleSave = async (e) => {
    e.preventDefault();
    let imageUrl = profile.profileImage;
    if (selectedImage) {
      const data = new FormData();
      data.append("file", selectedImage);
      data.append("upload_preset", uploadPreset);

      try {
        const uploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          data
        );
        imageUrl = uploadResponse.data.secure_url; 
        console.log(imageUrl);
        setMessage("Image uploaded successfully!");
        setPreviewImage(imageUrl); // Set the preview image
      } catch (error) {
        console.error("Image upload failed:", error);
        setMessage("Image upload failed. Please try again.");
        return; 
      }
    }
    try {
      const updateData = {
        name: profile.name,
        phone: profile.phone,
        profileImage: imageUrl // Use the image URL, whether it is newly uploaded or not
      };

      const updateResponse = await axios.put(
        `${config}/api/patient/profile`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (updateResponse.data.success) {
        setMessage("Profile updated successfully!");
        setEditMode(false);
        fetchProfile(); 
      } else {
        setMessage(updateResponse.data.message || "Profile update failed.");
      }
    } catch (error) {
      console.error("Profile update failed: ", error);
      setMessage("Profile update failed. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      <div className="profile-card">
        <div className="profile-image-section">
          <img
            src={previewImage || profile.profileImage || 'https://via.placeholder.com/150'}
            alt={profile.name}
            className="profile-image"
          />
          {editMode && (
            <input type="file" accept="image/*" onChange={handleImageChange} />
          )}
        </div>
        <div className="profile-form">
          <div className="form-group">
            <label>Name:</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profile.name}</span>
            )}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <span>{profile.email}</span>
          </div>
          <div className="form-group">
            <label>Phone:</label>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profile.phone}</span>
            )}
          </div>
          {editMode ? (
            <div className="button-group">
              <button onClick={handleSave} className="save-button">Save</button>
              <button onClick={() => setEditMode(false)} className="cancel-button">Cancel</button>
            </div>
          ) : (
            <button onClick={() => setEditMode(true)} className="edit-button">Edit Profile</button>
          )}
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
