import React, { useEffect, useState } from "react";
import axios from "axios";
import "./History.css"; 
import config from "../config";

const History = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${config}/api/appointment`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(response.data.appointments);
      } catch (err) {
        setError("Failed to fetch history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h2 className="history-title">Appointment History</h2>

      {loading && <p className="history-loading">Loading history...</p>}
      {error && <p className="history-error">{error}</p>}

      {!loading && appointments.length === 0 && (
        <p className="history-empty">No appointments found.</p>
      )}

      {!loading && appointments.length > 0 && (
        <div className="history-list">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="history-card">
              <div className="history-card-row">
                <p><strong>Doctor:</strong> {appointment.doctorName}</p>
                <p><strong>Email:</strong> {appointment.doctorEmail}</p>
              </div>
              <div className="history-card-row">
                <p><strong>Date:</strong> {new Date(appointment.scheduleDate).toLocaleDateString()}</p>
                <p><strong>Time Slot:</strong> {appointment.slotTime}</p>
              </div>
              <div className="history-card-row">
                <p className={`history-status ${appointment.status}`}>
                  <strong>Status:</strong> {appointment.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
