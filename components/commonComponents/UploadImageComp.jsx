import React, { useContext } from "react";
import { commonPostApiFunction } from "../../services/commonApiFunc";
import { API_BASE_URL } from "../../services/endpoints";
import { toast } from "react-toastify";
import { setLoader } from "../../redux/slices/loaderSlice";
import { snackProps } from "../../utils/customizeOptions";
import { FormContext } from "../FormCreate";
import { FiUpload } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { LuFileImage } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const UploadImageComp = ({
  label,
  preview = null,
  contType = null,
  uploadedState,
  onFileUpload,
  removeUploadedFile,
}) => {
  const dispatch = useDispatch();
  const { setOpenImageModel } = useContext(FormContext);
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
        const backgroundImage = `url('${API_BASE_URL}/image/${response?.data?.id}')`;
        const imageData = {
          url: contType ? backgroundImage : response?.data?.id,
          filename: file?.name,
        };
        onFileUpload(e, imageData);
        toast.success(response?.data?.message, snackProps);
      } else {
        toast.error(response?.data?.message, snackProps);
      }
    } catch (error) {
      toast.error("Something Went Wrong!", snackProps);
    }
  };
  return (
    <div>
      <label className="mb-2">{label}</label>
      {uploadedState ? (
        <div className="uploaded-image">
          {preview ? (
            <div>
              <Image
                src={`${API_BASE_URL}/image/${uploadedState}`}
                height={30}
                width={70}
                alt={`image-nav`}
                quality={90}
              />              
            </div>
          ) : (
            <div>
              <LuFileImage size={22} />
              {uploadedState}
            </div>
          )}

          <IoCloseSharp role="button" size={25} onClick={removeUploadedFile} />
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
    </div>
  );
};

export default UploadImageComp;
