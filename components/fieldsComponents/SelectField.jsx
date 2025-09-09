"use client";
import React, { useContext, useState } from "react";
import Select from "react-select";
import { selectCustomStyles, updateNestedForms } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";

const SelectField = ({
  ele,
  path,
  currentStep = null,
  containerBackground = null,
}) => {
  const { forms, setForms } = useContext(
    path.includes("web-page") ? PageContext : FormContext
  );

  const [value, setValue] = useState(false);

  const setValidations = (data) => {
    const value = typeof data == "object" ? data : data?.value || "";
    setForms(updateNestedForms(forms, ele, value, currentStep));
  };

  return (
    <div
      className={`element-select-field ${
        ele?.props?.floatLabel && path.includes("web-page") ? "float-label" : ""
      } ${
        ele?.props?.standard && path.includes("web-page")
          ? "standard-input"
          : ""
      } mb-3`}
    >
      <label
        style={{
          ...(ele?.props?.style?.color &&
            path.includes("web-page") && { color: ele?.props?.style?.color }),
          ...(containerBackground && { backgroundColor: containerBackground }),
        }}
        className={`${
          path.includes("web-page") &&
          ele?.props?.standard &&
          (value || ele?.props?.value.length > 0)
            ? "float-select-standard-label"
            : ""
        } ${
          path.includes("web-page") &&
          ele?.props?.floatLabel &&
          (value || ele?.props?.value.length > 0)
            ? "float-select-label"
            : ""
        }`}
      >
        {ele?.props?.label || "Enter label"}{" "}
        {ele?.props?.required && <span className="required">*</span>}
      </label>
      <Select
        isClearable={false}
        defaultValue={ele?.props?.value}
        name={ele?.name || "name"}
        required
        className={ele?.name}
        isMulti={ele?.props?.multiple}
        placeholder={ele?.props?.placeholder || "Enter placeholder"}
        options={ele?.props?.options}
        {...(path.includes("web-page") && { styles: selectCustomStyles(ele) })}
        onChange={(e) => {
          setValidations(e);
        }}
        onFocus={() => {
          setValue(true);
        }}
        onBlur={() => {
          setValue(false);
        }}
      />
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

export default SelectField;
