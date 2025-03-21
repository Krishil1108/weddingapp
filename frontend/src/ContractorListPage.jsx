// import React, { useState, useEffect, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./css/contractorlist.css";

// const ContractorListPage = () => {
//   const { id } = useParams(); // Occasion ID
//   const [contractors, setContractors] = useState([]);
//   const [formData, setFormData] = useState({ name: "", service: "", contact: "" });
//   const [editId, setEditId] = useState(null);

//   // ✅ Use useCallback to memoize fetchContractors
//   const fetchContractors = useCallback(async () => {
//     try {
//       const response = await axios.get(`https://weddingapp-1.onrender.com/api/occasions/${id}/contractors`);
//       setContractors(response.data);
//     } catch (err) {
//       console.error("Error fetching contractors:", err);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchContractors();
//   }, [fetchContractors]); // ✅ Now correctly using fetchContractors

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.service || !formData.contact) return;
//     try {
//       if (editId) {
//         const response = await axios.put(
//           `https://weddingapp-1.onrender.com/api/occasions/${id}/contractors/${editId}`,
//           formData
//         );
//         setContractors((prev) =>
//           prev.map((contractor) => (contractor._id === editId ? response.data : contractor))
//         );
//       } else {
//         const response = await axios.post(`https://weddingapp-1.onrender.com/api/occasions/${id}/contractors`, formData);
//         setContractors([...contractors, response.data]);
//       }
//       setFormData({ name: "", service: "", contact: "" });
//       setEditId(null);
//     } catch (err) {
//       console.error("Error saving contractor:", err);
//     }
//   };

//   const handleEdit = (contractor) => {
//     setEditId(contractor._id);
//     setFormData({
//       name: contractor.name,
//       service: contractor.service,
//       contact: contractor.contact,
//     });
//   };

//   const handleDelete = async (contractorId) => {
//     if (!window.confirm("Are you sure you want to delete this contractor?")) return;
//     try {
//       await axios.delete(`https://weddingapp-1.onrender.com/api/occasions/${id}/contractors/${contractorId}`);
//       setContractors(contractors.filter((contractor) => contractor._id !== contractorId));
//     } catch (err) {
//       console.error("Error deleting contractor:", err);
//     }
//   };

//   const handleDeleteAll = async () => {
//     if (!window.confirm("Are you sure you want to delete all contractors?")) return;
//     try {
//       await axios.delete(`https://weddingapp-1.onrender.com/api/occasions/${id}/contractors`);
//       setContractors([]);
//     } catch (err) {
//       console.error("Error deleting all contractors:", err);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Contractors / Vendors</h1>
//       <div className="input-container">
//         <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
//         <input type="text" name="service" placeholder="Service Type" value={formData.service} onChange={handleChange} />
//         <input type="text" name="contact" placeholder="Contact Details" value={formData.contact} onChange={handleChange} />
//         <button onClick={handleSubmit}>{editId ? "Update Contractor" : "Add Contractor"}</button>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Service</th>
//             <th>Contact</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {contractors.map((contractor) => (
//             <tr key={contractor._id}>
//               <td>{contractor.name}</td>
//               <td>{contractor.service}</td>
//               <td>{contractor.contact}</td>
//               <td>
//                 <button onClick={() => handleEdit(contractor)}>Edit</button>
//                 <button onClick={() => handleDelete(contractor._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleDeleteAll}>Delete All Contractors</button>
//     </div>
//   );
// };

// export default ContractorListPage;











import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./css/contractorlist.css";
import { 
  FaHardHat, 
  FaUserTie, 
  FaTools, 
  FaPhone, 
  FaBuilding, 
  FaPlus, 
  FaPencilAlt, 
  FaTrash, 
  FaTrashAlt, 
  FaSave, 
  FaInfoCircle, 
  FaCheckCircle, 
  FaTimesCircle,
  FaSpinner,
  FaHeartbeat,
  FaGlassCheers,
  FaRing,
  FaHeart,
  FaFilePdf,
  FaDownload,
  FaSearch
} from "react-icons/fa";

