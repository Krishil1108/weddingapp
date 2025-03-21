// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("Error connecting to MongoDB:", err));

// // Occasion Schema
// const OccasionSchema = new mongoose.Schema({
//   name: { type: String, required: true },
// });
// const Occasion = mongoose.model("Occasion", OccasionSchema);

// // List Schema
// const ListSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   occasionId: { type: mongoose.Schema.Types.ObjectId, ref: "Occasion" },
// });
// const List = mongoose.model("List", ListSchema);

// // Guest Schema
// const GuestSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   contactNumber: { type: String, required: true },
//   personsInvited: { type: Number, required: true },
//   invitationSent: { type: Boolean, default: false },
//   listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
// });
// const Guest = mongoose.model("Guest", GuestSchema);

// // Add Occasion
// app.post("/api/occasions", async (req, res) => {
//   try {
//     if (!req.body.name) {
//       return res.status(400).json({ error: "Occasion name is required" });
//     }
//     const occasion = new Occasion(req.body);
//     await occasion.save();
//     res.status(201).json(occasion);
//   } catch (err) {
//     console.log("Error adding occasion:", err);
//     res.status(500).json({ error: "Failed to add occasion" });
//   }
// });

// // Get All Occasions
// app.get("/api/occasions", async (req, res) => {
//   try {
//     const occasions = await Occasion.find();
//     res.status(200).json(occasions);
//   } catch (err) {
//     console.log("Error fetching occasions:", err);
//     res.status(500).json({ error: "Failed to fetch occasions" });
//   }
// });

// // Add List to Occasion
// app.post("/api/occasions/:id/lists", async (req, res) => {
//   try {
//     if (!req.body.name) {
//       return res.status(400).json({ error: "List name is required" });
//     }
//     const list = new List({ name: req.body.name, occasionId: req.params.id });
//     await list.save();
//     res.status(201).json(list);
//   } catch (err) {
//     console.log("Error adding list to occasion:", err);
//     res.status(500).json({ error: "Failed to add list" });
//   }
// });

// // Get Lists for an Occasion
// app.get("/api/occasions/:id/lists", async (req, res) => {
//   try {
//     const lists = await List.find({ occasionId: req.params.id });
//     if (lists.length === 0) {
//       return res.status(404).json({ message: "No lists found for this occasion" });
//     }
//     res.status(200).json(lists);
//   } catch (err) {
//     console.log("Error fetching lists for occasion:", err);
//     res.status(500).json({ error: "Failed to fetch lists" });
//   }
// });

// // Add Guest to a List
// app.post("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
//   try {
//     const { name, contactNumber, personsInvited, invitationSent } = req.body;
//     if (!name || !contactNumber || !personsInvited) {
//       return res.status(400).json({ error: "All guest details are required" });
//     }
//     const guest = new Guest({
//       name,
//       contactNumber,
//       personsInvited,
//       invitationSent,
//       listId: req.params.listId,
//     });
//     await guest.save();
//     res.status(201).json(guest);
//   } catch (err) {
//     console.log("Error adding guest:", err);
//     res.status(500).json({ error: "Failed to add guest" });
//   }
// });

// // Get Guests for a List
// app.get("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
//   try {
//     const guests = await Guest.find({ listId: req.params.listId });
//     if (guests.length === 0) {
//       return res.status(404).json({ message: "No guests found for this list" });
//     }
//     res.status(200).json(guests);
//   } catch (err) {
//     console.log("Error fetching guests:", err);
//     res.status(500).json({ error: "Failed to fetch guests" });
//   }
// });

// // Edit Guest
// app.put("/api/occasions/:occasionId/lists/:listId/guests/:guestId", async (req, res) => {
//   try {
//     const { name, contactNumber, personsInvited, invitationSent } = req.body;
//     const guest = await Guest.findById(req.params.guestId);
//     if (!guest) {
//       return res.status(404).json({ message: "Guest not found" });
//     }

//     guest.name = name || guest.name;
//     guest.contactNumber = contactNumber || guest.contactNumber;
//     guest.personsInvited = personsInvited || guest.personsInvited;
//     guest.invitationSent = invitationSent || guest.invitationSent;

//     await guest.save();
//     res.status(200).json(guest);
//   } catch (err) {
//     console.log("Error updating guest:", err);
//     res.status(500).json({ error: "Failed to update guest" });
//   }
// });

// // Delete Guest
// app.delete("/api/occasions/:occasionId/lists/:listId/guests/:guestId", async (req, res) => {
//   try {
//     await Guest.findByIdAndDelete(req.params.guestId);
//     res.status(200).json({ message: "Guest deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting guest:", err);
//     res.status(500).json({ error: "Failed to delete guest" });
//   }
// });

// // Delete All Guests for a List
// app.delete("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
//   try {
//     await Guest.deleteMany({ listId: req.params.listId });
//     res.status(200).json({ message: "All guests removed from the list" });
//   } catch (err) {
//     console.log("Error removing all guests:", err);
//     res.status(500).json({ error: "Failed to remove all guests" });
//   }
// });

// // Delete List
// app.delete("/api/occasions/:occasionId/lists/:listId", async (req, res) => {
//   try {
//     // Delete all guests associated with the list
//     await Guest.deleteMany({ listId: req.params.listId });

//     // Now delete the list
//     const list = await List.findByIdAndDelete(req.params.listId);
//     if (!list) {
//       return res.status(404).json({ message: "List not found" });
//     }

//     res.status(200).json({ message: "List deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting list:", err);
//     res.status(500).json({ error: "Failed to delete list" });
//   }
// });

// // Delete Occasion
// app.delete("/api/occasions/:id", async (req, res) => {
//   try {
//     // Delete all lists and guests related to the occasion
//     await List.deleteMany({ occasionId: req.params.id });
//     await Occasion.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Occasion deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting occasion:", err);
//     res.status(500).json({ error: "Failed to delete occasion" });
//   }
// });

// // Start the server
// app.listen(5000, () => console.log("Server running on port 5000"));


// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("Error connecting to MongoDB:", err));

// // Occasion Schema
// const OccasionSchema = new mongoose.Schema({
//   name: { type: String, required: true },
// });
// const Occasion = mongoose.model("Occasion", OccasionSchema);

// // List Schema
// const ListSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   occasionId: { type: mongoose.Schema.Types.ObjectId, ref: "Occasion" },
// });
// const List = mongoose.model("List", ListSchema);

// // Guest Schema
// const GuestSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   contactNumber: { type: String, required: true },
//   personsInvited: { type: Number, required: true },
//   invitationSent: { type: Boolean, default: false },
//   listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
// });
// const Guest = mongoose.model("Guest", GuestSchema);

// // Food Item Schema
// const FoodItemSchema = new mongoose.Schema({
//   itemName: { type: String, required: true },
//   quantity: { type: String, required: true },
//   orderSent: { type: Boolean, default: false },
//   vendorName: { type: String, required: true },
//   vendorContact: { type: String, required: true },
//   listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
// });
// const FoodItem = mongoose.model("FoodItem", FoodItemSchema);

// // Add Occasion
// app.post("/api/occasions", async (req, res) => {
//   try {
//     if (!req.body.name) {
//       return res.status(400).json({ error: "Occasion name is required" });
//     }
//     const occasion = new Occasion(req.body);
//     await occasion.save();
//     res.status(201).json(occasion);
//   } catch (err) {
//     console.log("Error adding occasion:", err);
//     res.status(500).json({ error: "Failed to add occasion" });
//   }
// });

// // Get All Occasions
// app.get("/api/occasions", async (req, res) => {
//   try {
//     const occasions = await Occasion.find();
//     res.status(200).json(occasions);
//   } catch (err) {
//     console.log("Error fetching occasions:", err);
//     res.status(500).json({ error: "Failed to fetch occasions" });
//   }
// });

