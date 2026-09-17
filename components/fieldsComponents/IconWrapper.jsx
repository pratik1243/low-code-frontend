import React from "react";
import IconComponent from "../commonComponents/IconComponent";

const IconWrapper = ({ ele, path }) => {
  return ele?.props?.iconName ? (
    <div className="icon-div">
      <IconComponent
        icon={ele?.props?.iconName}
        size={path.includes("web-page") ? ele?.props?.iconSize : 20}
        color={path.includes("web-page") ? ele?.props?.style?.color : "#000"}
      />
    </div>
  ) : (
    "Icon"
  );
};

export default IconWrapper;
