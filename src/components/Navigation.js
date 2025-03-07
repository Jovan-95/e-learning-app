import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/userDashboard">UserDashboard</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/">Register</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
