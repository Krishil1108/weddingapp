import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
          `https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/food-items`
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
        `https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/food-items`,
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
        `https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/food-items/${editItem._id}`,
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
        `https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/food-items/${foodItemId}`
      );
      setFoodItems(foodItems.filter((item) => item._id !== foodItemId));
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  const handleDeleteAllFoodItems = async () => {
    try {
      await axios.delete(
        `https://weddingapp-1.onrender.com/api/occasions/${occasionId}/lists/${listId}/food-items`
      );
      setFoodItems([]);
    } catch (error) {
      console.error("Error deleting all food items:", error);
    }
  };

  return (
    <div className="container">
      {/* Heading with Total Items Count */}
      <div className="heading-with-count">
        <h2>Food Item List</h2>
        <div className="total-items">
          <strong>Total Items: {foodItems.length}</strong>
        </div>
      </div>

      <div className="form-container">
        <h3>{editItem ? "Edit Food Item" : "Add Food Item"}</h3>
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={editItem ? editItem.itemName : newItem.itemName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={editItem ? editItem.quantity : newItem.quantity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="vendorName"
          placeholder="Vendor Name"
          value={editItem ? editItem.vendorName : newItem.vendorName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="vendorContact"
          placeholder="Vendor Contact"
          value={editItem ? editItem.vendorContact : newItem.vendorContact}
          onChange={handleInputChange}
        />
        <label>
          <input
            type="checkbox"
            name="orderSent"
            checked={editItem ? editItem.orderSent : newItem.orderSent}
            onChange={handleInputChange}
          />{" "}
          Order Sent
        </label>
        <button onClick={editItem ? handleEditFoodItem : handleAddFoodItem}>
          {editItem ? "Update Food Item" : "Add Food Item"}
        </button>
        {editItem && (
          <button onClick={() => setEditItem(null)}>Cancel Edit</button>
        )}
      </div>

      {/* Delete All Food Items Button */}
      <button className="delete-all-btn" onClick={handleDeleteAllFoodItems}>
        Delete All Food Items
      </button>

      <div className="table-container">
        <h3>Food Items</h3>
        {loading ? (
          <p>Loading food items...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>V Name</th>
                <th>Contact</th>
                <th>Order Sent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.vendorName}</td>
                  <td>{item.vendorContact}</td>
                  <td>
                    <input type="checkbox" checked={item.orderSent} disabled />
                  </td>
                  <td>
                    <button onClick={() => setEditItem(item)}>Edit</button>
                    <button onClick={() => handleDeleteFoodItem(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FoodItemList;









