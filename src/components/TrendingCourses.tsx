'use client'

import { motion } from 'framer-motion'
import CourseCard from './CourseCard'
import thumbnail from "../app/client/images/bannerimg.jpg"

// Temporary mock data (will be replaced with API data later)
const trendingCourses = [
  {
    id: '1',
    title: 'Medical Admission Test Preparation',
    thumbnail: thumbnail, // Add these images to public folder
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
  },
  {
    id: '2',
    title: 'Medical Admission Test Preparation',
    thumbnail: thumbnail, // Add these images to public folder
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
  },
  {
    id: '3',
    title: 'Medical Admission Test Preparation',
    thumbnail: thumbnail, // Add these images to public folder
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
  },
  {
    id: '4',
    title: 'Medical Admission Test Preparation',
    thumbnail: thumbnail, // Add these images to public folder
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
  },
  // Add more courses here
]

const TrendingCourses = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A192F]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trending Courses
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our most popular courses chosen by thousands of students
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingCourses 