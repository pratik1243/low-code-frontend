import React, { useContext } from "react";
import { errorMessageFunc, setElementWidth } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";

const TextField = ({ ele, path, index }) => {
  const { forms, setForms, currentElement } = useContext(
    path.includes("web-page") ? PageContext : FormContext
  );

  const setValidations = (e) => {
    const updateForms = forms.map((el, i) => {
      const nestedForm = el?.content?.map((eles, id) => {
        if (eles.id === ele.id) {
          return {
            ...eles,
            props: {
              ...eles?.props,
              value: e.target.value,
            },
            form: {
              ...eles?.form,
              error_message: errorMessageFunc(eles, e.target.value),
            },
          };
        }
        return eles;
      });

      if (el.id === ele.id) {
        return {
          ...el,
          props: {
            ...el?.props,
            value: e.target.value,
          },
          form: {
            ...el?.form,
            error_message: errorMessageFunc(el, e.target.value),
          },
        };
      } else if (el?.content) {
        return { ...el, content: nestedForm };
      } else {
        return el;
      }
    });
    setForms(updateForms);
  };

  return (
    <div className="mb-3">
      <div
        className={`element-input-field ${
          (ele?.props?.floatLabel || ele?.props?.standard) &&
          path.includes("web-page") ? "float-label" : ""
        } ${ele?.props?.standard && path.includes("web-page") ? "standard-input" : ""} mb-1`}
      >
        {" "}
        <label>
          {ele?.props?.label || "Enter label"}{" "}
          {ele?.props?.required && <span className="required">*</span>}
        </label>
        <input
          type="text"
          value={ele?.props?.value}
          className={ele?.name}
          placeholder={ele?.props?.placeholder || "Enter placeholder"}
          onChange={(e) => setValidations(e)}
          {...(ele?.props?.maxLength > "0" && {
            maxLength: ele?.props?.maxLength,
          })}
          required
        />
      </div>
      {ele?.form?.error_message && (
        <span className="error-message">{ele?.form?.error_message}</span>
      )}
    </div>
  );
};

export default TextField;
