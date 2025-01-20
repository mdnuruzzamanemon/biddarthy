'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import thumnail from "@/app/client/images/bannerimg.jpg"

const CourseDetails = ({ params }: { params: { id: string } }) => {
  const [showEnrollForm, setShowEnrollForm] = useState(false)

  // Mock data (will be replaced with API data)
  const course = {
    id: params.id,
    title: 'Medical Admission Test Preparation',
    thumbnail: thumnail,
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
    description: 'Comprehensive preparation for medical college admission tests...',
    instructor: 'Dr. John Doe',
    discountEndsAt: '2024-12-31',
    demoVideo: 'https://www.youtube.com/embed/your-video-id'
  }

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault()
    // Will handle enrollment logic later
    alert('Enrollment request sent!')
  }

  return (
    <div className="min-h-screen bg-[#0A192F] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Demo Video</h3>
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={course.demoVideo}
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">
              {course.title}
            </h1>
            
            <div className="bg-[#13284D] rounded-lg p-6 shadow-md mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-white">
                  ৳{course.discountPrice}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ৳{course.price}
                </span>
                <span className="text-green-400 font-semibold">
                  {course.discountPercentage}% off
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-red-400">
                  Offer ends: {new Date(course.discountEndsAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => setShowEnrollForm(true)}
                className="w-full bg-white text-[#13284D] py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Enroll Now
              </button>
            </div>

            <div className="bg-[#13284D] rounded-lg p-6 shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Course Details</h3>
              <p className="text-gray-300 mb-4">{course.description}</p>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="font-semibold">Instructor:</span>
                <span>{course.instructor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Form Modal */}
      {showEnrollForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#13284D] rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Enroll in Course</h3>
            <form onSubmit={handleEnroll}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-lg bg-[#0A192F] text-white border-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 border rounded-lg bg-[#0A192F] text-white border-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border rounded-lg bg-[#0A192F] text-white border-gray-600"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowEnrollForm(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-[#13284D] rounded-lg hover:bg-opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default CourseDetails 