import React from "react";

const Office = () => {
  return (
    <div className="bg-[#BB2A1D] py-[2.5rem] px-[1.5rem]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem] max-w-[90rem] mx-auto text-center">
        {/* CALL US */}
        <div className="space-y-[0.5rem]">
          <h4 className="font-montserrat text-white text-[1rem] md:text-[1rem] tracking-wide">
            CALL US
          </h4>
          <h3 className="text-white font-impact text-[2rem] md:text-[2.25rem]">
            +63 936 583 9328
          </h3>
        </div>

        {/* LOCATE US */}
        <div className="space-y-[0.5rem]">
          <h4 className="font-montserrat text-white text-[1rem] md:text-[1rem] tracking-wide">
            LOCATE US
          </h4>
          <h3 className="text-white font-impact text-[2rem] md:text-[2.25rem]">
            ROOM 13 GRANDSTAND
          </h3>
        </div>

        {/* WORKING HOURS */}
        <div className="space-y-[0.5rem]">
          <h4 className="font-montserrat text-white text-[1rem] md:text-[1rem] tracking-wide">
            WORKING HOURS
          </h4>
          <h3 className="text-white font-impact text-[2rem] md:text-[2.25rem]">
            DAILY: 9AM - 7PM
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Office;
