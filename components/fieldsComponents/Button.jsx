import React from "react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";
import { useContext } from "react";
import { addPixel, errorMessageFunc } from "../../utils/utilFunctions";
import IconComponent from "../commonComponents/IconComponent";

const ButtonComp = ({ ele, path }) => {
  const router = useRouter();
  const isWebPage = path.includes("web-page");
  const { forms, setForms, breakPoint } = useContext(
    isWebPage ? PageContext : FormContext
  );
  const fieldArray = ele?.props?.fields.map((el) => el?.value);

  const getFieldValue = (data)=>{
    return typeof data?.props?.value == "object"
    ? data?.props?.value?.map((e) => e?.value)
    : data?.props?.checked
    ? data?.props?.checked
    : data?.props?.value;
  }

  const events = () => {
    let isFieldsInvalid = false;
    const formData = {};

    const validateForms = forms[breakPoint].map((el, i) => {
      const nestedForm = el?.content?.map((eles, id) => {
        if (fieldArray.includes(eles?.props?.name)) {
          formData[eles?.props?.name] = getFieldValue(eles);
          if (errorMessageFunc(eles, (eles?.props?.checked || eles?.props?.value)) !== "")  {
            isFieldsInvalid = true;
          }
          return {
            ...eles,
            form: {
              ...eles?.form,
              error_message: errorMessageFunc(eles, (eles?.props?.checked || eles?.props?.value)),
            },
          };
        }
        return eles;
      });

      if (el?.content) {
        return { ...el, content: nestedForm };
      } else {
        if (fieldArray.includes(el?.props?.name)) {
          formData[el?.props?.name] = getFieldValue(el);
          if (errorMessageFunc(el, (el?.props?.checked || el?.props?.value)) !== "") {
            isFieldsInvalid = true;
          }
          return {
            ...el,
            form: {
              ...el?.form,
              error_message: errorMessageFunc(el, (el?.props?.checked || el?.props?.value)),
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
      setForms({ ...forms, [breakPoint]: validateForms });
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
      className="d-flex align-items-center justify-content-center w-100"
    >
      {ele?.props?.iconPosition == "start" && ele?.props?.iconName && (
        <IconComponent icon={ele?.props?.iconName} size={20} />
      )}{" "}
      &nbsp;{ele?.props?.text || "Button"}
      {ele?.props?.iconPosition == "end" && <>&nbsp;</>}
      {ele?.props?.iconPosition == "end" && ele?.props?.iconName && (
        <IconComponent icon={ele?.props?.iconName} size={20} />
      )}
    </Button>
  );
};

export default ButtonComp;
