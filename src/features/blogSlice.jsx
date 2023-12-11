import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    loading: false,
    error: false,
    contributions: [],
    comments: [],
    categories: [],
    status: []

  },
  reducers: {
    fetchStart: state => {
      state.loading = true;
      state.error = false;
    },
    contributionsSuccess: (state, { payload }) => {
      state.loading = false;
      state.contributions = payload.data;
    },
    getCategoriesSuccess: (state, { payload }) => {
      state.loading = false;
      state.categories = payload.data;
    },
    getCommentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.categories = payload.data;
    },
    
    fetchFail: state => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  contributionsSuccess,
  getCategoriesSuccess,
  getCommentsSuccess,
  getBlogSuccess,
  fetchFail,
} = blogSlice.actions;
export default blogSlice.reducer;

// async-thunk yerine manuel dispatclerle yapıyoruz. extra reducerlarla yapmadan da bu şekilde yapabiliyoruz. İki yönteminde avantajı ve dezavantajı var.
