"use client";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";


const banners = [
  {
    img: "https://buffer.com/library/content/images/2023/10/free-images.jpg"
  },
  {
    img: "https://buffer.com/library/content/images/2023/10/free-images.jpg"
  },
  {
    img: "https://buffer.com/library/content/images/2023/10/free-images.jpg"
  },
  {
    img: "https://buffer.com/library/content/images/2023/10/free-images.jpg"
  },
]

const HeroSection = () => {


  const splideOptions = {
    rewind: true,
    autoScroll: true,
    // arrows: false,
  };

  return (
    <div className="w-full px-[20px] md:px-[70px] py-[10px]">
      <div className="flex  gap-3 items-center justify-between z-[999]">
        <div className="w-[68%]">
          <Splide
            options={splideOptions}
            className="overflow-hidden rounded-xl"
          >
            {banners?.map((item, index) => (
              <SplideSlide key={index}>
                <img
                  src={item.img}
                  alt="hgfj"

                  className="h-[120px] md:h-[400px] w-full object-cover"
                  width={900}
                  height={900}
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
        <div className="flex-1">
          <img
            src="https://buffer.com/library/content/images/2023/10/free-images.jpg"
            alt="hgfj"

            className="h-[120px] md:h-[400px] w-full object-cover rounded-xl"
            width={900}
            height={900}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