// // Add List to Occasion
// app.post("/api/occasions/:id/lists", async (req, res) => {
//   try {
//     if (!req.body.name) {
//       return res.status(400).json({ error: "List name is required" });
//     }
//     const list = new List({ name: req.body.name, occasionId: req.params.id });
//     await list.save();
//     res.status(201).json(list);
//   } catch (err) {
//     console.log("Error adding list to occasion:", err);
//     res.status(500).json({ error: "Failed to add list" });
//   }
// });

// // Get Lists for an Occasion
// app.get("/api/occasions/:id/lists", async (req, res) => {
//   try {
//     const lists = await List.find({ occasionId: req.params.id });
//     if (lists.length === 0) {
//       return res.status(404).json({ message: "No lists found for this occasion" });
//     }
//     res.status(200).json(lists);
//   } catch (err) {
//     console.log("Error fetching lists for occasion:", err);
//     res.status(500).json({ error: "Failed to fetch lists" });
//   }
// });

// // Add Guest to a List
// app.post("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
//   try {
//     const { name, contactNumber, personsInvited, invitationSent } = req.body;
//     if (!name || !contactNumber || !personsInvited) {
//       return res.status(400).json({ error: "All guest details are required" });
//     }
//     const guest = new Guest({
//       name,
//       contactNumber,
//       personsInvited,
//       invitationSent,
//       listId: req.params.listId,
//     });
//     await guest.save();
//     res.status(201).json(guest);
//   } catch (err) {
//     console.log("Error adding guest:", err);
//     res.status(500).json({ error: "Failed to add guest" });
//   }
// });

// // Get Guests for a List
// app.get("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
//   try {
//     const guests = await Guest.find({ listId: req.params.listId });
//     if (guests.length === 0) {
//       return res.status(404).json({ message: "No guests found for this list" });
//     }
//     res.status(200).json(guests);
//   } catch (err) {
//     console.log("Error fetching guests:", err);
//     res.status(500).json({ error: "Failed to fetch guests" });
//   }
// });

// // Edit Guest
// app.put("/api/occasions/:occasionId/lists/:listId/guests/:guestId", async (req, res) => {
//   try {
//     const { name, contactNumber, personsInvited, invitationSent } = req.body;
//     const guest = await Guest.findById(req.params.guestId);
//     if (!guest) {
//       return res.status(404).json({ message: "Guest not found" });
//     }

//     guest.name = name || guest.name;
//     guest.contactNumber = contactNumber || guest.contactNumber;
//     guest.personsInvited = personsInvited || guest.personsInvited;
//     guest.invitationSent = invitationSent || guest.invitationSent;

//     await guest.save();
//     res.status(200).json(guest);
//   } catch (err) {
//     console.log("Error updating guest:", err);
//     res.status(500).json({ error: "Failed to update guest" });
//   }
// });

// // Delete Guest
// app.delete("/api/occasions/:occasionId/lists/:listId/guests/:guestId", async (req, res) => {
//   try {
//     await Guest.findByIdAndDelete(req.params.guestId);
//     res.status(200).json({ message: "Guest deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting guest:", err);
//     res.status(500).json({ error: "Failed to delete guest" });
//   }
// });

// // Delete All Guests for a List
// app.delete("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
//   try {
//     await Guest.deleteMany({ listId: req.params.listId });
//     res.status(200).json({ message: "All guests removed from the list" });
//   } catch (err) {
//     console.log("Error removing all guests:", err);
//     res.status(500).json({ error: "Failed to remove all guests" });
//   }
// });

// // Add Food Item
// app.post("/api/occasions/:occasionId/lists/:listId/food-items", async (req, res) => {
//     try {
//       const { itemName, quantity, orderSent, vendorName, vendorContact } = req.body;
//       if (!itemName || !quantity || !vendorName || !vendorContact) {
//         return res.status(400).json({ error: "All fields are required" });
//       }
//       const foodItem = new FoodItem({
//         itemName,
//         quantity,
//         orderSent,
//         vendorName,
//         vendorContact,
//         listId: req.params.listId,
//       });
//       await foodItem.save();
//       res.status(201).json(foodItem);
//     } catch (err) {
//       console.log("Error adding food item:", err);
//       res.status(500).json({ error: "Failed to add food item" });
//     }
//   });
  
//   // Get Food Items for a List
//   app.get("/api/occasions/:occasionId/lists/:listId/food-items", async (req, res) => {
//     try {
//       const foodItems = await FoodItem.find({ listId: req.params.listId });
//       res.status(200).json(foodItems);
//     } catch (err) {
//       console.log("Error fetching food items:", err);
//       res.status(500).json({ error: "Failed to fetch food items" });
//     }
//   });
  
//   // Edit Food Item
//   app.put("/api/occasions/:occasionId/lists/:listId/food-items/:foodItemId", async (req, res) => {
//     try {
//       const { itemName, quantity, orderSent, vendorName, vendorContact } = req.body;
//       const foodItem = await FoodItem.findById(req.params.foodItemId);
//       if (!foodItem) {
//         return res.status(404).json({ message: "Food item not found" });
//       }
  
//       foodItem.itemName = itemName || foodItem.itemName;
//       foodItem.quantity = quantity || foodItem.quantity;
//       foodItem.orderSent = orderSent !== undefined ? orderSent : foodItem.orderSent;
//       foodItem.vendorName = vendorName || foodItem.vendorName;
//       foodItem.vendorContact = vendorContact || foodItem.vendorContact;
  
//       await foodItem.save();
//       res.status(200).json(foodItem);
//     } catch (err) {
//       console.log("Error updating food item:", err);
//       res.status(500).json({ error: "Failed to update food item" });
//     }
//   });
  
//   // Delete Food Item
//   app.delete("/api/occasions/:occasionId/lists/:listId/food-items/:foodItemId", async (req, res) => {
//     try {
//       await FoodItem.findByIdAndDelete(req.params.foodItemId);
//       res.status(200).json({ message: "Food item deleted successfully" });
//     } catch (err) {
//       console.log("Error deleting food item:", err);
//       res.status(500).json({ error: "Failed to delete food item" });
//     }
//   });
  
//   // Delete All Food Items for a List
//   app.delete("/api/occasions/:occasionId/lists/:listId/food-items", async (req, res) => {
//     try {
//       await FoodItem.deleteMany({ listId: req.params.listId });
//       res.status(200).json({ message: "All food items removed from the list" });
//     } catch (err) {
//       console.log("Error removing all food items:", err);
//       res.status(500).json({ error: "Failed to remove all food items" });
//     }
//   });
  
// // Delete List
// app.delete("/api/occasions/:occasionId/lists/:listId", async (req, res) => {
//   try {
//     // Delete all guests associated with the list
//     await Guest.deleteMany({ listId: req.params.listId });

//     // Now delete the list
//     const list = await List.findByIdAndDelete(req.params.listId);
//     if (!list) {
//       return res.status(404).json({ message: "List not found" });
//     }

//     res.status(200).json({ message: "List deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting list:", err);
//     res.status(500).json({ error: "Failed to delete list" });
//   }
// });

// // Delete Occasion
// app.delete("/api/occasions/:id", async (req, res) => {
//   try {
//     // Delete all lists and guests related to the occasion
//     await List.deleteMany({ occasionId: req.params.id });
//     await Occasion.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Occasion deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting occasion:", err);
//     res.status(500).json({ error: "Failed to delete occasion" });
//   }
// });

// // Start the server
// app.listen(5000, () => console.log("Server running on port 5000"));



// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("Error connecting to MongoDB:", err));

// // Occasion Schema
// const OccasionSchema = new mongoose.Schema({
//   name: { type: String, required: true },
// });
// const Occasion = mongoose.model("Occasion", OccasionSchema);

// // List Schema
// const ListSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   occasionId: { type: mongoose.Schema.Types.ObjectId, ref: "Occasion" },
// });
// const List = mongoose.model("List", ListSchema);

// // Guest Schema
// const GuestSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   contactNumber: { type: String, required: true },
//   personsInvited: { type: Number, required: true },
//   invitationSent: { type: Boolean, default: false },
//   listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
// });
// const Guest = mongoose.model("Guest", GuestSchema);

