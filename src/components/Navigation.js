import { NavLink } from "react-router-dom";
import "../CSS/home.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "../components/modal";
import { logoutUser } from "../redux/authSlice";

function Navigation() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogoutModal() {
    setIsOpen((prev) => !prev);
  }

  function handleLogoutUser() {
    dispatch(logoutUser());
  }

  return (
    <div>
      <nav>
        <ul className="nav-wrapper">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/userDashboard">UserDashboard</NavLink>
          </li>
          <li>
            <NavLink to="/userProfile">User Profile</NavLink>
          </li>
          <li>
            <NavLink to="/">Register</NavLink>
          </li>
          <li onClick={handleLogoutModal}>LOGOUT</li>
        </ul>
        <div className={isOpen ? "d-block" : "d-none"}>
          <Modal>
            <div>Are you sure you want to logout?</div>
            <button onClick={handleLogoutUser}>Logout</button>
          </Modal>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
