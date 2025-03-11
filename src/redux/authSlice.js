import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loggedInUsers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUserObj: (state, action) => {
      state.users.push({
        id: Date.now(),
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        confirmPassword: action.payload.confirmPassword,
        enrolledCourses: [],
        completedCourses: [],
      });
    },

    addLoginUserObj: (state, action) => {
      state.loggedInUsers.push({
        name: action.payload.name,
        password: action.payload.password,
        isAuthenticated: action.payload.isAuthenticated,
        id: action.payload.id,
      });
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

      const completedCourse = user.completedCourses.find(
        (course) => course.id === action.payload.id
      );

      if (completedCourse) return alert("You already completed this course!");
      user.completedCourses.push(action.payload);
    },

    // User edit, we use ID (action.payload.id) to find user and change info
    updateUser: (state, action) => {
      const user = state.users.find((user) => user.id === action.payload.id);
      if (user) {
        user.name = action.payload.name || user.name;
        user.email = action.payload.email || user.email;
        user.password = action.payload.password || user.password;
      }
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
} = authSlice.actions;
export default authSlice.reducer;