// // Food Item Schema
// const FoodItemSchema = new mongoose.Schema({
//   itemName: { type: String, required: true },
//   quantity: { type: String, required: true },
//   orderSent: { type: Boolean, default: false },
//   vendorName: { type: String, required: true },
//   vendorContact: { type: String, required: true },
//   listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
// });
// const FoodItem = mongoose.model("FoodItem", FoodItemSchema);

// // Dance Schema
// const DanceSchema = new mongoose.Schema(
//   {
//     occasionId: { type: mongoose.Schema.Types.ObjectId, required: true },
//     listId: { type: mongoose.Schema.Types.ObjectId, required: true },
//     danceName: { type: String, required: true },
//     numberOfPerformers: { type: Number, required: true },
//     dancerNames: { type: String, required: true }, // Store as comma-separated string
//     songLinkOrNote: { type: String, required: false }, // Optional field for song link or note
//   },
//   { timestamps: true }
// );

// const Dance = mongoose.model("Dance", DanceSchema);

// // Add Occasion
// app.post("/api/occasions", async (req, res) => {
//   try {
//     if (!req.body.name) {
//       return res.status(400).json({ error: "Occasion name is required" });
//     }
//     const occasion = new Occasion(req.body);
//     await occasion.save();
//     res.status(201).json(occasion);
//   } catch (err) {
//     console.log("Error adding occasion:", err);
//     res.status(500).json({ error: "Failed to add occasion" });
//   }
// });

// // Get All Occasions
// app.get("/api/occasions", async (req, res) => {
//   try {
//     const occasions = await Occasion.find();
//     res.status(200).json(occasions);
//   } catch (err) {
//     console.log("Error fetching occasions:", err);
//     res.status(500).json({ error: "Failed to fetch occasions" });
//   }
// });

// // Add List to Occasion
// app.post("/api/occasions/:id/lists", async (req, res) => {
//   try {
//     if (!req.body.name) {
//       return res.status(400).json({ error: "List name is required" });
//     }
//     const list = new List({ name: req.body.name, occasionId: req.params.id });
//     await list.save();
//     res.status(201).json(list);
//   } catch (err) {
//     console.log("Error adding list to occasion:", err);
//     res.status(500).json({ error: "Failed to add list" });
//   }
// });

// // Get Lists for an Occasion
// app.get("/api/occasions/:id/lists", async (req, res) => {
//   try {
//     const lists = await List.find({ occasionId: req.params.id });
//     if (lists.length === 0) {
//       return res.status(404).json({ message: "No lists found for this occasion" });
//     }
//     res.status(200).json(lists);
//   } catch (err) {
//     console.log("Error fetching lists for occasion:", err);
//     res.status(500).json({ error: "Failed to fetch lists" });
//   }
// });

// // Add Guest to a List
// app.post("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
//   try {
//     const { name, contactNumber, personsInvited, invitationSent } = req.body;
//     if (!name || !contactNumber || !personsInvited) {
//       return res.status(400).json({ error: "All guest details are required" });
//     }
//     const guest = new Guest({
//       name,
//       contactNumber,
//       personsInvited,
//       invitationSent,
//       listId: req.params.listId,
//     });
//     await guest.save();
//     res.status(201).json(guest);
//   } catch (err) {
//     console.log("Error adding guest:", err);
//     res.status(500).json({ error: "Failed to add guest" });
//   }
// });

// // Get Guests for a List
// app.get("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
//   try {
//     const guests = await Guest.find({ listId: req.params.listId });
//     if (guests.length === 0) {
//       return res.status(404).json({ message: "No guests found for this list" });
//     }
//     res.status(200).json(guests);
//   } catch (err) {
//     console.log("Error fetching guests:", err);
//     res.status(500).json({ error: "Failed to fetch guests" });
//   }
// });

// // Edit Guest
// app.put("/api/occasions/:occasionId/lists/:listId/guests/:guestId", async (req, res) => {
//   try {
//     const { name, contactNumber, personsInvited, invitationSent } = req.body;
//     const guest = await Guest.findById(req.params.guestId);
//     if (!guest) {
//       return res.status(404).json({ message: "Guest not found" });
//     }

//     guest.name = name || guest.name;
//     guest.contactNumber = contactNumber || guest.contactNumber;
//     guest.personsInvited = personsInvited || guest.personsInvited;
//     guest.invitationSent = invitationSent || guest.invitationSent;

//     await guest.save();
//     res.status(200).json(guest);
//   } catch (err) {
//     console.log("Error updating guest:", err);
//     res.status(500).json({ error: "Failed to update guest" });
//   }
// });

// // Delete Guest
// app.delete("/api/occasions/:occasionId/lists/:listId/guests/:guestId", async (req, res) => {
//   try {
//     await Guest.findByIdAndDelete(req.params.guestId);
//     res.status(200).json({ message: "Guest deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting guest:", err);
//     res.status(500).json({ error: "Failed to delete guest" });
//   }
// });

// // Delete All Guests for a List
// app.delete("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
//   try {
//     await Guest.deleteMany({ listId: req.params.listId });
//     res.status(200).json({ message: "All guests removed from the list" });
//   } catch (err) {
//     console.log("Error removing all guests:", err);
//     res.status(500).json({ error: "Failed to remove all guests" });
//   }
// });

// // Add Food Item
// app.post("/api/occasions/:occasionId/lists/:listId/food-items", async (req, res) => {
//   try {
//     const { itemName, quantity, orderSent, vendorName, vendorContact } = req.body;
//     if (!itemName || !quantity || !vendorName || !vendorContact) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     const foodItem = new FoodItem({
//       itemName,
//       quantity,
//       orderSent,
//       vendorName,
//       vendorContact,
//       listId: req.params.listId,
//     });
//     await foodItem.save();
//     res.status(201).json(foodItem);
//   } catch (err) {
//     console.log("Error adding food item:", err);
//     res.status(500).json({ error: "Failed to add food item" });
//   }
// });

// // Get Food Items for a List
// app.get("/api/occasions/:occasionId/lists/:listId/food-items", async (req, res) => {
//   try {
//     const foodItems = await FoodItem.find({ listId: req.params.listId });
//     res.status(200).json(foodItems);
//   } catch (err) {
//     console.log("Error fetching food items:", err);
//     res.status(500).json({ error: "Failed to fetch food items" });
//   }
// });

// // Edit Food Item
// app.put("/api/occasions/:occasionId/lists/:listId/food-items/:foodItemId", async (req, res) => {
//   try {
//     const { itemName, quantity, orderSent, vendorName, vendorContact } = req.body;
//     const foodItem = await FoodItem.findById(req.params.foodItemId);
//     if (!foodItem) {
//       return res.status(404).json({ message: "Food item not found" });
//     }

//     foodItem.itemName = itemName || foodItem.itemName;
//     foodItem.quantity = quantity || foodItem.quantity;
//     foodItem.orderSent = orderSent !== undefined ? orderSent : foodItem.orderSent;
//     foodItem.vendorName = vendorName || foodItem.vendorName;
//     foodItem.vendorContact = vendorContact || foodItem.vendorContact;

//     await foodItem.save();
//     res.status(200).json(foodItem);
//   } catch (err) {
//     console.log("Error updating food item:", err);
//     res.status(500).json({ error: "Failed to update food item" });
//   }
// });

// // Delete Food Item
// app.delete("/api/occasions/:occasionId/lists/:listId/food-items/:foodItemId", async (req, res) => {
//   try {
//     await FoodItem.findByIdAndDelete(req.params.foodItemId);
//     res.status(200).json({ message: "Food item deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting food item:", err);
//     res.status(500).json({ error: "Failed to delete food item" });
//   }
// });

// // Delete All Food Items for a List
// app.delete("/api/occasions/:occasionId/lists/:listId/food-items", async (req, res) => {
//   try {
//     await FoodItem.deleteMany({ listId: req.params.listId });
//     res.status(200).json({ message: "All food items removed from the list" });
//   } catch (err) {
//     console.log("Error removing all food items:", err);
//     res.status(500).json({ error: "Failed to remove all food items" });
//   }
// });

