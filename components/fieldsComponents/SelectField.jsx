import React, { useContext } from "react";
import Select from "react-select";
import {updateNestedForms } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";

const SelectField = ({ ele, path, currentStep = null }) => {
  const { forms, setForms, currentElement } = useContext(
    path.includes("web-page") ? PageContext : FormContext
  );

  const setValidations = (data) => {
    const value = typeof data == "object" ? data : data?.value || "";
    setForms(updateNestedForms(forms, ele, value, currentStep));
  };

  return (
    <div
      className={`element-input-field ${
        ele?.props?.floatLabel && path.includes("web-page") ? "float-label" : ""
      } mb-3`}
    >
      <label>
        {ele?.props?.label || "Enter label"}{" "}
        {ele?.props?.required && <span className="required">*</span>}
      </label>
      <Select
        isClearable
        defaultValue={ele?.props?.value}
        name={ele?.name}
        className={ele?.name}
        isMulti={ele?.props?.multiple}
        placeholder={ele?.props?.placeholder || "Enter placeholder"}
        options={ele?.props?.options}
        onChange={(e) => {
          setValidations(e);
        }}
      />
      {ele?.form?.error_message && (
        <span className="error-message">{ele?.form?.error_message}</span>
      )}
    </div>
  );
};

export default SelectField;
