import React, { useContext } from "react";
import { fieldsData, generateId } from "../utils/utilFunctions";
import { FormContext } from "./FormCreate";

const FieldSection = () => {
  const { forms, setForms, containerId, breakPoint, elementContainerRef } = useContext(FormContext);
  const noContentTypes = ["stepper", "slider", "container", "card_box"];

  const onClickAddFields = (items) => {
    const updatedForms = forms[breakPoint].map((el, i) => {
      if (containerId == el?.id) {
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

    setForms({
      ...forms,
      [breakPoint]:
        containerId == null
          ? [
              ...forms[breakPoint],
              {
                ...items,
                id: generateId(4),
              },
            ]
          : updatedForms,
    });
  };

  const noContentFields = fieldsData.filter((el) => !noContentTypes.includes(el?.type));
  const FilterFieldsData = containerId !== null ? noContentFields : fieldsData;

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