// // Fetch all dance performances for a list
// app.get("/api/occasions/:occasionId/lists/:listId/dances", async (req, res) => {
//   try {
//     const { occasionId, listId } = req.params;
//     const dances = await Dance.find({ occasionId, listId });
//     res.json(dances);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch dances", error });
//   }
// });

// // Add a new dance performance
// app.post("/api/occasions/:occasionId/lists/:listId/dances", async (req, res) => {
//   try {
//     const { occasionId, listId } = req.params;
//     const { danceName, numberOfPerformers, dancerNames, songLinkOrNote } = req.body;

//     // Validate required fields
//     if (!danceName || !numberOfPerformers || !dancerNames) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Ensure numberOfPerformers is a number
//     const performersNumber = parseInt(numberOfPerformers, 10);
//     if (isNaN(performersNumber)) {
//       return res.status(400).json({ error: "Number of performers must be a valid number" });
//     }

//     const newDance = new Dance({
//       occasionId,
//       listId,
//       danceName,
//       numberOfPerformers: performersNumber,
//       dancerNames,
//       songLinkOrNote,
//     });

//     await newDance.save();
//     res.status(201).json(newDance);
//   } catch (error) {
//     console.error("Error adding dance:", error);
//     res.status(500).json({ message: "Failed to add dance", error: error.message });
//   }
// });

// // Edit a dance performance
// app.put("/api/occasions/:occasionId/lists/:listId/dances/:danceId", async (req, res) => {
//   try {
//     const { danceId } = req.params;
//     const { danceName, numberOfPerformers, dancerNames, songLinkOrNote } = req.body;

//     const dance = await Dance.findById(danceId);
//     if (!dance) {
//       return res.status(404).json({ message: "Dance not found" });
//     }

//     dance.danceName = danceName || dance.danceName;
//     dance.numberOfPerformers = numberOfPerformers || dance.numberOfPerformers;
//     dance.dancerNames = dancerNames || dance.dancerNames;
//     dance.songLinkOrNote = songLinkOrNote || dance.songLinkOrNote;

//     await dance.save();
//     res.status(200).json(dance);
//   } catch (error) {
//     console.error("Error updating dance:", error);
//     res.status(500).json({ message: "Failed to update dance", error: error.message });
//   }
// });

// // Fetch a single dance entry by ID
// app.get("/api/occasions/:occasionId/lists/:listId/dances/:danceId", async (req, res) => {
//   try {
//     const dance = await Dance.findById(req.params.danceId);
//     if (!dance) {
//       return res.status(404).json({ message: "Dance not found" });
//     }
//     res.status(200).json(dance);
//   } catch (err) {
//     console.log("Error fetching dance:", err);
//     res.status(500).json({ error: "Failed to fetch dance" });
//   }
// });

// // Delete a specific dance performance
// app.delete("/api/occasions/:occasionId/lists/:listId/dances/:danceId", async (req, res) => {
//   try {
//     const { danceId } = req.params;
//     await Dance.findByIdAndDelete(danceId);
//     res.json({ message: "Dance deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete dance", error });
//   }
// });

// // Remove all dance performances from a list
// app.delete("/api/occasions/:occasionId/lists/:listId/dances", async (req, res) => {
//   try {
//     const { occasionId, listId } = req.params;
//     await Dance.deleteMany({ occasionId, listId });
//     res.json({ message: "All dances removed successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to remove all dances", error });
//   }
// });

// // Delete List
// app.delete("/api/occasions/:occasionId/lists/:listId", async (req, res) => {
//   try {
//     // Delete all related data
//     await Promise.all([
//       Guest.deleteMany({ listId: req.params.listId }),
//       FoodItem.deleteMany({ listId: req.params.listId }),
//       Dance.deleteMany({ listId: req.params.listId }),
//     ]);

//     // Delete the list itself
//     const list = await List.findByIdAndDelete(req.params.listId);
//     if (!list) {
//       return res.status(404).json({ message: "List not found" });
//     }

//     res.status(200).json({ message: "List and all associated data deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting list:", err);
//     res.status(500).json({ error: "Failed to delete list" });
//   }
// });

// // Delete Occasion
// app.delete("/api/occasions/:id", async (req, res) => {
//   try {
//     // Get all lists in the occasion
//     const lists = await List.find({ occasionId: req.params.id });
//     const listIds = lists.map((list) => list._id);

//     // Delete all related data across all lists
//     await Promise.all([
//       Guest.deleteMany({ listId: { $in: listIds } }),
//       FoodItem.deleteMany({ listId: { $in: listIds } }),
//       Dance.deleteMany({ listId: { $in: listIds } }),
//     ]);

//     // Delete lists and occasion
//     await List.deleteMany({ occasionId: req.params.id });
//     await Occasion.findByIdAndDelete(req.params.id);

//     res.status(200).json({ message: "Occasion and all associated data deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting occasion:", err);
//     res.status(500).json({ error: "Failed to delete occasion" });
//   }
// });

// // Start the server
// app.listen(5000, () => console.log("Server running on port 5000"));





require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("Error connecting to MongoDB:", err));

const MONGO_URI = process.env.MONGO_URI; // Fetch from .env

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ Failed to connect to MongoDB:", err));

// Occasion Schema
const OccasionSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Occasion = mongoose.model("Occasion", OccasionSchema);

// List Schema
const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  occasionId: { type: mongoose.Schema.Types.ObjectId, ref: "Occasion" },
});
const List = mongoose.model("List", ListSchema);

// Guest Schema - Updated with family field
const GuestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  personsInvited: { type: Number, required: true },
  invitationSent: { type: Boolean, default: false },
  family: { type: String, required: true, enum: ['Shah Family', 'Acharya Family'] },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
});
const Guest = mongoose.model("Guest", GuestSchema);

// Food Item Schema
const FoodItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: String, required: true },
  orderSent: { type: Boolean, default: false },
  vendorName: { type: String, required: true },
  vendorContact: { type: String, required: true },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
});
const FoodItem = mongoose.model("FoodItem", FoodItemSchema);

// Dance Schema
const DanceSchema = new mongoose.Schema(
  {
    occasionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    listId: { type: mongoose.Schema.Types.ObjectId, required: true },
    danceName: { type: String, required: true },
    numberOfPerformers: { type: Number, required: true },
    dancerNames: { type: String, required: true },
    songLinkOrNote: { type: String, required: false },
  },
  { timestamps: true }
);
const Dance = mongoose.model("Dance", DanceSchema);

// ContractorSchema
const contractorSchema = new mongoose.Schema({
  name: String,
  service: String,
  contact: String,
  occasionId: String,
});

const Contractor = mongoose.model("Contractor", contractorSchema);

// OCCASION ENDPOINTS
// Add Occasion
app.post("/api/occasions", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: "Occasion name is required" });
    }
    const occasion = new Occasion(req.body);
    await occasion.save();
    res.status(201).json(occasion);
  } catch (err) {
    console.log("Error adding occasion:", err);
    res.status(500).json({ error: "Failed to add occasion" });
  }
});

// Get All Occasions
app.get("/api/occasions", async (req, res) => {
  try {
    const occasions = await Occasion.find();
    res.status(200).json(occasions);
  } catch (err) {
    console.log("Error fetching occasions:", err);
    res.status(500).json({ error: "Failed to fetch occasions" });
  }
});

// Delete Occasion
app.delete("/api/occasions/:id", async (req, res) => {
  try {
    const lists = await List.find({ occasionId: req.params.id });
    const listIds = lists.map((list) => list._id);

    await Promise.all([
      Guest.deleteMany({ listId: { $in: listIds } }),
      FoodItem.deleteMany({ listId: { $in: listIds } }),
      Dance.deleteMany({ listId: { $in: listIds } }),
      List.deleteMany({ occasionId: req.params.id }),
      Occasion.findByIdAndDelete(req.params.id)
    ]);

    res.status(200).json({ message: "Occasion and all associated data deleted successfully" });
  } catch (err) {
    console.log("Error deleting occasion:", err);
    res.status(500).json({ error: "Failed to delete occasion" });
  }
});

