import React, { useState, useContext } from "react";
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
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const FormTemplate = () => {
  const {
    forms,
    setForms,
    currentElement,
    containerId,
    setCurrentElement,
    setShowCurrentElement,
    setContainerId,
    setHeight,
    breakPoint,
  } = useContext(FormContext);

  const pathname = usePathname();
  const [copyText, setCopyText] = useState("Copy");

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
    e.dataTransfer.setData("element_index", index);
  };

  const deleteItem = (e, id) => {
    e.stopPropagation();
    const formData = forms[breakPoint].filter((el) => el.id !== id);
    setForms({ ...forms, [breakPoint]: formData });
    setCurrentElement();
  };

  const onClickElement = (e, ele, index) => {
    setContainerId(e.target.checked ? index : null);
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

  const pasteItems = (e) => {
    e.stopPropagation();
    navigator.clipboard.readText().then((data) => {
      try {
        const jsonData = JSON.parse(data);
        setForms({
          ...forms,
          [breakPoint]: [...forms[breakPoint], ...jsonData],
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
          <p>Adjust column width to fit items in row</p>
        </div>
        <div className="d-flex align-items-center">
          <div role="button" onClick={pasteItems}>
            <OverlayTrigger
              placement="top"
              overlay={(props) => renderTooltip("Paste", props)}
            >
              <MdContentPaste size={18} />
            </OverlayTrigger>
          </div>
          <div role="button" onClick={deleteAllFunc}>
            <OverlayTrigger
              placement="top"
              overlay={(props) => renderTooltip("Clear All", props)}
            >
              <MdDeleteOutline size={21} />
            </OverlayTrigger>
          </div>
          <div role="button" onClick={copyFunction}>
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
        <h4 className="text-center w-100 p-3 mb-3 mt-5">
          Click on elements to add...
        </h4>
      )}
      <div className="main-content-sec">
        {forms[breakPoint]?.length > 0 &&
          forms[breakPoint]?.map((ele, index) => {
            return (
              <div
                key={index}
                draggable
                className={`position-relative element-column column_${
                  ele?.id
                } ${
                  containerId === index ? "selected-card" : ""
                }                  
               ${ele?.props?.hidden ? "hidden" : ""} ${
                  ["stepper", "slider", "card_box"].includes(ele?.type)
                    ? "w-65"
                    : ""
                }`}
                style={{
                  ...(ele?.column_width && { width: `${ele?.column_width}%` }),
                }}
                onDragOver={(e) => onDragOver(e)}
                onDragStart={(e) => onDragStart(e, index)}
                onDrop={(e) => onDropItem(e, index)}
              >
                {ele.type == "container" && (
                  <div className="d-flex align-items-center select-container-sec">
                    <input
                      type="checkbox"
                      checked={containerId === index ? true : false}
                      id={`select-container-${index}`}
                      onChange={(e) => {
                        onClickElement(e, ele, index);
                      }}
                    />{" "}
                    <label htmlFor={`select-container-${index}`}>
                      Select Container {index + 1}
                    </label>
                  </div>
                )}
                {!pathname.includes("web-page") && ele?.type == "container" && (
                  <div className="d-flex justify-content-center w-100 drag-indicator mb-3">
                    <MdOutlineDragIndicator />
                  </div>
                )}
                <div
                  className={ele?.type !== "container" ? "field-render" : ""}
                >
                  <RenderField ele={ele} index={index} />
                </div>

                <div className={`delete-element-btn`}>
                  <ElementActions
                    data={ele}
                    deleteFunction={(e) => deleteItem(e, ele?.id)}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FormTemplate;
