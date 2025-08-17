import React from "react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";
import { useContext } from "react";
import { errorMessageFunc } from "../../utils/utilFunctions";

const ButtonComp = ({ ele, path }) => {
  const router = useRouter();
  const { forms, setForms } = useContext(
    path.includes("web-page") ? PageContext : FormContext
  );
  const fieldArray = ele?.props?.fields.map((el) => el?.value);

  const events = () => {
    let isFieldsInvalid = false;
    const validateForms = forms.map((el, i) => {
      const nestedForm = el?.content?.map((eles, id) => {
        if (fieldArray.includes(eles?.props?.name)) {
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
    if (ele?.props?.redirectUrl?.value) {
      router.push(ele?.props?.redirectUrl?.value);
    }
    if (fieldArray.length > 0) {
      setForms(validateForms);
    }
    if (!isFieldsInvalid) {
      alert("Button Clicked");
    }
  };
  return (
    <Button
      variant={`${ele?.props?.color?.value || "primary"}`}
      onClick={events}
      className="w-100"
    >
      {ele?.props?.text || "Button"}
    </Button>
  );
};

export default ButtonComp;
