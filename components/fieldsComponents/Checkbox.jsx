import React from "react";
import { useContext } from "react";
import { updateNestedForms } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";

const Checkbox = ({
  ele,
  path,
  index,
  containerBackground = null,
  currentStep = null,
}) => {
  const isWebPage = path.includes("web-page");
  const { forms, setForms, breakPoint } = useContext(
    isWebPage ? PageContext : FormContext
  );

  const setValidations = (value) => {
    setForms({
      ...forms,
      [breakPoint]: updateNestedForms(
        forms,
        ele,
        value,
        currentStep,
        breakPoint
      ),
    });
  };

  return (
    <div>
      <label
        className={`check-box-section ${!isWebPage ? 'default' : ''}`}
        style={{
          ...(isWebPage && {
            color: ele?.props?.style?.color,
            backgroundColor: containerBackground
              ? containerBackground
              : ele?.props?.style?.background,
          }),
        }}
      >
        {ele?.props?.label || "Enter Label"}
        <input
          type="checkbox"
          name={ele?.props?.name ? ele?.props?.name : `checkbox-${index}`}
          id={ele?.props?.name ? ele?.props?.name : `checkbox-${index}`}
          checked={ele?.props?.checked}
          onChange={(e) => {
            setValidations(e.target.checked);
          }}
        />
        <span
          className="checkmark"
          style={{
            ...(isWebPage && {
              ...(ele?.props?.checked &&
                ele?.props?.checkBoxColor && {
                  backgroundColor: ele?.props?.checkBoxColor,
                  borderColor: ele?.props?.checkBoxColor,
                }),
            }),
          }}
        ></span>
      </label>
    </div>
  );
};

export default Checkbox;
