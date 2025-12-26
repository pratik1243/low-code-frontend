import axios from "axios";
import Image from "next/image";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbarProps } from "../../redux/slices/snackbarSlice";
import { API_BASE_URL } from "../../services/endpoints";
import { nestedStructure, updateforms } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";
import emptyImg from "../../public/empty-box.png";

const AddImages = () => {
  const dispatch = useDispatch();
  const token = useSelector((user) => user.auth.authDetails.token);
  const { setOpenImageModel, forms, setForms, currentElement, breakPoint } =
    useContext(FormContext);
  const [uploadedImages, setUploadImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const contType = ["container", "card_box"].includes(currentElement?.type);

  const getImages = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`${API_BASE_URL}/get-images`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoader(false);
      if (response.status == 200) {
        setUploadImages(response?.data?.images);
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

  const selectCurrentImage = (image) => {
    setOpenImageModel(false);
    const backgroundImage = `url('${API_BASE_URL}/image/${image?._id}')`;
    const imageData = {
      url: contType ? backgroundImage : image?._id,
      filename: image?.name,
    };
    onCustomizeElement(imageData, "imageData", "image", forms);
  };

  useEffect(() => {
    getImages();
    return () => {
      setUploadImages([]);
    };
  }, []);

  return (
    <div className="image-customize-sec">
      <div className="mb-4 mt-4 px-4">
        <Button
          variant={"primary"}
          className="go-back-btn"
          onClick={() => {
            setOpenImageModel(false);
            setUploadImages([]);
          }}
        >
          <IoMdArrowBack size={18} /> &nbsp;&nbsp;Back
        </Button>
      </div>
      {loader ? (
        <div className="text-center my-5 pt-3">
          <Spinner animation="border" variant="primary" />
          <h5 className="mt-2">Please wait loading images...</h5>
        </div>
      ) : uploadedImages.length > 0 ? (
        <div className="uploaded-images-sec">
          {uploadedImages?.map((el, i) => {
            return (
              <div
                key={i}
                className="d-flex align-items-center image-select-sec"
                onClick={() => {
                  selectCurrentImage(el);
                }}
              >
                <Image
                  src={`${API_BASE_URL}/image/${el._id}`}
                  height={50}
                  width={50}
                  alt={`uploaded-image-${i}`}
                />

                <div className="image-name">{el?.name}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-5 empty-icon-box text-center">
          <Image src={emptyImg} height={160} width={160} alt="menu-empty" />
          <div className="no-menus-txt mt-3 fs-5">No Images Found!</div>
        </div>
      )}
    </div>
  );
};

export default AddImages;
