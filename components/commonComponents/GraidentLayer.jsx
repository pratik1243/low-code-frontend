import React from "react";

function GraidentLayer({ data }) {
  return (
    <div
      className="gradient-layer"
      style={{
        ...(data?.props?.gradientColor?.startsWith("linear") ||
        data?.props?.gradientColor?.startsWith("radial") ||
        data?.props?.gradientColor?.startsWith("conic") ||
        data?.props?.gradientColor?.startsWith("repeating")
          ? {
              backgroundImage: data?.props?.gradientColor,
            }
          : {
              background: data?.props?.gradientColor,
            }),
      }}
    ></div>
  );
}

export default GraidentLayer;
