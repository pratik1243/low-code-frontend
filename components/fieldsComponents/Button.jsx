import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as AiIcons from "react-icons/ai";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";
import { useContext } from "react";
import { addPixel, errorMessageFunc } from "../../utils/utilFunctions";

const ButtonComp = ({ ele, path }) => {
  const router = useRouter();
  const isWebPage = path.includes("web-page");
  const { forms, setForms, breakPoint } = useContext(isWebPage ? PageContext : FormContext);
  const fieldArray = ele?.props?.fields.map((el) => el?.value);

  const iconType = {
    ...FaIcons,
    ...MdIcons,
    ...HiIcons,
    ...AiIcons,
  };
  const IconComponent = iconType[ele?.props?.iconName];

  const events = () => {
    let isFieldsInvalid = false;
    const formData = {};

    const validateForms = forms[breakPoint].map((el, i) => {
      const nestedForm = el?.content?.map((eles, id) => {
        if (fieldArray.includes(eles?.props?.name)) {
          formData[eles?.props?.name] =
            typeof eles?.props?.value == "object"
              ? eles?.props?.value?.map((e) => e?.value)
              : eles?.props?.value;
          if (errorMessageFunc(eles, eles?.props?.value) !== "") {
            isFieldsInvalid = true;
          }
          return {
            ...eles,
            form: {
              ...eles?.form,
              error_message: errorMessageFunc(eles, eles?.props?.value),
            },
          };
        }
        return eles;
      });

      if (el?.content) {
        return { ...el, content: nestedForm };
      } else {
        if (fieldArray.includes(el?.props?.name)) {
          formData[el?.props?.name] =
            typeof el?.props?.value == "object"
              ? el?.props?.value?.map((e) => e?.value)
              : el?.props?.value;
          if (errorMessageFunc(el, el?.props?.value) !== "") {
            isFieldsInvalid = true;
          }
          return {
            ...el,
            form: {
              ...el?.form,
              error_message: errorMessageFunc(el, el?.props?.value),
            },
          };
        }
      }
      return el;
    });
    if (ele?.props?.redirectUrl?.page_route) {
      router.push(ele?.props?.redirectUrl?.page_route);
    }
    if (fieldArray.length > 0) {
      // setForms(validateForms);
      setForms({...forms, [breakPoint]: validateForms })
    }
    if (!isFieldsInvalid) {
      console.log("hjjhh0", formData);
    }
  };
  return (
    <Button
      variant={"primary"}      
      style={{
        ...(ele?.props?.style && isWebPage && addPixel(ele?.props?.style, ele)),
      }}
      onClick={events}
      className="w-100"
    >
      {ele?.props?.iconPosition == "start" && ele?.props?.iconName && (
        <IconComponent size={20} />
      )}{" "}
      &nbsp;{ele?.props?.text || "Button"}{ele?.props?.iconPosition == "end" && <>&nbsp;</>}
      {ele?.props?.iconPosition == "end" && ele?.props?.iconName && (
        <IconComponent size={20} />
      )}
    </Button>
  );
};

export default ButtonComp;
