import React, { useContext } from "react";
import {
  addPixel,
  alignment,
  textAlign,
  containerClasses,
} from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";
import RenderField from "./RenderField";
import ElementActions from "../commonComponents/ElementActions";

const Container = ({ ele, path, index, currentStep = null }) => {
  const isWebPage = path.includes("web-page");
  const {
    forms,
    setForms,
    setContainerId,
    setCurrentElement,
    currentElement,
    setShowCurrentElement,
    breakPoint,
  } = useContext(isWebPage ? PageContext : FormContext);

  // const onClickElement = () => {
  //   e.stopPropagation();
  //   setCurrentElement(el);
  //   if (!isWebPage) {
  //     setContainerId(index);
  //     //setShowCurrentElement(true);
  //   }
  // };

  const deleteNestedItem = (e, id, ind) => {
    e.stopPropagation();
    const updateData = forms[breakPoint].map((el, i) => {
      if (ind === i && el?.type === "container") {
        return {
          ...el,
          content: [...el?.content]?.filter((ele) => ele?.id !== id),
        };
      }
      return el;
    });
    setForms({ ...forms, [breakPoint]: updateData });
    setCurrentElement();
  };

  const onDropItem = (e, dropIndex, containerIndex) => {
    e.stopPropagation();
    let dragIndex = e.dataTransfer.getData("element_index1");
    let dragIndex2 = e?.dataTransfer?.getData("element_index");
    let copiedItems = [...forms[breakPoint]];
    let draggedItem = copiedItems?.[containerIndex]?.content?.[dragIndex];
    if (dragIndex2) {
      return;
    }
    copiedItems?.[containerIndex]?.content?.splice(dragIndex, 1);
    copiedItems?.[containerIndex]?.content?.splice(dropIndex, 0, draggedItem);
    setForms({ ...forms, [breakPoint]: copiedItems });
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

  return (
    <div
      className={`card-sec ${
        isWebPage
          ? `is-web-page ${
              containerClasses[ele?.props?.containerTemplate?.value] || ""
            }`
          : ""
      } ${ele?.props?.style?.backgroundImage ? "background-image-props" : ""}`}
      style={{
        ...(isWebPage && {
          backgroundColor: ele?.props?.containerBackground,
          ...(ele?.props?.style?.borderColor && ele?.props?.containerTemplate?.value && {
            border: `2px solid ${ele?.props?.style?.borderColor}`
          })
        }),
      }}
    >
      {ele?.content?.length == 0 && (
        <h5 className="no-data">Select container to add elements here</h5>
      )}
      {ele?.content?.map((el, i) => {
        return (
          <div
            key={i}
            draggable={!isWebPage}
            className={`position-relative element-column column_${el?.id} ${
              (isWebPage && alignment[el?.props?.align?.value]) || ""
            } ${
              el?.props?.hidden && isWebPage
                ? "hide"
                : el?.props?.hidden
                ? "hidden"
                : ""
            } ${
              (isWebPage && el?.type == "heading") ||
              (isWebPage && el?.type == "paragraph") ||
              (isWebPage && el?.type == "icon")
                ? textAlign[el?.props?.align?.value] || ""
                : ""
            } ${!el?.props?.fullWidth && isWebPage ? 'd-flex' : ''}`}
            style={{
              ...(el?.column_width && { width: `${el?.column_width}%` }),
              ...(el?.props?.style &&
                isWebPage &&
                addPixel(el?.props?.style, el)),
              ...(["button", "input", "select", "country"].includes(
                el?.type
              ) && {
                backgroundColor: "transparent !important",
              }),
            }}
            onDragOver={(e) => onDragOver(e)}
            onDragStart={(e) => onDragStart(e, i, index)}
            onDrop={(e) => onDropItem(e, i, index)}
          >
            {!isWebPage ? (
              <>
                <div
                  className={
                    el?.type !== "container" && !isWebPage ? "field-render" : ""
                  }
                >
                  <RenderField ele={el} index={i} />
                </div>

                <div className="delete-element-btn2">
                  <ElementActions
                    data={el}
                    containerIndex={index}
                    deleteFunction={(e) => deleteNestedItem(e, el.id, index)}
                  />
                </div>
              </>
            ) : (
              <RenderField
                ele={el}
                index={i}
                currentStep={currentStep}
                containerBackground={ele?.props?.containerBackground}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Container;
