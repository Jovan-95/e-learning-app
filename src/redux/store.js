import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import coursesSlice from "./coursesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesSlice,
  },
});
export default store;
