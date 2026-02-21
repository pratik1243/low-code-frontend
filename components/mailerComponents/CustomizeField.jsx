import React, { useMemo } from "react";
import { Button, Col, Row } from "react-bootstrap";

const CustomizeField = ({
  containerId,
  currentField,
  emailComponents,
  setEmailComponents,
}) => {
  const onCustomizeField = (e, isProp) => {
    const { value, name } = e.target;
    const updateFields = emailComponents?.map((ele, i) => {
      if (ele?.id == currentField?.id) {
        return {
          ...ele,
          props: {
            ...ele.props,
            ...(isProp ? { [isProp]: e } : { [name]: value }),
          },
        };
      }
      return ele;
    });
    setEmailComponents(updateFields);
  };

  const filterCurrent = (data) => {
    return data?.filter((el) => el?.id === currentField?.id)[0];
  };

  const renderCurrentField = (form) => {
    const fields = filterCurrent(form);
    const nestedFields = filterCurrent(form?.[containerId]?.content);
    if (form?.[containerId]?.content?.length > 0) {
      return currentField?.type == "container"
        ? form?.[containerId]
        : nestedFields;
    } else {
      return fields;
    }
  };

  const currentFields = useMemo(
    () => renderCurrentField(emailComponents),
    [emailComponents, currentField]
  );

  return (
    <div className="customize-email-template">
      <Row>
        {!["image", "container"].includes(currentField?.type) && (
          <>
            <Col lg={12} md={12} sm={12} xs={12}>
              <div className="customize-prop-sec">
                <label className="mb-2">Text</label>
                <input
                  type="text"
                  className="customize-input w-100"
                  name="text"
                  placeholder="Enter text"
                  value={currentFields?.props?.text || ""}
                  onChange={(e) => {
                    onCustomizeField(e);
                  }}
                />
              </div>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <div className="customize-prop-sec">
                <label className="mb-2">Font Size</label>
                <input
                  type="text"
                  className="customize-input w-100"
                  name="fontSize"
                  placeholder="Enter font size"
                  value={currentFields?.props?.fontSize || ""}
                  onChange={(e) => {
                    onCustomizeField(e);
                  }}
                />
              </div>
            </Col>
            <Col lg={12} md={12} sm={12} xs={12}>
              <div className="customize-prop-sec">
                <label className="mb-2">Font Weight</label>
                <input
                  type="text"
                  className="customize-input w-100"
                  name="fontWeight"
                  placeholder="Enter font weight"
                  value={currentFields?.props?.fontWeight || ""}
                  onChange={(e) => {
                    onCustomizeField(e);
                  }}
                />
              </div>
            </Col>
          </>
        )}
        {!["container", "heading", "paragraph"].includes(currentField?.type) && (
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="customize-prop-sec">
              <label className="mb-2">Link Url</label>
              <input
                type="text"
                className="customize-input w-100"
                name="linkUrl"
                placeholder="Enter link"
                value={currentFields?.props?.linkUrl || ""}
                onChange={(e) => {
                  onCustomizeField(e);
                }}
              />
            </div>
          </Col>
        )}

        {currentField?.type == "image" ? (
          <>
            <Col lg={12} md={12} sm={12} xs={12}>
              <div className="customize-prop-sec">
                <label className="mb-2">Image Url</label>
                <input
                  type="text"
                  className="customize-input w-100"
                  name="imageUrl"
                  placeholder="Enter image url"
                  value={currentFields?.props?.imageUrl || ""}
                  onChange={(e) => {
                    onCustomizeField(e);
                  }}
                />
              </div>
            </Col>{" "}
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="customize-prop-sec">
                <label className="mb-2">Height</label>
                <input
                  type="number"
                  className="customize-input w-100"
                  name="height"
                  placeholder="Enter height"
                  value={currentFields?.props?.height || ""}
                  onChange={(e) => {
                    onCustomizeField(e);
                  }}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="customize-prop-sec">
                <label className="mb-2">Width</label>
                <input
                  type="number"
                  className="customize-input w-100"
                  name="width"
                  placeholder="Enter width"
                  value={currentFields?.props?.width || ""}
                  onChange={(e) => {
                    onCustomizeField(e);
                  }}
                />
              </div>
            </Col>
          </>
        ) : (
          <>
            <Col lg={12} md={12} sm={12} xs={12}>
              <Row>
                <Col lg={9} md={9} sm={12} xs={12}>
                  <div className="customize-prop-sec">
                    <label className="mb-2">Text Color</label>
                    <input
                      type="color"
                      className="w-100"
                      name="color"
                      value={currentFields?.props?.color || ""}
                      onChange={(e) => {
                        onCustomizeField(e);
                      }}
                    />
                  </div>
                </Col>
                <Col lg={3} md={3} sm={12} xs={12}>
                  <Button
                    variant={"primary"}
                    size="sm"
                    className="clear-background-btn"
                    onClick={() => {
                      onCustomizeElement("", "color");
                    }}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Col>

            <Col lg={12} md={12} sm={12} xs={12}>
              <Row>
                <Col lg={9} md={9} sm={12} xs={12}>
                  <div className="customize-prop-sec">
                    <label className="mb-2">Background Color</label>
                    <input
                      type="color"
                      className="w-100"
                      name="backgroundColor"
                      value={currentFields?.props?.backgroundColor || ""}
                      onChange={(e) => {
                        onCustomizeField(e);
                      }}
                    />
                  </div>
                </Col>
                <Col lg={3} md={3} sm={12} xs={12}>
                  <Button
                    variant={"primary"}
                    size="sm"
                    className="clear-background-btn"
                    onClick={() => {
                      onCustomizeElement("", "backgroundColor");
                    }}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default CustomizeField;
