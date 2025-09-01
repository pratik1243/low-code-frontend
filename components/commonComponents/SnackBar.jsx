"use client";
import React from "react";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbarProps } from "../../redux/slices/snackbarSlice";

const SnackBar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state?.snackbar?.snackbarProps);
  const loader = useSelector((state) => state.loader.open);

  const onClose = () => {
    dispatch(
      setSnackbarProps({
        variant: snackbar?.variant?.toLowerCase(),
        message: snackbar?.message,
        open: false,
      })
    );
  };

  useEffect(() => {
    if (snackbar?.open && !loader) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [snackbar?.open]);

  return (
    <div
      className={`snack-bar-sec ${snackbar?.variant?.toLowerCase()} ${
        snackbar?.open && !loader ? "open" : ""
      }`}
    >
      {snackbar?.message}
      <AiOutlineClose onClick={onClose} />
    </div>
  );
};

export default SnackBar;
