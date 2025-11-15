import React, { useContext } from "react";
import Select from "react-select";
import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { FormContext } from "../FormCreate";
import FontFamilyBox from "./FontFamilyBox";

function SettingBox() {
  const {
    openSettingModel,
    setOpenSettingModel,
    fontModal,
    setFontModal,
    selectedFont,
    fieldType,
    setFieldType,
    setScrollAnimationType,
    setPageBackground,
    scrollAnimationType,
    pageBackground,
  } = useContext(FormContext);

  return (
    <Offcanvas
      show={openSettingModel}
      className="setting-box"
      onHide={() => {
        setOpenSettingModel(false);
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Page Settings</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-0">
        {fontModal ? (
          <FontFamilyBox />
        ) : (
          <Container className="mt-3">
            <div className="p-2">
              <div className="mb-4">
                <Row>
                  <Col lg={9} md={9}>
                    <label className="mb-2">Page Background Color</label>
                    <input
                      type="color"
                      id="color-picker2"
                      className="w-100"
                      value={pageBackground || ""}
                      onChange={(e) => {
                        setPageBackground(e.target.value);
                      }}
                    />
                  </Col>
                  <Col lg={3} md={3}>
                    <Button
                      variant={"primary"}
                      size="sm"
                      className="clear-background-btn"
                      onClick={() => {
                        setPageBackground("");
                      }}
                    >
                      Clear
                    </Button>
                  </Col>
                </Row>
              </div>
              <div className="mb-4">
                <div className="customize-prop-sec">
                  <label className="mb-2">Fields Varaint</label>
                  <Select
                    isClearable
                    placeholder={"Select type"}
                    value={fieldType || ""}
                    onChange={(e) => {
                      setFieldType(e);
                    }}
                    options={[
                      { label: "Outlined", value: "Outlined" },
                      { label: "Standard", value: "Standard" },
                      { label: "Default", value: "Default" },
                    ]}
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="customize-prop-sec">
                  <label className="mb-2">OnScroll Animation</label>
                  <Select
                    isClearable
                    placeholder={"Select type"}
                    value={scrollAnimationType || ""}
                    onChange={(e) => {
                      setScrollAnimationType(e);
                    }}
                    options={[
                      { label: "Once", value: "Once" },
                      { label: "Every Time", value: "Every Time" },
                      { label: "None", value: "None" },
                    ]}
                  />
                </div>
              </div>
              <div className="mb-4">
                <button
                  className="font-select-btn"
                  onClick={() => {
                    setFontModal(true);
                  }}
                >
                  {selectedFont && "Selected font -"}{" "}
                  {selectedFont?.split("-").join(" ") || "Select Font Family"}
                </button>
              </div>
            </div>
          </Container>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SettingBox;
