import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoute from "./components/PrivateRoute";
import CourseDetails from "./pages/CourseDetails";

const Home = lazy(() => import("./pages/Home"));
// const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const Register = lazy(() => import("./pages/Registration"));
const Login = lazy(() => import("./pages/Login"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const About = lazy(() => import("./pages/About"));

function App() {
  return (
    <>
      <h1>E - Learning APP</h1>
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
              path="about"
              element={
                <PrivateRoute>
                  <About />
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
