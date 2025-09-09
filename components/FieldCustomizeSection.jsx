"use client";
import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { FormContext } from "./FormCreate";
import PropsRender from "./customizeFieldComponents/PropsRender";

const FieldCustomizeSection = () => {
  const { currentElement, showCurrentElement, setShowCurrentElement } = useContext(FormContext);

  // const uploadImage = async (e) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", e.target.files[0]);
  //     const response = await axios.post(
  //       "http://localhost:8000/upload-image",
  //       formData
  //     );
  //     if (response.status == 200) {
  //       onCustomizeElement(response?.data?.imageUrl, "url", "image", forms);
  //     }
  //   } catch (error) {
  //     dispatch(setLoader(false));
  //   }
  // };

  return (
    <Modal
      show={showCurrentElement}
      size="lg"
      onHide={() => {
        setShowCurrentElement(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Customize Element</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        {currentElement && <PropsRender />}
      </Modal.Body>
    </Modal>
  );
};

export default FieldCustomizeSection;
