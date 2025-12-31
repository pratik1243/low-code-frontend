import React, { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { validations } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import Select from "react-select";

const InputProps = ({ onCustomizeElement, currentField }) => {
  const { forms } = useContext(FormContext);

  return (
    <>
      <Col lg={6} md={6} sm={12} xs={12}>
        <Row>
          <Col lg={9} md={9}>
            <label className="mb-2">Label Color</label>
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
                onCustomizeElement("", "color", "input", forms, "style");
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Col>
      {["checkbox", "radio"].includes(currentField?.type) && (
        <Col lg={6} md={6} sm={12} xs={12}>
          <Row className="mt-4">
            <Col lg={9} md={9}>
              <label className="mb-2 text-capitalize">
                {currentField?.type} Color
              </label>
              <input
                type="color"
                id="color-picker2"
                className="w-100"
                value={currentField?.props?.checkBoxColor || ""}
                onChange={(e) => {
                  onCustomizeElement(e, "checkBoxColor", "input", forms);
                }}
              />
            </Col>
            <Col lg={3} md={3}>
              <Button
                variant={"primary"}
                size="sm"
                className="clear-background-btn"
                onClick={() => {
                  onCustomizeElement("", "checkBoxColor", "input", forms);
                }}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Col>
      )}
      {!["checkbox", "radio"].includes(currentField?.type) && (
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
                  onCustomizeElement(e, "borderColor", "input", forms, "style");
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
      )}

      {(!currentField?.props.standard && !currentField?.props.floatLabel) ||
        (!["checkbox", "radio"].includes(currentField?.type) && (
          <Col lg={6} md={6} sm={12} xs={12}>
            <Row className="mt-4">
              <Col lg={9} md={9}>
                <label className="mb-2">Input Background Color</label>
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
        ))}

      <div className="customize-prop-sec mt-4 mb-2">
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="customize-checkbox mt-2">
              <Row>
                <Col lg={3} md={3} sm={12} xs={12}>
                  <div className="d-flex">
                    <input
                      type="checkbox"
                      id="checkbox-required"
                      checked={currentField?.props?.required || ""}
                      onChange={(e) => {
                        onCustomizeElement(e, "required", "checkbox", forms);
                      }}
                    />
                    <label htmlFor="checkbox-required" className="mb-0">
                      Required
                    </label>
                  </div>
                </Col>

                {!["checkbox", "radio"].includes(currentField?.type) && (
                  <>
                    <Col lg={3} md={3} sm={12} xs={12}>
                      <div className="d-flex">
                        <input
                          type="checkbox"
                          id="checkbox-float"
                          checked={currentField?.props?.floatLabel || ""}
                          onChange={(e) => {
                            onCustomizeElement(
                              e,
                              "floatLabel",
                              "checkbox",
                              forms
                            );
                          }}
                        />
                        <label htmlFor="checkbox-float" className="mb-0">
                          Float Label
                        </label>
                      </div>
                    </Col>

                    {currentField?.type == "input" &&
                      currentField?.form?.regex?.value == "Password" && (
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <div className="d-flex">
                            <input
                              type="checkbox"
                              id="checkbox-password"
                              checked={currentField?.props?.isPassword || ""}
                              onChange={(e) => {
                                onCustomizeElement(
                                  e,
                                  "isPassword",
                                  "checkbox",
                                  forms
                                );
                              }}
                            />
                            <label htmlFor="checkbox-password" className="mb-0">
                              Password Button
                            </label>
                          </div>
                        </Col>
                      )}

                    {currentField?.type == "input" &&
                      currentField?.form?.regex?.value == "Phone" && (
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <div className="d-flex">
                            <input
                              type="checkbox"
                              id="checkbox-country-code"
                              checked={currentField?.props?.countryCode || ""}
                              onChange={(e) => {
                                onCustomizeElement(
                                  e,
                                  "countryCode",
                                  "checkbox",
                                  forms
                                );
                              }}
                            />
                            <label
                              htmlFor="checkbox-country-code"
                              className="mb-0"
                            >
                              Country Code
                            </label>
                          </div>
                        </Col>
                      )}

                    <Col lg={3} md={3} sm={12} xs={12}>
                      <div className="d-flex">
                        <input
                          type="checkbox"
                          id="checkbox-standard"
                          checked={currentField?.props?.standard || ""}
                          onChange={(e) => {
                            onCustomizeElement(
                              e,
                              "standard",
                              "checkbox",
                              forms
                            );
                          }}
                        />
                        <label htmlFor="checkbox-standard" className="mb-0">
                          Standard
                        </label>
                      </div>
                    </Col>
                  </>
                )}

                {/* {currentField?.type === "select" && (
                <Col lg={3} md={3} sm={12} xs={12}>
                  <div className="d-flex">
                    <input
                      type="checkbox"
                      id="checkbox-multiple"
                      checked={currentField?.props?.multiple || ""}
                      onChange={(e) => {
                        onCustomizeElement(e, "multiple", "checkbox", forms);
                      }}
                    />
                    <label htmlFor="checkbox-multiple" className="mb-0">Multiple</label>
                  </div>
                </Col>
              )} */}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      {currentField?.type !== "country" && (
        <Col lg={6} md={6} sm={12} xs={12}>
          <div className="customize-prop-sec">
            <label>{currentField?.type == "radio" ? "Title" : "Label"}</label>
            <input
              type="text"
              value={
                currentField?.type == "radio"
                  ? currentField?.props?.title
                  : currentField?.props?.label || ""
              }
              placeholder={
                currentField?.type == "radio" ? "Enter title" : "Enter label"
              }
              className="customize-input"
              onChange={(e) => {
                onCustomizeElement(
                  e,
                  currentField?.type == "radio" ? "title" : "label",
                  "input",
                  forms
                );
              }}
            />
          </div>
        </Col>
      )}
      {!["checkbox", "radio"].includes(currentField?.type) && (
        <Col lg={6} md={6} sm={12} xs={12}>
          <div className="customize-prop-sec">
            <label>Placeholder</label>
            <input
              type="text"
              value={currentField?.props?.placeholder || ""}
              placeholder="Enter placeholder"
              className="customize-input"
              onChange={(e) => {
                onCustomizeElement(e, "placeholder", "input", forms);
              }}
            />
          </div>
        </Col>
      )}
      {!["country", "select", "checkbox", "radio"].includes(
        currentField?.type
      ) && (
        <Col lg={6} md={6} sm={12} xs={12}>
          <div className="customize-prop-sec">
            <label>Max length</label>
            <input
              type="number"
              value={currentField?.props?.maxLength || ""}
              placeholder="Enter maxlength"
              className="customize-input"
              onChange={(e) => {
                onCustomizeElement(e, "maxLength", "input", forms);
              }}
            />
          </div>
        </Col>
      )}
      <Col lg={6} md={6} sm={12} xs={12}>
        <div className="customize-prop-sec">
          <label>Name</label>
          <input
            type="text"
            value={currentField?.props?.name || ""}
            placeholder="Enter name"
            className="customize-input"
            onChange={(e) => {
              onCustomizeElement(e, "name", "input", forms);
            }}
          />
        </div>
      </Col>
      {!["country", "select", "checkbox", "radio"].includes(
        currentField?.type
      ) && (
        <Col lg={6} md={6} sm={12} xs={12}>
          <div className="customize-prop-sec">
            <label>Add Validation</label>
            <Select
              isClearable
              placeholder={"Select validation type"}
              options={validations}
              value={currentField?.form?.regex || ""}
              onChange={(e) => {
                onCustomizeElement(e, "regex", "select", forms);
              }}
            />
          </div>
        </Col>
      )}
    </>
  );
};

export default InputProps;
