import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";

const IconWrapper = ({ ele, path }) => {
  const iconType = {
    ...FaIcons,
    ...MdIcons,
    ...HiIcons,
    ...AiIcons,
  };
  const IconComponent = iconType[ele?.props?.iconName];
  return ele?.props?.iconName && IconComponent ? (
    <IconComponent
      size={path.includes("web-page") ? ele?.props?.iconSize : 20}
      color={path.includes("web-page") ? ele?.props?.style?.color : "#000"}
    />
  ) : (
    "Icon"
  );
};

export default IconWrapper;
