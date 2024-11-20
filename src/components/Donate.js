import React, { useState } from "react";
import './sell.css'; // You can reuse the same CSS file or create a new one

const Donate = () => {
  const [formData, setFormData] = useState({
    type: "",
    weight: "",
    quality: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.type || !formData.weight || !formData.quality) {
      setError("All fields are required");
      return false;
    }
    if (isNaN(formData.weight) || formData.weight <= 0) {
      setError("Weight must be a positive number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/donate", {  // Changed endpoint to /donate
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "USER_ID_HERE", // Replace with actual user ID from authentication
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Item donated successfully! Thank you for your contribution.");
        setFormData({ type: "", weight: "", quality: "" }); // Reset form
      } else {
        setError(data.message || "Failed to submit donation item.");
      }
    } catch (error) {
      console.error("Error submitting donation item:", error);
      setError("Failed to connect to server. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Donate Item</h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Enter item type"
        />

        <label>Weight (kg or count):</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Enter weight or count"
          step="0.01"
          min="0.01"
        />

        <label>Quality:</label>
        <select
          name="quality"
          value={formData.quality}
          onChange={handleChange}
        >
          <option value="">Select quality</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>

        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
};

export default Donate;