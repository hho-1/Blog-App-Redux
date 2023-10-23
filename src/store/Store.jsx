import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"

const Store = configureStore({
    reducer: {
        auth: authReducer,
        //blog: blogReducer,
    },
    devTools: process.env.NODE_ENV !== "production",          // For redux devTools extension - chrome. It means 'don't run devtools extension in production environment'
})

export default Store