'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const CourseDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  // Mock data (Replace with API data)
  const course = {
    id: params.id,
    title: 'Medical Admission Test Preparation',
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
    description: 'Comprehensive preparation for medical college admission tests covering all subjects with expert guidance.',
    instructor: 'Dr. John Doe',
    discountEndsAt: '2024-12-31',
    demoVideo: 'https://www.youtube.com/embed/your-video-id'
  };

  return (
    <div className="min-h-screen bg-[#0A192F] pt-20 flex items-center justify-center px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Card - Video & Enrollment */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="bg-[#13284D] p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Course Preview</h3>
          <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={course.demoVideo}
              allowFullScreen
            />
          </div>

          <p className="text-red-400 text-sm mt-4">Offer ends: {new Date(course.discountEndsAt).toLocaleDateString()}</p>
          <p className="text-gray-300 text-sm mt-2">
            <strong>{course.enrolledStudents}</strong> students enrolled
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/courses/${course.id}/enroll`)}
            className="w-full mt-4 bg-white text-[#13284D] py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Enroll Now
          </motion.button>
        </motion.div>

        {/* Right Card - Course Details */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
          className="bg-[#13284D] p-6 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold text-white mb-4">{course.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-white">৳{course.discountPrice}</span>
            <span className="text-xl text-gray-400 line-through">৳{course.price}</span>
            <span className="text-green-400 font-semibold">{course.discountPercentage}% off</span>
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">Instructor</h3>
          <p className="text-gray-300">{course.instructor}</p>

          <h3 className="text-xl font-semibold text-white mt-4 mb-2">Course Description</h3>
          <p className="text-gray-300">{course.description}</p>
        </motion.div>

      </div>
    </div>
  )
}

export default CourseDetails;
