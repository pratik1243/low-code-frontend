"use client";
import Select from "react-select";
import React, { useContext, useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { Col, Row } from "react-bootstrap";
import { FiMinusCircle } from "react-icons/fi";
import {
  alignmentOptions,
  animationOptions,
  headingVariantOptions,
  validations,
} from "../utils/utilFunctions";
import { FormContext } from "./FormCreate";
import { useMemo } from "react";

const FieldCustomizeSection = () => {
  const { forms, setForms, currentElement, containerId, pagesList } =
    useContext(FormContext);
  const [optionValue, setOptionValue] = useState("");

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
    };

    const updateForms = forms?.map((el, i) => {
      const nestedForm = el?.content?.map((ele, id) => {
        if (ele.id === currentElement?.id) {
          return {
            ...ele,
            ...updateforms(e, ele, attribute, value[type], optionIndex, style),
          };
        } else {
          return ele;
        }
      });

      if (currentElement?.isContainer) {
        return { ...el, content: nestedForm };
      } else if (el.id === currentElement?.id) {
        return {
          ...el,
          ...updateforms(e, el, attribute, value[type], optionIndex, style),
        };
      } else {
        return el;
      }
    });
    setForms(updateForms);
  };

  const updateforms = (e, el, attribute, value, optionIndex, style) => {
    const options = el?.props?.options?.map((ele, ind) => {
      if (optionIndex === ind) {
        return { ...ele, label: value, value: value };
      }
      return ele;
    });
    return {
      ...el,
      ...(attribute == "column_width" && {
        column_width: Number(e.target.value),
      }),
      ...(attribute == "regex"
        ? {
            form: {
              ...el.form,
              regex: value,
            },
          }
        : {
            props: {
              ...el.props,
              ...(style
                ? {
                    style: {
                      ...el.props.style,
                      [attribute]: value,
                    },
                  }
                : {
                    [attribute]: attribute == "options" ? options : value,
                  }),
            },
          }),
    };
  };

  const addSelectOptions = () => {
    const updateForms = forms.map((el, i) => {
      const nestedForm = el?.content?.map((ele, id) => {
        if (ele.id === currentElement?.id) {
          return {
            ...ele,
            props: {
              ...ele?.props,
              options: [
                ...ele?.props?.options,
                {
                  label: optionValue,
                  value: optionValue,
                },
              ],
            },
          };
        } else {
          return ele;
        }
      });

      if (currentElement?.isContainer) {
        return { ...el, content: nestedForm };
      } else if (el?.id === currentElement?.id) {
        return {
          ...el,
          props: {
            ...el?.props,
            options: [
              ...el?.props?.options,
              {
                label: optionValue,
                value: optionValue,
              },
            ],
          },
        };
      }
      return el;
    });
    setForms(updateForms);
    setOptionValue("");
  };

  const renderCurrentField = (form, currentelement, containerid) => {
    const fields = form?.filter((el) => el?.id === currentelement?.id)[0];
    const nestedFields = form?.[containerid]?.content?.filter(
      (el) => el?.id === currentelement?.id
    )[0];
    if (form?.[containerid]?.content?.length > 0) {
      return currentelement?.type == "card"
        ? form?.[containerid]
        : nestedFields;
    } else {
      return fields;
    }
  };

  const currentField = renderCurrentField(forms, currentElement, containerId);

  const removeOption = (value) => {
    const updateForms = forms?.map((el, i) => {
      if (el.id === currentElement?.id) {
        return {
          ...el,
          props: {
            ...el.props,
            options: el?.props?.options.filter((el) => el?.value !== value),
          },
        };
      }
      return el;
    });
    setForms(updateForms);
  };

  const animationList = useMemo(() => {
    return animationOptions;
  }, []);

  return (
    <div className="field-customize-sec">
      <label className="fw-bold">Set Width</label>

      <div className="width-customize-sec mb-4 mt-3">
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
        {currentField?.type !== "divider" && (
          <div className="mt-2">
            <label>
              {currentField?.type} Width ({currentField?.props?.width}%)
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
          </div>
        )}
      </div>

      <hr />

      <label className="fw-bold mt-3 mb-3">
        {currentField?.type} Properties
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

          {currentField?.type === "slider" && (
            <>
              <Col lg={6} md={6} sm={12} xs={12}>
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
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="d-flex mt-3">
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
            </>
          )}
        </Row>
      </div>

      {currentField?.type !== "divider" && (
        <div className="mb-3">
          <label className="mb-2">Column Background Color</label>
          <input
            type="color"
            id="color-picker"
            className="w-100"
            value={currentField?.props?.style?.background || ""}
            onChange={(e) => {
              onCustomizeElement(e, "background", "input", forms, "style");
            }}
          />
        </div>
      )}

      {currentField?.type == "slider" && (
        <div>
          <div className="customize-prop-sec mt-3">
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

          <div className="customize-prop-sec">
            <label>Slides Per View</label>
            <Select
              isClearable
              placeholder={"Select view"}
              options={[
                {
                  label: "1",
                  value: "1",
                },
                {
                  label: "2",
                  value: "2",
                },
                {
                  label: "3",
                  value: "3",
                },
                {
                  label: "4",
                  value: "4",
                },
                {
                  label: "5",
                  value: "5",
                },
                {
                  label: "6",
                  value: "6",
                },
              ]}
              value={currentField?.props?.slidesPerView || ""}
              onChange={(e) => {
                onCustomizeElement(e, "slidesPerView", "select", forms);
              }}
            />
          </div>

          <div className="customize-prop-sec">
            <label>Autoplay Delay</label>
            <Select
              isClearable
              placeholder={"Select delay"}
              options={[
                {
                  label: "1000",
                  value: "1000",
                },
                {
                  label: "2000",
                  value: "2000",
                },
                {
                  label: "3000",
                  value: "3000",
                },
                {
                  label: "4000",
                  value: "4000",
                },
                {
                  label: "5000",
                  value: "5000",
                },
                {
                  label: "6000",
                  value: "6000",
                },
              ]}
              value={currentField?.props?.delay || ""}
              onChange={(e) => {
                onCustomizeElement(e, "delay", "select", forms);
              }}
            />
          </div>
        </div>
      )}

      {currentField?.type === "button" ? (
        <div className="mt-4">
          <label className="fw-bold">Button Actions</label>

          <div className="customize-prop-sec mt-3">
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

          <div className="customize-prop-sec">
            <label>Redirect Page</label>
            <Select
              isClearable
              placeholder={"Select page"}
              options={pagesList}
              getOptionLabel={(e) => e.label}
              getOptionValue={(e) => e.value}
              value={currentField?.props?.redirectUrl || ""}
              onChange={(e) => {
                onCustomizeElement(e, "redirectUrl", "select", forms);
              }}
            />
          </div>
          <div className="customize-prop-sec">
            <label>Button Color</label>
            <Select
              isClearable
              placeholder={"Select color"}
              options={[
                { label: "primary", value: "primary" },
                { label: "secondary", value: "secondary" },
                { label: "success", value: "success" },
                { label: "warning", value: "warning" },
                { label: "danger", value: "danger" },
                { label: "info", value: "info" },
                { label: "light", value: "light" },
                { label: "dark", value: "dark" },
                { label: "link", value: "link" },
              ]}
              value={currentField?.props?.color || ""}
              onChange={(e) => {
                onCustomizeElement(e, "color", "select", forms);
              }}
            />
          </div>
        </div>
      ) : (
        <>
          {currentField?.type === "heading" && (
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
          )}

          {currentField?.type === "paragraph" ||
          currentField?.type === "heading" ? (
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
          ) : currentField?.type !== "divider" &&
            currentField?.type !== "card" &&
            currentField?.type !== "slider" ? (
            <>
              <div className="customize-checkbox">
                <Row>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <div className="d-flex">
                      <input
                        type="checkbox"
                        id="checkbox-required"
                        checked={currentField?.props?.required || ""}
                        onChange={(e) => {
                          onCustomizeElement(e, "required", "checkbox", forms);
                        }}
                      />
                      <label htmlFor="checkbox-required">Required</label>
                    </div>
                  </Col>

                  {currentField?.type === "select" && (
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <div className="d-flex">
                        <input
                          type="checkbox"
                          id="checkbox-multiple"
                          checked={currentField?.props?.multiple || ""}
                          onChange={(e) => {
                            onCustomizeElement(
                              e,
                              "multiple",
                              "checkbox",
                              forms
                            );
                          }}
                        />
                        <label htmlFor="checkbox-multiple">Multiple</label>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>

              <div className="customize-prop-sec">
                <label>Label</label>
                <input
                  type="text"
                  value={currentField?.props?.label || ""}
                  placeholder="Enter label"
                  className="customize-input"
                  onChange={(e) => {
                    onCustomizeElement(e, "label", "input", forms);
                  }}
                />
              </div>

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

              {currentField?.type === "select" ? (
                <div className="customize-prop-sec">
                  <div className="d-flex">
                    <div className="w-100">
                      <label>Add Option</label>
                      <input
                        type="text"
                        placeholder="Enter option value"
                        className="customize-input"
                        value={optionValue}
                        onChange={(e) => setOptionValue(e.target.value)}
                      />
                    </div>
                    <button
                      disabled={!optionValue}
                      className="add-option"
                      onClick={() => addSelectOptions()}
                    >
                      <IoAddSharp />
                    </button>
                  </div>
                  <div className="customize-option-sec mt-4">
                    {currentField?.props?.options?.map((ele, i) => {
                      return (
                        <div key={i} className="option-input">
                          <input
                            type="text"
                            value={ele.value}
                            onChange={(e) =>
                              onCustomizeElement(
                                e,
                                "options",
                                "input",
                                forms,
                                "",
                                i
                              )
                            }
                          />
                          <FiMinusCircle
                            onClick={() => removeOption(ele.value)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
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
              )}
            </>
          ) : null}
        </>
      )}

      {currentField?.type !== "divider" && (
        <>
          <div className="customize-prop-sec">
            <label>{currentField?.type} Alignment</label>
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

          <hr />
        </>
      )}

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

      <hr />

      <div className="mt-4">
        <label className="mb-3 fw-bold">Set Animations</label>

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

        <div className="customize-prop-sec">
          <label>Animation Delay (Milli Seconds)</label>

          <Select
            isClearable
            placeholder={"Select seconds"}
            options={[
              { label: "100", value: "100" },
              { label: "200", value: "200" },
              { label: "300", value: "300" },
              { label: "400", value: "400" },
              { label: "500", value: "500" },
              { label: "600", value: "600" },
              { label: "700", value: "700" },
              { label: "800", value: "800" },
              { label: "900", value: "900" },
              { label: "1000", value: "1000" },
              { label: "1100", value: "1100" },
              { label: "1200", value: "1200" },
              { label: "1300", value: "1300" },
              { label: "1400", value: "1400" },
              { label: "1500", value: "1500" },
            ]}
            value={currentField?.props?.animation_delay || ""}
            onChange={(e) => {
              onCustomizeElement(e, "animation_delay", "select", forms);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FieldCustomizeSection;
