import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
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
  },
});

export const { addUserObj } = authSlice.actions;
export default authSlice.reducer;
