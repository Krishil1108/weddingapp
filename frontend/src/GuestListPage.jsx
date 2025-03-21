// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./guestlistpage.css";

// const GuestListPage = () => {
//   const { occasionId, listId } = useParams();
//   const [guests, setGuests] = useState([]);
//   const [guestName, setGuestName] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [personsInvited, setPersonsInvited] = useState("");
//   const [invitationSent, setInvitationSent] = useState(false);
 
//   useEffect(() => {
//     // Fetch guests for the "Guest List"
//     axios
//       .get(`https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests`)
//       .then((response) => setGuests(response.data));
//   }, [occasionId, listId]);

//   const addGuest = () => {
//     if (!guestName || !contactNumber || !personsInvited) return;
//     const newGuest = {
//       name: guestName,
//       contactNumber,
//       personsInvited,
//       invitationSent,
//     };
//     // Post to backend (assuming you have an endpoint to handle guest data)
//     axios
//       .post(`https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests`, newGuest)
//       .then((response) => {
//         setGuests([...guests, response.data]);
//         setGuestName("");
//         setContactNumber("");
//         setPersonsInvited("");
//         setInvitationSent(false);
//       });
//   };

//   const deleteGuest = (guestId) => {
//     axios
//       .delete(`https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests/${guestId}`)
//       .then(() => {
//         setGuests(guests.filter((guest) => guest._id !== guestId));
//       });
//   };

//   const removeAllGuests = () => {
//     // Delete all guests at once
//     axios
//       .delete(`https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests`)
//       .then(() => {
//         setGuests([]); // Update the guest list to an empty array
//       });
//   };

//   const editGuest = (guestId) => {
//     const guestToEdit = guests.find((guest) => guest._id === guestId);
//     setGuestName(guestToEdit.name);
//     setContactNumber(guestToEdit.contactNumber);
//     setPersonsInvited(guestToEdit.personsInvited);
//     setInvitationSent(guestToEdit.invitationSent);
//     deleteGuest(guestId); // Remove guest first before adding edited one (or implement in-place editing)
//   };

//   return (
//     <div className="container">
//       <h1>Guest List</h1>
//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Enter guest name"
//           value={guestName}
//           onChange={(e) => setGuestName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter contact number"
//           value={contactNumber}
//           onChange={(e) => setContactNumber(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Enter number of persons"
//           value={personsInvited}
//           onChange={(e) => setPersonsInvited(e.target.value)}
//         />
//         <label className="invitation-checkbox">
//           <input
//             type="checkbox"
//             checked={invitationSent}
//             onChange={() => setInvitationSent(!invitationSent)}
//           />
//           <span className="checkmark"></span>
//         </label>
//         <button onClick={addGuest}>Add Guest</button>
//       </div>

//       {/* Button to Remove All Guests */}
//       <button className="remove-all-guests" onClick={removeAllGuests}>
//         Remove All Guests
//       </button>

//       {/* Display Guest List in Tabular Form */}
//       <table className="guest-list-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Contact</th>
//             <th>Persons Invited</th>
//             <th>Invitation Sent</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {guests.map((guest) => (
//             <tr key={guest._id}>
//               <td>{guest.name}</td>
//               <td>{guest.contactNumber}</td>
//               <td>{guest.personsInvited}</td>
//               <td>{guest.invitationSent ? "Yes" : "No"}</td> {/* Updated to show Yes/No */}
//               <td>
//                 <button onClick={() => editGuest(guest._id)}>Edit</button>
//                 <button onClick={() => deleteGuest(guest._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GuestListPage;




// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./guestlistpage.css";

// const GuestListPage = () => {
//   const { occasionId, listId } = useParams();
//   const [guests, setGuests] = useState([]);
//   const [filteredGuests, setFilteredGuests] = useState([]);
//   const [guestName, setGuestName] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [personsInvited, setPersonsInvited] = useState("");
//   const [invitationSent, setInvitationSent] = useState(false);
//   const [family, setFamily] = useState("Shah Family");
//   const [editingGuest, setEditingGuest] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests`)
//       .then((response) => {
//         setGuests(response.data);
//         setFilteredGuests(response.data);
//       });
//   }, [occasionId, listId]);

