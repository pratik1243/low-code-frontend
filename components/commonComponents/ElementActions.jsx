import React, { useContext, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdDeleteOutline, MdContentCopy, MdContentPaste } from "react-icons/md";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { copyItems, pasteItems } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";

const ElementActions = ({ data, deleteFunction }) => {
  const { forms, setForms, currentElement } = useContext(FormContext);
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

      {data.type == "container" ? (
        <div
          role="button"
          onClick={(e) => pasteItems(e, data, forms, setForms)}
        >
          <OverlayTrigger
            placement="top"
            overlay={(props) => renderTooltip("Paste", props)}
          >
            <MdContentPaste size={19} />
          </OverlayTrigger>
        </div>
      ) : (
        <div role="button">
          <OverlayTrigger
            placement="top"
            overlay={(props) => renderTooltip("Duplicate", props)}
          >
            <HiOutlineDocumentDuplicate size={19} />
          </OverlayTrigger>
        </div>
      )}
    </div>
  );
};

export default ElementActions;
