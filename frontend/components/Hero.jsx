import React from "react";
import headerImage from "../src/assets/header.png";

const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row justify-center gap-20 items-center mt-24 pb-24 px-6 lg:px-20">
      {/* Left side */}
      <div className="flex flex-col max-w-2xl text-center lg:text-left">
        {/* Headlines */}
        <h1 className="font-impact text-[3.8rem] md:text-[5.5rem] lg:text-[5.5rem] leading-tight">
          Strength. Discipline. Honor.
        </h1>

        <p className="font-montserrat text-[1.1rem] md:text-[1.25rem] lg:text-[1.4rem] mt-4 text-[#555555]">
          Forging warriors of character at Mindanao State University — where karate is not just a sport, but a way of life.
        </p>


        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
          <button className="px-6 py-3 bg-[#BB2A1D] text-white font-montserrat font-semibold rounded-xl shadow-lg hover:bg-[#a22518] hover:scale-105 transition duration-300 ease-in-out">
            Join Now
          </button>
          <button className="px-6 py-3 border-2 border-[#BB2A1D] text-[#BB2A1D] font-montserrat font-semibold rounded-xl hover:bg-[#BB2A1D] hover:text-white hover:scale-105 transition duration-300 ease-in-out">
            Watch Video
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex justify-center">
        <img
          src={headerImage}
          alt="MSU Karate Club"
          className="max-w-full h-[400px] drop-shadow-lg rounded-xl "
        />
      </div>
    </section>
  );
};

export default Hero;
