"use client";
import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { FormContext } from "./FormCreate";
import PropsRender from "./customizeFieldComponents/PropsRender";

const FieldCustomizeSection = () => {
  const { currentElement, showCurrentElement, setShowCurrentElement } = useContext(FormContext);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  return (
    <Modal
      show={showCurrentElement}
      className={"field-sec-customize-modal"}
      fullscreen={["select", "card_box", "slider"].includes(currentElement?.type) ? false : show}
      size={show1 ? "xl" : "lg"}
      onHide={() => {
        setShow(false);
        setShow1(false);
        setShowCurrentElement(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Customize Element</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        {currentElement && (
          <PropsRender open={{ show, show1, setShow, setShow1 }} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FieldCustomizeSection;
