import React, { useState, useEffect } from "react";
import axios from "axios";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaCalendarPlus, FaRing } from "react-icons/fa";
import "./css/dashboard.css";
import logo from "./assets/Black Cream Elegant Monogram Initial Name I C Logo .jpg";

const Dashboard = () => {
  const [occasions, setOccasions] = useState([]);
  const [occasionName, setOccasionName] = useState("");
  const [occasionDate, setOccasionDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const weddingDate = new Date("2026-01-16");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://weddingapp-1.onrender.com/api/occasions")
      .then((response) => {
        setOccasions(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching occasions:", error);
        setIsLoading(false);
      });
  }, []);

  const addOccasion = () => {
    if (!occasionName) return;
    
    const newOccasion = { 
      name: occasionName,
      date: occasionDate || null
    };
    
    axios
      .post("https://weddingapp-1.onrender.com/api/occasions", newOccasion)
      .then((response) => {
        setOccasions([...occasions, response.data]);
        setOccasionName("");
        setOccasionDate("");
      })
      .catch(error => console.error("Error adding occasion:", error));
  };

  // Custom countdown renderer
  const countdownRenderer = ({ days, hours, minutes, seconds }) => (
    <div className="countdown-display">
      <div className="countdown-item">
        <span className="countdown-value">{days}</span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{hours}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{minutes}</span>
        <span className="countdown-label">Mins</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-value">{seconds}</span>
        <span className="countdown-label">Secs</span>
      </div>
    </div>
  );
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="dashboard-container"
    >
      {/* Header Section */}
      <motion.div 
        className="header-section"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <img src={logo} alt="Zneel Wedding Logo" className="logo" />
        <motion.h1 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="title"
        >
          Zneel's Wedding
        </motion.h1>
      </motion.div>

      {/* Countdown Section */}
      <motion.div 
        className="countdown-section"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="countdown-text">
          <FaRing className="icon" /> Husband-to-be & Wife-to-be in...
        </h2>
        <div className="countdown-wrapper">
          <Countdown date={weddingDate} renderer={countdownRenderer} />
        </div>
        <p className="wedding-date">
          {weddingDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </motion.div>
      <div className="dashboard-footer">
        <p>With love & excitement as we count down to forever 💍</p>
      </div>

      {/* Add Occasion Section */}
      <motion.div 
        className="add-occasion-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3><FaCalendarPlus /> Add Important Occasion</h3>
        <div className="input-container">
          <input
            type="text"
            placeholder="Occasion name (e.g., Engagement Party)"
            value={occasionName}
            onChange={(e) => setOccasionName(e.target.value)}
            className="occasion-input"
          />
          <input
            type="date"
            value={occasionDate}
            onChange={(e) => setOccasionDate(e.target.value)}
            className="date-input"
          />
          <motion.button 
            onClick={addOccasion}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="add-button"
          >
            Add to Timeline
          </motion.button>
        </div>
      </motion.div>

      {/* Occasions Grid */}
      <motion.div 
        className="occasions-section"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3><FaHeart /> Wedding Timeline</h3>
        {isLoading ? (
          <div className="loading-spinner">Loading occasions...</div>
        ) : occasions.length === 0 ? (
          <p className="no-occasions">No occasions added yet. Start building your wedding timeline!</p>
        ) : (
          <div className="occasions-grid">
            {occasions.map((occasion, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                key={occasion._id}
              >
                <Link
                  to={`/occasion/${occasion._id}`}
                  className="occasion-card"
                >
                  <h4>{occasion.name}</h4>
                  {occasion.date && (
                    <p className="occasion-date">
                      {new Date(occasion.date).toLocaleDateString()}
                    </p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Footer */}
    </motion.div>
  );
};

export default Dashboard;