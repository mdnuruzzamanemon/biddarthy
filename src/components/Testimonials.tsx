'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { motion } from 'framer-motion'
import Image from 'next/image'
import userImg from "../app/client/images/user1.png"

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Mock testimonial data (replace with actual data later)
const testimonials = [
  {
    id: 1,
    name: 'Rahul Sarker',
    image: userImg, // Ensure the image is stored in the public folder
    course: 'Medical Admission Test',
    college: 'Dhaka University',
    feedback: 'The structured study plan and mock tests helped me tremendously. I felt well-prepared and confident during the exam.',
    year: '2023'
  },
  {
    id: 2,
    name: 'Anika Rahman',
    image: userImg,
    course: 'University Admission',
    college: 'BUET',
    feedback: 'The problem-solving strategies and detailed explanations made complex topics easy to understand. Biddarthy played a crucial role in my admission.',
    year: '2023'
  },
  {
    id: 3,
    name: 'Mehedi Hasan',
    image: userImg,
    course: 'University Admission',
    college: 'University of Dhaka',
    feedback: 'The guidance and study materials were invaluable. The practice sessions and personalized feedback boosted my confidence for the BCS exam.',
    year: '2022'
  },
  {
    id: 4,
    name: 'Farhana Jahan',
    image: userImg,
    course: 'Skill Development - Web Development',
    college: 'Rajshahi University',
    feedback: 'The hands-on projects and industry-focused curriculum helped me land my first job as a front-end developer.',
    year: '2023'
  },
  {
    id: 5,
    name: 'Tanvir Hossain',
    image: userImg,
    course: 'University Admission',
    college: 'Jahangirnagar University',
    feedback: 'The well-structured study materials and mock tests made my preparation stress-free. I highly recommend Biddarthy for university admission coaching!',
    year: '2023'
  },
  {
    id: 6,
    name: 'Nusrat Jahan',
    image: userImg,
    course: 'Medical Admission Test',
    college: 'Chittagong University',
    feedback: 'The extensive question bank and live doubt-clearing sessions were game-changers for my medical entrance preparation.',
    year: '2023'
  },
  
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A192F]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See what our successful students have to say about their journey
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[#13284D] p-6 rounded-lg shadow-lg mb-8 h-full"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-green-400">
                      {testimonial.college}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Batch {testimonial.year}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {testimonial.feedback}
                </p>
                <div className="text-sm text-gray-400">
                  Course: {testimonial.course}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonials 