'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface CourseCardProps {
  id: string
  title: string
  thumbnail: string
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
      className="bg-[#13284D] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <Link href={`/courses/${id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
            {title}
          </h3>
          
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-300">
              {enrolledStudents} students enrolled
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">
              ৳{discountPrice}
            </span>
            <span className="text-lg text-gray-400 line-through">
              ৳{price}
            </span>
            <span className="text-sm text-green-400 font-semibold">
              {discountPercentage}% off
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default CourseCard 