import React, { useContext, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdDeleteOutline, MdContentCopy, MdContentPaste } from "react-icons/md";
//import { IoSettingsOutline } from "react-icons/io5";
import { TbSettings } from "react-icons/tb";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { FormContext } from "../FormCreate";
import {
  copyItems,
  generateId,
  pasteItems,
} from "../../utils/customizePropFunctions";
import { HiDotsVertical } from "react-icons/hi";

const ElementActions = ({
  data,
  deleteFunction,
  elementIndex = null,
  containerIndex = null,
}) => {
  const {
    forms,
    setForms,
    breakPoint,
    setContainerIndex,
    setCurrentElement,
    setShowCurrentElement,
  } = useContext(FormContext);

  const [copyText, setCopyText] = useState("Copy Item");
  const [actionPosition, setActionPosition] = useState(false);

  const renderTooltip = (text, props) => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  const copyFunction = (e) => {
    copyItems(e, data);
    setCopyText("Copied!");
    let timer = setTimeout(() => {
      setCopyText("Copy Item");
      clearInterval(timer);
    }, 1000);
  };

  const onDuplicateFields = () => {
    const { id, ...dataObj } = data;

    const newDataObj1 = {
      ...dataObj,
      id: generateId(4),
    };

    const newDataObj2 = {
      ...dataObj,
      id: generateId(4),
      isContainer: true,
    };

    const newContainerData = newDataObj1?.content?.map((el, i) => {
      return { ...el, id: generateId(4) };
    });

    const newDataObj = { ...newDataObj1, content: newContainerData };
    const updatedForms = [...forms[breakPoint]];
    updatedForms[containerIndex]?.content?.splice(elementIndex + 1, 0, newDataObj2);

    const ElementData = [...forms[breakPoint]];
    ElementData?.splice(elementIndex + 1, 0, newDataObj);

    setForms({
      ...forms,
      [breakPoint]: containerIndex == undefined ? ElementData : updatedForms,
    });
  };

  return (
    <div
      className={`d-flex align-items-center inner-btn-sec ${
        data?.column_width < 44 ? `action-dropdown` : ""
      }`}
      onMouseOver={(e) => {
        const threshold = 120;
        if (e.clientX <= threshold) {
          setActionPosition(true);
        }
      }}
    >
      {data?.column_width < 44 ? (
        <div role="button" className="action-dropdown-btn">
          <HiDotsVertical size={17} />

          <div
            className={`action-dropdown-box ${actionPosition ? "left" : ""}`}
          >
            <div
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentElement(data);
                setContainerIndex(containerIndex);
                setShowCurrentElement(true);
              }}
            >
              <TbSettings size={18} /> <span>Customize</span>
            </div>
            <div role="button" onClick={onDuplicateFields}>
              <HiOutlineDocumentDuplicate size={17.4} /> <span>Duplicate</span>
            </div>
            <div role="button" onClick={copyFunction}>
              <MdContentCopy size={16} />
              <span>{copyText}</span>
            </div>
            {data?.type == "container" && (
              <div
                role="button"
                className="paste-icon"
                onClick={(e) => {
                  pasteItems(e, data, forms, setForms, breakPoint);
                }}
              >
                <MdContentPaste size={16} /> <span>Paste</span>
              </div>
            )}
            <div role="button" onClick={deleteFunction}>
              <MdDeleteOutline size={18} /> <span>Delete</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentElement(data);
              setContainerIndex(containerIndex);
              setShowCurrentElement(true);
            }}
          >
            <OverlayTrigger
              placement="top"
              overlay={(props) => renderTooltip("Customize", props)}
            >
              <TbSettings size={21} />
            </OverlayTrigger>
          </div>
          {data?.type == "container" && (
            <div
              role="button"
              onClick={(e) => {
                pasteItems(e, data, forms, setForms, breakPoint);
              }}
            >
              <OverlayTrigger
                placement="top"
                overlay={(props) => renderTooltip("Paste", props)}
              >
                <MdContentPaste size={18} />
              </OverlayTrigger>
            </div>
          )}
          <div role="button" onClick={onDuplicateFields}>
            <OverlayTrigger
              placement="top"
              overlay={(props) => renderTooltip("Duplicate", props)}
            >
              <HiOutlineDocumentDuplicate size={19.5} />
            </OverlayTrigger>
          </div>
          <div role="button" onClick={deleteFunction}>
            <OverlayTrigger
              placement="top"
              overlay={(props) => renderTooltip("Delete", props)}
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
        </>
      )}
    </div>
  );
};

export default ElementActions;
