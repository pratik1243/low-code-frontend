import React from "react";

const Checkbox = ({ ele, path, index }) => {
  return (
    <div className="d-flex align-items-center check-box-section">
      <input
        type="checkbox"
        name={`checkbox-${index}`}
        id={`checkbox-${index}`}
      />
      <label htmlFor={`checkbox-${index}`}>{ele?.props?.label || "Enter Label"}</label>
    </div>
  );
};

export default Checkbox;
