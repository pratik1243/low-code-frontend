import React, { useState, useContext, useRef } from "react";
import RenderField from "./fieldsComponents/RenderField";
import {
  MdContentCopy,
  MdContentPaste,
  MdDeleteOutline,
  MdOutlineDragIndicator,
} from "react-icons/md";
import { FormContext } from "./FormCreate";
import { usePathname } from "next/navigation";
import ElementActions from "./commonComponents/ElementActions";
import emptyImg from "../public/empty-box.png";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Image from "next/image";
import { generateId, onResizeElement } from "../utils/customizePropFunctions";
import { Resizable } from "re-resizable";
import { resizeDirectionOptions } from "../utils/customizeOptions";

const FormTemplate = () => {
  const {
    forms,
    setForms,
    containerId,
    setCurrentElement,
    setContainerId,
    setHeight,
    breakPoint,
    isResize,
    setIsResize,
  } = useContext(FormContext);

  const pathname = usePathname();
  const parentRef = useRef(null);
  const [copyText, setCopyText] = useState("Copy");
  const isWebPage = pathname?.includes("web-page");

  const renderTooltip = (text, props) => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  const onDropItem = (e, dropIndex) => {
    e.stopPropagation();
    setHeight(false);
    let copiedItems = [...forms[breakPoint]];
    let dragIndex = e?.dataTransfer?.getData("element_index");
    let draggedItem = copiedItems[dragIndex];
    let conatinerIndex = e?.dataTransfer?.getData("container_index");
    if (conatinerIndex) {
      return;
    }
    copiedItems.splice(dragIndex, 1);
    copiedItems.splice(dropIndex, 0, draggedItem);
    setForms({ ...forms, [breakPoint]: copiedItems });
    conatinerIndex = null;
    dragIndex = null;
  };

  const onDragStart = (e, index) => {
    setIsResize(false);
    e.dataTransfer.setData("element_index", index);
  };

  const deleteItem = (e, id) => {
    e.stopPropagation();
    const formData = forms[breakPoint].filter((el) => el.id !== id);
    setForms({ ...forms, [breakPoint]: formData });
    setCurrentElement();
    if (containerId === id) {
      setContainerId(null);
    }
  };

  const onClickElement = (e, ele) => {
    setContainerId(e.target.checked ? ele?.id : null);
    setCurrentElement(e.target.checked ? ele : null);
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const copyFunction = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(forms[breakPoint]));
    copyItems();
  };

  const filterContainerItems = (jsonData, type2 = null) => {
    const filterJsonData = jsonData?.map((ele) => {
      const { isContainer, ...newData } = ele;
      return type2 ? { ...ele, id: generateId(4) } : { ...newData };
    });
    return filterJsonData;
  };

  const pasteItems = (e) => {
    e.stopPropagation();
    navigator.clipboard.readText().then((data) => {
      try {
        const jsonData = JSON.parse(data);
        const { isContainer, ...newJsonData } = jsonData;
        const newJsonFilterData = {
          ...newJsonData,
          content: filterContainerItems(newJsonData.content, true),
        };
        setForms({
          ...forms,
          [breakPoint]: Array.isArray(jsonData)
            ? [...forms[breakPoint], ...filterContainerItems(jsonData)]
            : [
                ...forms[breakPoint],
                { ...newJsonFilterData, id: generateId(4) },
              ],
        });
      } catch (err) {
        setForms({ ...forms, [breakPoint]: [] });
      }
    });
  };

  const copyItems = () => {
    setCopyText("Copied");
    let timer = setTimeout(() => {
      setCopyText("Copy");
      clearInterval(timer);
    }, 1000);
  };

  const deleteAllFunc = () => {
    setForms({ ...forms, [breakPoint]: [] });
  };

  return (
    <div className={`main-div scrollable position-relative`}>
      <div className="d-flex align-items-center justify-content-between data-prop-sec">
        <div>
          <p>Resize element columns to fit items in row</p>
        </div>
        <div className="d-flex align-items-center">
          <div
            role="button"
            disabled={forms[breakPoint]?.length === 0}
            onClick={pasteItems}
          >
            <OverlayTrigger
              placement="top"
              overlay={(props) => renderTooltip("Paste", props)}
            >
              <MdContentPaste size={18} />
            </OverlayTrigger>
          </div>
          <div
            role="button"
            disabled={forms[breakPoint]?.length === 0}
            onClick={deleteAllFunc}
          >
            <OverlayTrigger
              placement="top"
              overlay={(props) => renderTooltip("Clear All", props)}
            >
              <MdDeleteOutline size={21} />
            </OverlayTrigger>
          </div>
          <div
            role="button"
            disabled={forms[breakPoint]?.length === 0}
            onClick={copyFunction}
          >
            <OverlayTrigger
              placement="top"
              overlay={(props) => renderTooltip(copyText, props)}
            >
              <MdContentCopy size={18} />
            </OverlayTrigger>
          </div>
        </div>
      </div>
      {forms[breakPoint] && forms[breakPoint]?.length == 0 && (
        <div className="pt-4 pb-2 text-center">
          <Image src={emptyImg} height={130} width={130} alt="menu-empty" />
          <div className="no-menus-txt fs-5 text-dark">
            Click on elements to add...
          </div>
        </div>
      )}

      <div className="main-content-sec" ref={parentRef}>
        {forms[breakPoint]?.length > 0 &&
          forms[breakPoint]?.map((ele, index) => {
            return (
              <Resizable
                key={index}
                draggable={!isResize}
                className={`position-relative ${
                  ele?.type !== "container" ? "no-container-element" : ""
                } element-column column_${ele?.id} ${
                  containerId === ele?.id ? "selected-card" : ""
                }                  
               ${ele?.props?.hidden ? "hidden" : ""} ${
                  ele?.type === "container" ? "w-65" : ""
                }`}
                enable={{
                  ...resizeDirectionOptions,
                  ...(isWebPage && { right: false }),
                }}
                size={{ width: `${ele?.column_width}%` }}
                onResize={(e, direction, ref) => {
                  setForms({
                    ...forms,
                    [breakPoint]: onResizeElement(
                      forms[breakPoint],
                      parentRef,
                      ref,
                      index
                    ),
                  });
                }}
                onResizeStart={() => {
                  setIsResize(true);
                }}
                onResizeStop={() => {
                  setIsResize(false);
                }}
                onDragOver={(e) => !isWebPage && onDragOver(e)}
                onDragStart={(e) => !isWebPage && onDragStart(e, index)}
                onDrop={(e) => !isWebPage && onDropItem(e, index)}
              >
                {!isWebPage && ele?.type == "container" && (
                  <div
                    className={`d-flex w-100 drag-indicator ${
                      ele?.column_width < 40
                        ? "mb-2"
                        : "mb-3 justify-content-center"
                    }`}
                  >
                    <MdOutlineDragIndicator />
                  </div>
                )}
                {ele.type == "container" && (
                  <div
                    className={`d-flex align-items-center select-container-sec ${
                      ele?.column_width < 40 ? "sm-select-container-sec" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={containerId === ele?.id ? true : false}
                      id={`select-container-${ele?.id}`}
                      onChange={(e) => {
                        onClickElement(e, ele);
                      }}
                    />{" "}
                    <label htmlFor={`select-container-${ele?.id}`}>
                      Select Container {index + 1}
                    </label>
                  </div>
                )}
                <div
                  className={`${
                    ele?.type !== "container" ? "field-render" : ""
                  }`}
                >
                  <RenderField ele={ele} index={index} />
                </div>

                <div className={`delete-element-btn`}>
                  <ElementActions
                    data={ele}
                    elementIndex={index}
                    deleteFunction={(e) => deleteItem(e, ele?.id)}
                  />
                </div>
              </Resizable>
            );
          })}
      </div>
    </div>
  );
};

export default FormTemplate;
