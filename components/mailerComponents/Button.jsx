import React from "react";
import { emailStyles } from "../../utils/utilFunctions";

const ButtonComp = ({ data }) => {
  return (
    <a style={{ ...emailStyles(data?.props) }}>
      {data?.props?.text || "Button"}
    </a>
  );
};

export default ButtonComp;
