import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Maria Santos",
    role: "Software Engineer",
    feedback:
      "This platform helped me grow not only in technical skills but also in confidence. The UI is smooth and very intuitive!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Cruz",
    role: "Entrepreneur",
    feedback:
      "I was able to connect with amazing people here. The overall experience is excellent, and I highly recommend it.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Aisha Karim",
    role: "UX Designer",
    feedback:
      "The clean design and attention to detail really stand out. It’s rare to find such a user-focused platform.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "David Lee",
    role: "Full-Stack Developer",
    feedback:
      "This site has made my work easier and more enjoyable. The experience feels modern, lightweight, and efficient.",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Emily Tan",
    role: "Product Manager",
    feedback:
      "An amazing experience! I was able to discover new tools and connect with other professionals seamlessly.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    name: "Michael Reyes",
    role: "Digital Marketer",
    feedback:
      "The platform makes collaboration easy and fun. Everything works smoothly, and the design is just stunning.",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-16 px-6 lg:px-20 font-montserrat">
      <div className="max-w-auto mx-auto text-center mb-12">
        <h1 className="font-cinzel font-bold text-4xl md:text-5xl text-[#BB2A1D]">
          What People Are Saying
        </h1>
        <p className="text-[#181818] mt-2">
          Hear from our amazing community who experienced the difference.
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={3}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
        className="w-auto"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#ffffff] shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 h-[200px] mb-10 w-auto">
              <div className="flex items-center mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-[#BB2A1D]"
                />
                <div>
                  <h3 className="text-lg font-semibold text-[#BB2A1D]">{t.name}</h3>
                  <p className="text-sm text-gray-600">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">“{t.feedback}”</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
