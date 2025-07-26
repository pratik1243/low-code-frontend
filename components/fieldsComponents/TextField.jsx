import React, { useContext } from "react";
import { errorMessageFunc, setElementWidth } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";

const TextField = ({ ele, path }) => {
  const { forms, setForms, currentElement } = useContext(
    path.includes("web-page") ? PageContext : FormContext
  );

  const setValidations = (e) => {
    const updateForms = forms.map((el, i) => {
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
      }
      return el;
    });
    setForms(updateForms);
  };

  return (
    <div className="element-input-field">
      <label>
        {ele?.props?.label || "Enter label"}{" "}
        {ele?.props?.required && <span className="required">*</span>}
      </label>
      <input
        type="text"
        name={ele?.name}
        value={ele?.props?.value}
        className={ele?.name}
        placeholder={ele?.props?.placeholder || "Enter placeholder"}
        onChange={(e) => setValidations(e)}
      />
      {ele?.form?.error_message && (
        <span className="error-message">{ele?.form?.error_message}</span>
      )}
    </div>
  );
};

export default TextField;
