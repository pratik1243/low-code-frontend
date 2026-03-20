import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { FormContext } from "../FormCreate";
import Select from "react-select";
import { alignmentOptions } from "../../utils/customizeOptions";
import UploadImageComp from "../commonComponents/UploadImageComp";

const ImageProps = ({ currentField, onCustomizeElement }) => {
  const { forms } = useContext(FormContext);
  const contType = ["container", "card_box"].includes(currentField?.type);

  const removeFileBg = () => {
    const imageData = {
      url: "",
      filename: "",
    };
    onCustomizeElement(imageData, "imageData", "image", forms);
  };

  return (
    <>
      <Col
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className={`${
          currentField?.type == "container" ? "mt-1" : "mt-4"
        } mb-4`}
      >
        <UploadImageComp
          contType={contType}
          uploadedState={currentField?.props?.imageData?.filename}
          label={`Upload ${currentField?.type !== "image" && "Background"} Image`}
          removeUploadedFile={removeFileBg}
          onFileUpload={(e, imageData) => {
            onCustomizeElement(imageData, "imageData", "image", forms);
          }}
        />
      </Col>
      {currentField?.type == "image" && (
        <>
          {!currentField?.props?.fullWidth && (
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="customize-prop-sec mb-2">
                <label>
                  {currentField?.type.split("_").join(" ")} Alignment
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

          <Col lg={6} md={6} sm={12} xs={12}>
            <div className="customize-prop-sec">
              <label className="mb-2">Border Radius</label>
              <input
                type="number"
                className="customize-input"
                placeholder="Enter border radius"
                max={100}
                min={0}
                value={currentField?.props?.style?.borderRadius || "0"}
                onChange={(e) => {
                  onCustomizeElement(
                    e,
                    "borderRadius",
                    "input",
                    forms,
                    "style"
                  );
                }}
              />
            </div>
          </Col>

          <Col lg={6} md={6} sm={12} xs={12}>
            <div
              className={`d-flex align-items-center image-full-width-check ${
                currentField?.props?.fullWidth ? "mt-5" : "mt-2"
              }`}
            >
              <input
                type="checkbox"
                id="checkbox-fullwidth"
                checked={currentField?.props?.fullWidth || ""}
                onChange={(e) => {
                  onCustomizeElement(e, "fullWidth", "checkbox", forms);
                }}
              />
              <label htmlFor="checkbox-fullwidth" className="mb-0">
                Full Width
              </label>
            </div>
          </Col>

          <Col lg={12} md={12} sm={12} xs={12}>
            <hr className="mt-4" />
          </Col>
        </>
      )}
      {!["card_box", "container"].includes(currentField?.type) && (
        <Col lg={12} md={12} sm={12} xs={12}>
          <Row className="mt-4">
            <label className="mb-3 fw-bold">Image Size</label>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="customize-prop-sec">
                <label>Height</label>
                <input
                  type="number"
                  min={0}
                  max={800}
                  value={currentField?.props?.height || 100}
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
                  max={800}
                  value={currentField?.props?.width || 100}
                  className="customize-input"
                  onChange={(e) => {
                    onCustomizeElement(e, "width", "input", forms);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      )}
    </>
  );
};

export default ImageProps;