// LIST ENDPOINTS
// Add List to Occasion
app.post("/api/occasions/:id/lists", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: "List name is required" });
    }
    const list = new List({ name: req.body.name, occasionId: req.params.id });
    await list.save();
    res.status(201).json(list);
  } catch (err) {
    console.log("Error adding list to occasion:", err);
    res.status(500).json({ error: "Failed to add list" });
  }
});

// Get Lists for an Occasion
app.get("/api/occasions/:id/lists", async (req, res) => {
  try {
    const lists = await List.find({ occasionId: req.params.id });
    if (lists.length === 0) {
      return res.status(404).json({ message: "No lists found for this occasion" });
    }
    res.status(200).json(lists);
  } catch (err) {
    console.log("Error fetching lists for occasion:", err);
    res.status(500).json({ error: "Failed to fetch lists" });
  }
});

// Delete List
app.delete("/api/occasions/:occasionId/lists/:listId", async (req, res) => {
  try {
    await Promise.all([
      Guest.deleteMany({ listId: req.params.listId }),
      FoodItem.deleteMany({ listId: req.params.listId }),
      Dance.deleteMany({ listId: req.params.listId }),
      List.findByIdAndDelete(req.params.listId)
    ]);
    res.status(200).json({ message: "List and all associated data deleted successfully" });
  } catch (err) {
    console.log("Error deleting list:", err);
    res.status(500).json({ error: "Failed to delete list" });
  }
});

// GUEST ENDPOINTS
// Add Guest to a List
app.post("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
  try {
    const { name, contactNumber, personsInvited, invitationSent, family } = req.body;
    if (!name || !contactNumber || !personsInvited || !family) {
      return res.status(400).json({ error: "All guest details are required" });
    }
    const guest = new Guest({
      name,
      contactNumber,
      personsInvited,
      invitationSent,
      family,
      listId: req.params.listId,
    });
    await guest.save();
    res.status(201).json(guest);
  } catch (err) {
    console.log("Error adding guest:", err);
    res.status(500).json({ error: "Failed to add guest" });
  }
});

// Get Guests for a List with family filter
app.get("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
  try {
    const { family } = req.query;
    let query = { listId: req.params.listId };
    
    if (family) {
      query.family = family;
    }
    
    const guests = await Guest.find(query);
    if (guests.length === 0) {
      return res.status(404).json({ message: "No guests found for this list" });
    }
    res.status(200).json(guests);
  } catch (err) {
    console.log("Error fetching guests:", err);
    res.status(500).json({ error: "Failed to fetch guests" });
  }
});

// Edit Guest
app.put("/api/occasions/:occasionId/lists/:listId/guests/:guestId", async (req, res) => {
  try {
    const { name, contactNumber, personsInvited, invitationSent, family } = req.body;
    const guest = await Guest.findById(req.params.guestId);
    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    guest.name = name || guest.name;
    guest.contactNumber = contactNumber || guest.contactNumber;
    guest.personsInvited = personsInvited || guest.personsInvited;
    guest.invitationSent = invitationSent !== undefined ? invitationSent : guest.invitationSent;
    guest.family = family || guest.family;

    await guest.save();
    res.status(200).json(guest);
  } catch (err) {
    console.log("Error updating guest:", err);
    res.status(500).json({ error: "Failed to update guest" });
  }
});

// Delete Guest
app.delete("/api/occasions/:occasionId/lists/:listId/guests/:guestId", async (req, res) => {
  try {
    await Guest.findByIdAndDelete(req.params.guestId);
    res.status(200).json({ message: "Guest deleted successfully" });
  } catch (err) {
    console.log("Error deleting guest:", err);
    res.status(500).json({ error: "Failed to delete guest" });
  }
});

// Delete All Guests for a List
app.delete("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
  try {
    await Guest.deleteMany({ listId: req.params.listId });
    res.status(200).json({ message: "All guests removed from the list" });
  } catch (err) {
    console.log("Error removing all guests:", err);
    res.status(500).json({ error: "Failed to remove all guests" });
  }
});

// FOOD ITEM ENDPOINTS
// Add Food Item
app.post("/api/occasions/:occasionId/lists/:listId/food-items", async (req, res) => {
  try {
    const { itemName, quantity, orderSent, vendorName, vendorContact } = req.body;
    if (!itemName || !quantity || !vendorName || !vendorContact) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const foodItem = new FoodItem({
      itemName,
      quantity,
      orderSent,
      vendorName,
      vendorContact,
      listId: req.params.listId,
    });
    await foodItem.save();
    res.status(201).json(foodItem);
  } catch (err) {
    console.log("Error adding food item:", err);
    res.status(500).json({ error: "Failed to add food item" });
  }
});

// Get Food Items for a List
app.get("/api/occasions/:occasionId/lists/:listId/food-items", async (req, res) => {
  try {
    const foodItems = await FoodItem.find({ listId: req.params.listId });
    res.status(200).json(foodItems);
  } catch (err) {
    console.log("Error fetching food items:", err);
    res.status(500).json({ error: "Failed to fetch food items" });
  }
});

// Edit Food Item
app.put("/api/occasions/:occasionId/lists/:listId/food-items/:foodItemId", async (req, res) => {
  try {
    const { itemName, quantity, orderSent, vendorName, vendorContact } = req.body;
    const foodItem = await FoodItem.findById(req.params.foodItemId);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    foodItem.itemName = itemName || foodItem.itemName;
    foodItem.quantity = quantity || foodItem.quantity;
    foodItem.orderSent = orderSent !== undefined ? orderSent : foodItem.orderSent;
    foodItem.vendorName = vendorName || foodItem.vendorName;
    foodItem.vendorContact = vendorContact || foodItem.vendorContact;

    await foodItem.save();
    res.status(200).json(foodItem);
  } catch (err) {
    console.log("Error updating food item:", err);
    res.status(500).json({ error: "Failed to update food item" });
  }
});

// Delete Food Item
app.delete("/api/occasions/:occasionId/lists/:listId/food-items/:foodItemId", async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.foodItemId);
    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (err) {
    console.log("Error deleting food item:", err);
    res.status(500).json({ error: "Failed to delete food item" });
  }
});

// Delete All Food Items for a List
app.delete("/api/occasions/:occasionId/lists/:listId/food-items", async (req, res) => {
  try {
    await FoodItem.deleteMany({ listId: req.params.listId });
    res.status(200).json({ message: "All food items removed from the list" });
  } catch (err) {
    console.log("Error removing all food items:", err);
    res.status(500).json({ error: "Failed to remove all food items" });
  }
});

// DANCE ENDPOINTS
// Get all dances for a list
app.get("/api/occasions/:occasionId/lists/:listId/dances", async (req, res) => {
  try {
    const { occasionId, listId } = req.params;
    const dances = await Dance.find({ occasionId, listId });
    res.json(dances);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dances", error });
  }
});

// Add new dance
app.post("/api/occasions/:occasionId/lists/:listId/dances", async (req, res) => {
  try {
    const { occasionId, listId } = req.params;
    const { danceName, numberOfPerformers, dancerNames, songLinkOrNote } = req.body;

    if (!danceName || !numberOfPerformers || !dancerNames) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const performersNumber = parseInt(numberOfPerformers, 10);
    if (isNaN(performersNumber)) {
      return res.status(400).json({ error: "Number of performers must be a valid number" });
    }

    const newDance = new Dance({
      occasionId,
      listId,
      danceName,
      numberOfPerformers: performersNumber,
      dancerNames,
      songLinkOrNote,
    });

    await newDance.save();
    res.status(201).json(newDance);
  } catch (error) {
    console.error("Error adding dance:", error);
    res.status(500).json({ message: "Failed to add dance", error: error.message });
  }
});

