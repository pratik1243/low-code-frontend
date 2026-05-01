import React, { useMemo, useState } from "react";
import {
  Button,
  Col,
  Offcanvas,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import UploadImageComp from "../commonComponents/UploadImageComp";
import AddImages from "../commonComponents/AddImages";
import { RiErrorWarningLine } from "react-icons/ri";

const CustomizeField = ({
  currentField,
  emailComponents,
  setEmailComponents,
  templateBackground,
  setTemplateBackground,
}) => {
  const [showImageBox, setShowImageBox] = useState(false);

  const onCustomizeField = (e, isProp) => {
    const updateFields = emailComponents?.map((ele, i) => {
      if (ele?.id == currentField?.id) {
        return {
          ...ele,
          props: {
            ...ele.props,
            ...(isProp
              ? { [isProp]: e }
              : { [e?.target?.name]: e?.target?.value }),
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

  const renderTooltip = (props) => (
    <Tooltip id="email-text-tooltip" {...props}>
      To add dynamic input field params you need to wrap them inside double
      curly brackets in text (for e.g:- {"{{input_field_name}}"})
    </Tooltip>
  );

  const renderCurrentField = (form) => {
    const fields = filterCurrent(form);
    return fields;
  };

  const currentFields = useMemo(
    () => renderCurrentField(emailComponents),
    [emailComponents, currentField]
  );

  const removeEmailLogo = () => {
    onCustomizeField("", "imageUrl");
  };

  return (
    <div className="customize-email-template">
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <div className="customize-prop-sec">
            <label className="mb-2">Template Background</label>
            <input
              type="color"
              className="customize-input w-100 p-0"
              value={templateBackground || ""}
              onChange={(e) => {
                setTemplateBackground(e.target.value);
              }}
            />
          </div>
        </Col>

        {currentField && (
          <>
            {!["image", "container"].includes(currentField?.type) && (
              <>
                <Col lg={12} md={12} sm={12} xs={12}>
                  <div className="customize-prop-sec">
                    <label className="mb-2 d-flex align-items-center">
                      <span>{currentField?.type}</span>&nbsp;Text&nbsp;&nbsp;
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                      >
                        <RiErrorWarningLine size={19} />
                      </OverlayTrigger>
                    </label>
                    <textarea
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
            {!["container", "heading", "paragraph", "footer"].includes(
              currentField?.type
            ) && (
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
                  <Button
                    variant="primary"
                    className="mb-4 mt-3 w-100"
                    onClick={() => {
                      setShowImageBox(true);
                    }}
                  >
                    {currentFields?.props?.imageUrl
                      ? "Replace Image"
                      : "Select Image"}
                  </Button>
                </Col>{" "}
                <Col lg={12} md={12} sm={12} xs={12}>
                  <div className="customize-checkbox">
                    <div className="d-flex align-items-center mt-2 mb-4">
                      <input
                        type="checkbox"
                        name="fullWidth"
                        id="checkbox-fullwidth"
                        checked={currentFields?.props?.fullWidth || ""}
                        onChange={(e) => {
                          onCustomizeField(e.target.checked, "fullWidth");
                        }}
                      />
                      <label htmlFor="checkbox-fullwidth">Full Width</label>
                    </div>
                  </div>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <div className="customize-prop-sec">
                    <label className="mb-2">Height (px)</label>
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
                    <label className="mb-2">Width (px)</label>
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
                          onCustomizeField("", "backgroundColor");
                        }}
                      >
                        Clear
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </>
            )}
          </>
        )}
      </Row>

      <Offcanvas
        show={showImageBox}
        onHide={() => {
          setShowImageBox(false);
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Select Image</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <div className="p-3 m-1 pb-4">
            <UploadImageComp
              preview={true}
              label="Upload Logo"
              isEmailTemplate
              uploadedState={currentFields?.props?.imageUrl}
              removeUploadedFile={removeEmailLogo}
              onFileUpload={(e, imageData) => {
                onCustomizeField(imageData?.url, "imageUrl");
              }}
            />
          </div>
          <div className="email-temp-images">
            <AddImages
              isEmailTemplate={(url) => {
                onCustomizeField(url, "imageUrl");
              }}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CustomizeField;
