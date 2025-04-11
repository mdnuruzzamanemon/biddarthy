"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";
import CourseCard from "./CourseCard";

interface TrendingItem {
  _id: string;
  course: {
    _id: string;
    title: string;
    thumbnail: string;
    price: number;
    discountPrice: number;
  };
  addedAt: string;
  __v: number;
}

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  discountPrice: number;
  discountPercentage: number;
}

const TrendingCourses = () => {
  const [trendingCourses, setTrendingCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrendingCourses = async () => {
      try {
        const res = await fetch("/api/trending");
        const data: TrendingItem[] = await res.json();
        if (res.ok) {
          // Transform the trending data to fit the CourseCard props
          const formattedCourses = data.map((item) => {
            const course = item.course;
            const price = course.price;
            const discountPrice = course.discountPrice;
            const discountPercentage = price
              ? Math.round(((price - discountPrice) / price) * 100)
              : 0;

            return {
              id: course._id,
              title: course.title,
              // Use thumbnail from API; fallback if missing
              thumbnail: course.thumbnail,
              price,
              discountPrice,
              discountPercentage,
            };
          });
          setTrendingCourses(formattedCourses);
        } else {
          console.error("Error fetching trending courses");
        }
      } catch (error) {
        console.error("Error fetching trending courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCourses();
  }, []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A192F] to-[#13284D] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f4bc45]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f4bc45]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 z-0"></div>

      {/* Decorative patterns */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-[#f4bc45]/20 rounded-full z-0"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 border border-[#f4bc45]/20 rounded-full z-0"></div>
      <div className="absolute top-40 right-20 w-10 h-10 border border-[#f4bc45]/20 rounded-full z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <FiTrendingUp className="text-[#f4bc45] text-3xl mr-2" />
            <span className="text-sm uppercase tracking-wider text-[#f4bc45] font-semibold bg-[#f4bc45]/10 px-3 py-1 rounded-full">
              Most Popular
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trending <span className="text-[#f4bc45]">Courses</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our most popular courses chosen by thousands of students
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-[#f4bc45] animate-spin mb-4" />
            <p className="text-gray-300 text-lg">Loading trending courses...</p>
          </div>
        ) : trendingCourses.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {trendingCourses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                className="transform transition-all duration-300 hover:translate-y-[-8px]"
              >
                <div className="relative">
                  {/* Trending indicator */}
                  <div className="absolute -top-3 -right-3 bg-[#f4bc45] text-[#13284D] text-xs font-bold px-2 py-1 rounded-lg shadow-lg z-10 flex items-center">
                    <FiTrendingUp className="mr-1" />
                    Trending
                  </div>

                  {/* Number badge for top courses */}
                  {index < 4 && (
                    <div className="absolute -top-3 -left-3 bg-[#13284D] text-[#f4bc45] text-sm font-bold w-8 h-8 rounded-full shadow-lg z-10 flex items-center justify-center border-2 border-[#f4bc45]">
                      #{index + 1}
                    </div>
                  )}

                  {/* Course card with enhanced shadow */}
                  <div className="shadow-xl shadow-[#0A192F]/50 rounded-xl overflow-hidden">
                    <CourseCard {...course} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="bg-[#13284D]/50 border border-gray-700/30 rounded-xl p-10 text-center backdrop-blur-sm">
            <p className="text-gray-400 text-lg">
              No trending courses available at the moment.
            </p>
            <p className="text-gray-500 mt-2">
              Please check back later for updates.
            </p>
          </div>
        )}

        {/* View all courses button */}
        {trendingCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              href="/courses"
              className="inline-flex items-center py-3 px-8 bg-[#13284D] text-[#f4bc45] font-medium rounded-lg hover:bg-[#1c3b6e] transition-colors border border-[#f4bc45]/30 shadow-lg shadow-[#0A192F]/50"
            >
              View All Courses
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TrendingCourses;
