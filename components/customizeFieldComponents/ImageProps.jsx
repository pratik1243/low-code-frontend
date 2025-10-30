import React, { useContext, useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../../redux/slices/loaderSlice";
import { setSnackbarProps } from "../../redux/slices/snackbarSlice";
import { commonPostApiFunction } from "../../services/commonApiFunc";
import { FiUpload } from "react-icons/fi";
import { FormContext } from "../FormCreate";
import { LuFileImage } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";
import { alignmentOptions } from "../../utils/utilFunctions";
import { API_BASE_URL } from "../../services/endpoints";

const ImageProps = ({ currentField, onCustomizeElement }) => {
  const dispatch = useDispatch();
  const { forms, setOpenImageModel } = useContext(FormContext);
  const token = useSelector((user) => user.auth.authDetails.token);
  const contType = ["container", "card_box"].includes(currentField?.type);

  const uploadImage = async (e) => {
    try {
      e.preventDefault();
      dispatch(setLoader(true));
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const requestData = {
        key: "mfgtrwo",
        payload: formData,
      };
      const response = await commonPostApiFunction(requestData, token);
      dispatch(setLoader(false));
      if (response.status == 200) {
        const backgroundImage = `url('${API_BASE_URL}/image/${response?.data?.id}')`;
        const imageData = {
          url: contType ? backgroundImage : response?.data?.id,
          filename: file?.name,
        };
        onCustomizeElement(imageData, "imageData", "image", forms);
        dispatch(
          setSnackbarProps({
            variant: "Success",
            message: response?.data?.message,
            open: true,
          })
        );
      } else {
        dispatch(
          setSnackbarProps({
            variant: "Danger",
            message: response?.data?.message,
            open: false,
          })
        );
      }
    } catch (error) {
      dispatch(
        setSnackbarProps({
          variant: "Danger",
          message: "Something Went Wrong90!",
          open: true,
        })
      );
    }
  };

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
        <label className="mb-2">
          Upload {currentField?.type !== "image" && "Background"} Image
        </label>
        {currentField?.props?.imageData?.filename ? (
          <div className="uploaded-image">
            <div>
              <LuFileImage size={22} />
              {currentField?.props?.imageData?.filename}
            </div>
            <IoCloseSharp
              role="button"
              size={25}
              onClick={() => {
                removeFileBg();
              }}
            />
          </div>
        ) : (
          <div className="upload-image-btn mb-2">
            <span
              role="button"
              className="select-image-btn"
              onClick={(e) => {
                setOpenImageModel(true);
                e.stopPropagation();
              }}
            >
              Image Gallery
            </span>

            <div className="text-center">
              <input
                type="file"
                id="upload-image"
                accept="image/*"
                onChange={(e) => uploadImage(e)}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) => uploadImage(e)}
              />
              <div className="mb-2">
                <FiUpload size={21} />
              </div>
              Click or <span className="click-text">Drag & Drop Image</span> to
              upload (jpg, png and jpeg)
            </div>
            <label htmlFor="upload-image"></label>
          </div>
        )}
      </Col>
      {currentField?.type == "image" && (
        <>
          <Col lg={6} md={6} sm={12} xs={12}>
            <div className="customize-prop-sec mb-2">
              <label>{currentField?.type.split("_").join(" ")} Alignment</label>
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

          <Col lg={6} md={6} sm={12} xs={12}>
            <div className="d-flex align-items-center image-full-width-check">
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
