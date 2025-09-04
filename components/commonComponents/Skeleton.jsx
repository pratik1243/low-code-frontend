import React from "react";

const Skeleton = ({ width, height }) => {
  return (
    <div
      className="skeleton"
      style={{ width: width || "100%", height: height || "20px" }}
    ></div>
  );
};

export default Skeleton;
