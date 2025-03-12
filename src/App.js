import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import CourseDetails from "./pages/CourseDetails";
import { useDispatch } from "react-redux";
import { addLoginUserObj } from "./redux/authSlice";

const Home = lazy(() => import("./pages/Home"));
// const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const Register = lazy(() => import("./pages/Registration"));
const Login = lazy(() => import("./pages/Login"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const UserProfile = lazy(() => import("./pages/UserProfile"));

function App() {
  const dispatch = useDispatch();

  // Checking for logged in users on page load
  useEffect(() => {
    const loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers"));
    if (loggedInUsers && loggedInUsers.length > 0) {
      dispatch(addLoginUserObj(loggedInUsers[0])); // Restore last user
    }
  }, [dispatch]);
  return (
    <>
      {/* <h1>E - Learning APP</h1> */}
      <BrowserRouter>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            >
              <Route
                path=":id"
                element={
                  <PrivateRoute>
                    <CourseDetails />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route
              path="userDashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="userProfile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
