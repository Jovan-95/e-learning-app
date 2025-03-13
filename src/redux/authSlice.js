import { createSlice } from "@reduxjs/toolkit";
import { useLocalStorageState } from "../hooks/useLocalStorage,js";

// Local storage
const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  loggedInUsers: JSON.parse(localStorage.getItem("loggedInUsers")) || [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUserObj: (state, action) => {
      const newUser = {
        id: Date.now(),
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        confirmPassword: action.payload.confirmPassword,
        enrolledCourses: [],
        completedCourses: [],
        role: "user",
      };

      // We keep users in users array and in localstorage
      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users)); // Save to localStorage
    },

    addLoginUserObj: (state, action) => {
      // Always one user is logged in
      state.loggedInUsers = [{ ...action.payload }];
      localStorage.setItem(
        "loggedInUsers",
        JSON.stringify(state.loggedInUsers)
      );
    },

    // This logic is not good for real apps, we would need session token
    enrollCourse: (state, action) => {
      // Ensure there's at least one logged-in user
      if (state.loggedInUsers.length === 0) return;

      // Get the active logged-in user (assuming the first in the array is the active user)
      const loggedInUser = state.loggedInUsers[0];

      // Find the corresponding user in the 'users' array by matching their id
      const user = state.users.find((user) => user.id === loggedInUser.id);

      if (user) {
        // Add the course to the active user's enrolledCourses array
        user.enrolledCourses.push(action.payload);
        localStorage.setItem("users", JSON.stringify(state.users)); // Save update
      }
    },

    removeEnrolledCourseFromUser: (state, action) => {
      state.users.forEach((user) => {
        user.enrolledCourses = user.enrolledCourses.filter(
          (course) => course.id !== action.payload
        );
      });
    },

    completeCourse: (state, action) => {
      if (state.loggedInUsers.length === 0) return;

      const loggedInUser = state.loggedInUsers[0];
      const user = state.users.find((user) => user.id === loggedInUser.id);

      if (user) {
        user.completedCourses.push(action.payload);
        localStorage.setItem("users", JSON.stringify(state.users)); // Save update
      }
    },

    // User edit, we use ID (action.payload.id) to find user and change info
    updateUser: (state, action) => {
      const user = state.users.find((user) => user.id === action.payload.id);
      if (user) {
        user.name = action.payload.name || user.name;
        user.email = action.payload.email || user.email;
        user.password = action.payload.password || user.password;
        user.role = action.payload.role || user.role;

        localStorage.setItem("users", JSON.stringify(state.users)); // Save update
      }
    },

    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
      localStorage.setItem("users", JSON.stringify(state.users)); // Update localStorage
    },

    logoutUser: (state) => {
      state.loggedInUsers = [];
      localStorage.removeItem("loggedInUsers");
    },
  },
});

export const {
  addUserObj,
  addLoginUserObj,
  enrollCourse,
  removeEnrolledCourseFromUser,
  completeCourse,
  updateUser,
  removeUser,
  logoutUser,
} = authSlice.actions;
export default authSlice.reducer;
