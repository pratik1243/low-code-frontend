"use client";
import React from "react";
import { useSelector } from "react-redux";
import AuthComponents from "./AuthComponents";

const AuthenticatedContent = ({ children }) => {
  const token = useSelector((user) => user.auth.authDetails.token); 
  return !token ? <AuthComponents>{children}</AuthComponents> : <>{children}</>;
};

export default AuthenticatedContent;
