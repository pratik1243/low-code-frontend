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
    const formData = {};

    const validateForms = forms.map((el, i) => {
      const nestedForm = el?.content?.map((eles, id) => {
        if (fieldArray.includes(eles?.props?.name)) {
          formData[eles?.props?.name] = typeof eles?.props?.value == "object" ? eles?.props?.value?.map((e) => e?.value) : eles?.props?.value;
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
          formData[el?.props?.name] = typeof el?.props?.value == "object" ? el?.props?.value?.map((e) => e?.value) : el?.props?.value;
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
      setForms(validateForms);
    }
    if (!isFieldsInvalid) {
      console.log("hjjhh0", formData);
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
