import React, { useEffect } from "react";
import AddStore from "../../store/Adds.js";
import SliderSkeleton from "../../skeleton/SliderSkeleton.jsx";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = () => {
  const { SliderList, SliderListRequest } = AddStore();

  useEffect(() => {
    SliderListRequest(); // Fetch SliderList data when component mounts
  }, [SliderListRequest]);

  if (!SliderList || SliderList.length === 0) {
    return <SliderSkeleton />;
  }

  return (
    <Carousel showThumbs={false} infiniteLoop autoPlay interval={5000}>
      {SliderList.map((item, index) => (
        <div key={index} style={{ position: "relative" }}>
          <img
            className="w-full h-auto max-h-80" // Adjust height and width
            src={item.image}
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
