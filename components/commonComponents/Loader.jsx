import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ loader }) => {
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
