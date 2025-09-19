import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../../redux/slices/loaderSlice";
import { setSnackbarProps } from "../../redux/slices/snackbarSlice";
import { commonPostApiFunction } from "../../services/commonApiFunc";
import { FormContext } from "../FormCreate";

const ImageProps = ({ currentField, onCustomizeElement }) => {
  const { forms } = useContext(FormContext);
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
        onCustomizeElement(response?.data?.id, "url", "image", forms);
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
    <>
      <Col lg={6} md={6} sm={12} xs={12}>
        <input type="file" accept="image/*" onChange={(e) => uploadImage(e)} />
      </Col>

      <Col lg={12} md={12} sm={12} xs={12}>
        <Row className="mt-4">
          <label className="mb-3 fw-bold">{currentField?.type} Spacing</label>
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
    </>
  );
};

export default ImageProps;
