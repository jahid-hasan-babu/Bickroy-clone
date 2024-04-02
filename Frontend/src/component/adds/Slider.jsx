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
        <div key={index}>
          <img
            className="h-80 w-full" // Adjust height and width as needed
            src={item.image}
            alt={`Slide ${index + 1}`}
          />
          <div className="legend bg-black opacity-75 ">
            <h2 className="md:text-5xl sm:text-xl">{item.name}</h2>
            <p className=" md:text-2xl sm:text-lg">{item.des}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
