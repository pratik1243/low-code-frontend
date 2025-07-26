import React from "react";
import { setElementWidth } from "../../utils/utilFunctions";

const Heading = ({ ele }) => {
    
  const renderHeading = (text, variant) => {
    if (variant == "H1") {
      return <h1>{text || "Heading"}</h1>;
    } else if (variant == "H2") {
      return <h2>{text || "Heading"}</h2>;
    } else if (variant == "H3") {
      return <h3>{text || "Heading"}</h3>;
    } else if (variant == "H4") {
      return <h4>{text || "Heading"}</h4>;
    } else if (variant == "H5") {
      return <h5>{text || "Heading"}</h5>;
    } else {
      return <h6>{text || "Heading"}</h6>;
    }
  };

  return (
    <div>
      {renderHeading(ele?.props?.text, ele?.props?.variant?.value)}
    </div>
  );
};

export default Heading;
