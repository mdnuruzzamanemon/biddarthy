'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CountdownTimer from '@/components/CountdownTimer'
import { Loader2 } from 'lucide-react'

export default function CoursePage() {
  const router = useRouter();
  const { id } = useParams(); // ✅ Correct way to access dynamic route params

  const [course, setCourse] = useState<any>(null);
  const [enrollmentCount, setEnrollmentCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Ensure id is available before making API calls

    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch course');
        }

        const data = await res.json();
        setCourse(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchEnrollmentCount = async () => {
      try {
        const res = await fetch(`/api/enrollments/count/${id}`, { method: 'GET' });

        if (!res.ok) {
          throw new Error('Failed to fetch enrollment count');
        }

        const data = await res.json();
        setEnrollmentCount(data.enrollmentCount || 0);
      } catch (err: any) {
        console.error('Enrollment fetch error:', err);
      }
    };

    fetchCourse();
    fetchEnrollmentCount();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex bg-[#0A192F] justify-center items-center ">
        <Loader2 className="animate-spin w-8 h-8 text-white" />
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!course) {
    return <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-gray-400">Course not found</div>;
  }

  const discountPercentage = Math.round(((course.price - course.discountPrice) / course.price) * 100);

  return (
    <div className="min-h-screen bg-[#0A192F] pt-2 flex items-center justify-center px-4">
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
            <strong>{enrollmentCount}</strong> students enrolled
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/courses/${course._id}/enroll`)}
            className="w-full mt-4 bg-[#f4bc45] text-[#13284D] py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Enroll Now
          </motion.button>
        </motion.div>

        {/* Right Card - Course Details */}
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
              {discountPercentage}% OFF
            </span>
          </div>

          <div className="mb-6">
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
