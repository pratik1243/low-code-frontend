import React, { useContext } from "react";
import { fieldsData, generateId } from "../utils/utilFunctions";
import { FormContext } from "./FormCreate";

const FieldSection = () => {
  const { forms, setForms, currentElement, containerId } = useContext(FormContext);

  const onClickAddFields = (items) => {
    const updatedForms = forms.map((el, i) => {
      if (containerId === i && currentElement?.type == "container") {
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

    if (currentElement?.type === "container") {
      setForms(updatedForms);
    } else {
      setForms([...forms, { ...items, id: generateId(4) }]);
    }
  };

  const noContentFields = fieldsData.filter(el=> !['stepper', 'slider', 'container'].includes(el?.type));
  const FilterFieldsData = currentElement?.type === "container" ? noContentFields : fieldsData;

  return (
    <div className="field-option-sec">
      {FilterFieldsData?.map((ele, index) => {
        return (
          <div
            key={index}
            className="field-option"
            onClick={() => onClickAddFields(ele)}            
          >
            {ele?.label_text}
          </div>
        );
      })}
    </div>
  );
};

export default FieldSection;
