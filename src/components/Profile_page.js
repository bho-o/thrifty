
import React, { useState, useEffect } from "react";
import "./profile_page.css";

function Profile_page() {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState([]); // Store all users
  const [selectedUserId, setSelectedUserId] = useState(null); // Store selected user ID
  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone_no: "",
    address: "",
  });

  // Fetch all users on component load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profile/all");
        const data = await response.json();
        setUsers(data); // Set fetched users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Save or update user
  // Save or update user
const handleSubmit = async () => {
  if (!userData.name || !userData.email || !userData.phone_no || !userData.address) {
    setError("All fields are required");
    return;
  }

  try {
    const url = selectedUserId
      ? `http://localhost:5000/api/profile/update/${selectedUserId}`
      : "http://localhost:5000/api/profile/save";
    
    const method = selectedUserId ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const updatedUser = await response.json(); // Get the updated user from the server
      setSuccess("Profile saved successfully!");
      setError("");

      if (selectedUserId) {
        // Update the user in the list if editing
        setUsers((prevUsers) => prevUsers.map(user =>
          user._id === selectedUserId ? updatedUser.profile : user // Make sure we update the user correctly
        ));
      } else {
        // Add the new user to the list
        setUsers([...users, updatedUser.profile]);
      }

      setUserData({ name: "", email: "", phone_no: "", address: "" }); // Clear form
      setSelectedUserId(null); // Reset selected user
    } else {
      const errorData = await response.json();
      setError(errorData.message || "Failed to save profile");
    }
  } catch (error) {
    console.error("Error saving profile:", error);
    setError("Error saving profile. Please try again.");
  }
};


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  // Handle user click from the list
  const handleUserClick = (user) => {
    setUserData({
      name: user.name,
      email: user.email,
      phone_no: user.phone_no,
      address: user.address,
    });
    setSelectedUserId(user._id);
    setIsEditing(true);
    setSuccess("");
    setError("");
  };

  return (
    <div className="profile-page">
      <h2 className="profile-title">PROFILE</h2>

      {error && (
        <div className="error-message" style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>
          {error}
        </div>
      )}

      {success && (
        <div className="success-message" style={{ color: "green", marginBottom: "1rem", textAlign: "center" }}>
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
                value={userData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>
          </div>
          <button className="circle" onClick={handleSubmit}>
            {selectedUserId ? "Update" : "Submit"}
          </button>
        </div>

        {/* Users List */}
        <div className="user-list">
          <h3>All Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user._id} onClick={() => handleUserClick(user)}>
                {user.name} {/* Display only the user's name */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile_page;
