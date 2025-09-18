"use client";
import React, { useContext, useMemo } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FormContext } from "../FormCreate";
import Select from "react-select";

const ButtonProps = ({ onCustomizeElement, currentField }) => {
  const { forms, pagesList } = useContext(FormContext);

  const getFields = (element) => {
    let fields = [];
    let types = ["input", "select", "country"];
    for (let i = 0; i < element?.length; i++) {
      for (let j = 0; j < element[i]?.content?.length; j++) {
        if (
          types?.includes(element[i]?.content[j]?.type) ||
          types?.includes(element[i]?.type)
        ) {
          fields.push({
            value: element[i]?.content[j]
              ? element[i]?.content[j]?.props?.name
              : element[i]?.props?.name,
            label: element[i]?.content[j]
              ? element[i]?.content[j]?.props?.name
              : element[i]?.props?.name,
          });
        }
      }
    }
    return fields;
  };

  const fieldOptions = useMemo(() => getFields(forms), [forms]);

  return (
    <div>
      <Col lg={12} md={12} sm={12} xs={12}>
        <Row className="mt-4">
          <Col lg={3} md={3} sm={12} xs={12}>
            <div className="d-flex align-items-center">
              <input
                type="radio"
                id="checkbox-icon1"
                name="checkbox-icon"
                className="icon-radio-btn"
                value={"start"}
                checked={currentField?.props?.iconPosition == "start" || ""}
                onChange={(e) => {
                  onCustomizeElement(e, "iconPosition", "input", forms);
                }}
              />
              <label htmlFor="checkbox-icon1">Start Icon</label>
            </div>
          </Col>
          <Col lg={3} md={3} sm={12} xs={12}>
            <div className="d-flex align-items-center">
              <input
                type="radio"
                id="checkbox-icon2"
                name="checkbox-icon"
                value={"end"}
                className="icon-radio-btn"
                checked={currentField?.props?.iconPosition == "end" || ""}
                onChange={(e) => {
                  onCustomizeElement(e, "iconPosition", "input", forms);
                }}
              />
              <label htmlFor="checkbox-icon2">End Icon</label>
            </div>
          </Col>
          <Col lg={3} md={3} sm={12} xs={12}>
            <div className="d-flex align-items-center">
              <input
                type="radio"
                id="checkbox-icon3"
                name="checkbox-icon"
                value={"none"}
                className="icon-radio-btn"
                checked={currentField?.props?.iconPosition == "none" || ""}
                onChange={(e) => {
                  onCustomizeElement(e, "iconPosition", "input", forms);
                }}
              />
              <label htmlFor="checkbox-icon3">No Icon</label>
            </div>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            <Row className="mt-4 mb-4">
              <Col lg={6} md={6} sm={12} xs={12}>
                <Row>
                  <Col lg={9} md={9}>
                    <label className="mb-2">Text Color</label>
                    <input
                      type="color"
                      id="color-picker2"
                      className="w-100"
                      value={currentField?.props?.style?.color || ""}
                      onChange={(e) => {
                        onCustomizeElement(e, "color", "input", forms, "style");
                      }}
                    />
                  </Col>
                  <Col lg={3} md={3}>
                    <Button
                      variant={"primary"}
                      size="sm"
                      className="clear-background-btn"
                      onClick={() => {
                        onCustomizeElement(
                          "",
                          "color",
                          "input",
                          forms,
                          "style"
                        );
                      }}
                    >
                      Clear
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Row>
                  <Col lg={9} md={9}>
                    <label className="mb-2">Border Color</label>
                    <input
                      type="color"
                      id="color-picker2"
                      className="w-100"
                      value={currentField?.props?.style?.borderColor || ""}
                      onChange={(e) => {
                        onCustomizeElement(
                          e,
                          "borderColor",
                          "input",
                          forms,
                          "style"
                        );
                      }}
                    />
                  </Col>
                  <Col lg={3} md={3}>
                    <Button
                      variant={"primary"}
                      size="sm"
                      className="clear-background-btn"
                      onClick={() => {
                        onCustomizeElement(
                          "",
                          "borderColor",
                          "input",
                          forms,
                          "style"
                        );
                      }}
                    >
                      Clear
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Row className="mt-4">
                  <Col lg={9} md={9}>
                    <label className="mb-2">Button Background Color</label>
                    <input
                      type="color"
                      id="color-picker1"
                      className="w-100"
                      value={currentField?.props?.style?.backgroundColor || ""}
                      onChange={(e) => {
                        onCustomizeElement(
                          e,
                          "backgroundColor",
                          "input",
                          forms,
                          "style"
                        );
                      }}
                    />
                  </Col>
                  <Col lg={3} md={3}>
                    <Button
                      variant={"primary"}
                      size="sm"
                      className="clear-background-btn"
                      onClick={() => {
                        onCustomizeElement(
                          "",
                          "backgroundColor",
                          "input",
                          forms,
                          "style"
                        );
                      }}
                    >
                      Clear
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            <hr />
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="mt-4">
              <label className="fw-bold mb-3">Button Actions</label>
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <div className="customize-prop-sec">
                    <label>{currentField?.type} Text</label>
                    <input
                      type="text"
                      value={currentField?.props?.text || ""}
                      placeholder="Enter button text"
                      className="customize-input"
                      onChange={(e) => {
                        onCustomizeElement(e, "text", "input", forms);
                      }}
                    />
                  </div>
                </Col>

                <Col lg={6} md={6} sm={12} xs={12}>
                  <div className="customize-prop-sec">
                    <label>Redirect Page</label>
                    <Select
                      isClearable
                      placeholder={"Select page"}
                      options={pagesList}
                      getOptionLabel={(e) => e.page_name}
                      getOptionValue={(e) => e.page_route}
                      value={currentField?.props?.redirectUrl || ""}
                      onChange={(e) => {
                        onCustomizeElement(e, "redirectUrl", "select", forms);
                      }}
                    />
                  </div>
                </Col>

                <Col lg={6} md={6} sm={12} xs={12}>
                  <div className="customize-prop-sec">
                    <label>fields to be submmited</label>
                    <Select
                      isClearable
                      isMulti
                      placeholder={"Select fields"}
                      options={fieldOptions}
                      value={currentField?.props?.fields || ""}
                      onChange={(e) => {
                        onCustomizeElement(e, "fields", "select", forms);
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default ButtonProps;
