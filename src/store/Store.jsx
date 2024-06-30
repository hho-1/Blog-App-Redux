import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import blogReducer from "../features/blogSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; //? default : localStorage
import themeSlice from "../features/themeSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const Store = configureStore({
  reducer: {
    auth: persistedReducer,
    blog: blogReducer,
    theme: themeSlice,
  },
  devTools: process.env.NODE_ENV !== "production", // For redux devTools extension - chrome. It means 'don't run devtools extension in production environment'
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(Store);
export default Store;
