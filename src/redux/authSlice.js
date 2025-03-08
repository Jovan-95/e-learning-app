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
      });
    },

    addLoginUserObj: (state, action) => {
      state.loggedInUsers.push({
        name: action.payload.name,
        password: action.payload.password,
        isAuthenticated: action.payload.isAuthenticated,
      });
    },
  },
});

export const { addUserObj, addLoginUserObj } = authSlice.actions;
export default authSlice.reducer;
