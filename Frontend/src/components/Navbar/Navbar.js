import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import Cart from "../Cart/Cart";
import "./Navbar.css";
import Logo from "./Logoo.png";
import userService from "../../services/userService";
import { message } from "antd";

function NavBar() {
  const [showCart, setshowCart] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState({});
  const [state, setState] = useState({ clicked: false });
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("verificationCode");


    // Update the login state
    setIsLoggedIn(false);
    // Redirect to the home page
    window.location.href = "/";
  };

  useEffect(() => {
    if (isLoggedIn) {
      userService.getUserById().then((res) => {
        setUser(res.data.data);
      });
    }
  }, [isLoggedIn]);

  const handleClick = () => {
    setState({ clicked: !state.clicked });
  };

  let loginOrLogoutButton;
  let cartButton;
  let profileButton;

  if (isLoggedIn) {
    loginOrLogoutButton = <button onClick={handleLogout}>Logout</button>;
    cartButton = (
      <li>
        <i
          className="fas fa-shopping-cart"
          onClick={() => setshowCart(true)}
        ></i>
      </li>
    );
    profileButton = (
      <li className="profile-icon">
        <button onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
          <i className="fas fa-user"></i>
        </button>
        {showProfileDropdown && (
          <div className="profile-dropdown">
            <ul>
              <li>
                <Link to="/profile" onClick={() => setShowProfileDropdown(false)}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/order" onClick={() => setShowProfileDropdown(false)}>
                  Orders
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </li>
    );
  } else {
    loginOrLogoutButton = (
      <button
        onClick={() => {
          window.location.href = "/login";
        }}
      >
        Login
      </button>
    );
  }

  return (
    <>
      <nav className="NavbarItems">
        <div>
          <img className="navbar-logo" src={Logo} alt="Logo" />
        </div>

        <div className="menu-icons" onClick={handleClick}>
          <i className={state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link className={item.cName} to={item.url}>
                  <i className={item.icon}></i> {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="nav-menu-profile">
          <span>{cartButton}</span>
          <span>{profileButton}</span>
          <span>{loginOrLogoutButton}</span>
        </ul>
      </nav>
      {showCart && <Cart setshowCart={setshowCart} />}
    </>
  );
}

export default NavBar;
