import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUtensils, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaStore, FaPhone } from "react-icons/fa";
import "./css/FoodItemList.css";

const FoodItemList = () => {
  const { occasionId, listId } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    itemName: "",
    quantity: "",
    vendorName: "",
    vendorContact: "",
    orderSent: false,
  });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(
          `https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/food-items`
        );
        setFoodItems(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodItems();
  }, [occasionId, listId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    if (editItem) {
      setEditItem((prev) => ({ ...prev, [name]: updatedValue }));
    } else {
      setNewItem((prev) => ({ ...prev, [name]: updatedValue }));
    }
  };

  const handleAddFoodItem = async () => {
    try {
      const response = await axios.post(
        `https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/food-items`,
        newItem
      );
      setFoodItems([...foodItems, response.data]);
      setNewItem({
        itemName: "",
        quantity: "",
        vendorName: "",
        vendorContact: "",
        orderSent: false,
      });
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  const handleEditFoodItem = async () => {
    if (!editItem) return;
    try {
      await axios.put(
        `https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/food-items/${editItem._id}`,
        editItem
      );
      setFoodItems(
        foodItems.map((item) => (item._id === editItem._id ? editItem : item))
      );
      setEditItem(null);
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  const handleDeleteFoodItem = async (foodItemId) => {
    try {
      await axios.delete(
        `https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/food-items/${foodItemId}`
      );
      setFoodItems(foodItems.filter((item) => item._id !== foodItemId));
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  const handleDeleteAllFoodItems = async () => {
    try {
      await axios.delete(
        `https://weddingapp-kayp.onrender.com/api/occasions/${occasionId}/lists/${listId}/food-items`
      );
      setFoodItems([]);
    } catch (error) {
      console.error("Error deleting all food items:", error);
    }
  };

  return (
    <motion.div 
      className="food-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <motion.div 
        className="food-header"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="header-content">
          <div className="title-section">
            <FaUtensils className="header-icon" />
            <h1 className="page-title">Food Items Collection</h1>
          </div>
          <div className="stats-badge">
            <span className="stats-number">{foodItems.length}</span>
            <span className="stats-label">Items</span>
          </div>
        </div>
      </motion.div>

      {/* Form Section */}
      <motion.div 
        className="form-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="form-header">
          <FaPlus className="form-icon" />
          <h2>{editItem ? "Edit Food Item" : "Add New Food Item"}</h2>
        </div>
        <div className="form-grid">
          <div className="input-group">
            <label className="input-label">Item Name</label>
            <input
              type="text"
              name="itemName"
              placeholder="e.g., Biryani, Paneer Tikka..."
              value={editItem ? editItem.itemName : newItem.itemName}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Quantity</label>
            <input
              type="text"
              name="quantity"
              placeholder="e.g., 50 plates, 10 kg..."
              value={editItem ? editItem.quantity : newItem.quantity}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Vendor Name</label>
            <input
              type="text"
              name="vendorName"
              placeholder="Restaurant/Caterer name"
              value={editItem ? editItem.vendorName : newItem.vendorName}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Vendor Contact</label>
            <input
              type="text"
              name="vendorContact"
              placeholder="Phone number or email"
              value={editItem ? editItem.vendorContact : newItem.vendorContact}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="orderSent"
                checked={editItem ? editItem.orderSent : newItem.orderSent}
                onChange={handleInputChange}
                className="custom-checkbox"
              />
              <span className="checkmark"></span>
              Order Sent
            </label>
          </div>
        </div>
        <div className="form-actions">
          <button 
            onClick={editItem ? handleEditFoodItem : handleAddFoodItem}
            className="btn-primary"
          >
            {editItem ? <><FaCheck /> Update Item</> : <><FaPlus /> Add Item</>}
          </button>
          {editItem && (
            <button onClick={() => setEditItem(null)} className="btn-secondary">
              <FaTimes /> Cancel
            </button>
          )}
        </div>
      </motion.div>

      {/* Actions Bar */}
      <motion.div 
        className="actions-bar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button className="btn-danger" onClick={handleDeleteAllFoodItems}>
          <FaTrash /> Clear All Items
        </button>
      </motion.div>

      {/* Table Section */}
      <motion.div 
        className="table-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="table-header">
          <h3>Food Items Overview</h3>
        </div>
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading delicious items...</p>
          </div>
        ) : foodItems.length === 0 ? (
          <div className="empty-state">
            <FaUtensils className="empty-icon" />
            <h4>No food items yet!</h4>
            <p>Add your first food item to get started with planning your feast.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Vendor</th>
                  <th>Contact</th>
                  <th>Order Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {foodItems.map((item, index) => (
                  <motion.tr 
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="table-row"
                  >
                    <td className="serial-cell">{index + 1}</td>
                    <td className="item-name-cell">
                      <span className="item-name">{item.itemName}</span>
                    </td>
                    <td className="quantity-cell">{item.quantity}</td>
                    <td className="vendor-cell">
                      <div className="vendor-info">
                        <FaStore className="vendor-icon" />
                        <span>{item.vendorName || "Not specified"}</span>
                      </div>
                    </td>
                    <td className="contact-cell">
                      <div className="contact-info">
                        <FaPhone className="contact-icon" />
                        <span>{item.vendorContact || "Not provided"}</span>
                      </div>
                    </td>
                    <td className="status-cell">
                      <span className={`status-badge ${item.orderSent ? 'sent' : 'pending'}`}>
                        {item.orderSent ? <><FaCheck /> Sent</> : <><FaTimes /> Pending</>}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        onClick={() => setEditItem(item)} 
                        className="btn-edit"
                        title="Edit item"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDeleteFoodItem(item._id)} 
                        className="btn-delete"
                        title="Delete item"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default FoodItemList;









