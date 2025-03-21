// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./css/dancelist.css";

// const DanceListPage = () => {
//   const { occasionId, listId } = useParams();
//   const [dances, setDances] = useState([]);
//   const [danceName, setDanceName] = useState("");
//   const [numDancers, setNumDancers] = useState("");
//   const [dancerNames, setDancerNames] = useState("");
//   const [songLinkOrNote, setSongLinkOrNote] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [editDanceId, setEditDanceId] = useState(null); // For edit functionality

//   // Fetch dance performances
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/dances`)
//       .then((response) => {
//         setDances(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching dances:", err);
//         setError("Failed to fetch dance performances.");
//         setLoading(false);
//       });
//   }, [occasionId, listId]);

//   const addDance = () => {
//     const newDance = {
//       danceName,
//       numberOfPerformers: numDancers,
//       dancerNames,
//       songLinkOrNote,
//     };

//     setLoading(true);
//     axios
//       .post(`https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/dances`, newDance)
//       .then((response) => {
//         setDances([...dances, response.data]);
//         setDanceName("");
//         setNumDancers("");
//         setDancerNames("");
//         setSongLinkOrNote("");
//         setError(null);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error adding dance:", err.response ? err.response.data : err.message);
//         setError("Failed to add dance performance.");
//         setLoading(false);
//       });
//   };

//   const editDance = (danceId) => {
//     const danceToEdit = dances.find((dance) => dance._id === danceId);
//     if (danceToEdit) {
//       setDanceName(danceToEdit.danceName);
//       setNumDancers(danceToEdit.numberOfPerformers);
//       setDancerNames(danceToEdit.dancerNames);
//       setSongLinkOrNote(danceToEdit.songLinkOrNote);
//       setEditDanceId(danceId);
//     }
//   };

//   const updateDance = () => {
//     const updatedDance = {
//       danceName,
//       numberOfPerformers: numDancers,
//       dancerNames,
//       songLinkOrNote,
//     };

//     setLoading(true);
//     axios
//       .put(`https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/dances/${editDanceId}`, updatedDance)
//       .then((response) => {
//         const updatedDances = dances.map((dance) =>
//           dance._id === editDanceId ? response.data : dance
//         );
//         setDances(updatedDances);
//         setDanceName("");
//         setNumDancers("");
//         setDancerNames("");
//         setSongLinkOrNote("");
//         setEditDanceId(null);
//         setError(null);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error updating dance:", err.response ? err.response.data : err.message);
//         setError("Failed to update dance performance.");
//         setLoading(false);
//       });
//   };

//   const deleteDance = (danceId) => {
//     setLoading(true);
//     axios
//       .delete(`https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/dances/${danceId}`)
//       .then(() => {
//         setDances(dances.filter((dance) => dance._id !== danceId));
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error deleting dance:", err.response ? err.response.data : err.message);
//         setError("Failed to delete dance performance.");
//         setLoading(false);
//       });
//   };

//   const removeAllDances = () => {
//     setLoading(true);
//     axios
//       .delete(`https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/dances`)
//       .then(() => {
//         setDances([]);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error removing all dances:", err.response ? err.response.data : err.message);
//         setError("Failed to remove all dance performances.");
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="container">
//       <h1>Dance Performances</h1>

//       {/* Total Dances Count at the Top */}
//       <h3>Total Dances: {dances.length}</h3>

//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Enter Dance Name"
//           value={danceName}
//           onChange={(e) => setDanceName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Number of Dancers"
//           value={numDancers}
//           onChange={(e) => setNumDancers(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter Dancer Names (comma separated)"
//           value={dancerNames}
//           onChange={(e) => setDancerNames(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter Song Link or Note"
//           value={songLinkOrNote}
//           onChange={(e) => setSongLinkOrNote(e.target.value)}
//         />
//         <button
//           onClick={editDanceId ? updateDance : addDance}
//           disabled={loading}
//         >
//           {loading ? (editDanceId ? "Updating..." : "Adding...") : editDanceId ? "Update Dance" : "Add Dance"}
//         </button>
//       </div>

//       {/* Error Message */}
//       {error && <div className="error">{error}</div>}

//       {/* Remove All Dances Button */}
//       <button className="remove-all-dances" onClick={removeAllDances} disabled={loading}>
//         {loading ? "Removing..." : "Remove All Dances"}
//       </button>

//       {/* Dance List Table */}
//       <table className="dance-list-table">
//         <thead>
//           <tr>
//             <th>Dance Name</th>
//             <th>Number of Dancers</th>
//             <th>Dancer Names</th>
//             <th>Song Link or Note</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dances.length > 0 ? (
//             dances.map((dance) => (
//               <tr key={dance._id}>
//                 <td>{dance.danceName}</td>
//                 <td>{dance.numberOfPerformers}</td>
//                 <td>{dance.dancerNames}</td>
//                 <td>{dance.songLinkOrNote}</td>
//                 <td>
//                   <button onClick={() => editDance(dance._id)} disabled={loading}>
//                     Edit
//                   </button>
//                   <button onClick={() => deleteDance(dance._id)} disabled={loading}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No dances added yet</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DanceListPage;









import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/dancelist.css"; // Import the scoped CSS file
// Add FontAwesomeIcon import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Optimized FontAwesome imports - only including what's actually used
import { 
  faUsers, 
  faUserFriends, 
  faMusic, 
  faStar, 
  faEdit, 
  faTrash, 
  faSync, 
  faPlus, 
  faMinus,
  faCheck,
  faTimes,
  faSpinner,
  faExclamationTriangle,
  faSignature,
  faFeather,
  faCompactDisc,
  faFire,
  faDiamond
} from "@fortawesome/free-solid-svg-icons";

const DanceListPage = () => {
  const { occasionId, listId } = useParams();
  const [dances, setDances] = useState([]);
  const [danceName, setDanceName] = useState("");
  const [numDancers, setNumDancers] = useState("");
  const [dancerNames, setDancerNames] = useState("");
  const [songLinkOrNote, setSongLinkOrNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editDanceId, setEditDanceId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [danceToDelete, setDanceToDelete] = useState(null);
  const [formVisible, setFormVisible] = useState(true);

  // Fetch dance performances
  useEffect(() => {
    fetchDances();
  }, [occasionId, listId]);

  const fetchDances = () => {
    setLoading(true);
    axios
      .get(`https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/dances`)
      .then((response) => {
        setDances(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dances:", err);
        setError("Failed to fetch dance performances.");
        setLoading(false);
      });
  };

  const addDance = () => {
    if (!danceName.trim()) {
      setError("Dance name is required!");
      return;
    }

    const newDance = {
      danceName,
      numberOfPerformers: numDancers,
      dancerNames,
      songLinkOrNote,
    };

    setLoading(true);
    axios
      .post(`https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/dances`, newDance)
      .then((response) => {
        setDances([...dances, response.data]);
        resetForm();
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error adding dance:", err.response ? err.response.data : err.message);
        setError("Failed to add dance performance.");
        setLoading(false);
      });
  };

  const editDance = (danceId) => {
    setFormVisible(true);
    const danceToEdit = dances.find((dance) => dance._id === danceId);
    if (danceToEdit) {
      setDanceName(danceToEdit.danceName);
      setNumDancers(danceToEdit.numberOfPerformers);
      setDancerNames(danceToEdit.dancerNames);
      setSongLinkOrNote(danceToEdit.songLinkOrNote);
      setEditDanceId(danceId);
    }
  };

  const updateDance = () => {
    if (!danceName.trim()) {
      setError("Dance name is required!");
      return;
    }

    const updatedDance = {
      danceName,
      numberOfPerformers: numDancers,
      dancerNames,
      songLinkOrNote,
    };

    setLoading(true);
    axios
      .put(`https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/dances/${editDanceId}`, updatedDance)
      .then((response) => {
        const updatedDances = dances.map((dance) =>
          dance._id === editDanceId ? response.data : dance
        );
        setDances(updatedDances);
        resetForm();
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error updating dance:", err.response ? err.response.data : err.message);
        setError("Failed to update dance performance.");
        setLoading(false);
      });
  };

  const confirmDelete = (danceId) => {
    setDanceToDelete(danceId);
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setDanceToDelete(null);
  };

  const deleteDance = () => {
    setLoading(true);
    axios
      .delete(`https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/dances/${danceToDelete}`)
      .then(() => {
        setDances(dances.filter((dance) => dance._id !== danceToDelete));
        setShowConfirmation(false);
        setDanceToDelete(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error deleting dance:", err.response ? err.response.data : err.message);
        setError("Failed to delete dance performance.");
        setLoading(false);
        setShowConfirmation(false);
      });
  };

  const confirmRemoveAll = () => {
    if (window.confirm("Are you sure you want to remove all dances? This action cannot be undone.")) {
      removeAllDances();
    }
  };

  const removeAllDances = () => {
    setLoading(true);
    axios
      .delete(`https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/dances`)
      .then(() => {
        setDances([]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error removing all dances:", err.response ? err.response.data : err.message);
        setError("Failed to remove all dance performances.");
        setLoading(false);
      });
  };

  const resetForm = () => {
    setDanceName("");
    setNumDancers("");
    setDancerNames("");
    setSongLinkOrNote("");
    setEditDanceId(null);
  };

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  // Function to determine dance type class based on dance name
  const getDanceTypeClass = (danceName) => {
    const name = danceName.toLowerCase();
    if (name.includes("ballet")) return "ballet";
    if (name.includes("contemporary")) return "contemporary";
    if (name.includes("hip hop") || name.includes("hiphop")) return "hiphop";
    if (name.includes("salsa")) return "salsa";
    if (name.includes("ballroom")) return "ballroom";
    return "";
  };

  // Function to get dance type icon based on dance name
  const getDanceTypeIcon = (danceName) => {
    const name = danceName.toLowerCase();
    if (name.includes("ballet")) return faFeather; // Changed from faShoeFootprints to faFeather
    if (name.includes("contemporary")) return faFeather;
    if (name.includes("hip hop") || name.includes("hiphop")) return faCompactDisc;
    if (name.includes("salsa")) return faFire;
    if (name.includes("ballroom")) return faDiamond;
    return faStar; // Default icon
  };

  return (
    <div className="dance-list-page">
      <h1><FontAwesomeIcon icon={faStar} /> Dance Performances</h1>

      <div className="stats-container">
        <h3><FontAwesomeIcon icon={faUsers} /> Total Dances: {dances.length}</h3>
        <button className="toggle-form-btn" onClick={toggleForm}>
          <FontAwesomeIcon icon={formVisible ? faMinus : faPlus} />
          {formVisible ? " Hide Form" : " Add New Dance"}
        </button>
      </div>

      {formVisible && (
        <div className="input-container">
          <div className="form-group">
            <label><FontAwesomeIcon icon={faSignature} /> Dance Name</label>
            <input
              type="text"
              placeholder="Enter Dance Name"
              value={danceName}
              onChange={(e) => setDanceName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label><FontAwesomeIcon icon={faUsers} /> Number of Dancers</label>
            <input
              type="number"
              placeholder="Number of Dancers"
              value={numDancers}
              onChange={(e) => setNumDancers(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label><FontAwesomeIcon icon={faUserFriends} /> Dancer Names</label>
            <input
              type="text"
              placeholder="Enter Dancer Names (comma separated)"
              value={dancerNames}
              onChange={(e) => setDancerNames(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label><FontAwesomeIcon icon={faMusic} /> Song Link or Note</label>
            <input
              type="text"
              placeholder="Enter Song Link or Note"
              value={songLinkOrNote}
              onChange={(e) => setSongLinkOrNote(e.target.value)}
            />
          </div>
          
          <div className="form-actions">
            <button
              className="submit-btn"
              onClick={editDanceId ? updateDance : addDance}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faCheck} />
              {loading ? (editDanceId ? " Updating..." : " Adding...") : editDanceId ? " Update Dance" : " Add Dance"}
            </button>
            
            {editDanceId && (
              <button className="cancel-btn" onClick={resetForm}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error">
          <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="refresh-btn" onClick={fetchDances} disabled={loading}>
          <FontAwesomeIcon icon={faSync} /> Refresh List
        </button>
        
        {dances.length > 0 && (
          <button className="remove-all-dances" onClick={confirmRemoveAll} disabled={loading}>
            <FontAwesomeIcon icon={faTrash} /> {loading ? "Removing..." : "Remove All Dances"}
          </button>
        )}
      </div>

      {/* Card View */}
      <div className="cards-view-container">
        {loading && dances.length === 0 ? (
          <div className="loading-container">
            <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
            <p>Loading dances...</p>
          </div>
        ) : (
          <div className="dance-cards">
            {dances.length > 0 ? (
              dances.map((dance) => (
                <div key={dance._id} className={`dance-card ${getDanceTypeClass(dance.danceName)}`}>
                  <div className="dance-card-header">
                    <h3>
                      <FontAwesomeIcon icon={getDanceTypeIcon(dance.danceName)} /> {dance.danceName}
                    </h3>
                    <span className="dance-type-badge">
                      {getDanceTypeClass(dance.danceName) || "Dance"}
                    </span>
                  </div>
                  <div className="dance-card-body">
                    <p>
                      <FontAwesomeIcon icon={faUsers} className="dance-icon" />
                      Dancers: {dance.numberOfPerformers || "Not specified"}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faUserFriends} className="dance-icon" />
                      {dance.dancerNames || "No dancers listed"}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faMusic} className="dance-icon" />
                      {dance.songLinkOrNote || "No song or notes specified"}
                    </p>
                  </div>
                  <div className="dance-card-buttons">
                    <button className="edit-btn" onClick={() => editDance(dance._id)} disabled={loading}>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button className="delete-btn" onClick={() => confirmDelete(dance._id)} disabled={loading}>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-dances">
                <p><FontAwesomeIcon icon={faMusic} /> No dances added yet</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4><FontAwesomeIcon icon={faExclamationTriangle} /> Confirm Delete</h4>
            <p>Are you sure you want to delete this dance performance?</p>
            <div className="modal-actions">
              <button onClick={deleteDance} disabled={loading}>
                <FontAwesomeIcon icon={faCheck} /> {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button onClick={cancelDelete} disabled={loading}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DanceListPage;