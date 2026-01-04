import React from "react";
import headerImage from "../src/assets/header.png";

const AboutSection = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center px-[1.5rem] lg:px-[5rem] pt-[6rem] pb-[8rem] bg-white"
      style={{ backgroundImage: `url(${headerImage})` }}
    >
      {/* White Overlay with Blur */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-[2.5rem] max-w-[80rem] mx-auto">
        {/* Left Illustration (Optional) */}
        <div className="hidden lg:flex w-1/2 justify-center">
          <img
            src={headerImage}
            alt="Karate training"
            className="w-[90%] h-[31.25rem] object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col max-w-[40rem] text-center lg:text-left">
          <h1 className="font-impact text-[2.5rem] md:text-[3.5rem] leading-[3rem] text-[#181818] mb-[1rem]">
            ABOUT US
          </h1>

          <p className="leading-[1.75rem] mb-[1rem] font-montserrat text-[1rem] text-[#555555]">
            Welcome to the{" "}
            <span className="font-semibold text-[#333333]">
              Mindanao State University Karate Club (MSUKC)
            </span>{" "}
            — the home of{" "}
            <span className="font-semibold text-[#333333]">Shorin-Ryu Karate</span> at MSU. Rooted in
            the traditional Okinawan style, our club carries a direct lineage from
            <span className="font-semibold text-[#333333]"> Hanshi Punduma Sani</span>, who trained under
            <span className="font-semibold text-[#333333]"> Seikichi Iha</span>.
          </p>

          <p className="leading-[1.75rem] mb-[1rem] font-montserrat text-[1rem] text-[#555555]">
            More than a martial arts club, we are a family built on{" "}
            <span className="italic text-gray-800">discipline, respect, and perseverance</span>. We train
            not only in self-defense and physical strength but also in the deeper values of karate —
            humility, integrity, and continuous self-improvement.
          </p>

          <p className="leading-[1.75rem] mb-[2rem] font-montserrat text-[1rem] text-[#555555]">
            At MSUKC, we preserve the rich heritage of Okinawan karate while shaping strong,
            disciplined, and respectful individuals ready to embody the true spirit of martial arts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-[1.25rem] justify-center lg:justify-start">
            <button className="min-w-[10rem] px-[1.5rem] py-[0.75rem] bg-[#BB2A1D] text-white font-montserrat font-semibold rounded-xl shadow-md hover:bg-[#a22518] hover:scale-105 transition duration-300 ease-in-out">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
