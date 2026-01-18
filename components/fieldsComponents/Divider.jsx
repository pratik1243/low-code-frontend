import React from "react";

const Divider = ({ ele, path }) => {
  return (
    <div>
      {path.includes("web-page") ? (
        <hr
          style={{
            ...(ele?.props?.style?.background && {
              backgroundColor: ele?.props?.style?.background,
            }),
          }}
        />
      ) : (
        "Divider"
      )}
    </div>
  );
};

export default Divider;
