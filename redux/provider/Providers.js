"use client";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import AuthenticatedContent from "../../components/commonComponents/AuthenticatedContent";
import Loader from "../../components/commonComponents/Loader";
import SnackBar from "../../components/commonComponents/SnackBar";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={true} persistor={persistor}>
        <Loader />
        <SnackBar />
        <AuthenticatedContent>{children}</AuthenticatedContent>
      </PersistGate>
    </Provider>
  );
}
