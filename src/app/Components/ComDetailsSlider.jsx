import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function ComDetailsSlider({ pics = [], cdn_url = "" }) {
  if (!pics || pics.length === 0) return null;

  const renderImage = (pic, idx) => (
    <img
      src={`${cdn_url}/${pic}`}
      alt={`Slide ${idx + 1}`}
      style={{
        width: "100%",
        height: "300px",
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />
  );

  return (
    <div className="container mt-2">
      {pics.length >= 2 ? (
        <Swiper
          spaceBetween={10}       // smaller gap
          slidesPerView={2}       // 2 slides per view
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {pics.map((pic, idx) => (
            <SwiperSlide key={idx} style={{ display: "flex", justifyContent: "center" }}>
              {pic ? renderImage(pic, idx) : <div>No image</div>}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="row">
          <div className="col-6">
            {renderImage(pics[0], 0)}
          </div>
        </div>
      )}
    </div>
  );
}

export default ComDetailsSlider;
