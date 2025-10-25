"use client";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import AuthenticatedContent from "../../components/commonComponents/AuthenticatedContent";
import Loader from "../../components/commonComponents/Loader";
import SnackBar from "../../components/commonComponents/SnackBar";
import { usePathname } from "next/navigation";
import WebPage from "../../components/WebPage";

export function Providers({ children }) {
  const pathname = usePathname();
  return (
    <Provider store={store}>
      <PersistGate loading={true} persistor={persistor}>
        <Loader />
        <SnackBar />
        {pathname.includes("web-page") ? (
          <WebPage />
        ) : (
          <AuthenticatedContent>{children}</AuthenticatedContent>
        )}
      </PersistGate>
    </Provider>
  );
}