// Edit dance
app.put("/api/occasions/:occasionId/lists/:listId/dances/:danceId", async (req, res) => {
  try {
    // Edit dance (continued)
    const { danceId } = req.params;
    const { danceName, numberOfPerformers, dancerNames, songLinkOrNote } = req.body;

    const dance = await Dance.findById(danceId);
    if (!dance) {
      return res.status(404).json({ message: "Dance not found" });
    }

    dance.danceName = danceName || dance.danceName;
    dance.numberOfPerformers = numberOfPerformers || dance.numberOfPerformers;
    dance.dancerNames = dancerNames || dance.dancerNames;
    dance.songLinkOrNote = songLinkOrNote || dance.songLinkOrNote;

    await dance.save();
    res.status(200).json(dance);
  } catch (error) {
    console.error("Error updating dance:", error);
    res.status(500).json({ message: "Failed to update dance", error: error.message });
  }
});

// Get single dance
app.get("/api/occasions/:occasionId/lists/:listId/dances/:danceId", async (req, res) => {
  try {
    const dance = await Dance.findById(req.params.danceId);
    if (!dance) {
      return res.status(404).json({ message: "Dance not found" });
    }
    res.status(200).json(dance);
  } catch (err) {
    console.log("Error fetching dance:", err);
    res.status(500).json({ error: "Failed to fetch dance" });
  }
});

// Delete specific dance
app.delete("/api/occasions/:occasionId/lists/:listId/dances/:danceId", async (req, res) => {
  try {
    const { danceId } = req.params;
    await Dance.findByIdAndDelete(danceId);
    res.json({ message: "Dance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete dance", error });
  }
});

// Delete all dances for a list
app.delete("/api/occasions/:occasionId/lists/:listId/dances", async (req, res) => {
  try {
    const { occasionId, listId } = req.params;
    await Dance.deleteMany({ occasionId, listId });
    res.json({ message: "All dances removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove all dances", error });
  }
});

// CONTRACTOR ENDPOINTS
// Get all contractors for an occasion
app.get("/api/occasions/:occasionId/contractors", async (req, res) => {
  try {
    const { occasionId } = req.params;
    const contractors = await Contractor.find({ occasionId });
    res.json(contractors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contractors", error });
  }
});

// Add new contractor
app.post("/api/occasions/:occasionId/contractors", async (req, res) => {
  try {
    const { occasionId } = req.params;
    const { name, service, contact } = req.body;

    if (!name || !service || !contact) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContractor = new Contractor({
      occasionId,
      name,
      service,
      contact,
    });

    await newContractor.save();
    res.status(201).json(newContractor);
  } catch (error) {
    console.error("Error adding contractor:", error);
    res.status(500).json({ message: "Failed to add contractor", error: error.message });
  }
});

// Edit contractor
// Edit contractor
app.put("/api/occasions/:occasionId/contractors/:contractorId", async (req, res) => {
  try {
    const { contractorId } = req.params;
    const { name, service, contact } = req.body;

    const updatedContractor = await Contractor.findByIdAndUpdate(
      contractorId,
      { name, service, contact },
      { new: true } // Returns updated document
    );

    if (!updatedContractor) {
      return res.status(404).json({ message: "Contractor not found" });
    }

    res.status(200).json(updatedContractor);
  } catch (error) {
    console.error("Error updating contractor:", error);
    res.status(500).json({ message: "Failed to update contractor", error: error.message });
  }
});

// Get single contractor
app.get("/api/occasions/:occasionId/contractors/:contractorId", async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.params.contractorId);
    if (!contractor) {
      return res.status(404).json({ message: "Contractor not found" });
    }
    res.status(200).json(contractor);
  } catch (err) {
    console.log("Error fetching contractor:", err);
    res.status(500).json({ error: "Failed to fetch contractor" });
  }
});

// Delete specific contractor
// Delete specific contractor
app.delete("/api/occasions/:occasionId/contractors/:contractorId", async (req, res) => {
  try {
    const { contractorId } = req.params;
    const deletedContractor = await Contractor.findByIdAndDelete(contractorId);

    if (!deletedContractor) {
      return res.status(404).json({ message: "Contractor not found" });
    }

    res.json({ message: "Contractor deleted successfully", deletedContractor });
  } catch (error) {
    console.error("Error deleting contractor:", error);
    res.status(500).json({ message: "Failed to delete contractor", error });
  }
});

// Delete all contractors for an occasion
app.delete("/api/occasions/:occasionId/contractors", async (req, res) => {
  try {
    const { occasionId } = req.params;
    await Contractor.deleteMany({ occasionId });
    res.json({ message: "All contractors removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove all contractors", error });
  }
});

// Start the server
// app.listen(5000, () => console.log("Server running on port 5000"));

const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

const server = app.listen(PORT, '0.0.0.0', () => {
  const address = server.address();
  console.log(`✅ Server running on http://${address.address}:${address.port}`);
});







// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs-extra");

// const app = express();
// app.use(express.json());
// app.use(cors());
// const uploadDir = path.join(__dirname, 'uploads');
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("Error connecting to MongoDB:", err));

// // Occasion Schema
// const OccasionSchema = new mongoose.Schema({
//   name: { type: String, required: true },
// });
// const Occasion = mongoose.model("Occasion", OccasionSchema);

// // List Schema
// const ListSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   occasionId: { type: mongoose.Schema.Types.ObjectId, ref: "Occasion" },
// });
// const List = mongoose.model("List", ListSchema);

// // Guest Schema - Updated with family field
// const GuestSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   contactNumber: { type: String, required: true },
//   personsInvited: { type: Number, required: true },
//   invitationSent: { type: Boolean, default: false },
//   family: { type: String, required: true, enum: ['Shah Family', 'Acharya Family'] },
//   listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
// });
// const Guest = mongoose.model("Guest", GuestSchema);

// // Food Item Schema
// const FoodItemSchema = new mongoose.Schema({
//   itemName: { type: String, required: true },
//   quantity: { type: String, required: true },
//   orderSent: { type: Boolean, default: false },
//   vendorName: { type: String, required: true },
//   vendorContact: { type: String, required: true },
//   listId: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
// });
// const FoodItem = mongoose.model("FoodItem", FoodItemSchema);

// // Dance Schema
// const DanceSchema = new mongoose.Schema(
//   {
//     occasionId: { type: mongoose.Schema.Types.ObjectId, required: true },
//     listId: { type: mongoose.Schema.Types.ObjectId, required: true },
//     danceName: { type: String, required: true },
//     numberOfPerformers: { type: Number, required: true },
//     dancerNames: { type: String, required: true },
//     songLinkOrNote: { type: String, required: false },
//   },
//   { timestamps: true }
// );
// const Dance = mongoose.model("Dance", DanceSchema);

// // ContractorSchema
// const contractorSchema = new mongoose.Schema({
//   name: String,
//   service: String,
//   contact: String,
//   occasionId: String,
// });

// const Contractor = mongoose.model("Contractor", contractorSchema);

// // Multer Configuration for Image Uploads
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     const uploader = req.body.uploader || "default";
//     const uploadPath = path.join(__dirname, "uploads", uploader);
//     fs.ensureDirSync(uploadPath);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });
// module.exports = upload;

// // OCCASION ENDPOINTS
// // Add Occasion
// app.post("/api/occasions", async (req, res) => {
//   try {
//     if (!req.body.name) {
//       return res.status(400).json({ error: "Occasion name is required" });
//     }
//     const occasion = new Occasion(req.body);
//     await occasion.save();
//     res.status(201).json(occasion);
//   } catch (err) {
//     console.log("Error adding occasion:", err);
//     res.status(500).json({ error: "Failed to add occasion" });
//   }
// });

// // Get All Occasions
// app.get("/api/occasions", async (req, res) => {
//   try {
//     const occasions = await Occasion.find();
//     res.status(200).json(occasions);
//   } catch (err) {
//     console.log("Error fetching occasions:", err);
//     res.status(500).json({ error: "Failed to fetch occasions" });
//   }
// });

// // Delete Occasion
// app.delete("/api/occasions/:id", async (req, res) => {
//   try {
//     const lists = await List.find({ occasionId: req.params.id });
//     const listIds = lists.map((list) => list._id);

