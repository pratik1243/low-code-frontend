import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import loaderSlice from "./slices/loaderSlice";
import publishSlice from "./slices/publishSlice";
import authSlice from "./slices/authSlice";
import snackbarSlice from "./slices/snackbarSlice";

const rootReducer = combineReducers({
  loader: loaderSlice,
  publish: publishSlice,
  auth: authSlice,
  snackbar: snackbarSlice
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
