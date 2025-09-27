"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ButtonComp from "./Button";
import Divider from "./Divider";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import SelectField from "./SelectField";
import SwiperComp from "./SwiperComp";
import TextField from "./TextField";
import Container from "./Container";
import ImageComp from "./ImageComp";
import CountryField from "./CountryField";
import Checkbox from "./Checkbox";
import Stepper from "./Stepper";
import IconWrapper from "./IconWrapper";
import CardBox from "./CardBox";

const RenderField = ({
  ele,
  index,
  currentStep = null,
  containerBackground = null,
}) => {
  const path = usePathname();

  const getFields = () => {
    if (ele?.type == "input") {
      return (
        <TextField
          ele={ele}
          path={path}
          currentStep={currentStep}
          containerBackground={containerBackground}
        />
      );
    } else if (ele?.type == "select") {
      return (
        <SelectField
          ele={ele}
          path={path}
          currentStep={currentStep}
          containerBackground={containerBackground}
        />
      );
    } else if (ele?.type == "paragraph") {
      return <Paragraph ele={ele} path={path} />;
    } else if (ele?.type == "button") {
      return <ButtonComp ele={ele} path={path} />;
    } else if (ele?.type == "divider") {
      return <Divider ele={ele} path={path} />;
    } else if (ele?.type == "heading") {
      return <Heading ele={ele} path={path} />;
    } else if (ele?.type == "image") {
      return <ImageComp ele={ele} path={path} index={index} />;
    } else if (ele?.type == "slider") {
      return <SwiperComp ele={ele} path={path} currentStep={currentStep} />;
    } else if (ele?.type == "checkbox") {
      return <Checkbox ele={ele} path={path} index={index} />;
    } else if (ele?.type == "icon") {
      return <IconWrapper ele={ele} path={path} />;
    } else if (ele?.type == "stepper") {
      return (
        <Stepper
          ele={ele}
          path={path}
          index={index}
          currentStep={currentStep}
        />
      );
    } else if (ele?.type == "card_box") {
      return (
        <CardBox
          ele={ele}
          path={path}
          index={index}
        />
      );
    } else if (ele?.type == "container") {
      return (
        <Container
          ele={ele}
          path={path}
          index={index}
          currentStep={currentStep}
        />
      );
    } else if (ele?.type == "country") {
      return (
        <CountryField
          ele={ele}
          path={path}
          index={index}
          currentStep={currentStep}
          containerBackground={containerBackground}
        />
      );
    } else {
      return null;
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
      style={{ ...(ele?.type !== "image" && { width: `${ele?.props?.width}%` }) }}
    >
      {getFields()}
    </div>
  );
};

export default RenderField;
