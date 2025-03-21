import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
      .get(`https://weddingapp-1.onrender.com/api/occasions/${id}`)
      .then((response) => {
        setOccasion(response.data); // Store the occasion data
      })
      .catch((err) => {
        console.error("Error fetching occasion:", err);
      })
      .finally(() => setLoading(false));

    axios
      .get(`https://weddingapp-1.onrender.com/api/occasions/${id}/lists`)
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
      .post(`https://weddingapp-1.onrender.com/api/occasions/${id}/lists`, { name: listName })
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
        .delete(`https://weddingapp-1.onrender.com/api/occasions/${id}/lists/${listId}`)
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
        .delete(`https://weddingapp-1.onrender.com/api/occasions/${id}`)
        .then(() => {
          navigate("/"); // Redirect after deletion
        })
        .catch((error) => {
          setError("Failed to delete occasion");
          console.error("Error deleting occasion:", error);
        });
    }
  };

  // Get list icon based on name
  const getListIcon = (listName) => {
    const name = listName.toLowerCase();
    
    if (name.includes("guest")) return "👥";
    if (name.includes("food")) return "🍽️";
    if (["dance", "sangeet", "dj"].some(word => name.includes(word))) return "🎵";
    if (["contractor", "agent", "vendor", "supplier"].some(word => name.includes(word))) return "🤝";
    if (name === "checklist") return "✅";
    if (["photos", "photo"].includes(name)) return "📸";
    
    return "📋";
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading occasion details...</p>
      </div>
    );
  }

  return (
    <div className="occasion-container">
      <div className="occasion-header">
        <h1>{occasion?.name || "Occasion Details"}</h1>
        {occasion?.date && (
          <div className="occasion-date">
            <span>📅</span> {new Date(occasion.date).toLocaleDateString()}
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="input-section">
        <h2>Add a New List</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter list name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="list-input"
          />
          <button onClick={addList} className="add-list-button">
            Add List
          </button>
        </div>
      </div>

      {/* Display Lists */}
      <h2 className="lists-heading">Your Lists</h2>
      <div className="grid-container">
        {lists.length === 0 ? (
          <div className="no-lists">No lists available for this occasion</div>
        ) : (
          lists.map((list) => (
            <div key={list._id} className="card-container">
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
                <div className="card">
                  <div className="list-icon">{getListIcon(list.name)}</div>
                  <div className="list-name">{list.name}</div>
                </div>
              </Link>
              <button onClick={() => deleteList(list._id)} className="delete-list-btn">
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button onClick={() => navigate("/")} className="back-button">
          Back to Occasions
        </button>
        <button onClick={deleteOccasion} className="delete-occasion-btn">
          Delete Occasion
        </button>
      </div>
    </div>
  );
};

export default OccasionDetails;