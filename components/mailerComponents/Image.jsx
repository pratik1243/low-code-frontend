import React from "react";

const Image = ({ data }) => {
  return data?.props?.imageUrl ? (
    <img
      src={data?.props?.imageUrl}
      height={data?.props?.height}
      width={data?.props?.width}
    />
  ) : (
    "Image"
  );
};

export default Image;
