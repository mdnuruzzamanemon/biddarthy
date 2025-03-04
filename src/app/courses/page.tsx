'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CourseCard from '@/components/CourseCard'
import Pagination from '@/components/Pagination'
import { Loader2 } from 'lucide-react'
import bannerImage from "@/app/client/images/bannerimg.jpg" // fallback or placeholder if needed

// Define TypeScript types for course and category
type Course = {
  id: string
  title: string
  thumbnail: string
  price: number
  discountPrice: number
  discountPercentage: number
  enrolledStudents: number
  category: string
  description?: string
  instructor?: string
}

type Category = {
  id: string
  name: string
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loadingCourses, setLoadingCourses] = useState<boolean>(true)
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true)
  const itemsPerPage = 8

  // Helper function to extract an ID from an object (if needed)
  const extractId = (obj: any): string => {
    if (typeof obj === 'object') {
      return obj._id || obj.$oid || ''
    }
    return obj
  }

  // Fetch courses from the API and transform the data
  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true)
      try {
        const res = await fetch('/api/courses')
        const data = await res.json()
        const transformedCourses: Course[] = data.map((course: any) => {
          const discountPercentage = course.price
            ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
            : 0
          // Use the helper to extract the category id.
          const categoryId = extractId(course.category)
          return {
            id: course._id, // assuming _id is already a string
            title: course.title,
            thumbnail: course.thumbnail || bannerImage,
            price: course.price,
            discountPrice: course.discountPrice,
            discountPercentage,
            category: categoryId,
            description: course.description,
            instructor: course.instructor,
          }
        })
        setCourses(transformedCourses)
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoadingCourses(false)
      }
    }
    fetchCourses()
  }, [])

  // Fetch categories from the API and transform them
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true)
      try {
        const res = await fetch('/api/categories')
        const data = await res.json()
        const transformedCategories: Category[] = data.map((cat: any) => ({
          id: extractId(cat),
          name: cat.categoryName,
        }))
        // Prepend the "All Courses" category (which is not from the DB)
        setCategories([{ id: 'all', name: 'All Courses' }, ...transformedCategories])
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoadingCategories(false)
      }
    }
    fetchCategories()
  }, [])

  // Filter courses based on the active category
  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter(course => course.category === activeCategory)

  // Calculate pagination values
  const indexOfLastCourse = currentPage * itemsPerPage
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)

  const isLoading = loadingCourses || loadingCategories

  return (
    <div className="min-h-screen bg-[#0A192F] pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Courses
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our wide range of courses designed to help you achieve your goals.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id)
                setCurrentPage(1)
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                ${activeCategory === category.id
                  ? 'bg-[#f4bc45] text-[#13284D]'
                  : 'bg-[#13284D] text-[#f4bc45] hover:bg-[#f4bc45] hover:text-[#13284D]'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Courses Grid or Loading */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-8 h-8 text-white" />
          </div>
        ) : (
          <>
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

            {/* Pagination */}
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
          </>
        )}
      </div>
    </div>
  )
}

export default CoursesPage
