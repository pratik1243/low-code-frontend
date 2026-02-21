import React from "react";
import { emailStyles } from "../../utils/utilFunctions";

const Paragraph = ({ data }) => {
  return (
    <p style={{ ...emailStyles(data?.props) }}>
      {data?.props?.text || "Paragraph"}
    </p>
  );
};

export default Paragraph;
