'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CourseCard from './CourseCard'
import thumbnailFallback from "../app/client/images/bannerimg.jpg"

interface TrendingItem {
  _id: string
  course: {
    _id: string
    title: string
    thumbnail: string
    price: number
    discountPrice: number
  }
  addedAt: string
  __v: number
}

interface Course {
  id: string
  title: string
  thumbnail: string
  price: number
  discountPrice: number
  discountPercentage: number
}

const TrendingCourses = () => {
  const [trendingCourses, setTrendingCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchTrendingCourses = async () => {
      try {
        const res = await fetch('/api/trending')
        const data: TrendingItem[] = await res.json()
        if (res.ok) {
          // Transform the trending data to fit the CourseCard props
          const formattedCourses = data.map((item) => {
            const course = item.course
            const price = course.price
            const discountPrice = course.discountPrice
            const discountPercentage = price
              ? Math.round(((price - discountPrice) / price) * 100)
              : 0

            return {
              id: course._id,
              title: course.title,
              // Use thumbnail from API; fallback if missing
              thumbnail: course.thumbnail || thumbnailFallback,
              price,
              discountPrice,
              discountPercentage,
            }
          })
          setTrendingCourses(formattedCourses)
        } else {
          console.error('Error fetching trending courses')
        }
      } catch (error) {
        console.error('Error fetching trending courses:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingCourses()
  }, [])

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

        {loading ? (
          <p className="text-gray-300 text-center">Loading trending courses...</p>
        ) : trendingCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No trending courses available.</p>
        )}
      </div>
    </section>
  )
}

export default TrendingCourses
