"use client";
import React, { useContext, useState } from "react";
import { Modal, Offcanvas } from "react-bootstrap";
import { FormContext } from "./FormCreate";
import PropsRender from "./customizeFieldComponents/PropsRender";
import AddImages from "./commonComponents/AddImages";

const FieldCustomizeSection = () => {
  const {
    currentElement,
    setCurrentElement,
    showCurrentElement,
    setShowCurrentElement,
    openImageModel,
    setOpenImageModel
  } = useContext(FormContext);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => {
    setShow(false);
    setShow1(false);
    setCurrentElement();
    setOpenImageModel(false);
    setShowCurrentElement(false);
  };

  return (
    <Offcanvas
      show={showCurrentElement}
      onHide={handleClose}
      className="field-sec-customize-panel"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {currentElement
            ? `${
                show1
                  ? "Add Icons"
                  : openImageModel
                  ? "Add Images"
                  : "Customize Element"
              }`
            : ""}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-0">
        {openImageModel ? (
          <AddImages />
        ) : currentElement ? (
          <PropsRender open={{ show, show1, setShow, setShow1 }} />
        ) : null}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default FieldCustomizeSection;