//     await Promise.all([
//       Guest.deleteMany({ listId: { $in: listIds } }),
//       FoodItem.deleteMany({ listId: { $in: listIds } }),
//       Dance.deleteMany({ listId: { $in: listIds } }),
//       List.deleteMany({ occasionId: req.params.id }),
//       Occasion.findByIdAndDelete(req.params.id)
//     ]);

//     res.status(200).json({ message: "Occasion and all associated data deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting occasion:", err);
//     res.status(500).json({ error: "Failed to delete occasion" });
//   }
// });

// // LIST ENDPOINTS
// // Add List to Occasion
// app.post("/api/occasions/:id/lists", async (req, res) => {
//   try {
//     if (!req.body.name) {
//       return res.status(400).json({ error: "List name is required" });
//     }
//     const list = new List({ name: req.body.name, occasionId: req.params.id });
//     await list.save();
//     res.status(201).json(list);
//   } catch (err) {
//     console.log("Error adding list to occasion:", err);
//     res.status(500).json({ error: "Failed to add list" });
//   }
// });

// // Get Lists for an Occasion
// app.get("/api/occasions/:id/lists", async (req, res) => {
//   try {
//     const lists = await List.find({ occasionId: req.params.id });
//     if (lists.length === 0) {
//       return res.status(404).json({ message: "No lists found for this occasion" });
//     }
//     res.status(200).json(lists);
//   } catch (err) {
//     console.log("Error fetching lists for occasion:", err);
//     res.status(500).json({ error: "Failed to fetch lists" });
//   }
// });

// // Delete List
// app.delete("/api/occasions/:occasionId/lists/:listId", async (req, res) => {
//   try {
//     await Promise.all([
//       Guest.deleteMany({ listId: req.params.listId }),
//       FoodItem.deleteMany({ listId: req.params.listId }),
//       Dance.deleteMany({ listId: req.params.listId }),
//       List.findByIdAndDelete(req.params.listId)
//     ]);
//     res.status(200).json({ message: "List and all associated data deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting list:", err);
//     res.status(500).json({ error: "Failed to delete list" });
//   }
// });

// // GUEST ENDPOINTS
// // Add Guest to a List
// app.post("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
//   try {
//     const { name, contactNumber, personsInvited, invitationSent, family } = req.body;
//     if (!name || !contactNumber || !personsInvited || !family) {
//       return res.status(400).json({ error: "All guest details are required" });
//     }
//     const guest = new Guest({
//       name,
//       contactNumber,
//       personsInvited,
//       invitationSent,
//       family,
//       listId: req.params.listId,
//     });
//     await guest.save();
//     res.status(201).json(guest);
//   } catch (err) {
//     console.log("Error adding guest:", err);
//     res.status(500).json({ error: "Failed to add guest" });
//   }
// });

// // Get Guests for a List with family filter
// app.get("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
//   try {
//     const { family } = req.query;
//     let query = { listId: req.params.listId };
    
//     if (family) {
//       query.family = family;
//     }
    
//     const guests = await Guest.find(query);
//     if (guests.length === 0) {
//       return res.status(404).json({ message: "No guests found for this list" });
//     }
//     res.status(200).json(guests);
//   } catch (err) {
//     console.log("Error fetching guests:", err);
//     res.status(500).json({ error: "Failed to fetch guests" });
//   }
// });

// // Edit Guest
// app.put("/api/occasions/:occasionId/lists/:listId/guests/:guestId", async (req, res) => {
//   try {
//     const { name, contactNumber, personsInvited, invitationSent, family } = req.body;
//     const guest = await Guest.findById(req.params.guestId);
//     if (!guest) {
//       return res.status(404).json({ message: "Guest not found" });
//     }

//     guest.name = name || guest.name;
//     guest.contactNumber = contactNumber || guest.contactNumber;
//     guest.personsInvited = personsInvited || guest.personsInvited;
//     guest.invitationSent = invitationSent !== undefined ? invitationSent : guest.invitationSent;
//     guest.family = family || guest.family;

//     await guest.save();
//     res.status(200).json(guest);
//   } catch (err) {
//     console.log("Error updating guest:", err);
//     res.status(500).json({ error: "Failed to update guest" });
//   }
// });

// // Delete Guest
// app.delete("/api/occasions/:occasionId/lists/:listId/guests/:guestId", async (req, res) => {
//   try {
//     await Guest.findByIdAndDelete(req.params.guestId);
//     res.status(200).json({ message: "Guest deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting guest:", err);
//     res.status(500).json({ error: "Failed to delete guest" });
//   }
// });

// // Delete All Guests for a List
// app.delete("/api/occasions/:occasionId/lists/:listId/guests", async (req, res) => {
//   try {
//     await Guest.deleteMany({ listId: req.params.listId });
//     res.status(200).json({ message: "All guests removed from the list" });
//   } catch (err) {
//     console.log("Error removing all guests:", err);
//     res.status(500).json({ error: "Failed to remove all guests" });
//   }
// });

// // FOOD ITEM ENDPOINTS
// // Add Food Item
// app.post("/api/occasions/:occasionId/lists/:listId/food-items", async (req, res) => {
//   try {
//     const { itemName, quantity, orderSent, vendorName, vendorContact } = req.body;
//     if (!itemName || !quantity || !vendorName || !vendorContact) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     const foodItem = new FoodItem({
//       itemName,
//       quantity,
//       orderSent,
//       vendorName,
//       vendorContact,
//       listId: req.params.listId,
//     });
//     await foodItem.save();
//     res.status(201).json(foodItem);
//   } catch (err) {
//     console.log("Error adding food item:", err);
//     res.status(500).json({ error: "Failed to add food item" });
//   }
// });

// // Get Food Items for a List
// app.get("/api/occasions/:occasionId/lists/:listId/food-items", async (req, res) => {
//   try {
//     const foodItems = await FoodItem.find({ listId: req.params.listId });
//     res.status(200).json(foodItems);
//   } catch (err) {
//     console.log("Error fetching food items:", err);
//     res.status(500).json({ error: "Failed to fetch food items" });
//   }
// });

// // Edit Food Item
// app.put("/api/occasions/:occasionId/lists/:listId/food-items/:foodItemId", async (req, res) => {
//   try {
//     const { itemName, quantity, orderSent, vendorName, vendorContact } = req.body;
//     const foodItem = await FoodItem.findById(req.params.foodItemId);
//     if (!foodItem) {
//       return res.status(404).json({ message: "Food item not found" });
//     }

//     foodItem.itemName = itemName || foodItem.itemName;
//     foodItem.quantity = quantity || foodItem.quantity;
//     foodItem.orderSent = orderSent !== undefined ? orderSent : foodItem.orderSent;
//     foodItem.vendorName = vendorName || foodItem.vendorName;
//     foodItem.vendorContact = vendorContact || foodItem.vendorContact;

//     await foodItem.save();
//     res.status(200).json(foodItem);
//   } catch (err) {
//     console.log("Error updating food item:", err);
//     res.status(500).json({ error: "Failed to update food item" });
//   }
// });

// // Delete Food Item
// app.delete("/api/occasions/:occasionId/lists/:listId/food-items/:foodItemId", async (req, res) => {
//   try {
//     await FoodItem.findByIdAndDelete(req.params.foodItemId);
//     res.status(200).json({ message: "Food item deleted successfully" });
//   } catch (err) {
//     console.log("Error deleting food item:", err);
//     res.status(500).json({ error: "Failed to delete food item" });
//   }
// });

// // Delete All Food Items for a List
// app.delete("/api/occasions/:occasionId/lists/:listId/food-items", async (req, res) => {
//   try {
//     await FoodItem.deleteMany({ listId: req.params.listId });
//     res.status(200).json({ message: "All food items removed from the list" });
//   } catch (err) {
//     console.log("Error removing all food items:", err);
//     res.status(500).json({ error: "Failed to remove all food items" });
//   }
// });

