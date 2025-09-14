import React, { useContext } from "react";
import { addPixel, updateNestedForms } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";

const TextField = ({
  ele,
  path,
  currentStep = null,
  containerBackground = null,
}) => {
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
        <label
          style={{
            ...(ele?.props?.style?.color &&
              path.includes("web-page") && { color: ele?.props?.style?.color }),
            ...(containerBackground && {
              backgroundColor: containerBackground,
            }),
          }}
        >
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
          style={{
            ...(ele?.props?.style &&
              path.includes("web-page") &&
              addPixel(ele?.props?.style, ele)),
            ...((ele?.props?.standard || ele?.props?.floatLabel) &&
              path.includes("web-page") && {
                backgroundColor: "transparent",
              }),
          }}
        />
      </div>
      {ele?.props?.standard && path.includes("web-page") && (
        <div
          className="standard-line"
          style={{
            ...(ele?.props?.style?.color &&
              path.includes("web-page") && {
                backgroundColor: ele?.props?.style?.color,
              }),
          }}
        ></div>
      )}
      {ele?.form?.error_message && (
        <span className="error-message mt-1">{ele?.form?.error_message}</span>
      )}
    </div>
  );
};

export default TextField;
