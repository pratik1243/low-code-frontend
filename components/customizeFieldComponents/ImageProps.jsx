import React, { useContext, useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../../redux/slices/loaderSlice";
import { setSnackbarProps } from "../../redux/slices/snackbarSlice";
import { commonPostApiFunction } from "../../services/commonApiFunc";
import { FiUpload } from "react-icons/fi";
import { FormContext } from "../FormCreate";
import { LuFileImage } from "react-icons/lu";

const ImageProps = ({ currentField, onCustomizeElement }) => {
  const { forms, setOpenImageModel } = useContext(FormContext);
  const dispatch = useDispatch();
  const token = useSelector((user) => user.auth.authDetails.token);

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
        const backgroundImage = `url('http://localhost:8000/image/${response?.data?.id}')`;
        if (["container", "card_box"].includes(currentField?.type)) {
          onCustomizeElement(
            backgroundImage,
            "backgroundImage",
            "image",
            forms,
            "style"
          );
        } else {
          onCustomizeElement(response?.data?.id, "url", "image", forms);
        }

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

  return (
    <Col lg={12} md={12} sm={12} xs={12}>
      <Row className="mt-3">
        <Col lg={5} md={3} sm={12} xs={12}>
          <div className="upload-image-btn mb-2">
            <input
              type="file"
              id="upload-image"
              accept="image/*"
              onChange={(e) => uploadImage(e)}
            />
            <label htmlFor="upload-image">
              <FiUpload size={20} />
              &nbsp; Upload {currentField?.type !== "image"
                ? "Backgroud"
                : ""}{" "}
              Image
            </label>
          </div>
        </Col>

        <Col lg={4} md={3} sm={12} xs={12}>
          <Button
            variant={"primary"}
            className="select-image-btn"
            onClick={() => {
              setOpenImageModel(true);
            }}
          >
            <LuFileImage size={20} />
            &nbsp; Select {currentField?.type !== "image"
              ? "Backgroud"
              : ""}{" "}
            Image
          </Button>
        </Col>
        {currentField?.type == "image" && (
          <Col lg={12} md={12} sm={12} xs={12}>
            <hr className="mt-4" />
          </Col>
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
      </Row>
    </Col>
  );
};

export default ImageProps;
