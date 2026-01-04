import React from "react";
import headerImage from "../src/assets/header.png";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const InstructorsData = [
  {
    id: 1,
    image: headerImage,
    name: "Hanshi Punduma B. Sani",
    belt: "9th Dan - Black Belt",
    position: `MSUKC Founder`,
    socials: {
      facebook: "#",
      instagram: "#",
    },
  },
  {
    id: 2,
    image: headerImage,
    name: "Shihan Revie G. Sani",
    belt: "5th Dan - Black Belt",
    position: `MSUKC Chief Instructor`,
    socials: {
      facebook: "#",
      instagram: "#",
    },
  },
  {
    id: 3,
    image: headerImage,
    name: "Kenji G. Sani",
    belt: "2nd Dan - Black Belt",
    position: `MSUKC President`,
    socials: {
      facebook: "#",
      instagram: "#",

    },
  },
];

const Instructors = () => {
  return (
    <section className="relative flex flex-col bg-[#181818] justify-center items-center pt-20 pb-20 px-6 lg:px-20">
      {/* Heading */}
      <h1 className="font-impact text-3xl sm:text-4xl md:text-5xl leading-tight text-white mb-12 text-center relative z-10">
        OUR INSTRUCTORS
      </h1>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center relative z-10 w-full max-w-7xl px-6">
        {InstructorsData.map((instructor) => (
          <div
            key={instructor.id}
            className="flex flex-col rounded-2xl w-full h-auto shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 ease-in-out overflow-hidden"
          >
            <div
              className="relative w-full h-[500px]"
              style={{
                backgroundImage: `url(${instructor.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark Glass Overlay */}
              <div className="absolute bottom-0 w-full p-6 flex flex-col">
                <h2 className="font-impact text-[1.5rem] md: lg:text-[1.7rem] text-[#BB2A1D]">
                  {instructor.name}
                </h2>
                <div className="flex justify-between items-center ">
                  <div>
                    <p className="text-[#181818] text-sm font-montserrat font-bold sm:text-base">
                      {instructor.belt}
                    </p>
                    <p className="text-[#181818] font-montserrat text-sm font-bold sm:text-base leading-relaxed">
                      {instructor.position}
                    </p>
                  </div>

                  <div className="flex gap-3 justify-end mt-3">
                    <a
                      href={instructor.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#BB2A1D] text-white hover:bg-white hover:text-[#BB2A1D] hover:border-white border border-[#BB2A1D] transition duration-300"
                    >
                      <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                    <a
                      href={instructor.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#BB2A1D] text-white hover:bg-white hover:text-[#BB2A1D] hover:border-white  border border-[#BB2A1D] transition duration-300"
                    >
                      <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Instructors;
