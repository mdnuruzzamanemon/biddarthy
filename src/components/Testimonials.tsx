"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import userImg from "../app/client/images/user1.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Mock testimonial data (replace with actual data later)
const testimonials = [
  {
    id: 1,
    name: "Rahul Sarker",
    image: userImg, // Ensure the image is stored in the public folder
    course: "Medical Admission Test",
    college: "Dhaka Medical College",
    feedback:
      "The structured study plan and mock tests helped me tremendously. I felt well-prepared and confident during the exam. The instructors were always available to clear my doubts.",
    year: "2023",
    rating: 5,
  },
  {
    id: 2,
    name: "Anika Rahman",
    image: userImg,
    course: "Engineering Admission",
    college: "BUET",
    feedback:
      "The problem-solving strategies and detailed explanations made complex topics easy to understand. Biddarthy played a crucial role in my admission. I would highly recommend their courses to anyone preparing for engineering entrance exams.",
    year: "2023",
    rating: 5,
  },
  {
    id: 3,
    name: "Mehedi Hasan",
    image: userImg,
    course: "University Admission",
    college: "University of Dhaka",
    feedback:
      "The guidance and study materials were invaluable. The practice sessions and personalized feedback boosted my confidence for the exam. The mentors were supportive throughout my preparation journey.",
    year: "2022",
    rating: 4,
  },
  {
    id: 4,
    name: "Farhana Jahan",
    image: userImg,
    course: "University Admission",
    college: "Rajshahi University",
    feedback:
      "The hands-on projects and industry-focused curriculum helped me land my first job as a front-end developer. The practical approach to learning made all the difference in my preparation.",
    year: "2023",
    rating: 5,
  },
  {
    id: 5,
    name: "Tanvir Hossain",
    image: userImg,
    course: "University Admission",
    college: "Jahangirnagar University",
    feedback:
      "The well-structured study materials and mock tests made my preparation stress-free. I highly recommend Biddarthy for university admission coaching! Their approach to teaching is unique and effective.",
    year: "2023",
    rating: 5,
  },
  {
    id: 6,
    name: "Nusrat Jahan",
    image: userImg,
    course: "University Admission",
    college: "Chittagong University",
    feedback:
      "The extensive question bank and live doubt-clearing sessions were game-changers for my medical entrance preparation. The faculty is experienced and knows exactly what topics to focus on.",
    year: "2023",
    rating: 4,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A192F] to-[#13284D] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f4bc45]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f4bc45]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 z-0"></div>

      {/* Decorative patterns */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-[#f4bc45]/20 rounded-full z-0"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 border border-[#f4bc45]/20 rounded-full z-0"></div>
      <div className="absolute top-40 right-20 w-10 h-10 border border-[#f4bc45]/20 rounded-full z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Success <span className="text-[#f4bc45]">Stories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from our students who achieved their academic goals with our
            guidance
          </p>
        </motion.div>

        <div className="relative">
          {/* Large quote icon */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-[#f4bc45]/10 z-0">
            <FaQuoteLeft className="w-32 h-32" />
          </div>

          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              renderBullet: function (index, className) {
                return `<span class="${className} !bg-[#f4bc45] !w-3 !h-3 !opacity-70 !mx-1"></span>`;
              },
            }}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            onSlideChange={handleSlideChange}
            className="testimonial-swiper !pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide
                key={testimonial.id}
                className="!w-[350px] sm:!w-[450px] md:!w-[550px] !opacity-100"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${
                    activeIndex === index
                      ? "from-[#13284D] to-[#1c3b6e]"
                      : "from-[#13284D]/90 to-[#0A192F]"
                  } p-8 rounded-2xl shadow-xl mb-8 h-full border border-gray-700/50 backdrop-blur-sm transition-all duration-300 transform ${
                    activeIndex === index ? "scale-105" : "scale-95 opacity-70"
                  }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-[#f4bc45] shadow-lg shadow-[#f4bc45]/20">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-[#f4bc45] font-medium">
                          {testimonial.college}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Batch {testimonial.year}
                        </p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? "text-[#f4bc45]"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="relative flex-1">
                      <FaQuoteLeft className="absolute top-0 left-0 text-[#f4bc45]/20 w-8 h-8" />
                      <p className="text-gray-300 pt-6 px-2 leading-relaxed">
                        {testimonial.feedback}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-700/50">
                      <div className="text-sm text-[#f4bc45]/80 font-medium">
                        Course: {testimonial.course}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation buttons */}
          <div className="swiper-button-prev !text-[#f4bc45] !w-12 !h-12 !bg-[#13284D]/80 !rounded-full !shadow-lg !hidden md:!flex after:!text-lg"></div>
          <div className="swiper-button-next !text-[#f4bc45] !w-12 !h-12 !bg-[#13284D]/80 !rounded-full !shadow-lg !hidden md:!flex after:!text-lg"></div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Successful Students", value: "1200+" },
            { label: "University Admissions", value: "850+" },
            { label: "Medical Admissions", value: "320+" },
            { label: "Satisfaction Rate", value: "98%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-[#13284D]/50 border border-gray-700/30 rounded-xl p-6 text-center backdrop-blur-sm"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[#f4bc45] mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-300 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-gray-300 mb-6">
            Join our community of successful students
          </p>
          <a
            href="/courses"
            className="inline-block py-3 px-8 bg-[#f4bc45] text-[#13284D] font-medium rounded-lg hover:bg-[#f4bc45]/90 transition-colors shadow-lg shadow-[#f4bc45]/20"
          >
            Explore Our Courses
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
