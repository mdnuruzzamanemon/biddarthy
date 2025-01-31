'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { motion } from 'framer-motion'
import Image from 'next/image'
import miltonImg from "../app/client/images/milton.jpg"

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Mock testimonial data (replace with actual data later)
const testimonials = [
  {
    id: 1,
    name: 'Rakib Hassan',
    image: miltonImg, // Add these images to public folder
    course: 'Medical Admission Test',
    college: 'Dhaka Medical College',
    feedback: 'The preparation I received here was instrumental in my success. The study materials and guidance were exceptional.',
    year: '2023'
  },
  {
    id: 2,
    name: 'Fatima Ahmed',
    image: miltonImg,
    course: 'University Admission',
    college: 'BUET',
    feedback: 'Thanks to Biddarthy, I was able to achieve my dream of getting into BUET. The teachers were very supportive.',
    year: '2023'
  },
  {
    id: 3,
    name: 'Fatima Ahmed',
    image: miltonImg,
    course: 'University Admission',
    college: 'BUET',
    feedback: 'Thanks to Biddarthy, I was able to achieve my dream of getting into BUET. The teachers were very supportive.',
    year: '2023'
  },
  // Add more testimonials...
]

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
                className="bg-[#13284D] p-6 rounded-lg shadow-lg mb-8"
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
                <p className="text-gray-300 mb-4">
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