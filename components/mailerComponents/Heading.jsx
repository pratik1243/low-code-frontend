import React from "react";
import { emailStyles } from "../../utils/customizePropFunctions";

const Heading = ({ data }) => {
  return (
    <h6 style={{ ...emailStyles(data?.props) }}>
      {data?.props?.text || "Heading"}
    </h6>
  );
};

export default Heading;
