import React from "react";
import { emailStyles } from "../../utils/customizePropFunctions";

const Paragraph = ({ data }) => {
  return (
    <span style={{ ...emailStyles(data?.props) }}>
      {data?.props?.text || "Paragraph"}
    </span>
  );
};

export default Paragraph;
