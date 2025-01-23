import React, { useState, useEffect } from "react";
import userService from "../../../services/userService";
import './Users.css';

function Users() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    userService.getUser().then((res) => {
      setUserData(res.data.data);
    });
  }, []);

  return (
    <div className="user-card-container">
      {userData.map((user) => (
        <div className="user-card" key={user._id}>
          <img 
            src={`http://localhost:5500${user.image}`} 
            alt="User Avatar" 
            className="user-avatar"
          />
          <h3>{user.fname} {user.lname}</h3>
          <p>{user.email}</p>
          <p className="role">{user.role}</p>
          <p className="username">@{user.username}</p>
        </div>
      ))}
    </div>
  );
}

export default Users;