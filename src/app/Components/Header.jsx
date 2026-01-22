"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Remote } from '../Lib/Remote';
import { useNavigateToProduct } from "../Lib/render/useNavigateToProduct";
export default function Header({query=''}) {
  const goToProduct = useNavigateToProduct();
  const [dbData, setDbData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchAndSend() {
      try {
        const { data, status} = await Remote.get(query, {});
        if (status === 200) {
          setDbData(data?.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Fetch/send error:", err);
      }
    }
    fetchAndSend();
  },[]);

  if (loading) {
    return (
      <Skeleton count={5} />
    )
  }
  const {cdn_url = "", list=[]} = dbData;
  return (
    <Swiper 
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false, 
      }}
      modules={[Autoplay]}
    >
      {list.map((item, idx) => {
        return (
          <SwiperSlide key={idx}>
               <div className="swiper-slide cursor-pointer" onClick={()=>{goToProduct(item)}}>
                  {item?.img ? (
                    <img
                      src={cdn_url+'/'+item.img} 
                      alt={item?.name || `Slide ${idx + 1}`}
                    />
                  ) : (
                    <div>No image</div> 
                  )}
               </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  );

}
