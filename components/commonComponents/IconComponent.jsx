import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import * as TbIcons from "react-icons/tb";
import * as WiIcons from "react-icons/wi";
import * as BsIcons from "react-icons/bs";
import * as FcIcons from "react-icons/fc";
import * as ImIcons from "react-icons/im";
import * as VsIcons from "react-icons/vsc";

function IconComponent({ icon, size, color }) {
  const iconType = {
    ...FaIcons,
    ...MdIcons,
    ...HiIcons,
    ...AiIcons,
    ...TbIcons,
    ...WiIcons,
    ...BsIcons,
    ...FcIcons,
    ...ImIcons,
    ...VsIcons,
  };
  const IconComponent = iconType[icon?.name];
  return IconComponent ? <IconComponent size={size} color={color} /> : null;
}

export default IconComponent;
