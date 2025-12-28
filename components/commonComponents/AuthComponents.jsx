"use client";
import React from "react";
import Login from "../Login";
import { usePathname } from "next/navigation";

const AuthComponents = ({ children }) => {
  const pathname = usePathname();
  if (["/login", "/register"].includes(pathname)) {
    return <>{children}</>;
  }
  return <Login />;
};

export default AuthComponents;
