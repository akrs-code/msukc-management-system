import React from "react";
import Header from "../components/Header";

const About = () => {
  return (
    <>
      <Header />
      <section className="pt-20 pb-20 px-6 lg:px-20 font-montserrat bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-cinzel font-bold text-3xl md:text-4xl text-[#BB2A1D] mb-6">
            About Karate
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-10">
            Karate is a traditional martial art that originated in Okinawa,
            Japan, and has grown into one of the most widely practiced forms of
            self-defense and discipline worldwide. Rooted in values of respect,
            humility, and perseverance, karate emphasizes not only physical
            strength but also mental clarity and character development.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <img
            src="https://images.unsplash.com/photo-1602192102781-2af87a1c04dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Karate practice"
            className="w-full h-80 object-cover rounded-2xl shadow-lg"
          />

          {/* Content */}
          <div>
            <h2 className="font-cinzel font-bold text-2xl text-gray-900 mb-4">
              Philosophy & Practice
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              More than just a sport, karate is a way of life. Students are
              taught discipline, respect for others, and the importance of
              continuous self-improvement. Each training session focuses on
              building harmony between mind and body.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>⚡ Improves physical fitness and coordination</li>
              <li>🧘‍♂️ Strengthens focus, discipline, and confidence</li>
              <li>🤝 Promotes respect, humility, and teamwork</li>
            </ul>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h2 className="font-cinzel font-bold text-2xl text-[#BB2A1D] mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Our goal is to share the art of karate with future generations by
            cultivating not only skilled martial artists but also individuals
            who embody integrity, respect, and perseverance in all aspects of
            life.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
