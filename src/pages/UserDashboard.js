import { useDispatch, useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import { removeEnrolledCourseFromUser } from "../redux/authSlice";

function UserDashboard() {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();

  function handleRemovingCourseFromUser(course) {
    dispatch(removeEnrolledCourseFromUser(course.id));
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
                  {course.title}{" "}
                  <button onClick={() => handleRemovingCourseFromUser(course)}>
                    Remove course from this user?
                  </button>
                </li>
              ))}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserDashboard;
