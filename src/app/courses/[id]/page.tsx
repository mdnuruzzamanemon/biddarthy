'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import CountdownTimer from '@/components/CountdownTimer' 

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const courseId = params.id;

  // Mock Data (Replace with API Data)
  const course = {
    id: courseId,
    title: 'Medical Admission Test Preparation',
    price: 12000,
    discountPrice: 9999,
    discountPercentage: 17,
    enrolledStudents: 1234,
    description: 'Comprehensive preparation for medical college admission tests covering all subjects with expert guidance.',
    instructor: 'Dr. John Doe',
    discountEndsAt: '2025-02-31T23:59:59Z',
    demoVideo: 'https://www.youtube.com/embed/-P6PkFO-uIU?si=obQCxREsmK4crZC2'
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
          
          <h3 className="text-2xl font-semibold text-white mb-4">Course Preview</h3>
          <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={course.demoVideo}
              allowFullScreen
            />
          </div>

          <p className="text-gray-300 text-sm mt-4">
            <strong>{course.enrolledStudents}</strong> students enrolled
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/courses/${course.id}/enroll`)}
            className="w-full mt-4 bg-[#f4bc45] text-[#13284D] py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Enroll Now
          </motion.button>
        </motion.div>

        {/* ✅ Right Card - Course Details (Fixed Margin Issue) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
          className="bg-[#13284D] p-6 rounded-lg shadow-lg relative overflow-hidden mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0A192F] opacity-20 rounded-lg"></div>

          <h1 className="text-4xl font-bold text-white mb-6">{course.title}</h1>

          {/* Pricing Section */}
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl font-bold text-[#f4bc45]">
              ৳{course.discountPrice}
            </span>
            <span className="text-2xl text-gray-400 line-through">
              ৳{course.price}
            </span>
            <span className="bg-[#f4bc45] text-[#13284D] px-3 py-1 rounded-lg text-lg">
              {course.discountPercentage}% OFF
            </span>
          </div>

          <div className="mb-6">
            {/* Countdown Timer (Now a separate component) */}
            <CountdownTimer endDate={course.discountEndsAt} />
          </div>
          

          <h3 className="text-2xl font-semibold text-white mb-2">Instructor</h3>
          <p className="text-gray-300 text-lg">{course.instructor}</p>

          <h3 className="text-2xl font-semibold text-white mt-6 mb-2">Course Description</h3>
          <p className="text-gray-300 leading-relaxed">{course.description}</p>
        </motion.div>

      </div>
    </div>
  );
}
