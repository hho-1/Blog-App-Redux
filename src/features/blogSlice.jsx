import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    loading: false,
    error: false,
    contributions: [],
    comments: [],
    categories: [],
    status: [],
    users: [],
    likes: [],
    likes_num: [],
    dislikes_num: []

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
      state.comments = payload.data;
    },
    getUsersSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = payload.data;
    },
    getStatusSuccess: (state, { payload }) => {
      state.loading = false;
      state.status = payload.data;
    },
    getDislikesNumSuccess: (state, { payload }) => {
      state.loading = false;
      state.dislikes_num = payload.data;
    },
    getLikesSuccess: (state, { payload }) => {
      state.loading = false;
      state.likes = payload.data;
    },
    getLikesNumSuccess: (state, { payload }) => {
      state.loading = false;
      state.likes_num = payload.data;
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
  getUsersSuccess,
  getBlogSuccess,
  getLikesSuccess,
  getLikesNumSuccess,
  getDislikesNumSuccess,
  getStatusSuccess,
  fetchFail,
} = blogSlice.actions;
export default blogSlice.reducer;

// async-thunk yerine manuel dispatclerle yapıyoruz. extra reducerlarla yapmadan da bu şekilde yapabiliyoruz. İki yönteminde avantajı ve dezavantajı var.
