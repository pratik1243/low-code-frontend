import React, { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Select from "react-select";
import {
  autoplayDelayOptions,
  sliderPerViewOptions,
} from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";

const SliderProps = ({ onCustomizeElement, currentField }) => {
  const { forms } = useContext(FormContext);
  return (
    <>
      <div className="customize-checkbox mt-4">
        <Row>
          {currentField?.props?.slides.length >
            currentField?.props?.slidesPerView?.value && (
            <Col lg={3} md={3} sm={12} xs={12}>
              <div className="d-flex">
                <input
                  type="checkbox"
                  id="checkbox-loop"
                  checked={currentField?.props?.loop || ""}
                  onChange={(e) => {
                    onCustomizeElement(e, "loop", "checkbox", forms);
                  }}
                />
                <label htmlFor="checkbox-loop">Loop</label>
              </div>
            </Col>
          )}
          <Col lg={3} md={3} sm={12} xs={12}>
            <div className={`d-flex`}>
              <input
                type="checkbox"
                id="checkbox-navigation"
                checked={currentField?.props?.navigation || ""}
                onChange={(e) => {
                  onCustomizeElement(e, "navigation", "checkbox", forms);
                }}
              />
              <label htmlFor="checkbox-navigation">Navigation</label>
            </div>
          </Col>
        </Row>
      </div>

      <Col lg={6} md={6} sm={12} xs={12}>
        <div className="customize-prop-sec">
          <label>Space Between Slides</label>
          <input
            type="number"
            value={currentField?.props?.spaceBetweenSlides || ""}
            placeholder="Enter spaces"
            className="customize-input"
            onChange={(e) => {
              onCustomizeElement(e, "spaceBetweenSlides", "input", forms);
            }}
          />
        </div>
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
        <div className="customize-prop-sec">
          <label>Slides Per View</label>
          <Select
            isClearable
            placeholder={"Select view"}
            options={sliderPerViewOptions}
            value={currentField?.props?.slidesPerView || ""}
            onChange={(e) => {
              onCustomizeElement(e, "slidesPerView", "select", forms);
            }}
          />
        </div>
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
        <div className="customize-prop-sec">
          <label>Autoplay Delay</label>
          <Select
            isClearable
            placeholder={"Select delay"}
            options={autoplayDelayOptions}
            value={currentField?.props?.delay || ""}
            onChange={(e) => {
              onCustomizeElement(e, "delay", "select", forms);
            }}
          />
        </div>
      </Col>
    </>
  );
};

export default SliderProps;
