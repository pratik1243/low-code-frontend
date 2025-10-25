import React from "react";
import { addPixel } from "../../utils/utilFunctions";

const Paragraph = ({ ele, path }) => {
  return (
    <div>
      <p style={{ ...(path.includes("web-page") && ele?.props?.style && addPixel(ele?.props?.style, ele)) }}>
        {ele?.props?.text || "Paragraph"}
      </p>
    </div>
  );
};

export default Paragraph;
