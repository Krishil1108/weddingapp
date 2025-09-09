import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  FaArrowLeft, 
  FaTrash, 
  FaPlus, 
  FaCalendarAlt, 
  FaUsers, 
  FaUtensils, 
  FaMusic, 
  FaHandshake, 
  FaCheckSquare, 
  FaCamera,
  FaClipboardList,
  FaTimes,
  FaHeart,
  FaStar
} from "react-icons/fa";
import "./css/occasiondetails.css";

const OccasionDetails = () => {
  const { id } = useParams(); // Occasion ID
  const [occasion, setOccasion] = useState(null); // Store occasion details
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate(); // Initialize useNavigate for redirecting

  // Fetch occasion and lists for this occasion
  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`https://weddingapp-kayp.onrender.com/api/occasions/${id}`)
      .then((response) => {
        setOccasion(response.data); // Store the occasion data
      })
      .catch((err) => {
        console.error("Error fetching occasion:", err);
      })
      .finally(() => setLoading(false));

    axios
      .get(`https://weddingapp-kayp.onrender.com/api/occasions/${id}/lists`)
      .then((response) => {
        setLists(response.data);
      })
      .catch((err) => {
        console.error("Error fetching lists:", err);
      });
  }, [id]);

  const addList = () => {
    if (!listName) return;
    axios
      .post(`https://weddingapp-kayp.onrender.com/api/occasions/${id}/lists`, { name: listName })
      .then((response) => {
        setLists([...lists, response.data]);
        setListName("");
      })
      .catch((err) => {
        setError("Failed to add list");
        console.error("Error adding list:", err);
      });
  };

  const deleteList = (listId) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      axios
        .delete(`https://weddingapp-kayp.onrender.com/api/occasions/${id}/lists/${listId}`)
        .then(() => {
          setLists(lists.filter((list) => list._id !== listId));
        })
        .catch((error) => {
          setError("Failed to delete list");
          console.error("Error deleting list:", error);
        });
    }
  };

  const deleteOccasion = () => {
    if (window.confirm("Are you sure you want to delete this occasion?")) {
      axios
        .delete(`https://weddingapp-kayp.onrender.com/api/occasions/${id}`)
        .then(() => {
          navigate("/"); // Redirect after deletion
        })
        .catch((error) => {
          setError("Failed to delete occasion");
          console.error("Error deleting occasion:", error);
        });
    }
  };

  // Get list icon based on name with React Icons
  const getListIcon = (listName) => {
    const name = listName.toLowerCase();
    
    if (name.includes("guest")) return <FaUsers className="list-icon-svg" />;
    if (name.includes("food")) return <FaUtensils className="list-icon-svg" />;
    if (["dance", "sangeet", "dj"].some(word => name.includes(word))) return <FaMusic className="list-icon-svg" />;
    if (["contractor", "agent", "vendor", "supplier"].some(word => name.includes(word))) return <FaHandshake className="list-icon-svg" />;
    if (name === "checklist") return <FaCheckSquare className="list-icon-svg" />;
    if (["photos", "photo"].includes(name)) return <FaCamera className="list-icon-svg" />;
    
    return <FaClipboardList className="list-icon-svg" />;
  };

  // Get occasion icon for header
  const getOccasionIcon = () => {
    if (!occasion?.name) return <FaStar />;
    const name = occasion.name.toLowerCase();
    if (name.includes('engagement') || name.includes('proposal')) return <FaHeart />;
    if (name.includes('party') || name.includes('celebration')) return <FaStar />;
    return <FaCalendarAlt />;
  };

  if (loading) {
    return (
      <motion.div 
        className="loading-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="spinner"></div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading your occasion details...
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="occasion-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="occasion-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="header-content">
          <div className="occasion-title">
            <div className="occasion-icon">
              {getOccasionIcon()}
            </div>
            <h1>{occasion?.name || "Occasion Details"}</h1>
          </div>
          {occasion?.date && (
            <motion.div 
              className="occasion-date"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FaCalendarAlt className="date-icon" />
              <span>{new Date(occasion.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FaTimes className="error-icon" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="input-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2>
          <FaPlus className="section-icon" />
          Create New List
        </h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter list name (e.g., Guest List, Food Menu)"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="list-input"
            onKeyPress={(e) => e.key === 'Enter' && addList()}
          />
          <motion.button 
            onClick={addList} 
            className="add-list-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!listName.trim()}
          >
            <FaPlus className="button-icon" />
            Add List
          </motion.button>
        </div>
      </motion.div>

      {/* Display Lists */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="lists-heading">
          <FaClipboardList className="section-icon" />
          Your Lists ({lists.length})
        </h2>
        <div className="grid-container">
          {lists.length === 0 ? (
            <motion.div 
              className="no-lists"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <FaClipboardList className="empty-icon" />
              <p>No lists created yet</p>
              <span>Start by adding your first list above!</span>
            </motion.div>
          ) : (
            <AnimatePresence>
              {lists.map((list, index) => (
                <motion.div 
                  key={list._id} 
                  className="card-container"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  layout
                >
                  <Link
                    to={
                      list.name.toLowerCase().includes("guest")
                        ? `/occasion/${id}/guest-list/${list._id}`
                        : list.name.toLowerCase().includes("food")
                        ? `/occasion/${id}/food-items/${list._id}`
                        : ["dance", "sangeet", "dj"].some((word) =>
                            list.name.toLowerCase().includes(word)
                          )
                        ? `/occasion/${id}/dance-list/${list._id}`
                        : ["contractor", "agent", "vendor", "supplier", "agents", "vendors", "contractors"].some((word) =>
                            list.name.toLowerCase().includes(word)
                          )
                        ? `/occasion/${id}/contractor-list/${list._id}`
                        : list.name.toLowerCase() === "checklist"
                        ? `/occasion/${id}/checklist/${list._id}`
                        : ["photos", "photo"].includes(list.name.toLowerCase())
                        ? `/occasion/${id}/photos/${list._id}`
                        : "#"
                    }
                    className="card-link"
                  >
                    <motion.div 
                      className="card"
                      whileHover={{ 
                        y: -8, 
                        boxShadow: "0 20px 40px rgba(0,0,0,0.15)" 
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="list-icon">{getListIcon(list.name)}</div>
                      <div className="list-name">{list.name}</div>
                      <div className="list-subtitle">Click to manage</div>
                    </motion.div>
                  </Link>
                  <motion.button 
                    onClick={() => deleteList(list._id)} 
                    className="delete-list-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTrash />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="action-buttons"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.button 
          onClick={() => navigate("/")} 
          className="back-button"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="button-icon" />
          Back to Dashboard
        </motion.button>
        <motion.button 
          onClick={deleteOccasion} 
          className="delete-occasion-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaTrash className="button-icon" />
          Delete Occasion
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default OccasionDetails;