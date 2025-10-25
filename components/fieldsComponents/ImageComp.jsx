import Image from "next/image";
import React from "react";

const ImageComp = ({ ele, path, index }) => {
  return (
    <div
      className={`${!path.includes("web-page") ? "img-border" : ""}`}
      style={{
        ...(path.includes("web-page") &&
          ele?.props?.fullWidth && {
            height: `${ele?.props?.height}px`,
            width: "100%",
          }),
      }}
    >
      {ele?.props?.imageData?.url ? (
        <>
          {ele?.props?.fullWidth && path.includes("web-page") ? (
            <Image
              src={`http://localhost:8000/image/${ele?.props?.imageData?.url}`}
              alt={`image-${index}`}
              fill
            />
          ) : (
            <Image
              src={`http://localhost:8000/image/${ele?.props?.imageData?.url}`}
              height={path.includes("web-page") ? ele?.props?.height : 100}
              width={path.includes("web-page") ? ele?.props?.width : 100}
              alt={`image-${index}`}
              quality={90}
            />
          )}
        </>
      ) : !path.includes("web-page") ? (
        <div>Image</div>
      ) : null}
    </div>
  );
};

export default ImageComp;
