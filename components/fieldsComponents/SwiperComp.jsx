"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { addPixel, alignment, textAlign } from "../../utils/utilFunctions";
import RenderField from "./RenderField";
import { useEffect } from "react";
import GraidentLayer from "../commonComponents/GraidentLayer";

const SwiperComp = ({ ele, path }) => {
  const isWebPage = path.includes("web-page");
  useEffect(() => {
    const interval = setInterval(() => {
      document
        .querySelectorAll(".swiper-pagination-bullet")
        .forEach((bullet, index) => {
          bullet.style.background = ele?.props?.style?.color;
          if (bullet.classList.contains("swiper-pagination-bullet-active")) {
            bullet.style.opacity = "1";
          } else {
            bullet.style.opacity = "0.5";
          }
        });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!isWebPage ? (
        <div>Slider</div>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={ele?.props?.spaceBetweenSlides}
          slidesPerView={ele?.props?.slidesPerView?.value || 1}
          navigation={ele?.props?.navigation}
          loop={ele?.props?.loop}
          className={`${
            !ele?.props?.paginationInside ? "paginationInside" : ""
          }`}
          pagination={{ clickable: true }}
          {...(ele?.props?.delay?.value && {
            autoplay: { delay: ele?.props?.delay?.value },
          })}
        >
          {ele?.props?.slides?.map((el, i) => {
            return (
              <SwiperSlide key={i}>
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
                      }}
                    >
                      {" "}
                      <RenderField ele={eles} index={id} />{" "}
                      {eles?.props?.gradientColor && (
                        <GraidentLayer data={eles} />
                      )}
                    </div>
                  );
                })}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default SwiperComp;
