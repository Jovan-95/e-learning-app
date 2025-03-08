import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//https://jsonplaceholder.typicode.com/posts

// HTTP get request in REDUX
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Failed to fetch courses");
    const data = await res.json();
    return data;
  }
);

const initialState = {
  courses: [],
  status: "idle", // 'loading', 'succeeded', 'failed'
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { removeCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
