"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ButtonComp from "./Button";
import Card from "./Card";
import Divider from "./Divider";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import SelectField from "./SelectField";
import SwiperComp from "./SwiperComp";
import TextField from "./TextField";

const RenderField = ({ ele, index }) => {
  const path = usePathname();

  const getFields = () => {
    if (ele?.type == "input") {
      return <TextField ele={ele} path={path} />;
    } else if (ele?.type == "select") {
      return <SelectField ele={ele} path={path} />;
    } else if (ele?.type == "paragraph") {
      return <Paragraph ele={ele} path={path} />;
    } else if (ele?.type == "button") {
      return <ButtonComp ele={ele} path={path} />;
    } else if (ele?.type == "divider") {
      return <Divider ele={ele} path={path} />;
    } else if (ele?.type == "heading") {
      return <Heading ele={ele} path={path} />;
    } else if (ele?.type == "card") {
      return <Card ele={ele} path={path} index={index} />;
    } else if (ele?.type == "slider") {
      return <SwiperComp ele={ele} path={path} index={index} />;
    }
  };

  return (
    <div
      {...(ele?.props?.animation?.value &&
        path.includes("web-page") && {
          "data-aos": ele?.props?.animation?.value,
        })}
      {...(ele?.props?.animation_delay?.value &&
        path.includes("web-page") && {
          "data-aos-delay": ele?.props?.animation_delay?.value,
        })}
      style={{ width: `${ele?.props?.width}%` }}
    >
      {getFields()}
    </div>
  );
};

export default RenderField;
