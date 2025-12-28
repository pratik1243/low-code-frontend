import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import loaderSlice from "./slices/loaderSlice";
import authSlice from "./slices/authSlice";
import pageCreateSlice from "./slices/pageCreateSlice";

const rootReducer = combineReducers({
  loader: loaderSlice,
  auth: authSlice,
  pageCreate: pageCreateSlice
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
