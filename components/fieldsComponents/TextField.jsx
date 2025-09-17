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
  const isWebPage = path.includes("web-page");

  const { forms, setForms } = useContext(isWebPage ? PageContext : FormContext);

  const setValidations = (e) => {
    setForms(updateNestedForms(forms, ele, e.target.value, currentStep));
  };

  return (
    <div className="mb-3 position-relative">
      <div
        className={`element-input-field ${
          (ele?.props?.floatLabel || ele?.props?.standard) && isWebPage
            ? "float-label"
            : ""
        } ${ele?.props?.standard && isWebPage ? "standard-input" : ""}`}
      >
        {" "}
        <label
          style={{
            ...(isWebPage && {
              color: ele?.props?.style?.color,
              backgroundColor: containerBackground
                ? containerBackground
                : ele?.props?.style?.background,
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
              isWebPage &&
              addPixel(ele?.props?.style, ele)),
            ...((ele?.props?.standard || ele?.props?.floatLabel) &&
              isWebPage && {
                backgroundColor: "transparent",
              }),
          }}
        />
      </div>
      {ele?.props?.standard && isWebPage && (
        <div
          className="standard-line"
          style={{
            ...(isWebPage && {
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
