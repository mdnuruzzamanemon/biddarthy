'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface CourseCardProps {
  id: string
  title: string
  thumbnail: any
  price: number
  discountPrice: number
  discountPercentage: number
  enrolledStudents: number
}

const CourseCard = ({ 
  id, 
  title, 
  thumbnail, 
  price, 
  discountPrice, 
  discountPercentage, 
  enrolledStudents 
}: CourseCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-[#13284D] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full"
    >
      <Link href={`/courses/${id}`}>
        <div className="relative w-full">
          <div className="w-full" style={{ paddingTop: '66.67%' }}>
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>
          
          <div className="flex items-center mb-4">
            <span className="text-lg text-gray-300">
              {enrolledStudents} students enrolled
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-bold text-white">
              ৳{discountPrice}
            </span>
            <span className="text-xl text-gray-400 line-through">
              ৳{price}
            </span>
            <span className="text-lg text-green-400 font-semibold">
              {discountPercentage}% off
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default CourseCard 