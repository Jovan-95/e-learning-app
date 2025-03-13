import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function AdminRoute({ children }) {
  const users = useSelector((state) => state.auth.users);
  const loggedInUsers = useSelector((state) => state.auth.loggedInUsers);
  const loggedInUser = loggedInUsers[0];
  const user = users.find((user) => user.id === loggedInUser.id);

  return user?.role === "admin" ? children : <Navigate to="/userProfile" />;
}
