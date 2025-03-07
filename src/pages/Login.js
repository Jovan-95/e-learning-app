import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Login() {
  // importing users array from redux store and slice
  const users = useSelector((state) => state.auth.users);
  const navigate = useNavigate();

  const [loginObj, setLoginObj] = useState({ name: "", password: "" });

  function handleLogin() {
    // Checking if the user exist
    users.find((user) => {
      console.log("Login! User checking...", user);
      if (user.name === loginObj.name && user.password === loginObj.password) {
        alert("Credential are matching!");
        navigate("/home");
      } else {
        alert("Wrong credentials!");
      }
    });
  }

  return (
    <>
      <h2>LOGIN</h2>
      <div>
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
      </div>
    </>
  );
}

export default Login;
