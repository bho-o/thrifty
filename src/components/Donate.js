// import React, { useState } from "react";
// import "./sell.css";

// const Donate = () => {
//   const [formData, setFormData] = useState({
//     type: "",
//     weight: "",
//     quality: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/donate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: "USER_ID_HERE", // Replace with the actual user ID
//           ...formData,
//         }),
//       });
//       if (response.ok) {
//         alert("Donation submitted successfully!");
//       } else {
//         alert("Failed to submit donation.");
//       }
//     } catch (error) {
//       console.error("Error submitting donation:", error);
//     }
//   };
  

//   return (
//     <div className="container">
//       <h1>Donate Item</h1>
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

//         <label htmlFor="quality">Quality:</label>
//         <input
//           type="text"
//           id="quality"
//           name="quality"
//           value={formData.quality}
//           onChange={handleChange}
//           required
//         />

//         <p className="price-info">Price is fixed at $0</p>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Donate;

import React, { useState } from "react";

const Donate = () => {
  const [formData, setFormData] = useState({
    type: "",
    weight: "",
    quality: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "USER_ID_HERE", // Replace with actual user ID from authentication
          ...formData,
          price: 0 // Donations are always free
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Thank you for your donation!");
        setFormData({ type: "", weight: "", quality: "" }); // Reset form
      } else {
        setError(data.message || "Failed to submit donation.");
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
      setError("Failed to connect to server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Donate Item</h2>
      
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

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-600 text-sm">Price is fixed at $0 (Donation)</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-2 px-4 rounded-lg transition-colors`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Donation'}
        </button>
      </form>
    </div>
  );
};

export default Donate;