import { useDispatch, useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import Modal from "../components/modal";
import {
  completeCourse,
  removeEnrolledCourseFromUser,
  updateUser,
} from "../redux/authSlice";
import { useState } from "react";

function UserDashboard() {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const [openEditInfoModal, setIsOpenEditInfoModal] = useState(false);

  // Edited info
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      <h2>UserDashboard</h2>
      <Navigation />
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h2>Name: {user.name}</h2>
            <h2>Email: {user.email}</h2>
            <p>
              Enrolled courses for this user:
              {user.enrolledCourses.map((course) => (
                <li key={course.id}>
                  <span>{course.title}</span>{" "}
                  <button onClick={() => handleCourseCompletion(course)}>
                    Complete this course!
                  </button>
                  <button onClick={() => handleRemovingCourseFromUser(course)}>
                    Remove course from this user?
                  </button>
                </li>
              ))}
            </p>
            <p>
              Completed courses for this user:
              {user.completedCourses.map((completedCourse) => (
                <li key={completedCourse.id}>{completedCourse.title}</li>
              ))}
            </p>

            <div>
              <button onClick={handleOpenInfoModal}>Change user info</button>
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
        ))}
      </div>
    </>
  );
}

export default UserDashboard;
