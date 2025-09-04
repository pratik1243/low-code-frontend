"use client";
import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const Loader = () => {
  const loader = useSelector((state) => state.loader.open);
  return (
    <>
      {loader ? (
        <div className="loader-sec">
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>       
      ) : null}
    </>
  );
};

export default Loader;
