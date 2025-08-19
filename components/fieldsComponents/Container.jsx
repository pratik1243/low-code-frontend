import React, { useContext } from "react";
import { addPixel } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";
import RenderField from "./RenderField";
import ElementActions from "../commonComponents/ElementActions";

const Container = ({ ele, path, index }) => {
  const { forms, setForms, setContainerId, setCurrentElement, currentElement } =
    useContext(path.includes("web-page") ? PageContext : FormContext);

  const onClickElement = (e, el) => {
    e.stopPropagation();
    setCurrentElement(el);
    if (!path.includes("web-page")) {
      setContainerId(index);
    }
  };

  const deleteNestedItem = (e, id, ind) => {
    e.stopPropagation();
    const updateData = forms.map((el, i) => {
      if (ind === i && el?.type === "container") {
        return {
          ...el,
          content: [...el?.content]?.filter((ele) => ele?.id !== id),
        };
      }
      return el;
    });
    setForms(updateData);
    setCurrentElement();
  };

  const onDropItem = (e, dropIndex, containerIndex) => {
    e.stopPropagation();
    let dragIndex = e.dataTransfer.getData("element_index1");
    let dragIndex2 = e?.dataTransfer?.getData("element_index");
    let copiedItems = [...forms];
    let draggedItem = copiedItems?.[containerIndex]?.content?.[dragIndex];
    if (dragIndex2) {
      return;
    }
    copiedItems?.[containerIndex]?.content?.splice(dragIndex, 1);
    copiedItems?.[containerIndex]?.content?.splice(dropIndex, 0, draggedItem);
    setForms(copiedItems);
    dragIndex = null;
    dragIndex2 = null;
  };

  const onDragStart = (e, index, i) => {
    e.stopPropagation();
    e.dataTransfer.setData("element_index1", index);
    e.dataTransfer.setData("container_index", i);
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const alignment = {
    Center: "justify-content-center",
    Right: "justify-content-end",
    left: "justify-content-start",
  };

  const textAlign = {
    Center: "text-center",
    Right: "text-right",
    Left: "text-left",
  };

  const containerClasses = {
    "Shadow Card": "shadow-card",
    "Border Card": "border-card",
    "Border Shadow Card": "border-shadow-card",
  };

  return (
    <div
      className={`card-sec ${
        path.includes("web-page")
          ? `is-web-page ${
              containerClasses[ele?.props?.containerTemplate?.value] || ""
            }`
          : ""
      }`}
    >
      {ele?.content?.length == 0 && (
        <h5 className="no-data">Select container to add elements here</h5>
      )}
      {ele?.content?.map((el, i) => {
        return (
          <div
            key={i}
            draggable={!path.includes("web-page")}
            className={`position-relative element-column column_${el?.id} ${
              (path.includes("web-page") &&
                alignment[el?.props?.align?.value]) ||
              ""
            } ${currentElement?.id === el?.id ? "selected" : ""} 
              ${
                el?.props?.hidden && path.includes("web-page")
                  ? "hide"
                  : el?.props?.hidden
                  ? "hidden"
                  : ""
              }
              ${
                (path.includes("web-page") && el?.type == "heading") ||
                (path.includes("web-page") && el?.type == "paragraph")
                  ? textAlign[el?.props?.align?.value] || ""
                  : ""
              } ${path.includes("web-page") ? "d-flex" : ""}`}
            style={{
              ...(el?.column_width && { width: `${el?.column_width}%` }),
              ...(el?.props?.style &&
                path.includes("web-page") &&
                addPixel(el?.props?.style)),
            }}
            onClick={(e) => onClickElement(e, el)}
            onDragOver={(e) => onDragOver(e)}
            onDragStart={(e) => onDragStart(e, i, index)}
            onDrop={(e) => onDropItem(e, i, index)}
          >
            {!path.includes("web-page") ? (
              <>
                <div
                  className={
                    el?.type !== "container" && !path.includes("web-page")
                      ? "field-render"
                      : ""
                  }
                >
                  <RenderField ele={el} index={i} />
                </div>

                <div className="delete-element-btn2">
                  <ElementActions
                    data={el}
                    deleteFunction={(e) => deleteNestedItem(e, el.id, index)}
                  />
                </div>
              </>
            ) : (
              <RenderField ele={el} index={i} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Container;
