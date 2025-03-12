import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addLoginUserObj } from "../redux/authSlice";
import "../CSS/register.css";

function Login() {
  // importing users array from redux store and slice
  const users = useSelector((state) => state.auth.users);
  const loggedUsers = useSelector((state) => state.auth.loggedInUsers);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginObj, setLoginObj] = useState({
    name: "",
    password: "",
  });

  function handleLogin() {
    const user = users.find(
      (user) =>
        user.name === loginObj.name && user.password === loginObj.password
    );
    if (user) {
      // Users
      // console.log("Registered users:", users);
      // console.log("Logged in users:", loggedUsers);

      alert("Credential are matching!");
      dispatch(
        addLoginUserObj({ ...loginObj, isAuthenticated: true, id: user.id })
      );
      navigate("/home");
    } else {
      alert("Wrong credentials!");
    }
  }

  function goToRegister() {
    navigate("/");
  }

  return (
    <>
      <div className="login-form-wrapper">
        <h2>LOGIN</h2>

        <div>
          <label>Name:</label>
          <input
            onChange={(e) => setLoginObj({ name: e.target.value })}
            value={loginObj.name}
            type="text"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            onChange={(e) =>
              setLoginObj({ ...loginObj, password: e.target.value })
            }
            value={loginObj.password}
            type="text"
          />
        </div>
        <div>
          <button onClick={handleLogin}>LOGIN</button>
        </div>
        <p>
          Dont have an account?
          <span style={{ cursor: "pointer" }} onClick={goToRegister}>
            Register here!
          </span>
        </p>
      </div>
    </>
  );
}

export default Login;
