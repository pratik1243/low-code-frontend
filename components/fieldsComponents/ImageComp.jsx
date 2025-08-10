import Image from "next/image";
import React from "react";

const ImageComp = ({ ele, path, index }) => {
  return (
    <div className={`${!path.includes("web-page") ? 'img-border' : ''}`}>
      {ele?.props?.url ? (
        <Image
          src={ele?.props?.url}
          height={path.includes("web-page") ? ele?.props?.height : 200}
          width={path.includes("web-page") ? ele?.props?.width : 200}
          alt={`image-${index}`}          
        />
      ) : !path.includes("web-page") ? (
        <div>Image</div>
      ) : null}
    </div>
  );
};

export default ImageComp;
