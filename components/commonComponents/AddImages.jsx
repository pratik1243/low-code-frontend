import axios from "axios";
import Image from "next/image";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbarProps } from "../../redux/slices/snackbarSlice";
import { nestedStructure, updateforms } from "../../utils/utilFunctions";
import { FormContext } from "../FormCreate";

const AddImages = () => {
  const dispatch = useDispatch();
  const token = useSelector((user) => user.auth.authDetails.token);
  const { setOpenImageModel, forms, setForms, currentElement, breakPoint } = useContext(FormContext);
  const [uploadedImages, setUploadImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const contType = ["container", "card_box"].includes(currentElement?.type);

  const getImages = async () => {
    try {
      setLoader(true);
      const response = await axios.get("https://low-code-backend-vyps.vercel.app/get-images", {
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
    const backgroundImage = `url('https://low-code-backend-vyps.vercel.app/image/${image?._id}')`;
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
    <div>
      {loader ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <h5 className="mt-2">Please wait loading icons...</h5>
        </div>
      ) : (
        <div className="uploaded-images-sec">
          <div className="mb-4">
            <Button
              variant={"primary"}
              className="go-back-btn"
              onClick={() => {
                setOpenImageModel(false);
                setUploadImages([]);
              }}
            >
              <IoMdArrowBack size={18} /> &nbsp;&nbsp;Go Back
            </Button>
          </div>
          {uploadedImages.length > 0 &&
            uploadedImages?.map((el, i) => {
              return (
                <div
                  key={i}
                  className="d-flex align-items-center image-select-sec"
                  onClick={() => {
                    selectCurrentImage(el);
                  }}
                >
                  <Image
                    src={`https://low-code-backend-vyps.vercel.app/${el._id}`}
                    height={50}
                    width={50}
                    alt={`uploaded-image-${i}`}
                  />

                  <div className="image-name">{el?.name}</div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default AddImages;
