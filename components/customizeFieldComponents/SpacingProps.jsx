import React from "react";
import { Col, Row } from "react-bootstrap";

const SpacingProps = ({ onCustomizeElement, currentField }) => {
  return (
    <Row className="mt-4">
      <label className="mb-3 fw-bold">{currentField?.type} Spacing</label>
      <Col lg={6} md={6} sm={12} xs={12}>
        <div className="customize-prop-sec">
          <label>Top Spacing</label>
          <input
            type="number"
            min={0}
            max={500}
            value={currentField?.props?.style?.paddingTop || 0}
            className="customize-input"
            onChange={(e) => {
              onCustomizeElement(e, "paddingTop", "input", forms, "style");
            }}
          />
        </div>
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
        <div className="customize-prop-sec">
          <label>Bottom Spacing</label>
          <input
            type="number"
            min={0}
            max={500}
            value={currentField?.props?.style?.paddingBottom || 0}
            className="customize-input"
            onChange={(e) => {
              onCustomizeElement(e, "paddingBottom", "input", forms, "style");
            }}
          />
        </div>
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
        <div className="customize-prop-sec">
          <label>Left Spacing</label>
          <input
            type="number"
            min={0}
            max={500}
            value={currentField?.props?.style?.paddingLeft || 0}
            className="customize-input"
            onChange={(e) => {
              onCustomizeElement(e, "paddingLeft", "input", forms, "style");
            }}
          />
        </div>
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
        <div className="customize-prop-sec">
          <label>Right Spacing</label>
          <input
            type="number"
            min={0}
            max={500}
            value={currentField?.props?.style?.paddingRight || 0}
            placeholder="Enter padding"
            className="customize-input"
            onChange={(e) => {
              onCustomizeElement(e, "paddingRight", "input", forms, "style");
            }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default SpacingProps;