const ContractorListPage = () => {
  const { id } = useParams();
  const [contractors, setContractors] = useState([]);
  const [filteredContractors, setFilteredContractors] = useState([]);
  const [formData, setFormData] = useState({ 
    name: "", 
    service: "", 
    contact: "", 
    company: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const fetchContractors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://weddingapp-1.onrender.com/api/occasions/${id}/contractors`);
      
      const enhancedData = response.data.map(contractor => ({
        ...contractor,
        company: contractor.company || ""
      }));
      
      setContractors(enhancedData);
      setFilteredContractors(enhancedData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching contractors:", err);
      setLoading(false);
      showToast("Error", "Failed to load contractors", true);
    }
  }, [id]);

  useEffect(() => {
    fetchContractors();
  }, [fetchContractors]);

  useEffect(() => {
    const filtered = contractors.filter(contractor => 
      contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contractor.company && contractor.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredContractors(filtered);
  }, [searchTerm, contractors]);

  const showToast = (title, message, isError = false) => {
    setToast({ title, message, isError });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.service || !formData.contact) {
      showToast("Missing Information", "Please fill in all required fields", true);
      return;
    }
    
    try {
      if (editId) {
        const response = await axios.put(
          `https://weddingapp-1.onrender.com/api/occasions/${id}/contractors/${editId}`,
          formData
        );
        setContractors((prev) =>
          prev.map((contractor) => (contractor._id === editId ? response.data : contractor))
        );
        showToast("Success", "Vendor updated successfully");
      } else {
        const response = await axios.post(`https://weddingapp-1.onrender.com/api/occasions/${id}/contractors`, formData);
        setContractors([...contractors, response.data]);
        showToast("Success", "Vendor added successfully");
      }
      setFormData({ 
        name: "", 
        service: "", 
        contact: "", 
        company: ""
      });
      setEditId(null);
    } catch (err) {
      console.error("Error saving vendor:", err);
      showToast("Error", "Failed to save vendor information", true);
    }
  };

  const handleEdit = (contractor) => {
    setEditId(contractor._id);
    setFormData({
      name: contractor.name,
      service: contractor.service,
      contact: contractor.contact,
      company: contractor.company || ""
    });
  };

  const handleDelete = async (contractorId) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;
    try {
      await axios.delete(`https://weddingapp-1.onrender.com/api/occasions/${id}/contractors/${contractorId}`);
      setContractors(contractors.filter((contractor) => contractor._id !== contractorId));
      showToast("Success", "Vendor deleted successfully");
    } catch (err) {
      console.error("Error deleting vendor:", err);
      showToast("Error", "Failed to delete vendor", true);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all vendors?")) return;
    try {
      await axios.delete(`https://weddingapp-1.onrender.com/api/occasions/${id}/contractors`);
      setContractors([]);
      showToast("Success", "All vendors deleted successfully");
    } catch (err) {
      console.error("Error deleting all vendors:", err);
      showToast("Error", "Failed to delete all vendors", true);
    }
  };

  const handleCancel = () => {
    setFormData({ 
      name: "", 
      service: "", 
      contact: "", 
      company: ""
    });
    setEditId(null);
  };

  const exportToPDF = () => {
    try {
      showToast("Processing", "Generating PDF...");
      
      // Create a new jsPDF instance
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text("Wedding Vendors & Services", 14, 20);
      
      // Add date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
      
      // Format data for autotable
      const tableData = contractors.map(contractor => [
        contractor.name,
        contractor.company || "—",
        contractor.service,
        contractor.contact
      ]);
      
      // Define table headers
      const headers = [
        "Vendor", 
        "Company", 
        "Service", 
        "Contact"
      ];
      
      // Add table to PDF
      autoTable(doc, {
        head: [headers],
        body: tableData,
        startY: 40,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { 
          fillColor: [66, 133, 244],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        }
      });
      
      // Add page count and footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }
      
      // Save the PDF
      doc.save(`Wedding_Vendors_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`);
      
      showToast("Success", "PDF exported successfully");
    } catch (err) {
      console.error("Error generating PDF:", err);
      showToast("Error", "Failed to generate PDF", true);
    }
  };

  return (
    <div className="vendor-dashboard">
      {/* Toast notification */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.isError ? "error" : ""}`}>
            <div className="icon">
              {toast.isError ? <FaTimesCircle /> : <FaCheckCircle />}
            </div>
            <div className="content">
              <div className="title">{toast.title}</div>
              <div className="message">{toast.message}</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="dashboard-header">
        <h1><FaRing /> Wedding Vendors & Services</h1>
        {contractors.length > 0 && (
          <button onClick={exportToPDF} className="action-button export-pdf">
            <FaFilePdf /> Export to PDF
          </button>
        )}
      </div>
      
      <div className="dashboard-content">
        <div className="vendor-form">
          <div className="form-title">
            <FaHeart />
            <h2>{editId ? "Update Vendor Information" : "Add New Vendor"}</h2>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Vendor Name" 
                value={formData.name} 
                onChange={handleChange} 
              />
              <FaUserTie className="form-icon" />
            </div>
            
            <div className="form-group">
              <label>Company</label>
              <input 
                type="text" 
                name="company" 
                placeholder="Company Name" 
                value={formData.company} 
                onChange={handleChange} 
              />
              <FaBuilding className="form-icon" />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Service</label>
              <input 
                type="text" 
                name="service" 
                placeholder="Service Type" 
                value={formData.service} 
                onChange={handleChange} 
              />
              <FaTools className="form-icon" />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input 
                type="text" 
                name="contact" 
                placeholder="Contact Number" 
                value={formData.contact} 
                onChange={handleChange} 
              />
              <FaPhone className="form-icon" />
            </div>
          </div>
          
          <div className="form-actions">
            {editId && (
              <button onClick={handleCancel} className="action-button secondary">
                <FaTimesCircle /> Cancel
              </button>
            )}
            
            <button 
              onClick={handleSubmit} 
              className={`action-button ${editId ? 'update' : 'add'}`}
            >
              {editId ? (
                <>
                  <FaSave /> Update Vendor
                </>
              ) : (
                <>
                  <FaPlus /> Add Vendor
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search vendors by name, service, or company" 
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        {loading ? (
          <div className="loading-state">
            <FaSpinner className="loading-icon" />
          </div>
        ) : (
          <>
            {filteredContractors.length > 0 ? (
              <div className="vendor-card-grid">
                {filteredContractors.map((contractor) => (
                  <div key={contractor._id} className="vendor-card">
                    <div className="vendor-card-header">
                      <h3>{contractor.name}</h3>
                      <div className="vendor-card-actions">
                        <button 
                          onClick={() => handleEdit(contractor)} 
                          className="action-button edit-btn"
                        >
                          <FaPencilAlt />
                        </button>
                        <button 
                          onClick={() => handleDelete(contractor._id)} 
                          className="action-button delete-btn"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="vendor-card-details">
                      <p>
                        <FaBuilding /> {contractor.company || "No Company"}
                      </p>
                      <p>
                        <FaTools /> {contractor.service}
                      </p>
                      <p>
                        <FaPhone /> {contractor.contact}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <FaHeartbeat />
                <h3>No Vendors Found</h3>
                <p>
                  {searchTerm 
                    ? `No vendors match "${searchTerm}"` 
                    : "Add your first vendor using the form above to start managing your wedding services."
                  }
                </p>
              </div>
            )}
            
            {contractors.length > 0 && (
              <div className="delete-all-container">
                <button onClick={handleDeleteAll} className="action-button delete">
                  <FaTrashAlt /> Delete All Vendors
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContractorListPage;