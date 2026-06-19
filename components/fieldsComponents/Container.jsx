import React, { useContext, useRef, useState } from "react";
import { FormContext } from "../FormCreate";
import { PageContext } from "../WebPage";
import RenderField from "./RenderField";
import ElementActions from "../commonComponents/ElementActions";
import { addPixel, onResizeElement } from "../../utils/customizePropFunctions";
import {
  containerClasses,
  textAlign,
  alignment,
  resizeDirectionOptions,
} from "../../utils/customizeOptions";
import { Resizable } from "re-resizable";

const Container = ({ ele, path, index = null, outerIndex = null }) => {
  const isWebPage = path.includes("web-page");
  const {
    forms,
    setForms,
    setCurrentElement,
    breakPoint,
    isResize,
    setIsResize,
  } = useContext(isWebPage ? PageContext : FormContext);
  const containerParentRef = useRef();

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
    if (draggedItem) {
      copiedItems?.[containerIndex]?.content?.splice(dragIndex, 1);
      copiedItems?.[containerIndex]?.content?.splice(dropIndex, 0, draggedItem);
      setForms({
        ...forms,
        [breakPoint]: copiedItems,
      });
    }
    dragIndex = null;
    dragIndex2 = null;
  };

  const onDragStart = (e, index, i) => {
    e.stopPropagation();
    setIsResize(false);
    e.dataTransfer.setData("element_index1", index);
    e.dataTransfer.setData("container_index", i);
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      ref={containerParentRef}
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
          ...(ele?.props?.style?.borderColor &&
            ele?.props?.containerTemplate?.value && {
              border: `2px solid ${ele?.props?.style?.borderColor}`,
            }),
        }),
      }}
    >
      {ele?.content?.length == 0 && (
        <h5 className="no-data">Select container to add elements here</h5>
      )}
      {ele?.content?.map((el, i) => {
        if (isWebPage && el?.props?.hidden) {
          return null;
        }
        return (
          <Resizable
            key={i}
            draggable={!isResize}
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
            } ${!el?.props?.fullWidth && isWebPage ? "d-flex" : ""}`}
            style={{
              ...(el?.props?.style &&
                isWebPage &&
                addPixel(el?.props?.style, el)),
              ...(["button", "input", "select", "country"].includes(
                el?.type
              ) && {
                backgroundColor: "transparent !important",
              }),
            }}
            enable={resizeDirectionOptions}
            size={{ width: `${el?.column_width}%` }}
            onResize={(e, direction, ref) => {
              e.stopPropagation();
              setForms({
                ...forms,
                [breakPoint]: onResizeElement(
                  forms[breakPoint],
                  containerParentRef,
                  ref,
                  index,
                  i
                ),
              });
            }}
            onResizeStart={(e) => {
              setIsResize(true);
            }}
            onResizeStop={(e) => {
              setIsResize(false);
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
                    elementIndex={i}
                    containerIndex={index}
                    deleteFunction={(e) => deleteNestedItem(e, el.id, index)}
                  />
                </div>
              </>
            ) : (
              <RenderField
                ele={el}
                index={i}
                outerIndex={outerIndex}
                containerBackground={ele?.props?.containerBackground}
              />
            )}
          </Resizable>
        );
      })}
    </div>
  );
};

export default Container;
