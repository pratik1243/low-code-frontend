import React from "react";
import NavbarComp from "../fieldsComponents/NavbarComp";

const LayoutComp = ({ children }) => {
  return (
    <div>
      {/* <NavbarComp /> */}
      {children}
    </div>
  );
};

export default LayoutComp;