// // DANCE ENDPOINTS
// // Get all dances for a list
// app.get("/api/occasions/:occasionId/lists/:listId/dances", async (req, res) => {
//   try {
//     const { occasionId, listId } = req.params;
//     const dances = await Dance.find({ occasionId, listId });
//     res.json(dances);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch dances", error });
//   }
// });

// // Add new dance
// app.post("/api/occasions/:occasionId/lists/:listId/dances", async (req, res) => {
//   try {
//     const { occasionId, listId } = req.params;
//     const { danceName, numberOfPerformers, dancerNames, songLinkOrNote } = req.body;

//     if (!danceName || !numberOfPerformers || !dancerNames) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const performersNumber = parseInt(numberOfPerformers, 10);
//     if (isNaN(performersNumber)) {
//       return res.status(400).json({ error: "Number of performers must be a valid number" });
//     }

//     const newDance = new Dance({
//       occasionId,
//       listId,
//       danceName,
//       numberOfPerformers: performersNumber,
//       dancerNames,
//       songLinkOrNote,
//     });

//     await newDance.save();
//     res.status(201).json(newDance);
//   } catch (error) {
//     console.error("Error adding dance:", error);
//     res.status(500).json({ message: "Failed to add dance", error: error.message });
//   }
// });

// // Edit dance
// app.put("/api/occasions/:occasionId/lists/:listId/dances/:danceId", async (req, res) => {
//   try {
//     // Edit dance (continued)
//     const { danceId } = req.params;
//     const { danceName, numberOfPerformers, dancerNames, songLinkOrNote } = req.body;

//     const dance = await Dance.findById(danceId);
//     if (!dance) {
//       return res.status(404).json({ message: "Dance not found" });
//     }

//     dance.danceName = danceName || dance.danceName;
//     dance.numberOfPerformers = numberOfPerformers || dance.numberOfPerformers;
//     dance.dancerNames = dancerNames || dance.dancerNames;
//     dance.songLinkOrNote = songLinkOrNote || dance.songLinkOrNote;

//     await dance.save();
//     res.status(200).json(dance);
//   } catch (error) {
//     console.error("Error updating dance:", error);
//     res.status(500).json({ message: "Failed to update dance", error: error.message });
//   }
// });

// // Get single dance
// app.get("/api/occasions/:occasionId/lists/:listId/dances/:danceId", async (req, res) => {
//   try {
//     const dance = await Dance.findById(req.params.danceId);
//     if (!dance) {
//       return res.status(404).json({ message: "Dance not found" });
//     }
//     res.status(200).json(dance);
//   } catch (err) {
//     console.log("Error fetching dance:", err);
//     res.status(500).json({ error: "Failed to fetch dance" });
//   }
// });

// // Delete specific dance
// app.delete("/api/occasions/:occasionId/lists/:listId/dances/:danceId", async (req, res) => {
//   try {
//     const { danceId } = req.params;
//     await Dance.findByIdAndDelete(danceId);
//     res.json({ message: "Dance deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete dance", error });
//   }
// });

// // Delete all dances for a list
// app.delete("/api/occasions/:occasionId/lists/:listId/dances", async (req, res) => {
//   try {
//     const { occasionId, listId } = req.params;
//     await Dance.deleteMany({ occasionId, listId });
//     res.json({ message: "All dances removed successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to remove all dances", error });
//   }
// });

// // CONTRACTOR ENDPOINTS
// // Get all contractors for an occasion
// app.get("/api/occasions/:occasionId/contractors", async (req, res) => {
//   try {
//     const { occasionId } = req.params;
//     const contractors = await Contractor.find({ occasionId });
//     res.json(contractors);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch contractors", error });
//   }
// });

// // Add new contractor
// app.post("/api/occasions/:occasionId/contractors", async (req, res) => {
//   try {
//     const { occasionId } = req.params;
//     const { name, service, contact } = req.body;

//     if (!name || !service || !contact) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const newContractor = new Contractor({
//       occasionId,
//       name,
//       service,
//       contact,
//     });

//     await newContractor.save();
//     res.status(201).json(newContractor);
//   } catch (error) {
//     console.error("Error adding contractor:", error);
//     res.status(500).json({ message: "Failed to add contractor", error: error.message });
//   }
// });

// // Edit contractor
// app.put("/api/occasions/:occasionId/contractors/:contractorId", async (req, res) => {
//   try {
//     const { contractorId } = req.params;
//     const { name, service, contact } = req.body;

//     const updatedContractor = await Contractor.findByIdAndUpdate(
//       contractorId,
//       { name, service, contact },
//       { new: true } // Returns updated document
//     );

//     if (!updatedContractor) {
//       return res.status(404).json({ message: "Contractor not found" });
//     }

//     res.status(200).json(updatedContractor);
//   } catch (error) {
//     console.error("Error updating contractor:", error);
//     res.status(500).json({ message: "Failed to update contractor", error: error.message });
//   }
// });

// // Get single contractor
// app.get("/api/occasions/:occasionId/contractors/:contractorId", async (req, res) => {
//   try {
//     const contractor = await Contractor.findById(req.params.contractorId);
//     if (!contractor) {
//       return res.status(404).json({ message: "Contractor not found" });
//     }
//     res.status(200).json(contractor);
//   } catch (err) {
//     console.log("Error fetching contractor:", err);
//     res.status(500).json({ error: "Failed to fetch contractor" });
//   }
// });

// // Delete specific contractor
// app.delete("/api/occasions/:occasionId/contractors/:contractorId", async (req, res) => {
//   try {
//     const { contractorId } = req.params;
//     const deletedContractor = await Contractor.findByIdAndDelete(contractorId);

//     if (!deletedContractor) {
//       return res.status(404).json({ message: "Contractor not found" });
//     }

//     res.json({ message: "Contractor deleted successfully", deletedContractor });
//   } catch (error) {
//     console.error("Error deleting contractor:", error);
//     res.status(500).json({ message: "Failed to delete contractor", error });
//   }
// });

// // Delete all contractors for an occasion
// app.delete("/api/occasions/:occasionId/contractors", async (req, res) => {
//   try {
//     const { occasionId } = req.params;
//     await Contractor.deleteMany({ occasionId });
//     res.json({ message: "All contractors removed successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to remove all contractors", error });
//   }
// });

// // Upload Images
// app.post("/upload", upload.array("images"), (req, res) => {
//   res.json({ message: "Images uploaded successfully!" });
// });

// // Get all uploaders
// app.get("/images", async (req, res) => {
//   try {
//     const uploadDir = path.join(__dirname, "uploads");
//     const uploaders = fs.existsSync(uploadDir) ? fs.readdirSync(uploadDir) : [];
//     res.json({ uploaders });
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching uploaders" });
//   }
// });

// // Get images by uploader
// app.get("/images/:uploader", (req, res) => {
//   const uploader = req.params.uploader;
//   const userPath = path.join(__dirname, "uploads", uploader);
//   if (fs.existsSync(userPath)) {
//     const images = fs.readdirSync(userPath);
//     res.json({ images });
//   } else {
//     res.status(404).json({ error: "Uploader not found" });
//   }
// });

// // Delete a single image
// app.delete("/delete/:uploader/:filename", (req, res) => {
//   const { uploader, filename } = req.params;
//   const filePath = path.join(__dirname, "uploads", uploader, filename);

//   if (fs.existsSync(filePath)) {
//     fs.unlinkSync(filePath);
//     res.json({ message: "Image deleted successfully!" });
//   } else {
//     res.status(404).json({ error: "Image not found" });
//   }
// });

// // Delete all images of an uploader
// app.delete("/delete/:uploader", (req, res) => {
//   const uploader = req.params.uploader;
//   const userPath = path.join(__dirname, "uploads", uploader);

//   if (fs.existsSync(userPath)) {
//     fs.removeSync(userPath);
//     res.json({ message: "All images deleted successfully!" });
//   } else {
//     res.status(404).json({ error: "Uploader not found" });
//   }
// });

// // Start the server
// app.listen(3000, () => console.log("Server running on port 3000"));


















