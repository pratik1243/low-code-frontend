import React from "react";
import { addPixel } from "../../utils/utilFunctions";

const Heading = ({ ele, path }) => {
  const renderHeading = (text, variant) => {
    if (variant == "H1") {
      return (
        <h1
          style={{ ...(path.includes("web-page") && ele?.props?.style && addPixel(ele?.props?.style, ele)) }}
        >
          {text || "Heading"}
        </h1>
      );
    } else if (variant == "H2") {
      return (
        <h2
          style={{ ...(path.includes("web-page") && ele?.props?.style && addPixel(ele?.props?.style, ele)) }}
        >
          {text || "Heading"}
        </h2>
      );
    } else if (variant == "H3") {
      return (
        <h3
          style={{ ...(path.includes("web-page") && ele?.props?.style && addPixel(ele?.props?.style, ele)) }}
        >
          {text || "Heading"}
        </h3>
      );
    } else if (variant == "H4") {
      return (
        <h4
          style={{ ...(path.includes("web-page") && ele?.props?.style && addPixel(ele?.props?.style, ele)) }}
        >
          {text || "Heading"}
        </h4>
      );
    } else if (variant == "H5") {
      return (
        <h5
          style={{ ...(path.includes("web-page") && ele?.props?.style && addPixel(ele?.props?.style, ele)) }}
        >
          {text || "Heading"}
        </h5>
      );
    } else {
      return (
        <h6
          style={{ ...(path.includes("web-page") && ele?.props?.style && addPixel(ele?.props?.style, ele)) }}
        >
          {text || "Heading"}
        </h6>
      );
    }
  };

  return (
    <div>{renderHeading(ele?.props?.text, ele?.props?.variant?.value)}</div>
  );
};

export default Heading;
