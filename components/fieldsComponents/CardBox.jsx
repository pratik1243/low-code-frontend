import React from "react";
import { addPixel, alignment, textAlign } from "../../utils/utilFunctions";
import RenderField from "./RenderField";

const CardBox = ({ ele, path, index }) => {
  const isWebPage = path.includes("web-page");

  return (
    <>
      {!isWebPage ? (
        <div>Card Box</div>
      ) : (
        <div
          className="card-main-section"
          style={{
            gridTemplateColumns: `repeat(${parseInt(ele?.props?.style?.gridTemplateColumns)}, 1fr)`,
          }}
        >
          {ele?.props?.cards?.map((el, i) => {
            return (
              <div key={i}>
                {el?.content?.map((eles, id) => {
                  return (
                    <div
                      key={id}
                      className={`position-relative element-column column_${
                        eles?.id
                      } ${alignment[eles?.props?.align?.value] || ""} ${
                        eles?.props?.hidden
                          ? "hide"
                          : eles?.props?.hidden
                          ? "hidden"
                          : ""
                      } ${textAlign[eles?.props?.align?.value] || ""} d-flex`}
                      style={{
                        ...(eles?.column_width && {
                          width: `${eles?.column_width}%`,
                        }),
                        ...(eles?.props?.style &&
                          addPixel(eles?.props?.style, eles)),
                        ...(eles?.props?.imageData && {
                          backgroundImage: ele?.props?.imageData?.url,
                        }),
                      }}
                    >
                      {" "}
                      <RenderField ele={eles} index={id} />{" "}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CardBox;
