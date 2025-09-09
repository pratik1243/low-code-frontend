import React, { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FormContext } from "../FormCreate";

const IconProps = ({ onCustomizeElement, currentField }) => {
  const { forms } = useContext(FormContext);
  return (
    <div>
      <Row>
        <Col lg={6} md={6}>
          <div className="customize-prop-sec">
            <label>Icon Size</label>
            <input
              type={"number"}
              min={0}
              max={100}
              className="customize-input"
              value={currentField?.props?.iconSize || ""}
              onChange={(e) => {
                onCustomizeElement(e, "iconSize", "input", forms);
              }}
            />
          </div>
        </Col>
        <Col lg={6} md={6}>
          <div className="customize-prop-sec">
            <Row>
              <Col lg={9} md={9}>
                <label>Icon Color</label>
                <input
                  type={"color"}
                  className="w-100"
                  value={currentField?.props?.style?.color || ""}
                  onChange={(e) => {
                    onCustomizeElement(e, "color", "input", forms, "style");
                  }}
                />
              </Col>

              <Col lg={2} md={2}>
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
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default IconProps;
