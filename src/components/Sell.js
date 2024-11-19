import React, { useState } from "react";
import "./sell.css";

const Sell = () => {
  const [formData, setFormData] = useState({
    type: "",
    weight: "",
    price: "",
    quality: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "USER_ID_HERE", // Replace with the actual user ID
          ...formData,
        }),
      });
      if (response.ok) {
        alert("Sell item submitted successfully!");
      } else {
        alert("Failed to submit sell item.");
      }
    } catch (error) {
      console.error("Error submitting sell item:", error);
    }
  };
  

  return (
    <div className="container">
      <h1>Sell Item</h1>
      {error && <div className="error-message">{error}</div>}
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

        <label htmlFor="price">Price Limit (USD):</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Sell;