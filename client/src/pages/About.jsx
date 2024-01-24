import React from "react";
import aboutUs from "../assets/Images/About.png";

const About = () => {
  return (
    <>
      {/* Image Section */}
      <div className="relative">
        <img
          src={aboutUs}
          alt="New In Image"
          className="h-[20vh] md:h-[30vh] lg:h-[40vh] xl:h-[50vh] w-full max-w-[1500px] mx-auto object-cover object-top"
        />
      </div>
    </>
  );
};

export default About;
