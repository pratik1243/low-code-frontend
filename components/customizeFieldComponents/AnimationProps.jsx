"use client"
import React, { useContext, useMemo } from "react";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import {
  animationDelayOptions,
  animationOptions,
} from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";

const AnimationProps = ({ onCustomizeElement, currentField }) => {
  
  const { forms } = useContext(FormContext);
  const animationList = useMemo(() => {
    return animationOptions;
  }, []);

  return (
    <div className="mt-4">
      <label className="mb-3 fw-bold">Set Animations</label>

      <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
          <div className="customize-prop-sec">
            <label>Animation Type</label>
            <Select
              isClearable
              placeholder={"Select animations"}
              options={animationList}
              value={currentField?.props?.animation || ""}
              onChange={(e) => {
                onCustomizeElement(e, "animation", "select", forms);
              }}
            />
          </div>
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <div className="customize-prop-sec">
            <label>Animation Delay (Milli Seconds)</label>
            <Select
              isClearable
              placeholder={"Select seconds"}
              options={animationDelayOptions}
              value={currentField?.props?.animation_delay || ""}
              onChange={(e) => {
                onCustomizeElement(e, "animation_delay", "select", forms);
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AnimationProps;
