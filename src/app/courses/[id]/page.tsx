"use client";

import CountdownTimer from "@/components/CountdownTimer";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  Loader2,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { FaRegBookmark, FaStar, FaUsers } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";

export default function CoursePage() {
  const router = useRouter();
  const { id } = useParams();

  const [course, setCourse] = useState<any>(null);
  const [enrollmentCount, setEnrollmentCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("curriculum");
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch course");
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
        const res = await fetch(`/api/enrollments/count/${id}`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch enrollment count");
        }

        const data = await res.json();
        setEnrollmentCount(data.enrollmentCount || 0);
      } catch (err: any) {
        console.error("Enrollment fetch error:", err);
      }
    };

    fetchCourse();
    fetchEnrollmentCount();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex bg-[#0A192F] justify-center items-center">
        <Loader2 className="animate-spin w-8 h-8 text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-gray-400">
        Course not found
      </div>
    );
  }

  const discountPercentage = Math.round(
    ((course.price - course.discountPrice) / course.price) * 100
  );

  // Default level or use from course if available
  const level = course.level || "Intermediate";
  // Default rating or use from course if available
  const rating = course.rating || 4.5;

  return (
    <div className="min-h-screen bg-[#0A192F]">
      {/* Video Section - Full Width */}
      {course.demoVideo && (
        <div className="w-full bg-black relative">
          <div className="max-w-7xl mx-auto aspect-video">
            <iframe
              className="w-full h-full"
              src={course.demoVideo}
              allowFullScreen
              title={course.title}
            />
          </div>
        </div>
      )}

      {/* Hero Banner Section */}
      <div
        className={`relative w-full bg-gradient-to-b from-[#13284D] to-[#0A192F] ${
          course.demoVideo ? "pt-6 md:pt-8" : "pt-12 md:pt-16"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#13284D]/80 to-[#0A192F]/90 z-0"></div>
        {!course.demoVideo && course.thumbnail && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={
                course.thumbnail.startsWith("http") ||
                course.thumbnail.startsWith("/")
                  ? course.thumbnail
                  : `/${course.thumbnail}`
              }
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Top metadata row */}
            <div className="flex flex-wrap items-center gap-3 mb-3 md:gap-4 md:mb-4">
              {course.category && (
                <span className="bg-[#13284D] text-[#f4bc45] text-xs md:text-sm font-medium px-2 py-1 md:px-3 md:py-1 rounded-full border border-[#f4bc45]/30">
                  {typeof course.category === "string"
                    ? course.category
                    : course.category.categoryName || "Course"}
                </span>
              )}

              <span className="bg-[#13284D] text-[#f4bc45] text-xs md:text-sm font-medium px-2 py-1 md:px-3 md:py-1 rounded-full border border-[#f4bc45]/30">
                {level}
              </span>

              {discountPercentage > 0 && (
                <span className="bg-[#f4bc45] text-[#13284D] text-xs md:text-sm font-bold px-2 py-1 md:px-3 md:py-1 rounded-full shadow-lg">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 md:mb-6">
              {course.title}
            </h1>

            {/* Rating and Meta Info Row */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 md:mb-8">
              {/* Rating stars */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-3 h-3 md:w-4 md:h-4 ${
                        i < Math.floor(rating)
                          ? "text-[#f4bc45]"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white text-xs md:text-sm">{rating}</span>
              </div>

              {/* Enrolled students */}
              <div className="flex items-center text-gray-300 text-xs md:text-sm">
                <FaUsers className="mr-1 md:mr-2 text-[#f4bc45] text-xs md:text-base" />
                <span>{enrollmentCount} students enrolled</span>
              </div>

              {/* Duration */}
              {course.duration && (
                <div className="flex items-center text-gray-300 text-xs md:text-sm">
                  <HiOutlineClock className="mr-1 md:mr-2 text-[#f4bc45] text-xs md:text-base" />
                  <span>{course.duration}</span>
                </div>
              )}

              {/* Last Updated */}
              {course.lastUpdated && (
                <div className="flex items-center text-gray-300 text-xs md:text-sm">
                  <Calendar className="mr-1 md:mr-2 text-[#f4bc45] w-3 h-3 md:w-4 md:h-4" />
                  <span>
                    Updated {new Date(course.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {/* Enrollment and Actions Section - Unwrapped */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start mb-6 md:mb-8">
              {/* Left column - Pricing and Enrollment */}
              <div className="w-full lg:flex-1 space-y-4 md:space-y-6 order-1">
                {/* Pricing */}
                <div>
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-white">
                      ৳{course.discountPrice}
                    </span>
                    {course.price > course.discountPrice && (
                      <span className="text-xl md:text-2xl text-gray-400 line-through">
                        ৳{course.price}
                      </span>
                    )}
                  </div>

                  {course.discountEndsAt && (
                    <div className="mb-4 md:mb-6">
                      <CountdownTimer endDate={course.discountEndsAt} />
                    </div>
                  )}
                </div>

                {/* Enrollment Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push(`/courses/${course._id}/enroll`)}
                  className="w-full md:max-w-md bg-[#f4bc45] text-[#13284D] py-3 md:py-4 rounded-lg font-bold hover:bg-opacity-90 transition-colors shadow-lg text-base md:text-lg"
                >
                  Enroll Now
                </motion.button>
              </div>

              {/* Right Column */}
              <div className="w-full lg:flex-1 space-y-4 md:space-y-6 order-2">
                {/* Action buttons */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  {/* Show Details Button */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center justify-center gap-1 md:gap-2 bg-gradient-to-r from-[#13284D] to-[#0A192F] text-white py-2 md:py-3 px-2 md:px-4 rounded-lg border border-[#f4bc45]/30 hover:border-[#f4bc45]/50 transition-colors shadow-lg text-xs sm:text-sm md:text-base"
                  >
                    <span className="hidden xs:inline">
                      {showDetails ? "Hide Details" : "Show Details"}
                    </span>
                    <span className="xs:hidden">Details</span>
                    {showDetails ? (
                      <ChevronUp size={16} className="md:w-5 md:h-5" />
                    ) : (
                      <ChevronDown size={16} className="md:w-5 md:h-5" />
                    )}
                  </motion.button>

                  <button className="flex items-center justify-center gap-1 md:gap-2 bg-gradient-to-r from-[#13284D] to-[#0A192F] text-white py-2 md:py-3 px-2 md:px-4 rounded-lg border border-gray-800/50 hover:border-[#f4bc45]/30 transition-colors text-xs sm:text-sm md:text-base">
                    <Share2
                      size={16}
                      className="text-[#f4bc45] md:w-5 md:h-5"
                    />
                    <span className="hidden xs:inline">Share</span>
                  </button>

                  <button className="flex items-center justify-center gap-1 md:gap-2 bg-gradient-to-r from-[#13284D] to-[#0A192F] text-white py-2 md:py-3 px-2 md:px-4 rounded-lg border border-gray-800/50 hover:border-[#f4bc45]/30 transition-colors text-xs sm:text-sm md:text-base">
                    <FaRegBookmark
                      size={16}
                      className="text-[#f4bc45] md:w-5 md:h-5"
                    />
                    <span className="hidden xs:inline">Save</span>
                  </button>
                </div>

                {/* Course Includes */}
                <div className="bg-gradient-to-br from-[#13284D] to-[#0A192F] p-4 md:p-5 rounded-lg border border-gray-800/30">
                  <h3 className="text-white font-semibold text-sm md:text-base mb-3 md:mb-4">
                    This Course Includes:
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Award className="text-[#f4bc45] w-4 h-4 md:w-5 md:h-5" />
                      <div className="text-gray-300">
                        Certificate of completion
                      </div>
                    </div>

                    {course.duration && (
                      <div className="flex items-center gap-2 md:gap-3">
                        <HiOutlineClock className="text-[#f4bc45] text-base md:text-lg" />
                        <div className="text-gray-300">
                          {course.duration} of content
                        </div>
                      </div>
                    )}

                    {course.totalLectures && (
                      <div className="flex items-center gap-2 md:gap-3">
                        <BookOpen className="text-[#f4bc45] w-4 h-4 md:w-5 md:h-5" />
                        <div className="text-gray-300">
                          {course.totalLectures} lectures
                        </div>
                      </div>
                    )}

                    {course.accessType && (
                      <div className="flex items-center gap-2 md:gap-3">
                        <Calendar className="text-[#f4bc45] w-4 h-4 md:w-5 md:h-5" />
                        <div className="text-gray-300">{course.accessType}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Instructor - show only when details expanded */}
            {showDetails && course.instructor && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-3 mt-4 md:mt-6"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#f4bc45] to-[#e6a935] flex items-center justify-center text-[#13284D] font-bold text-base md:text-lg shadow-lg">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">Instructor</p>
                  <p className="text-[#f4bc45] font-medium text-sm md:text-base">
                    {course.instructor}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Description Panel - Expandable */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full bg-gradient-to-br from-[#13284D] to-[#0A192F] border-y border-gray-800/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-3 md:space-y-4">
              {course.description
                ? ReactHtmlParser(course.description)
                : "No description available"}
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Content Tabs - Only show if curriculum or requirements exist */}
        {(course.curriculum ||
          course.requirements ||
          course.learningOutcomes) && (
          <div className="mb-8 md:mb-12">
            {(course.curriculum || course.requirements) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-[#13284D] to-[#0A192F] rounded-xl shadow-lg overflow-hidden border border-gray-800/50 mb-6 md:mb-8"
              >
                <div className="flex border-b border-[#1d3e6a]">
                  {course.curriculum && (
                    <button
                      onClick={() => setActiveTab("curriculum")}
                      className={`px-3 sm:px-4 md:px-6 py-3 md:py-4 text-sm md:text-lg font-medium transition-colors ${
                        activeTab === "curriculum"
                          ? "text-[#f4bc45] border-b-2 border-[#f4bc45]"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      Curriculum
                    </button>
                  )}
                  {course.requirements && (
                    <button
                      onClick={() => setActiveTab("requirements")}
                      className={`px-3 sm:px-4 md:px-6 py-3 md:py-4 text-sm md:text-lg font-medium transition-colors ${
                        activeTab === "requirements"
                          ? "text-[#f4bc45] border-b-2 border-[#f4bc45]"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      Requirements
                    </button>
                  )}
                </div>

                <div className="p-4 sm:p-5 md:p-6 lg:p-8">
                  {activeTab === "curriculum" && course.curriculum && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-300 text-sm md:text-base"
                    >
                      {ReactHtmlParser(course.curriculum)}
                    </motion.div>
                  )}

                  {activeTab === "requirements" && course.requirements && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-gray-300 text-sm md:text-base"
                    >
                      {ReactHtmlParser(course.requirements)}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* What You'll Learn Section - if available */}
            {course.learningOutcomes && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-[#13284D] to-[#0A192F] rounded-xl shadow-lg overflow-hidden border border-gray-800/50 p-4 sm:p-5 md:p-6 lg:p-8"
              >
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
                  What You'll Learn
                </h2>
                <div className="text-gray-300 text-sm md:text-base">
                  {ReactHtmlParser(course.learningOutcomes)}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
