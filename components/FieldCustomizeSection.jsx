"use client";
import Select from "react-select";
import React, { useContext, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { FiMinusCircle } from "react-icons/fi";
import {
  alignmentOptions,
  animationDelayOptions,
  animationOptions,
  autoplayDelayOptions,
  buttonColorOptions,
  containerOptions,
  headingVariantOptions,
  sliderPerViewOptions,
  updateforms,
  validations,
} from "../utils/utilFunctions";
import { FormContext } from "./FormCreate";
import { useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LuExternalLink } from "react-icons/lu";

const FieldCustomizeSection = () => {
  const {
    forms,
    setForms,
    currentElement,
    containerId,
    pagesList,
    pagesItemList,
  } = useContext(FormContext);
  const router = useRouter();
  const [optionValue, setOptionValue] = useState("");
  const [pageItem, setPageItem] = useState();

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

  const addSelectOptions = (type) => {
    const updateForms = forms.map((el, i) => {
      const nestedForm = el?.content?.map((ele, id) => {
        if (ele.id === currentElement?.id) {
          return {
            ...ele,
            props: {
              ...ele?.props,
              [type]: [
                ...ele?.props?.[type],
                {
                  ...(type == "stepContent"
                    ? {
                        content: pageItem?.value,
                        url: pageItem?.url,
                        label: pageItem?.label,
                      }
                    : { label: optionValue }),
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
            [type]: [
              ...el?.props?.[type],
              {
                ...(type == "stepContent"
                  ? {
                      content: pageItem?.value,
                      url: pageItem?.url,
                      label: pageItem?.label,
                    }
                  : { label: optionValue }),
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
    setPageItem();
  };

  const renderCurrentField = (form, currentelement, containerid) => {
    const fields = form?.filter((el) => el?.id === currentelement?.id)[0];
    const nestedFields = form?.[containerid]?.content?.filter(
      (el) => el?.id === currentelement?.id
    )[0];
    if (form?.[containerid]?.content?.length > 0) {
      return currentelement?.type == "container"
        ? form?.[containerid]
        : nestedFields;
    } else {
      return fields;
    }
  };

  const uploadImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const response = await axios.post(
        "http://localhost:8000/upload-image",
        formData
      );
      if (response.status == 200) {
        onCustomizeElement(response?.data?.imageUrl, "url", "image", forms);
      }
    } catch (error) {
      alert(error);
    }
  };

  const removeOption = (value, type) => {
    const updateForms = forms?.map((el, i) => {
      if (el.id === currentElement?.id) {
        return {
          ...el,
          props: {
            ...el.props,
            [type]: el?.props?.[type]?.filter((el) => el?.value !== value),
          },
        };
      }
      return el;
    });
    setForms(updateForms);
  };

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

  const animationList = useMemo(() => {
    return animationOptions;
  }, []);

  const fieldOptions = useMemo(() => getFields(forms), [forms]);
  const currentField = renderCurrentField(forms, currentElement, containerId);
  const addContent =
    currentField?.type === "stepper" ? "stepContent" : "options";

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        {!["divider", "image"].includes(currentField?.type) && (
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

          {["input", "select", "country"].includes(currentField?.type) && (
            <>
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

              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="d-flex mt-3">
                  <input
                    type="checkbox"
                    id="checkbox-float"
                    checked={currentField?.props?.floatLabel || ""}
                    onChange={(e) => {
                      onCustomizeElement(e, "floatLabel", "checkbox", forms);
                    }}
                  />
                  <label htmlFor="checkbox-float">Float Label</label>
                </div>
              </Col>

              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="d-flex mt-3">
                  <input
                    type="checkbox"
                    id="checkbox-standard"
                    checked={currentField?.props?.standard || ""}
                    onChange={(e) => {
                      onCustomizeElement(e, "standard", "checkbox", forms);
                    }}
                  />
                  <label htmlFor="checkbox-standard">Standard</label>
                </div>
              </Col>
            </>
          )}

          {currentField?.type === "select" && (
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="d-flex mt-3">
                <input
                  type="checkbox"
                  id="checkbox-multiple"
                  checked={currentField?.props?.multiple || ""}
                  onChange={(e) => {
                    onCustomizeElement(e, "multiple", "checkbox", forms);
                  }}
                />
                <label htmlFor="checkbox-multiple">Multiple</label>
              </div>
            </Col>
          )}

          {currentField?.type === "image" && (
            <Col lg={12} md={12} sm={12} xs={12}>
              <input
                type="file"
                name="image-upload"
                className="mt-4"
                onChange={(e) => uploadImage(e)}
              />
            </Col>
          )}
          {currentField?.type === "slider" && (
            <>
              {currentField?.slides.length >
                currentField?.props?.slidesPerView?.value && (
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
              )}
              <Col lg={6} md={6} sm={12} xs={12}>
                <div
                  className={`d-flex ${
                    currentField?.slides.length >
                    currentField?.props?.slidesPerView?.value
                      ? "mt-3"
                      : ""
                  }`}
                >
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

          {currentField?.type === "image" && (
            <>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="customize-prop-sec">
                  <label>Height</label>
                  <input
                    type="number"
                    min={0}
                    value={currentField?.props?.height || 0}
                    className="customize-input"
                    onChange={(e) => {
                      onCustomizeElement(e, "height", "input", forms);
                    }}
                  />
                </div>
              </Col>

              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="customize-prop-sec">
                  <label>Width</label>
                  <input
                    type="number"
                    min={0}
                    value={currentField?.props?.width || 0}
                    className="customize-input"
                    onChange={(e) => {
                      onCustomizeElement(e, "width", "input", forms);
                    }}
                  />
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
              options={sliderPerViewOptions}
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
              options={autoplayDelayOptions}
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
              options={buttonColorOptions}
              value={currentField?.props?.color || ""}
              onChange={(e) => {
                onCustomizeElement(e, "color", "select", forms);
              }}
            />
          </div>
          <div className="customize-prop-sec">
            <label>Submit Validation fields</label>
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

          {["paragraph", "heading"].includes(currentField?.type) ? (
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
          ) : ![
              "divider",
              "container",
              "slider",
              "image",
              "country",
              "stepper",
            ].includes(currentField?.type) ? (
            <>
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

              {currentField?.type !== "checkbox" && (
                <>
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
                </>
              )}

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
            </>
          ) : null}
        </>
      )}

      {["stepper", "select"].includes(currentField?.type) && (
        <Button onClick={handleShow} className="mb-4 mt-2">
          {currentField?.type == "stepper" ? "Add Steps" : "Add Option"}
        </Button>
      )}

      {currentField?.type !== "checkbox" ? (
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
      ) : null}

      {currentField?.type == "container" && (
        <div className="customize-prop-sec">
          <label>Container Template</label>
          <Select
            isClearable
            placeholder={"Select template"}
            options={containerOptions}
            value={currentField?.props?.containerTemplate || ""}
            onChange={(e) => {
              onCustomizeElement(e, "containerTemplate", "select", forms);
            }}
          />
        </div>
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
            options={animationDelayOptions}
            value={currentField?.props?.animation_delay || ""}
            onChange={(e) => {
              onCustomizeElement(e, "animation_delay", "select", forms);
            }}
          />
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal-dialog-customize"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {currentField?.type == "stepper" ? "Add Steps" : "Add Option"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="customize-prop-sec">
            <div className="d-flex mt-2 mb-4">
              <div className="w-100">
                {currentField?.type == "stepper" && (
                  <label className="mb-1">Stepper Label</label>
                )}
                <input
                  type="text"
                  placeholder={`Enter ${
                    currentField?.type == "stepper" ? "step" : "option"
                  } value`}
                  className="customize-input"
                  value={optionValue}
                  onChange={(e) => setOptionValue(e.target.value)}
                />
              </div>
              {currentField?.type == "stepper" && (
                <div className="w-100 ml-3">
                  <label className="mb-1">Workflow Item</label>
                  <Select
                    isClearable
                    placeholder={"Select workflow"}
                    options={pagesItemList || ""}
                    value={pageItem}
                    onChange={(e) => setPageItem(e)}
                  />
                </div>
              )}
              <button
                disabled={!optionValue}
                className={`${
                  currentField?.type == "stepper" ? "stepper-mt" : ""
                } add-option`}
                onClick={() => addSelectOptions(addContent)}
              >
                <IoAddSharp />
              </button>
            </div>
            <hr />
            <div className="customize-option-sec mt-4">
              {currentField?.props?.[addContent]?.map((ele, i) => {
                return (
                  <Row key={i} className="mb-2">
                    <Col
                      lg={currentField?.type !== "stepper" ? 11 : 6}
                      md={currentField?.type !== "stepper" ? 11 : 6}
                      sm={12}
                      xs={12}
                    >
                      <div className="option-input">
                        <input
                          type="text"
                          value={ele?.value}
                          onChange={(e) =>
                            onCustomizeElement(
                              e,
                              addContent,
                              "input",
                              forms,
                              "",
                              i
                            )
                          }
                        />
                      </div>
                    </Col>
                    {currentField?.type == "stepper" && (
                      <Col lg={5} md={5} sm={12} xs={12}>
                        <div className="d-flex align-items-center mt-1">
                          <LuExternalLink className="redirect-page" />{" "}
                          <a
                            href={ele?.url}
                            target="_blank"
                            className="page-item-link"
                          >
                            {ele?.label}
                          </a>
                        </div>
                      </Col>
                    )}
                    <Col lg={1} md={1} sm={12} xs={12}>
                      <FiMinusCircle
                        onClick={() => removeOption(ele?.value, addContent)}
                      />
                    </Col>
                  </Row>
                );
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FieldCustomizeSection;
