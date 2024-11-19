// import React, { useState } from "react";
// import "./profile_page.css";

// function Profile_page() {
//   const [isEditing, setIsEditing] = useState(false);

//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     phone_no: "",
//     address: "",
//   });

//   const handleEditClick = async () => {
//     if (isEditing) {
//       // Save the data to the backend
//       try {
//         const response = await fetch("http://localhost:5000/save-profile", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userData),
//         });

//         if (response.ok) {
//           const result = await response.json();
//           console.log("User data saved:", result);
//           alert("Profile saved successfully!");
//         } else {
//           throw new Error("Failed to save profile");
//         }
//       } catch (error) {
//         console.error("Error saving profile:", error);
//         alert("Error saving profile. Please try again.",error);
//       }
//     }

//     setIsEditing(!isEditing);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="profile-page">
//       <h2 className="profile-title">PROFILE</h2>
//       <div className="profile-content">
//         <div className="profile-info">
//           <div className="user-icon">&#128100;</div>
//           <div className="info-lines">
//             <div className="line">
//               <label htmlFor="name">Name: </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 required
//                 disabled={!isEditing}
//                 value={userData.name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="line">
//               <label htmlFor="email">Email: </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 required
//                 disabled={!isEditing}
//                 value={userData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="line">
//               <label htmlFor="phone_no">Phone No: </label>
//               <input
//                 type="tel"
//                 id="phone_no"
//                 name="phone_no"
//                 required
//                 disabled={!isEditing}
//                 value={userData.phone_no}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="line">
//               <label htmlFor="address">Address: </label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 required
//                 disabled={!isEditing}
//                 value={userData.address}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <button className="circle" onClick={handleEditClick}>
//             {isEditing ? "Save" : "Edit"}
//           </button>
//         </div>
//         <div className="black-box">
//           <h3 style={{ color: "white" }}>Order History</h3>
//           <ul style={{ color: "white" }}>
//             {userData.orders.map((order, index) => (
//               <li key={index} className="order-entry">
//                 <p>
//                   <strong>Order ID:</strong> {order.orderId}
//                 </p>
//                 <p>
//                   <strong>Date:</strong> {order.date}
//                 </p>
//                 <p>
//                   <strong>Total:</strong> {order.total}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile_page;

import React, { useState } from "react";
import "./profile_page.css";

function Profile_page() {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone_no: "",
    address: "",
  });

  const handleEditClick = async () => {
    if (isEditing) {
      // Validate form data
      if (!userData.name || !userData.email || !userData.phone_no || !userData.address) {
        setError("All fields are required");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/profile/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            phone_no: userData.phone_no,
            address: userData.address
          }),
        });

        if (response.ok) {
          setSuccess("Profile saved successfully!");
          setError("");
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to save profile");
        }
      } catch (error) {
        console.error("Error saving profile:", error);
        setError("Error saving profile. Please try again.");
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">PROFILE</h2>
      
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
          {error}
        </div>
      )}
      
      {success && (
        <div className="success-message" style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>
          {success}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-info">
          <div className="user-icon">&#128100;</div>
          <div className="info-lines">
            <div className="line">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={!isEditing}
                value={userData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="line">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={!isEditing}
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="line">
              <label htmlFor="phone_no">Phone No: </label>
              <input
                type="tel"
                id="phone_no"
                name="phone_no"
                required
                disabled={!isEditing}
                value={userData.phone_no}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="line">
              <label htmlFor="address">Address: </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                disabled={!isEditing}
                value={userData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>
          </div>
          <button className="circle" onClick={handleEditClick}>
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile_page;