//   const addGuest = () => {
//     if (!guestName || !contactNumber || !personsInvited) return;
//     const newGuest = { name: guestName, contactNumber, personsInvited, invitationSent, family };
    
//     axios
//       .post(`https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests`, newGuest)
//       .then((response) => {
//         setGuests([...guests, response.data]);
//         setFilteredGuests([...guests, response.data]);
//         resetForm();
//       });
//   };

//   const updateGuest = () => {
//     if (!guestName || !contactNumber || !personsInvited) return;
//     const updatedGuest = { name: guestName, contactNumber, personsInvited, invitationSent, family };

//     axios
//       .put(`https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests/${editingGuest}`, updatedGuest)
//       .then((response) => {
//         const updatedGuests = guests.map((guest) =>
//           guest._id === editingGuest ? response.data : guest
//         );
//         setGuests(updatedGuests);
//         setFilteredGuests(updatedGuests);
//         setEditingGuest(null);
//         resetForm();
//       });
//   };

//   const deleteGuest = (guestId) => {
//     axios
//       .delete(`https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests/${guestId}`)
//       .then(() => {
//         const updatedGuests = guests.filter((guest) => guest._id !== guestId);
//         setGuests(updatedGuests);
//         setFilteredGuests(updatedGuests);
//       });
//   };

//   const deleteAllGuests = () => {
//     axios
//       .delete(`https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests`)
//       .then(() => {
//         setGuests([]);
//         setFilteredGuests([]);
//       })
//       .catch((error) => console.error("Error deleting all guests:", error));
//   };

//   const startEditing = (guest) => {
//     setEditingGuest(guest._id);
//     setGuestName(guest.name);
//     setContactNumber(guest.contactNumber);
//     setPersonsInvited(guest.personsInvited);
//     setInvitationSent(guest.invitationSent);
//     setFamily(guest.family);
//   };

//   const cancelEditing = () => {
//     setEditingGuest(null);
//     resetForm();
//   };

//   const resetForm = () => {
//     setGuestName("");
//     setContactNumber("");
//     setPersonsInvited("");
//     setInvitationSent(false);
//     setFamily("Shah Family");
//   };

//   return (
//     <div className="guestlist-container">
//       <h2 className="title">Guest List</h2>

//       <div className="form-container">
//         <div className="input-group">
//           <label>Guest Name</label>
//           <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
//         </div>
//         <div className="input-group">
//           <label>Contact Number</label>
//           <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
//         </div>
//         <div className="input-group">
//           <label>Number of Persons</label>
//           <input type="number" value={personsInvited} onChange={(e) => setPersonsInvited(e.target.value)} />
//         </div>
//         <div className="input-group">
//           <label>Invitation Sent</label>
//           <input type="checkbox" checked={invitationSent} onChange={() => setInvitationSent(!invitationSent)} />
//         </div>
//         <div className="input-group">
//           <label>Family</label>
//           <select value={family} onChange={(e) => setFamily(e.target.value)}>
//             <option value="Shah Family">Shah Family</option>
//             <option value="Acharya Family">Acharya Family</option>
//           </select>
//         </div>

//         <div className="button-group">
//           {editingGuest ? (
//             <>
//               <button className="update-btn" onClick={updateGuest}>Update Guest</button>
//               <button className="cancel-btn" onClick={cancelEditing}>Cancel</button>
//             </>
//           ) : (
//             <button className="add-btn" onClick={addGuest}>Add Guest</button>
//           )}
//         </div>
//       </div>

//       <div className="action-buttons">
//         <button className="delete-all-btn" onClick={deleteAllGuests}>Delete All Guests</button>
//         <button className="filter-btn" onClick={() => setFilteredGuests(guests)}>Show All Guests</button>
//         <button className="filter-btn" onClick={() => setFilteredGuests(guests.filter(guest => guest.family === "Shah Family"))}>Show Shah Family</button>
//         <button className="filter-btn" onClick={() => setFilteredGuests(guests.filter(guest => guest.family === "Acharya Family"))}>Show Acharya Family</button>
//       </div>

