'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CourseCard from '@/components/CourseCard'
import { useInView } from 'react-intersection-observer'
import Pagination from '@/components/Pagination'

// Course categories for tabs
const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'medical', name: 'Medical Admission' },
  { id: 'university', name: 'University Admission' },
  { id: 'job', name: 'Job Preparation' },
  { id: 'skill', name: 'Skill Development' },
]

// Mock courses data (replace with API call later)
const mockCourses = [
  {
    id: '1',
    title: 'Medical Admission Test Preparation',
    thumbnail: '/course-thumbnails/medical.jpg',
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
    category: 'medical'
  },
  {
    id: '2',
    title: 'Medical Admission Test Preparation',
    thumbnail: '/course-thumbnails/medical.jpg',
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
    category: 'medical'
  },
  {
    id: '3',
    title: 'University Admission Test Preparation',
    thumbnail: '/course-thumbnails/medical.jpg',
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
    category: 'university'
  },
  {
    id: '4',
    title: 'Job Admission Test Preparation',
    thumbnail: '/course-thumbnails/medical.jpg',
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
    category: 'job'
  },
  {
    id: '5',
    title: 'University Admission Test Preparation',
    thumbnail: '/course-thumbnails/medical.jpg',
    price: 13000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
    category: 'university'
  },
  {
    id: '6',
    title: 'Medical Admission Test Preparation',
    thumbnail: '/course-thumbnails/medical.jpg',
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
    category: 'medical'
  },
  {
    id: '7',
    title: 'Medical Admission Test Preparation',
    thumbnail: '/course-thumbnails/medical.jpg',
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
    category: 'medical'
  },
  {
    id: '8',
    title: 'Skill Admission Test Preparation',
    thumbnail: '/course-thumbnails/medical.jpg',
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
    category: 'skill'
  },
  {
    id: '9',
    title: 'Medical Admission Test Preparation',
    thumbnail: '/course-thumbnails/medical.jpg',
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
    category: 'medical'
  },
  // Add more courses...
]

const CoursesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [visibleCourses, setVisibleCourses] = useState(8)
  const [filteredCourses, setFilteredCourses] = useState(mockCourses)
  const { ref, inView } = useInView()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filter courses based on category
  useEffect(() => {
    const filtered = activeCategory === 'all'
      ? mockCourses
      : mockCourses.filter(course => course.category === activeCategory)
    setFilteredCourses(filtered)
    setVisibleCourses(8) // Reset visible courses when changing category
  }, [activeCategory])

  // Load more courses when scrolling to bottom
  useEffect(() => {
    if (inView) {
      setVisibleCourses(prev => 
        Math.min(prev + 8, filteredCourses.length)
      )
    }
  }, [inView, filteredCourses.length])

  const indexOfLastCourse = currentPage * itemsPerPage
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)

  return (
    <div className="min-h-screen bg-[#0A192F] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Courses
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our wide range of courses designed to help you achieve your goals
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                ${activeCategory === category.id
                  ? 'bg-white text-[#13284D]'
                  : 'bg-[#13284D] text-white hover:bg-white hover:text-[#13284D]'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {currentCourses.map((course) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CourseCard {...course} />
            </motion.div>
          ))}
        </motion.div>

        {/* Replace infinite scroll with pagination */}
        <Pagination
          totalItems={filteredCourses.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        {/* No Courses Message */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-300 mt-12"
          >
            No courses found in this category.
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CoursesPage 