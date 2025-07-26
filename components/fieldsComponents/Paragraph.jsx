import React from "react";

const Paragraph = ({ ele }) => {
  return (
    <div>
      <p>{ele?.props?.text || "Paragraph"}</p>
    </div>
  );
};

export default Paragraph;
