import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    loading: false,
    error: false,
    contributions: [],

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
    
    fetchFail: state => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  contributionsSuccess,
  fetchFail,
} = blogSlice.actions;
export default blogSlice.reducer;

// async-thunk yerine manuel dispatclerle yapıyoruz. extra reducerlarla yapmadan da bu şekilde yapabiliyoruz. İki yönteminde avantajı ve dezavantajı var.
