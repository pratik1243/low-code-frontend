import React, { useContext } from "react";
import { FormContext } from "../FormCreate";
import Select from "react-select";
import { headingVariantOptions } from "../../utils/utilFunctions";
import { Button, Col, Row } from "react-bootstrap";

const TextProps = ({ onCustomizeElement, currentField }) => {
  const { forms } = useContext(FormContext);

  return (
    <>
      <Col lg={6} md={6} sm={12} xs={12} className="mb-4">
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
                onCustomizeElement("", "color", "input", forms, "style");
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Col>

      {currentField?.type === "heading" && (
        <Col lg={12} md={12} sm={12} xs={12}>
          <div className="customize-prop-sec">
            <label>Heading Variant</label>
            <Select
              isClearable
              placeholder={"Select variant"}
              options={headingVariantOptions}
              value={currentField?.props?.variant || ""}
              onChange={(e) => {
                onCustomizeElement(e, "variant", "select", forms);
              }}
            />
          </div>
        </Col>
      )}

      <Col lg={12} md={12} sm={12} xs={12}>
        <div className="customize-prop-sec">
          <label>
            {currentField?.type === "paragraph"
              ? "Paragraph Text"
              : "Heading Text"}
          </label>
          <textarea
            value={currentField?.props?.text || ""}
            placeholder={
              currentField?.type === "paragraph"
                ? "Enter paragraph"
                : "Enter heading"
            }
            className="customize-input"
            onChange={(e) => {
              onCustomizeElement(e, "text", "input", forms);
            }}
            {...(currentField?.type === "paragraph" && { rows: 7 })}
          />
        </div>
      </Col>
    </>
  );
};

export default TextProps;
