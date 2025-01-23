import React, { useState, useEffect } from "react";
import { Form, FormFeedback } from "reactstrap";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import userService from "../../services/userService";
import defaultAvatar from "./woman.png";
import "./Profile.css";

function ProfileUpdate() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState(null);
  const [fname, setFirstname] = useState("");
  const [lname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await userService.getUserById(); // Fetch user details by ID
        if (response.data.success) {
          const user = response.data.data; // Access the user data directly
          setUserData(user);
          setFirstname(user.fname);
          setLastname(user.lname);
          setEmail(user.email);
          setUsername(user.username);
        } else {
          alert("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error.response?.data || error.message);
        alert("Failed to fetch profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  useEffect(() => {
    if (newPassword !== confirmPassword) {
      setPasswordMessage("Passwords do not match");
    } else if (newPassword.length < 8 || newPassword.length > 12) {
      setPasswordMessage("Password should be 8-12 characters long");
    } else {
      setPasswordMessage("");
    }
  }, [newPassword, confirmPassword]);

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("email", email);
      formData.append("username", username);

      const response = await userService.updateProfile(formData);
      alert(response.data.message || "Profile updated successfully");
      // Optionally, you can update the state here to reflect the updated profile
      setUserData({ ...userData, fname, lname, email, username });
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    try {
      if (passwordMessage) {
        throw new Error("Please fix password issues before submitting");
      }

      const data = newPassword ;
      const response = await userService.updatePassword(data);
      alert(response.data.message || "Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password");
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />

      <div className="main-profile-update mar">
        <div className="profile-update-container">
          {/* Section 1: Update Profile */}
          <div className="update-section">
            <h2>Update Profile</h2>
            <Form onSubmit={handleUpdateProfile}>
              <div className="input-group">
                <label>Profile Picture</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <img
                  src={image ? URL.createObjectURL(image) : userData?.image ? `http://localhost:5500${userData.image}` : defaultAvatar}
                  alt="Profile"
                  className="profile-pic-preview"
                />
              </div>
              <div className="input-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-update">
                Update Profile
              </button>
            </Form>
          </div>

          {/* Section 2: Change Password */}
          <div className="update-section">
            <h2>Change Password</h2>
            <Form onSubmit={handleChangePassword}>
              <div className="input-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {passwordMessage && (
                <FormFeedback style={{ color: "red" }}>{passwordMessage}</FormFeedback>
              )}
              <button type="submit" className="btn-update">
                Change Password
              </button>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfileUpdate;