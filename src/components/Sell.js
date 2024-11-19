// import React, { useState } from "react";
// import "./sell.css";

// const Sell = () => {
//   const [formData, setFormData] = useState({
//     type: "",
//     weight: "",
//     price: "",
//     quality: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/sell", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: "USER_ID_HERE", // Replace with the actual user ID
//           ...formData,
//         }),
//       });
//       if (response.ok) {
//         alert("Sell item submitted successfully!");
//       } else {
//         alert("Failed to submit sell item.");
//       }
//     } catch (error) {
//       console.error("Error submitting sell item:", error);
//     }
//   };
  

//   return (
//     <div className="container">
//       <h1>Sell Item</h1>
//       {error && <div className="error-message">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="type">Type:</label>
//         <input
//           type="text"
//           id="type"
//           name="type"
//           value={formData.type}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="weight">Weight (kg or count):</label>
//         <input
//           type="text"
//           id="weight"
//           name="weight"
//           value={formData.weight}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="price">Price Limit (USD):</label>
//         <input
//           type="number"
//           id="price"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />

//         <label htmlFor="quality">Quality:</label>
//         <input
//           type="text"
//           id="quality"
//           name="quality"
//           value={formData.quality}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Sell;

import React, { useState } from "react";

const Sell = () => {
  const [formData, setFormData] = useState({
    type: "",
    weight: "",
    price: "",
    quality: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.type || !formData.weight || !formData.price || !formData.quality) {
      setError("All fields are required");
      return false;
    }
    if (isNaN(formData.weight) || formData.weight <= 0) {
      setError("Weight must be a positive number");
      return false;
    }
    if (isNaN(formData.price) || formData.price <= 0) {
      setError("Price must be a positive number");
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
      const response = await fetch("http://localhost:5000/api/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "USER_ID_HERE", // Replace with actual user ID from authentication
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Item listed successfully!");
        setFormData({ type: "", weight: "", price: "", quality: "" }); // Reset form
      } else {
        setError(data.message || "Failed to submit sell item.");
      }
    } catch (error) {
      console.error("Error submitting sell item:", error);
      setError("Failed to connect to server. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sell Item</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Type:
          </label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter item type"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Weight (kg or count):
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter weight or count"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price (USD):
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter price"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Quality:
          </label>
          <select
            name="quality"
            value={formData.quality}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select quality</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Sell;