"use client";
import React, { useContext, useMemo, useState, useEffect } from "react";
import {
  Button,
  Col,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import Select from "react-select";
import {
  alignmentOptions,
  containerOptions,
  nestedStructure,
  updateforms,
} from "../../utils/utilFunctions";
import { RiErrorWarningLine } from "react-icons/ri";
import AddContent from "../commonComponents/AddContent";
import IconBox from "../commonComponents/IconBox";
import { FormContext } from "../FormCreate";
import AnimationProps from "./AnimationProps";
import ButtonProps from "./ButtonProps";
import IconProps from "./IconProps";
import ImageProps from "./ImageProps";
import InputProps from "./InputProps";
import SliderProps from "./SliderProps";
import SpacingProps from "./SpacingProps";
import TextProps from "./TextProps";
import ColorPicker from "react-best-gradient-color-picker";

const PropsRender = ({ open }) => {
  const { forms, setForms, currentElement, breakPoint, containerIndex } = useContext(FormContext);

  const [gradientShow, setGradientShow] = useState(false);

  const onCustomizeElement = (
    e,
    attribute,
    type,
    forms,
    style = null,
    optionIndex = null
  ) => {
    const value = {
      select: e || "",
      input: e?.target?.value,
      checkbox: e?.target?.checked,
      image: e || "",
    };
    const customizeFieldObj = {
      e: e,
      type: type,
      value: value,
      attribute: attribute,
      style: style,
      optionIndex: optionIndex,
    };
    setForms({
      ...forms,
      [breakPoint]: nestedStructure(
        customizeFieldObj,
        forms,
        currentElement,
        updateforms,
        "customizeField",
        breakPoint
      ),
    });
  };

  const addContent = {
    stepper: "stepContent",
    select: "options",
    slider: "slides",
    card_box: "cards",
    radio: "radio_options",
  };

  const addTextType = {
    stepper: "Add Steps",
    slider: "Add Slides",
    select: "Add Options",
    card_box: "Add Cards",
    radio: "Add Options",
  };

  const filterCurrent = (data) => {
    return data?.filter((el) => el?.id === currentElement?.id)[0];
  };

  const renderTooltip = (props) => (
    <Tooltip id="align-tooltip" {...props}>
      The {currentElement?.type} width should be less than the column width in
      order to maintain proper alignment
    </Tooltip>
  );

  const renderCurrentField = (form) => {
    const fields = filterCurrent(form);
    const nestedFields = filterCurrent(form?.[containerIndex]?.content);
    if (form?.[containerIndex]?.content?.length > 0) {
      return currentElement?.type == "container"
        ? form?.[containerIndex]
        : nestedFields;
    } else {
      return fields;
    }
  };

  const currentField = useMemo(
    () => renderCurrentField(forms[breakPoint]),
    [forms[breakPoint]]
  );

  const renderProps = () => {
    if (
      ["input", "select", "country", "checkbox", "radio"].includes(
        currentField?.type
      )
    ) {
      return (
        <InputProps
          onCustomizeElement={onCustomizeElement}
          currentField={currentField}
        />
      );
    } else if (currentField?.type == "button") {
      return (
        <ButtonProps
          onCustomizeElement={onCustomizeElement}
          currentField={currentField}
        />
      );
    } else if (currentField?.type == "slider") {
      return (
        <SliderProps
          onCustomizeElement={onCustomizeElement}
          currentField={currentField}
        />
      );
    } else if (["heading", "paragraph"].includes(currentField?.type)) {
      return (
        <TextProps
          onCustomizeElement={onCustomizeElement}
          currentField={currentField}
        />
      );
    } else if (currentField?.type == "icon") {
      return (
        <IconProps
          onCustomizeElement={onCustomizeElement}
          currentField={currentField}
        />
      );
    } else if (
      ["image", "container", "card_box"].includes(currentField?.type)
    ) {
      return (
        <ImageProps
          currentField={currentField}
          onCustomizeElement={onCustomizeElement}
        />
      );
    }
    return null;
  };

  const handleShow = (type) => {
    open?.setShow(type);
  };

  const handleShow1 = (type) => {
    open?.setShow1(type);
  };

  return (
    <div
      className={`field-customize-sec ${
        open?.show1 || open?.show ? "p-0 no-scroll" : ""
      }`}
    >
      {open?.show1 ? (
        <IconBox
          onCustomizeElement={onCustomizeElement}
          goBack={() => {
            handleShow1(false);
          }}
        />
      ) : open?.show ? (
        <AddContent
          addContentType={addContent[currentField?.type]}
          currentField={currentField}
          onCustomizeElement={onCustomizeElement}
          goBack={() => {
            handleShow(false);
          }}
        />
      ) : (
        <>
          <label className="fw-bold">Set Width</label>
          <div className="width-customize-sec mb-4 mt-3">
            <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <label>Column Width ({currentField?.column_width}%)</label>
                <input
                  type="range"
                  value={currentField?.column_width || ""}
                  min={0}
                  max={100}
                  onChange={(e) => {
                    onCustomizeElement(e, "column_width", "input", forms);
                  }}
                />
              </Col>

              {!["divider", "image", "icon"].includes(currentField?.type) && (
                <Col lg={6} md={6} sm={12} xs={12}>
                  <label>
                    {currentField?.type?.split("_").join(" ")} Width (
                    {currentField?.props?.width}%)
                  </label>
                  <input
                    type={"range"}
                    min={0}
                    max={100}
                    value={currentField?.props?.width || ""}
                    onChange={(e) => {
                      onCustomizeElement(e, "width", "input", forms);
                    }}
                  />
                </Col>
              )}
            </Row>
          </div>

          <hr />

          <div className="mt-4">
            <label className="mb-3 fw-bold">
              Set {currentField?.type.split("_").join(" ")} Properties
            </label>

            <div className="customize-checkbox">
              <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="checkbox-hidden"
                      checked={currentField?.props?.hidden || ""}
                      onChange={(e) => {
                        onCustomizeElement(e, "hidden", "checkbox", forms);
                      }}
                    />
                    <label htmlFor="checkbox-hidden">Hidden</label>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <Row>
                {!["input", "select", "country"].includes(
                  currentField?.type
                ) && (
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                      <Col lg={9} md={9}>
                        <label className="mb-2">Column Background Color</label>
                        <input
                          type="color"
                          id="color-picker"
                          className="w-100"
                          value={currentField?.props?.style?.background || ""}
                          onChange={(e) => {
                            onCustomizeElement(
                              e,
                              "background",
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
                              "background",
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
                {currentField?.type == "container" && (
                  <>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <div className="customize-prop-sec">
                        <Row>
                          <Col lg={9} md={9}>
                            <label className="mb-2">
                              Container Background Color
                            </label>
                            <input
                              type="color"
                              id="color-picker3"
                              className="w-100"
                              value={
                                currentField?.props?.containerBackground || ""
                              }
                              onChange={(e) => {
                                onCustomizeElement(
                                  e,
                                  "containerBackground",
                                  "input",
                                  forms
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
                                  "containerBackground",
                                  "input",
                                  forms
                                );
                              }}
                            >
                              Clear
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Col>

                    {currentField?.props?.containerTemplate && (
                      <Col lg={6} md={6} sm={12} xs={12}>
                        <Row className="mb-4">
                          <Col lg={9} md={9}>
                            <label className="mb-2">Border Color</label>
                            <input
                              type="color"
                              id="color-picker2"
                              className="w-100"
                              value={
                                currentField?.props?.style?.borderColor || ""
                              }
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
                    )}
                  </>
                )}

                {currentField?.type == "slider" && (
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Row>
                      <Col lg={9} md={9}>
                        <label className="mb-2">Indicator Color</label>
                        <input
                          type="color"
                          id="color-picker2"
                          className="w-100"
                          value={currentField?.props?.style?.color || ""}
                          onChange={(e) => {
                            onCustomizeElement(
                              e,
                              "color",
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
                )}

                {renderProps()}

                {currentField?.type == "card_box" && (
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <div className="customize-prop-sec">
                      <label>Cards Per Rows</label>
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={
                          currentField?.props?.style?.gridTemplateColumns || 1
                        }
                        className="customize-input"
                        onChange={(e) => {
                          onCustomizeElement(
                            e,
                            "gridTemplateColumns",
                            "input",
                            forms,
                            "style"
                          );
                        }}
                      />
                    </div>
                  </Col>
                )}

                {!["divider", "image"].includes(currentField?.type) && (
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <div className="customize-prop-sec">
                      <label className="d-flex align-items-center">
                        {currentField?.type.split("_").join(" ")}{" "}
                        Alignment&nbsp;&nbsp;{" "}
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <RiErrorWarningLine size={19} />
                        </OverlayTrigger>
                      </label>
                      <Select
                        isClearable
                        placeholder={"Select alignment"}
                        options={alignmentOptions}
                        value={currentField?.props?.align || ""}
                        onChange={(e) => {
                          onCustomizeElement(e, "align", "select", forms);
                        }}
                      />
                    </div>
                  </Col>
                )}

                {["button", "icon"].includes(currentField?.type) && (
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Button
                      className={`add-icon-btn mt-2`}
                      onClick={() => {
                        handleShow1(true);
                      }}
                    >
                      Add Icon
                    </Button>
                  </Col>
                )}

                {currentField?.type == "container" && (
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <div className="customize-prop-sec">
                      <label>Container Template</label>
                      <Select
                        isClearable
                        placeholder={"Select template"}
                        options={containerOptions}
                        value={currentField?.props?.containerTemplate || ""}
                        onChange={(e) => {
                          onCustomizeElement(
                            e,
                            "containerTemplate",
                            "select",
                            forms
                          );
                        }}
                      />
                    </div>
                  </Col>
                )}

                {currentField?.type == "stepper" && (
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <div className="customize-prop-sec">
                      <label>Stepper Container Template</label>
                      <Select
                        isClearable
                        placeholder={"Select template"}
                        options={containerOptions}
                        value={currentField?.props?.containerType || ""}
                        onChange={(e) => {
                          onCustomizeElement(
                            e,
                            "containerType",
                            "select",
                            forms
                          );
                        }}
                      />
                    </div>
                  </Col>
                )}

                {["stepper", "select", "slider", "card_box", "radio"].includes(
                  currentField?.type
                ) && (
                  <Col
                    lg={currentField?.type == "radio" ? 12 : 6}
                    md={currentField?.type == "radio" ? 12 : 6}
                    sm={12}
                    xs={12}
                  >
                    <Button
                      className={`add-content-btn my-2`}
                      onClick={() => {
                        handleShow(true);
                      }}
                    >
                      {addTextType[currentField?.type]}
                    </Button>
                  </Col>
                )}

                {["container", "slider", "card_box", "image"].includes(
                  currentField?.type
                ) && (
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Button
                      className="add-icon-btn mt-2 mb-2"
                      onClick={() => {
                        setGradientShow(true);
                      }}
                    >
                      Add Gradient
                    </Button>
                  </Col>
                )}
              </Row>
            </div>

            <hr className="mt-3" />

            <SpacingProps
              onCustomizeElement={onCustomizeElement}
              currentField={currentField}
            />

            {currentField?.type !== "card_box" && (
              <>
                <hr className="mt-3" />
                <AnimationProps
                  onCustomizeElement={onCustomizeElement}
                  currentField={currentField}
                />
              </>
            )}
          </div>
        </>
      )}

      <Modal
        size="md"
        show={gradientShow}
        className="gradient-box"
        onHide={() => {
          setGradientShow(false);
        }}
      >
        <Modal.Header closeButton>
          <h5>Add Gradient</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            {" "}
            <ColorPicker
              value={currentField?.props?.gradientColor || "rgba(255,255,255,1)"}
              onChange={(e) => {
                onCustomizeElement(e, "gradientColor", "select", forms);
              }}
            />
            <Button
              variant={"primary"}
              size="sm"
              className="clear-background-btn w-100 mt-5"
              onClick={() => {
                onCustomizeElement("", "gradientColor", "select", forms);
              }}
            >
              Clear Gradient
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PropsRender;
