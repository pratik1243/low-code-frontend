import React, { useContext } from "react";
import { updateNestedForms } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";

const TextField = ({ ele, path, currentStep = null }) => {
  const { forms, setForms } = useContext(
    path.includes("web-page") ? PageContext : FormContext
  );

  const setValidations = (e) => {
    setForms(updateNestedForms(forms, ele, e.target.value, currentStep));
  };

  return (
    <div className="mb-3 position-relative">
      <div
        className={`element-input-field ${
          (ele?.props?.floatLabel || ele?.props?.standard) &&
          path.includes("web-page")
            ? "float-label"
            : ""
        } ${
          ele?.props?.standard && path.includes("web-page")
            ? "standard-input"
            : ""
        }`}
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
      {ele?.props?.standard && path.includes("web-page") && <div className="standard-line"></div>}
      {ele?.form?.error_message && (
        <span className="error-message mt-1">{ele?.form?.error_message}</span>
      )}
    </div>
  );
};

export default TextField;
