import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Card } from "react-bootstrap";

const SwiperComp = ({ ele, path }) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={ele?.props?.spaceBetweenSlides}
      slidesPerView={ele?.props?.slidesPerView?.value || 1}
      navigation={path.includes("web-page") ? ele?.props?.navigation : false}
      loop={ele?.props?.loop}
      pagination={{ clickable: true }}
      {...(ele?.props?.delay?.value && path.includes("web-page") && { autoplay: {delay: ele?.props?.delay?.value } })}     
    >
      {ele?.slides?.map((el, i) => {
        return (
          <SwiperSlide key={i} className="text-center">
            <Card className="p-4">{el}</Card>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperComp;
