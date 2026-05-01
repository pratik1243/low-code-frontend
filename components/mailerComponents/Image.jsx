import React from "react";
import { API_BASE_URL } from "../../services/endpoints";

const Image = ({ data }) => {
  return data?.props?.imageUrl ? (
    <a href={data?.props?.url || "#"}>
      <img
        src={`${API_BASE_URL}/image/${data?.props?.imageUrl}`}
        height={data?.props?.height}
        width={data?.props?.fullWidth ? "100%" : data?.props?.width}
      />
    </a>
  ) : (
    "Image"
  );
};

export default Image;
