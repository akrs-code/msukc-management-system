import React from "react";
import headerImage from "../src/assets/header.png";

const programsData = [
  {
    id: 1,
    image: headerImage,
    title: "Summer Karate Outreach Program",
    time: "Every Summer – 8 Weeks",
    description: `A seasonal program designed to introduce karate to youth and beginners in the community. Focuses on discipline, respect, and self-defense while promoting physical fitness and teamwork.`,
  },
  {
    id: 2,
    image: headerImage,
    title: "Trainee Program",
    time: "Flexible Schedule – No Membership Required",
    description: `For individuals who want to practice and train in karate without the commitment of membership. Perfect for those seeking fitness, discipline, or self-defense training at their own pace.`,
  },
  {
    id: 3,
    image: headerImage,
    title: "Membership Program",
    time: "Open All Year - 8 months",
    description: `Become a full member of our karate community and gain access to regular training, seminars, and exclusive events. Members enjoy structured learning, skill progression, and opportunities to join tournaments.`,
  },
];

const Programs = () => {
  return (
    <section className="relative flex flex-col justify-center items-center pt-20 pb-20 px-6 lg:px-20">
      {/* Section Title */}
      <h1 className="font-impact text-[2.5rem] md:text-[3.5rem] leading-[3rem] text-[#181818] mb-[1rem]">
        OUR PROGRAMS
      </h1>

      {/* Programs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[2rem] w-auto justify-center relative z-10">
        {programsData.map((program) => (
          <div
            key={program.id}
            className="flex flex-col pb-6 rounded-2xl bg-white w-full max-w-sm md:max-w-md lg:max-w-md mx-auto font-montserrat h-full drop-shadow-2xl hover:shadow-xl hover:-translate-y-2 transition duration-300 ease-in-out mt-6"
          >
            {/* Program Image */}
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-52 object-cover mb-4 rounded-t-lg"
            />

            {/* Program Title */}
            <h2 className="font-impact text-center text-[1.5rem] md:text-[1.75rem] lg:text-[1.75rem] text-[#181818] uppercase">{program.title}</h2>

            {/* Program Time */}
            <p className="text-[0.85rem] text-center text-[#555555] mt-2 font-medium italic">
              {program.time}
            </p>

            {/* Program Description */}
            <p className="text-[#333333] text-center mt-2 text-[0.9rem] leading-relaxed flex-grow px-6">
              {program.description}
            </p>

            {/* Buttons pinned at bottom */}
            <div className="flex gap-[1rem] justify-center">
              <button className="px-6 py-2 bg-[#BB2A1D] text-white text-[1rem] font-montserrat font-semibold rounded-xl shadow-md hover:bg-[#a22518] hover:scale-105 transition duration-300 ease-in-out">
                Inquire
              </button>
              <button className="px-6 py-2 text-[#BB2A1D] border bg-white text-[1rem] font-montserrat font-semibold rounded-xl shadow-md hover:bg-[#a22518] hover:scale-105 transition duration-300 ease-in-out">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programs;
