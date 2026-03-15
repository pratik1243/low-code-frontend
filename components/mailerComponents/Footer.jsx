import React from "react";
import { emailStyles } from "../../utils/customizePropFunctions";

const Footer = ({ data }) => {
  return <span style={{ ...emailStyles(data?.props) }}>{data?.props?.text || "Footer"}</span>;
};

export default Footer;
