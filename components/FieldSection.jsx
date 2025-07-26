import React, { useContext } from "react";
import { fieldsData, generateId } from "../utils/utilFunctions";
import { FormContext } from "./FormCreate";

const FieldSection = () => {
  const { forms, setForms, currentElement, containerId } = useContext(FormContext);

  const onClickAddFields = (items) => {
    const updatedForms = forms.map((el, i) => {
      if (containerId === i && currentElement?.type == "card") {
        return {
          ...el,
          content: [
            ...el?.content,
            { ...items, id: generateId(4), isContainer: true },
          ],
        };
      }
      return el;
    });

    if (currentElement?.type === "card") {
      setForms(updatedForms);
    } else {
      setForms([...forms, { ...items, id: generateId(4) }]);
    }
  };

  return (
    <div className="field-option-sec">
      {fieldsData?.map((ele, index) => {
        return (
          <div
            key={index}
            className="field-option"
            onClick={() => onClickAddFields(ele)}
            style={{ pointerEvents: currentElement?.type === "card" && ele.type == "card" ? "none" : "unset"}}
          >
            {ele?.label_text}
          </div>
        );
      })}
    </div>
  );
};

export default FieldSection;
