import React, { useContext, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdDeleteOutline, MdContentCopy, MdContentPaste } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TbSettings } from "react-icons/tb";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { copyItems, pasteItems } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";

const ElementActions = ({ data, deleteFunction, containerIndex = null }) => {
  const {
    forms,
    setForms,
    setCurrentElement,
    setContainerIndex,
    breakPoint,
    setShowCurrentElement,
  } = useContext(FormContext);
  const [copyText, setCopyText] = useState("Copy");

  const renderTooltip = (text, props) => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  const copyFunction = (e) => {
    copyItems(e, data);
    setCopyText("Copied");
    let timer = setTimeout(() => {
      setCopyText("Copy");
      clearInterval(timer);
    }, 1000);
  };

  return (
    <div className="d-flex align-items-center inner-btn-sec">
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
      {data.type == "container" ? (
        <div
          role="button"
          onClick={(e) => {
            pasteItems(e, data, forms[breakPoint], setForms, breakPoint);
          }}
        >
          <OverlayTrigger
            placement="top"
            overlay={(props) => renderTooltip("Paste", props)}
          >
            <MdContentPaste size={18} />
          </OverlayTrigger>
        </div>
      ) : (
        <div role="button">
          <OverlayTrigger
            placement="top"
            overlay={(props) => renderTooltip("Duplicate", props)}
          >
            <HiOutlineDocumentDuplicate size={19.5} />
          </OverlayTrigger>
        </div>
      )}
      <div role="button" onClick={deleteFunction}>
        <OverlayTrigger
          placement="top"
          overlay={(props) => renderTooltip("Delete", props)}
        >
          <MdDeleteOutline size={21} />
        </OverlayTrigger>
      </div>
      {!["stepper", "slider", "card_box"].includes(data.type) && (
        <div role="button" onClick={copyFunction}>
          <OverlayTrigger
            placement="top"
            overlay={(props) => renderTooltip(copyText, props)}
          >
            <MdContentCopy size={18} />
          </OverlayTrigger>
        </div>
      )}     
    </div>
  );
};

export default ElementActions;
