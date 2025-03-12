import { useDispatch, useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import Modal from "../components/modal";
import {
  completeCourse,
  removeEnrolledCourseFromUser,
  removeUser,
  updateUser,
} from "../redux/authSlice";
import { useState } from "react";
import "../CSS/user-dashboard.css";
import "../CSS/register.css";

function UserDashboard() {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  function handleOpenRemoveModal(user) {
    setIsOpen((prev) => !prev);
    setSelectedUser(user);
  }

  function handleUserDelete(user) {
    dispatch(removeUser(selectedUser));
    handleOpenRemoveModal();
    // console.log("Delete this user", selectedUser);
  }

  return (
    <>
      <div style={{ width: "100%" }}>
        <h2>UserDashboard</h2>
        <Navigation />

        {users.map((user) => (
          <div key={user.id}>
            <div className="card">
              <div className="card-name">Name: {user.name}</div>
              <div className="card-email">Email: {user.email}</div>
              <button onClick={() => handleOpenRemoveModal(user)}>
                Remove user!
              </button>
            </div>
            <div className={isOpen ? "d-block" : "d-none"}>
              <Modal>
                <span onClick={handleOpenRemoveModal} className="close">
                  {" "}
                  &times;
                </span>
                <div>Are you sure you want to delete this user ?</div>
                <button onClick={handleUserDelete}>YES!</button>
              </Modal>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserDashboard;
