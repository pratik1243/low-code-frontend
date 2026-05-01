import React from "react";
import { emailStyles } from "../../utils/customizePropFunctions";

const Heading = ({ data }) => {
  return (
    <span style={{ ...emailStyles(data?.props) }}>
      {data?.props?.text || "Heading"}
    </span>
  );
};

export default Heading;
