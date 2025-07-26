import React, { useContext } from "react";
import Select from "react-select";
import { errorMessageFunc, setElementWidth } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";

const SelectField = ({ ele, path }) => {
  const { forms, setForms, currentElement } = useContext(
    path.includes("web-page") ? PageContext : FormContext
  );

  const setValidations = (data) => {
    const updateForms = forms.map((el, i) => {
      if (ele?.id === el?.id) {
        return {
          ...el,
          props: {
            ...el?.props,
            value: typeof data == "object" ? data : data?.value || "",
          },
          form: {
            ...el?.form,
            error_message: errorMessageFunc(
              el,
              typeof data == "object" ? data : data?.value || ""
            ),
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
