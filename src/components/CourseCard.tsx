"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CourseCardProps {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  discountPrice: number;
  discountPercentage: number;
}

const CourseCard = ({
  id,
  title,
  thumbnail,
  price,
  discountPrice,
  discountPercentage,
}: CourseCardProps) => {
  const [enrolledStudents, setEnrolledStudents] = useState<number | null>(null);

  // Fetch enrolled students count
  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const res = await fetch(`/api/enrollments/count/${id}`);
        const data = await res.json();
        if (res.ok) {
          setEnrolledStudents(data.enrollmentCount); // Assuming API returns { count: number }
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
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-[#13284D] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full"
    >
      <Link href={`/courses/${id}`}>
        <div className="relative w-full">
          <div className="w-full">
            <Image
              src={`https://biddarthi-backend.pirhotech.com/${thumbnail}`}
              alt={title}
              width={800} // Adjust width as needed
              height={133} // Maintain aspect ratio (800:533 ~ 3:2)
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl md:text-2xl font-medium text-white mb-4 line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>

          <div className="flex items-center mb-4">
            <span className="text-lg text-gray-300">
              {enrolledStudents !== null
                ? `${enrolledStudents} students enrolled`
                : "Loading..."}
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-2xl md:text-3xl font-bold text-white">
              ৳{discountPrice}
            </span>
            <span className="text-xl text-gray-400 line-through">৳{price}</span>
            <span className="text-lg text-green-400 font-semibold">
              {discountPercentage}% off
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
