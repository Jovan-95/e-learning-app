import { useDispatch, useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import {
  completeCourse,
  removeEnrolledCourseFromUser,
  updateUser,
} from "../redux/authSlice";
import Modal from "../components/modal";
import { useState } from "react";

function About() {
  const users = useSelector((state) => state.auth.users);

  const loggedInUsers = useSelector((state) => state.auth.loggedInUsers);
  const loggedInUser = loggedInUsers[0];

  const user = users.find((user) => user.id === loggedInUser.id);
  const dispatch = useDispatch();
  const [openEditInfoModal, setIsOpenEditInfoModal] = useState(false);

  // Edited info
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleTest() {
    console.log("logged user:", loggedInUser);
    console.log("registred users:", users);
    console.log("THE USER", user);
  }

  function handleRemovingCourseFromUser(course) {
    dispatch(removeEnrolledCourseFromUser(course.id));
  }

  // Course completion
  function handleCourseCompletion(course) {
    console.log(course);
    dispatch(completeCourse(course));
  }

  function handleOpenInfoModal() {
    setIsOpenEditInfoModal((prev) => !prev);
  }

  // Edit user info
  function handleInfoChange(user) {
    dispatch(updateUser({ ...editedUser, id: user.id }));
    setEditedUser({
      name: "",
      email: "",
      password: "",
    });
    setIsOpenEditInfoModal((prev) => !prev);
  }
  return (
    <>
      <div style={{ width: "100%" }}>
        <h1>User profile</h1>
        <Navigation />
        <div>
          <h2 style={{ textAlign: "left" }}>ID:{user.id}</h2>
          <h2 style={{ textAlign: "left" }}>NAME:{user.name}</h2>
          <h2 style={{ textAlign: "left" }}>EMAIL:{user.email}</h2>
          <h2 style={{ textAlign: "left" }}>PASSWORD:{user.password}</h2>
          <button onClick={handleOpenInfoModal}>Change user info</button>
        </div>
        <div>
          <div>
            <h3>Enrolled courses for this user:</h3>
            {user.enrolledCourses.map((course) => (
              <li key={course.id}>
                <span>{course.title}</span>{" "}
                <button onClick={() => handleCourseCompletion(course)}>
                  Complete course!
                </button>
                <button onClick={() => handleRemovingCourseFromUser(course)}>
                  Remove course?
                </button>
              </li>
            ))}
          </div>
          <div>
            <h3>Completed courses for this user:</h3>
            {user.completedCourses.map((completedCourse) => (
              <li key={completedCourse.id}>{completedCourse.title}</li>
            ))}
          </div>
        </div>
        <div>
          <div>
            <div className={openEditInfoModal ? "d-block" : "d-none"}>
              <Modal>
                <div>
                  <span onClick={handleOpenInfoModal} className="close">
                    {" "}
                    &times;
                  </span>
                  <div>
                    <strong>ID:{user.id}</strong>
                  </div>
                  <label>Name:</label>
                  <input
                    value={editedUser.name}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        name: e.target.value,
                      })
                    }
                    type="text"
                  />
                  <label>Email:</label>
                  <input
                    value={editedUser.email}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        email: e.target.value,
                      })
                    }
                    type="text"
                  />
                  <label>Password:</label>
                  <input
                    value={editedUser.password}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        password: e.target.value,
                      })
                    }
                    type="text"
                  />
                  <button onClick={() => handleInfoChange(user)}>
                    Change user info
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <div>---------------------------------------------</div>
        <div>!!! Log current logged user and all user in console:</div>
        <button onClick={handleTest}>TEST</button>
      </div>
    </>
  );
}

export default About;
