import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEmail, addUserName, addUserObj } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userObj, setUserObj] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return regex.test(email);
  };

  function handleRegister(e) {
    e.preventDefault();
    if (
      userObj.name === "" ||
      userObj.email === "" ||
      userObj.password === "" ||
      userObj.confirmPassword === ""
    )
      return alert("Fill the form!");

    if (userObj.name.length <= 2) {
      return alert("Name need to have 3 or more chars!");
    }

    if (!validateEmail(userObj.email)) {
      return setError("Invalid Email!");
    }

    if (userObj.password.length <= 6) {
      return alert("Password needs to be longer!");
    }

    if (userObj.password !== userObj.confirmPassword) {
      return alert("Password are not matching!");
    }

    // Main dispatch, sending obj after validation
    dispatch(addUserObj(userObj));

    // Reset states
    setError("");
    setUserObj({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    navigate("/login");
  }

  function goToLogin() {
    navigate("/login");
  }
  return (
    <>
      <h2>Register</h2>
      <form>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            onChange={(e) => setUserObj({ name: e.target.value })}
            value={userObj.name}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => setUserObj({ ...userObj, email: e.target.value })}
            value={userObj.email}
            type="email"
            id="email"
            name="email"
            required
          />
          <p>{error}</p>
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) =>
              setUserObj({ ...userObj, password: e.target.value })
            }
            value={userObj.password}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            onChange={(e) =>
              setUserObj({ ...userObj, confirmPassword: e.target.value })
            }
            value={userObj.confirmPassword}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
        </div>

        <button onClick={handleRegister} type="submit">
          Register
        </button>
        <p>
          Already have an account?{" "}
          <span style={{ cursor: "pointer" }} onClick={goToLogin}>
            Login here!
          </span>
        </p>
      </form>
    </>
  );
}

export default Register;
