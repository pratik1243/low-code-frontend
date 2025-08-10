import React from "react";
import { generateId } from "../utils/utilFunctions";
import { useContext, useState } from "react";
import RenderField from "./fieldsComponents/RenderField";
import { MdDeleteOutline, MdOutlineDragIndicator } from "react-icons/md";
import { FormContext } from "./FormCreate";
import { usePathname } from "next/navigation";

const FormTemplate = () => {
  const {
    forms,
    setForms,
    currentElement,
    setCurrentElement,
    setContainerId,
    setHeight,
  } = useContext(FormContext);

  const pathname = usePathname();

  const onDropItem = (e, dropIndex) => {
    e.stopPropagation();
    setHeight(false);
    let copiedItems = [...forms];
    let dragIndex = e?.dataTransfer?.getData("element_index");
    let draggedItem = copiedItems[dragIndex];
    let conatinerIndex = e?.dataTransfer?.getData("container_index");
    if (conatinerIndex) {
      return;
    }
    copiedItems.splice(dragIndex, 1);
    copiedItems.splice(dropIndex, 0, draggedItem);
    setForms(copiedItems);
    dragIndex = null;
    conatinerIndex = null;
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("element_index", index);
  };

  const deleteItem = (e, id) => {
    e.stopPropagation();
    const formData = forms.filter((el) => el.id !== id);
    setForms(formData);
    setCurrentElement();
  };

  const onClickElement = (ele, index) => {
    if (ele.type == "container") {
      setContainerId(index);
    } else {
      setContainerId();
    }
    setCurrentElement(ele);
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className={`main-content-sec scrollable`}>
      {forms && forms?.length == 0 && (
        <h4 className="text-center w-100 p-3 mb-0">
          Click on elements to add...
        </h4>
      )}
      {forms?.length > 0 &&
        forms?.map((ele, index) => {
          return (
            <div
              key={index}
              draggable
              className={`position-relative element-column column_${ele?.id} ${
                currentElement?.id === ele?.id
                  ? `selected ${
                      currentElement.type == "container" ? "selected-card" : ""
                    }`
                  : ""
              } ${ele?.props?.hidden ? "hidden" : ""}`}
              style={{
                ...(ele?.column_width && { width: `${ele?.column_width}%` }),
              }}
              onClick={() => onClickElement(ele, index)}
              onDragOver={(e) => onDragOver(e)}
              onDragStart={(e) => onDragStart(e, index)}
              onDrop={(e) => onDropItem(e, index)}
            >
              {!pathname.includes("web-page") && ele?.type == "container" && (
                <div className="d-flex justify-content-center w-100 drag-indicator mb-1">
                  <MdOutlineDragIndicator />
                </div>
              )}
              <div className={ele?.type !== "container" ? "field-render" : ""}>
                <RenderField ele={ele} index={index} />
              </div>

              <div
                onClick={(e) => deleteItem(e, ele?.id)}
                className="delete-element-btn"
              >
                <MdDeleteOutline />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default FormTemplate;
