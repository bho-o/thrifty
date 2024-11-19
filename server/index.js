import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { User } from "./db.js"; // Updated import for User model

const app = express();
const port = 5000; // Ensured consistent port usage

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection URI
const MONGODB_URI = "mongodb://localhost:27017/connect";

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");

    // Route to handle saving user data
    app.post("/save-profile", async (req, res) => {
      try {
        const { name, email, phone_no, address, orders } = req.body;

        // Create a new user document
        const newUser = new User({
          name,
          email,
          phone_no,
          address,
          orders,
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        console.log("User data saved:", savedUser);

        res.status(201).json({ message: "User data saved successfully", data: savedUser });
      } catch (error) {
        console.error("Error saving user data:", error);
        res.status(500).json({ error: "Failed to save user data" });
      }
    });

    // Catch-all route to handle invalid paths
    app.use((req, res) => {
      res.status(404).json({ error: "Route not found" });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

// Start the server
startServer();