import React, { useState } from "react";
import "./Register.css";
import body from "./register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormFeedback, Input } from "reactstrap";
import userService from "../../services/userService";
import defaultAvatar from "./woman.png";

function Register() {
  const [image, setImage] = useState(null);
  const [fname, setFirstname] = useState("");
  const [lname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password !== cpassword) {
      return "Password and confirm password do not match";
    } else if (password.length < 8 || password.length > 12) {
      return "Password should be between 8 and 12 characters long";
    } else if (!/(?=.*[A-Z])/.test(password)) {
      return "Password should include at least one uppercase letter";
    } else if (!/(?=.*[a-z])/.test(password)) {
      return "Password should include at least one lowercase letter";
    } else if (!/(?=.*\d)/.test(password)) {
      return "Password should include at least one digit";
    } else if (!/(?=.*[@$!%*?&])/.test(password)) {
      return "Password should include at least one special character";
    } else if (
      password === username ||
      password === email ||
      password === "123456" ||
      password === "password"
    ) {
      return "Please choose a stronger password";
    }
    return "";
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errorMessage = validatePassword();
    if (errorMessage) {
      setMessage(errorMessage);
      return;
    }

    if (!fname || !lname || !username || !email || !password || !cpassword) {
      setMessage("All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);

      const response = await userService.register(formData);

      if (response.data.status) {
        alert("Registration successful!");
        setImage(null);
        setFirstname("");
        setLastname("");
        setUsername("");
        setEmail("");
        setPassword("");
        setCPassword("");
        setMessage("");
        navigate("/login");
      } else {
        throw new Error("Error occurred while registering");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="main-register">
      <div className="leftside-register">
        <div className="body">
          <img src={body} id="body-img" alt="" />
        </div>
      </div>

      <div className="rightside-register">
        <div className="body-right">
          <div className="container-register">
            <div className="avatar">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="avatar" />
              ) : (
                <img src={defaultAvatar} alt="default avatar" />
              )}
            </div>

            <Form>
              <div className="input-group">
                <h5>Profile Picture</h5>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="input-group">
                <h5>First Name</h5>
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  value={fname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <h5>Last Name</h5>
                <input
                  id="lname"
                  name="lname"
                  type="text"
                  value={lname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <h5>Email</h5>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <h5>Username</h5>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <h5>Password</h5>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <h5>Confirm Password</h5>
                <input
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <FormFeedback style={{ color: "red", fontSize: "0.8rem" }}>
                  {message}
                </FormFeedback>
              </div>
              <div className="input-group">
                <Input
                  type="submit"
                  value="Register"
                  id="sbtn"
                  onClick={handleRegister}
                />
              </div>
            </Form>

            <div className="top-right">
              <h5>
                Already have an account?
                <Link id="link-signin" to="/login">
                  {" "}
                  Login
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;