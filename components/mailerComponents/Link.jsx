import React from "react";
import { emailStyles } from "../../utils/utilFunctions";

const Link = ({ data }) => {
  return (
    <a style={{ ...emailStyles(data?.props) }}>
      {data?.props?.text || "Link"}
    </a>
  );
};

export default Link;
