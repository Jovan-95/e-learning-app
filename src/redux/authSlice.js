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
  },
});

export const {
  addUserObj,
  addLoginUserObj,
  enrollCourse,
  removeEnrolledCourseFromUser,
} = authSlice.actions;
export default authSlice.reducer;
