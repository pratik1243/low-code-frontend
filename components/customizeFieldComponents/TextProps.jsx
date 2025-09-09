import React, { useContext } from "react";
import { FormContext } from "../FormCreate";
import Select from "react-select";
import { headingVariantOptions } from "../../utils/utilFunctions";

const TextProps = ({ onCustomizeElement, currentField }) => {
  const { forms } = useContext(FormContext);

  return (
    <div>
      {currentField?.type === "heading" && (
        <div className="customize-prop-sec">
          <label>Heading Variant</label>
          <Select
            isClearable
            placeholder={"Select variant"}
            options={headingVariantOptions}
            value={currentField?.props?.variant || ""}
            onChange={(e) => {
              onCustomizeElement(e, "variant", "select", forms);
            }}
          />
        </div>
      )}

      <div className="customize-prop-sec">
        <label>
          {currentField?.type === "paragraph" ? "Paragraph Text" : "Heading Text"}
        </label>
        <textarea
          value={currentField?.props?.text || ""}
          placeholder={currentField?.type === "paragraph" ? "Enter paragraph" : "Enter heading"}
          className="customize-input"
          onChange={(e) => {
            onCustomizeElement(e, "text", "input", forms);
          }}
          {...(currentField?.type === "paragraph" && { rows: 7 })}
        />
      </div>
    </div>
  );
};

export default TextProps;
