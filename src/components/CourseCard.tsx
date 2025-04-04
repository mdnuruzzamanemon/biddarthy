"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar, FaUsers } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";

interface CourseCardProps {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  rating?: number;
  duration?: string;
  instructor?: string;
  level?: string;
}

const CourseCard = ({
  id,
  title,
  thumbnail,
  price,
  discountPrice,
  discountPercentage,
  rating = 4.5,
  duration = "10 weeks",
  instructor = "Expert Instructor",
  level = "Intermediate",
}: CourseCardProps) => {
  const [enrolledStudents, setEnrolledStudents] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch enrolled students count
  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const res = await fetch(`/api/enrollments/count/${id}`);
        const data = await res.json();
        if (res.ok) {
          setEnrolledStudents(data.enrollmentCount);
        } else {
          console.error("Failed to fetch enrollment count:", data.message);
        }
      } catch (error) {
        console.error("Error fetching enrolled students:", error);
      }
    };

    fetchEnrolledStudents();
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-[#13284D] to-[#0A192F] rounded-xl shadow-lg overflow-hidden h-full border border-gray-800/50 flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/courses/${id}`} className="block h-full">
        <div className="relative">
          {/* Thumbnail with overlay */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={
                thumbnail.startsWith("http")
                  ? thumbnail
                  : `https://api.biddarthi.org/${thumbnail}`
              }
              alt={title}
              fill
              className={`object-cover transition-transform duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] to-transparent opacity-60"></div>
          </div>

          {/* Course info */}
          <div className="p-5 flex-1 flex flex-col">
            {/* Title and level row */}
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-medium text-white line-clamp-2 min-h-[3.5rem] group-hover:text-[#f4bc45] transition-colors pr-3 flex-1">
                {title}
              </h3>

              {/* Discount badge - moved to top right of content area */}
              {discountPercentage > 0 && (
                <div className="bg-[#f4bc45] text-[#13284D] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex-shrink-0 flex items-center justify-center">
                  <span>{discountPercentage}% OFF</span>
                </div>
              )}
            </div>

            {/* Level indicator */}
            <div className="flex items-center mb-3">
              <span className="bg-[#13284D] text-[#f4bc45] text-xs px-3 py-1 rounded-full border border-[#f4bc45]/30">
                {level}
              </span>
            </div>

            {/* Instructor */}
            <p className="text-gray-400 text-sm mb-3">
              By <span className="text-[#f4bc45]">{instructor}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "text-[#f4bc45]"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white text-sm">{rating}</span>
            </div>

            {/* Meta info */}
            <div className="flex items-center justify-between mb-4 text-sm">
              <div className="flex items-center text-gray-300">
                <HiOutlineClock className="mr-1 text-[#f4bc45]" />
                {duration}
              </div>
              <div className="flex items-center text-gray-300">
                <FaUsers className="mr-1 text-[#f4bc45]" />
                {enrolledStudents !== null
                  ? `${enrolledStudents} students`
                  : "Loading..."}
              </div>
            </div>

            {/* Price */}
            <div className="mt-auto">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-2xl font-bold text-white">
                  ৳{discountPrice}
                </span>
                {price > discountPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ৳{price}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Hover overlay with CTA - Now positioned absolutely within each card */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#13284D] to-[#13284D]/80 flex items-center justify-center z-1">
          <Link href={`/courses/${id}`} className="text-center p-6">
            <span className="inline-block py-2 px-6 bg-[#f4bc45] text-[#13284D] font-medium rounded-lg hover:bg-[#f4bc45]/90 transition-colors shadow-lg">
              View Course
            </span>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default CourseCard;
