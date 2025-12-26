import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";

function IconComponent({ icon, size, color }) {
  const iconType = {
    ...FaIcons,
    ...MdIcons,
    ...HiIcons,
    ...AiIcons,
  };
  const IconComponent = iconType[icon];
  return IconComponent ? <IconComponent size={size} color={color} /> : null;
}

export default IconComponent;
