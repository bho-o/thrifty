import React, { useState } from "react";
import "./sell.css";

const Donate = () => {
  const [formData, setFormData] = useState({
    type: "",
    weight: "",
    quality: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "USER_ID_HERE", // Replace with the actual user ID
          ...formData,
        }),
      });
      if (response.ok) {
        alert("Donation submitted successfully!");
      } else {
        alert("Failed to submit donation.");
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };
  

  return (
    <div className="container">
      <h1>Donate Item</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />

        <label htmlFor="weight">Weight (kg or count):</label>
        <input
          type="text"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />

        <label htmlFor="quality">Quality:</label>
        <input
          type="text"
          id="quality"
          name="quality"
          value={formData.quality}
          onChange={handleChange}
          required
        />

        <p className="price-info">Price is fixed at $0</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Donate;