//       <table className="guestlist-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Contact Number</th>
//             <th>Persons Invited</th>
//             <th>Invitation Sent</th>
//             <th>Family</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredGuests.map((guest) => (
//             <tr key={guest._id}>
//               <td>{guest.name}</td>
//               <td>{guest.contactNumber}</td>
//               <td>{guest.personsInvited}</td>
//               <td>{guest.invitationSent ? "Yes" : "No"}</td>
//               <td>{guest.family}</td>
//               <td>
//                 <button className="edit-btn" onClick={() => startEditing(guest)}>Edit</button>
//                 <button className="delete-btn" onClick={() => deleteGuest(guest._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GuestListPage;









import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/guestlistpage.css";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const GuestListPage = () => {
  const { occasionId, listId } = useParams();
  const [guests, setGuests] = useState([]);
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [guestName, setGuestName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [personsInvited, setPersonsInvited] = useState("");
  const [invitationSent, setInvitationSent] = useState(false);
  const [family, setFamily] = useState("Shah Family");
  const [editingGuest, setEditingGuest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Calculate stats
  const totalPersons = filteredGuests.reduce((sum, guest) => sum + Number(guest.personsInvited), 0);
  const invitationSentCount = filteredGuests.filter(guest => guest.invitationSent).length;
  
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests`)
      .then((response) => {
        setGuests(response.data);
        setFilteredGuests(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching guests:", error);
        setIsLoading(false);
      });
  }, [occasionId, listId]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      // If no search, apply current filter
      applyCurrentFilter();
    } else {
      // Apply search within current filter context
      const baseGuests = activeFilter === "all" 
        ? guests 
        : guests.filter(guest => guest.family === activeFilter);
        
      setFilteredGuests(
        baseGuests.filter(guest => 
          guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          guest.contactNumber.includes(searchTerm)
        )
      );
    }
  }, [searchTerm]);

  const applyCurrentFilter = () => {
    if (activeFilter === "all") {
      setFilteredGuests(guests);
    } else {
      showFamilyGuests(activeFilter);
    }
  };

  const addGuest = () => {
    if (!guestName || !contactNumber || !personsInvited) {
      // Add visual feedback for validation errors
      document.getElementById("guest-form").classList.add("shake-animation");
      setTimeout(() => {
        document.getElementById("guest-form").classList.remove("shake-animation");
      }, 500);
      return;
    }
    
    setIsLoading(true);
    const newGuest = {
      name: guestName,
      contactNumber,
      personsInvited,
      invitationSent,
      family,
    };
    
    axios
      .post(`https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests`, newGuest)
      .then((response) => {
        const updatedGuests = [...guests, response.data];
        setGuests(updatedGuests);
        applyCurrentFilter();
        resetForm();
        setShowForm(false);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error adding guest:", error);
        setIsLoading(false);
      });
  };

  const startEditing = (guest) => {
    setEditingGuest(guest._id);
    setGuestName(guest.name);
    setContactNumber(guest.contactNumber);
    setPersonsInvited(guest.personsInvited);
    setInvitationSent(guest.invitationSent);
    setFamily(guest.family);
    setShowForm(true);
    
    // Scroll to form
    setTimeout(() => {
      document.querySelector(".guestlist-form").scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const cancelEditing = () => {
    setEditingGuest(null);
    resetForm();
  };

  const resetForm = () => {
    setGuestName("");
    setContactNumber("");
    setPersonsInvited("");
    setInvitationSent(false);
    setFamily("Shah Family");
  };

  const updateGuest = () => {
    if (!guestName || !contactNumber || !personsInvited) {
      document.getElementById("guest-form").classList.add("shake-animation");
      setTimeout(() => {
        document.getElementById("guest-form").classList.remove("shake-animation");
      }, 500);
      return;
    }
    
    setIsLoading(true);
    const updatedGuest = {
      name: guestName,
      contactNumber,
      personsInvited,
      invitationSent,
      family,
    };

    axios
      .put(
        `https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests/${editingGuest}`,
        updatedGuest
      )
      .then((response) => {
        const updatedGuests = guests.map((guest) =>
          guest._id === editingGuest ? response.data : guest
        );
        setGuests(updatedGuests);
        applyCurrentFilter();
        setEditingGuest(null);
        resetForm();
        setShowForm(false);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error updating guest:", error);
        setIsLoading(false);
      });
  };

  const deleteGuest = (guestId) => {
    if (!window.confirm("Are you sure you want to delete this guest?")) return;
    
    setIsLoading(true);
    axios
      .delete(`https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests/${guestId}`)
      .then(() => {
        const updatedGuests = guests.filter((guest) => guest._id !== guestId);
        setGuests(updatedGuests);
        applyCurrentFilter();
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error deleting guest:", error);
        setIsLoading(false);
      });
  };

  const deleteAllGuests = (familyType) => {
    if (!window.confirm(`Are you sure you want to delete ALL guests from ${familyType}?`)) return;
    
    setIsLoading(true);
    const guestsToDelete = guests.filter((guest) => guest.family === familyType);
    const deletePromises = guestsToDelete.map((guest) =>
      axios.delete(`https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/guests/${guest._id}`)
    );

    Promise.all(deletePromises)
      .then(() => {
        const updatedGuests = guests.filter((guest) => guest.family !== familyType);
        setGuests(updatedGuests);
        applyCurrentFilter();
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error deleting family guests:", error);
        setIsLoading(false);
      });
  };

  const showFamilyGuests = (familyType) => {
    setActiveFilter(familyType);
    const filtered = guests.filter((guest) => guest.family === familyType);
    setFilteredGuests(filtered);
    setSearchTerm("");
  };

  const showAllGuests = () => {
    setActiveFilter("all");
    setFilteredGuests(guests);
    setSearchTerm("");
  };

  // PDF export function for specific family
  const exportToPDF = (familyType) => {
    const doc = new jsPDF();
    const familyGuests = guests.filter((guest) => guest.family === familyType);
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text(`${familyType} Guest List`, 14, 20);
    
    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Add stats
    const totalPersons = familyGuests.reduce((sum, guest) => sum + Number(guest.personsInvited), 0);
    const invitationSentCount = familyGuests.filter(guest => guest.invitationSent).length;
    
    doc.setFontSize(12);
    doc.text(`Total Invitations: ${familyGuests.length}`, 14, 40);
    doc.text(`Total Persons: ${totalPersons}`, 14, 48);
    doc.text(`Invitations Sent: ${invitationSentCount}`, 14, 56);
    
    // Create table data
    const tableColumn = ["No.", "Guest Name", "Contact Number", "Persons", "Invitation Status"];
    const tableRows = [];
    
    familyGuests.forEach((guest, index) => {
      const guestData = [
        index + 1,
        guest.name,
        guest.contactNumber,
        guest.personsInvited,
        guest.invitationSent ? "Sent" : "Pending"
      ];
      tableRows.push(guestData);
    });
    
    // Generate the table using autoTable
    autoTable(doc, {
      startY: 65,
      head: [tableColumn],
      body: tableRows,
      theme: 'striped',
      headStyles: {
        fillColor: familyType === "Shah Family" ? [41, 128, 185] : [192, 57, 43],
        textColor: [255, 255, 255]
      },
      willDrawCell: (data) => {
        if (data.row.section === 'body') {
          // Highlight rows with pending invitations
          const invitationStatus = data.row.raw[4];
          if (invitationStatus === "Pending") {
            data.cell.styles.textColor = [192, 57, 43];
          }
        }
      }
    });
    
    // Save PDF
    doc.save(`${familyType.replace(' ', '_')}_GuestList.pdf`);
  };

  return (
    <div className="guestlist-container">
      {isLoading && <div className="loading-overlay">
        <div className="spinner"></div>
      </div>}
      
      <div className="guestlist-header">
        <h1>Guest List Management</h1>
        <div className="stats-container">
          <div className="stat-box">
            <span className="stat-value">{filteredGuests.length}</span>
            <span className="stat-label">Invitations</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{totalPersons}</span>
            <span className="stat-label">Total Persons</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{invitationSentCount}</span>
            <span className="stat-label">Invites Sent</span>
          </div>
        </div>
      </div>

      <div className="controls-container">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>✕</button>
          )}
        </div>
        
        <button 
          className="add-guest-btn" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Add New Guest"}
        </button>
      </div>

      {/* Form to add or update guests */}
      {showForm && (
        <div className="guestlist-form" id="guest-form">
          <h2>{editingGuest ? "Update Guest" : "Add New Guest"}</h2>
          <div className="form-group">
            <label>Guest Name</label>
            <input 
              type="text" 
              placeholder="Guest Name" 
              value={guestName} 
              onChange={(e) => setGuestName(e.target.value)} 
            />
          </div>
          
          <div className="form-group">
            <label>Contact Number</label>
            <input 
              type="text" 
              placeholder="Contact Number" 
              value={contactNumber} 
              onChange={(e) => setContactNumber(e.target.value)} 
            />
          </div>
          
          <div className="form-group">
            <label>Number of Persons</label>
            <input 
              type="number" 
              placeholder="Persons Invited" 
              value={personsInvited} 
              onChange={(e) => setPersonsInvited(e.target.value)} 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Family</label>
              <select 
                value={family} 
                onChange={(e) => setFamily(e.target.value)}
                className="family-select"
              >
                <option value="Shah Family">Shah Family</option>
                <option value="Acharya Family">Acharya Family</option>
              </select>
            </div>
            
            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={invitationSent} 
                  onChange={() => setInvitationSent(!invitationSent)} 
                />
                <span className="checkmark"></span>
                Invitation Sent
              </label>
            </div>
          </div>

          <div className="form-actions">
            {editingGuest ? (
              <>
                <button className="primary-btn" onClick={updateGuest}>Update Guest</button>
                <button className="secondary-btn" onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <button className="primary-btn" onClick={addGuest}>Add Guest</button>
            )}
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="filter-tabs">
        <button 
          className={activeFilter === "all" ? "active" : ""} 
          onClick={showAllGuests}
        >
          All Guests
        </button>
        <button 
          className={activeFilter === "Shah Family" ? "active" : ""} 
          onClick={() => showFamilyGuests("Shah Family")}
        >
          Shah Family
        </button>
        <button 
          className={activeFilter === "Acharya Family" ? "active" : ""} 
          onClick={() => showFamilyGuests("Acharya Family")}
        >
          Acharya Family
        </button>
      </div>
      
      {/* Action buttons */}
      <div className="action-buttons">
        <button 
          className="export-btn shah-export"
          onClick={() => exportToPDF("Shah Family")}
        >
          <i className="icon export-icon"></i> Export Shah Family PDF
        </button>
        <button 
          className="export-btn acharya-export"
          onClick={() => exportToPDF("Acharya Family")}
        >
          <i className="icon export-icon"></i> Export Acharya Family PDF
        </button>
        <button 
          className="danger-btn" 
          onClick={() => deleteAllGuests("Shah Family")}
        >
          Delete All Shah Family
        </button>
        <button 
          className="danger-btn" 
          onClick={() => deleteAllGuests("Acharya Family")}
        >
          Delete All Acharya Family
        </button>
      </div>

      {/* Guest cards */}
      {filteredGuests.length === 0 ? (
        <div className="no-guests">
          <p>No guests found. {searchTerm ? "Try a different search term." : "Add some guests to get started!"}</p>
        </div>
      ) : (
        <div className="guestlist-cards">
          {filteredGuests.map((guest, index) => (
            <div key={guest._id} className={`guest-card ${guest.family === "Shah Family" ? "shah-card" : "acharya-card"}`}>
              <div className="card-header">
                <h3>{index + 1}. {guest.name}</h3>
                <span className={`invitation-badge ${guest.invitationSent ? "sent" : "pending"}`}>
                  {guest.invitationSent ? "Invitation Sent" : "Pending"}
                </span>
              </div>
              
              <div className="card-body">
                <p><i className="icon phone-icon"></i> {guest.contactNumber}</p>
                <p><i className="icon person-icon"></i> {guest.personsInvited} {guest.personsInvited > 1 ? "Persons" : "Person"}</p>
                <p><i className="icon family-icon"></i> {guest.family}</p>
              </div>
              
              <div className="card-buttons">
                <button className="edit-btn" onClick={() => startEditing(guest)}>
                  <i className="icon edit-icon"></i> Edit
                </button>
                <button className="delete-btn" onClick={() => deleteGuest(guest._id)}>
                  <i className="icon delete-icon"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestListPage;


