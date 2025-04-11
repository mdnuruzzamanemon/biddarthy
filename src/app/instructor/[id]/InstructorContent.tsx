"use client";

import CourseCard from "@/components/CourseCard";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  Download,
  GraduationCap,
  Play,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Instructor } from "./types";

interface InstructorContentProps {
  instructor: Instructor;
}

export default function InstructorContent({
  instructor,
}: InstructorContentProps) {
  return (
    <div className="min-h-screen bg-[#0A192F] py-8">
      <div className="container mx-auto px-6 sm:px-6 lg:px-32">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/instructor"
            className="inline-flex items-center text-gray-400 hover:text-[#f4bc45] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Instructors
          </Link>
        </div>

        {/* Updated Header Section with Stats */}
        <motion.div
          className="bg-gradient-to-r from-[#0E2A47] to-[#112240] rounded-lg overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative">
            {/* Background pattern - subtle grid */}
            <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>

            <div className="relative z-10 p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Profile Image with animation */}
                <motion.div
                  className="relative w-48 h-48 rounded-full border-4 border-[#f4bc45] overflow-hidden flex-shrink-0"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Image
                    src={
                      instructor.image.startsWith("http")
                        ? instructor.image
                        : `https://api.biddarthi.org/${instructor.image}`
                    }
                    alt={instructor.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <div className="flex-1 text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {instructor.name}
                    </h1>
                    <p className="text-xl text-[#f4bc45] mb-4">
                      {instructor.designation}
                    </p>
                  </motion.div>

                  <motion.p
                    className="text-gray-300 text-lg leading-relaxed mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {instructor.fullBio || instructor.bio}
                  </motion.p>

                  {/* Stats in a horizontal scroll on mobile, grid on desktop */}
                  <motion.div
                    className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 mb-6 pb-2 md:pb-0 hide-scrollbar"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-[#0A192F]/70 p-4 rounded-lg backdrop-blur-sm min-w-[140px] md:min-w-0 flex-shrink-0">
                      <div className="text-2xl font-bold text-[#f4bc45] mb-1">
                        {instructor.courses?.length || 0}
                      </div>
                      <div className="text-gray-400 text-sm">
                        Active Courses
                      </div>
                    </div>
                    <div className="bg-[#0A192F]/70 p-4 rounded-lg backdrop-blur-sm min-w-[140px] md:min-w-0 flex-shrink-0">
                      <div className="text-2xl font-bold text-[#f4bc45] mb-1">
                        {instructor.publications?.length || 0}
                      </div>
                      <div className="text-gray-400 text-sm">Publications</div>
                    </div>
                    <div className="bg-[#0A192F]/70 p-4 rounded-lg backdrop-blur-sm min-w-[140px] md:min-w-0 flex-shrink-0">
                      <div className="text-2xl font-bold text-[#f4bc45] mb-1">
                        {instructor.awards?.length || 0}
                      </div>
                      <div className="text-gray-400 text-sm">Awards</div>
                    </div>
                    <div className="bg-[#0A192F]/70 p-4 rounded-lg backdrop-blur-sm min-w-[140px] md:min-w-0 flex-shrink-0">
                      <div className="text-2xl font-bold text-[#f4bc45] mb-1">
                        {instructor.experience?.length || 0}
                      </div>
                      <div className="text-gray-400 text-sm">
                        Years Experience
                      </div>
                    </div>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div
                    className="flex flex-wrap gap-4 justify-center md:justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {instructor.socialLinks?.linkedin && (
                      <a
                        href={instructor.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#f4bc45] transition-colors"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                    {/* Add other social links similarly */}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Courses and Publications */}
          <div className="lg:col-span-2 space-y-8">
            {/* Expertise Section */}
            {instructor.expertise && instructor.expertise.length > 0 && (
              <div className="bg-[#112240] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Areas of Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {instructor.expertise.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-[#1A365D] text-gray-200 px-4 py-2 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Courses Section */}
            {instructor.courses && instructor.courses.length > 0 && (
              <div className="bg-[#112240] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Featured Courses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {instructor.courses.map((course) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CourseCard
                        id={course.id}
                        title={course.title}
                        thumbnail={course.image}
                        price={3999}
                        discountPrice={2999}
                        discountPercentage={25}
                        rating={course.rating || 4.5}
                        duration={course.duration || "10 weeks"}
                        instructor={instructor.name}
                        level={course.level || "Intermediate"}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Publications Section */}
            {instructor.publications && instructor.publications.length > 0 && (
              <div className="bg-[#112240] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Research Publications
                </h2>
                <div className="space-y-4">
                  {instructor.publications.map((pub, index: number) => (
                    <div
                      key={index}
                      className="bg-[#0E2A47] p-5 rounded-lg hover:shadow-lg transition-all duration-300 border border-gray-800"
                    >
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {pub.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-3">
                        {pub.journal && (
                          <>
                            <span className="bg-[#1A365D] px-3 py-1 rounded-full">
                              {pub.journal}
                            </span>
                            <span>•</span>
                          </>
                        )}
                        <span className="text-[#f4bc45]">{pub.year}</span>
                      </div>
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#f4bc45] hover:underline"
                        >
                          View Publication
                          <Download className="w-4 h-4 ml-2" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Education, Awards, and Demo Classes */}
          <div className="space-y-8">
            {/* Education Section */}
            {instructor.education && instructor.education.length > 0 && (
              <div className="bg-[#112240] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  <GraduationCap className="inline-block w-6 h-6 mr-2" />
                  Education
                </h2>
                <div className="space-y-4">
                  {instructor.education.map((edu: string, index: number) => (
                    <div key={index} className="relative pl-6 pb-6 last:pb-0">
                      <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#f4bc45]"></div>
                      <div className="absolute left-[3px] top-4 bottom-0 w-0.5 bg-gray-700 last:hidden"></div>
                      <p className="text-white font-medium">{edu}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Updated Demo Classes Section with YouTube Embed */}
            {instructor.demoClasses && instructor.demoClasses.length > 0 && (
              <div className="bg-[#112240] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  <Play className="inline-block w-6 h-6 mr-2" />
                  Demo Classes
                </h2>
                <div className="space-y-6">
                  {instructor.demoClasses.map((demo, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[#0E2A47] rounded-lg overflow-hidden shadow-lg"
                    >
                      {/* YouTube Video Embed */}
                      <div className="relative pt-[56.25%]">
                        <iframe
                          src={
                            // demo.videoLink ||
                            `https://www.youtube.com/embed/dQw4w9WgXcQ`
                          }
                          title={demo.title}
                          className="absolute top-0 left-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>

                      {/* Video Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {demo.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-gray-300">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(demo.date).toLocaleDateString()}
                          </span>
                          <span>{demo.duration}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Awards Section */}
            {instructor.awards && instructor.awards.length > 0 && (
              <div className="bg-[#112240] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  <Award className="inline-block w-6 h-6 mr-2" />
                  Awards & Honors
                </h2>
                <div className="space-y-4">
                  {instructor.awards.map((award, index: number) => (
                    <div
                      key={index}
                      className="bg-[#0E2A47] p-4 rounded-lg border border-gray-800 hover:border-[#f4bc45]/30 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {award.title}
                      </h3>
                      <div className="flex items-center text-sm">
                        <span className="text-[#f4bc45]">{award.year}</span>
                        {award.organization && (
                          <>
                            <span className="mx-2 text-gray-600">•</span>
                            <span className="text-gray-400">
                              {award.organization}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 bg-gradient-to-r from-[#0E2A47] to-[#1A365D] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Start Learning with {instructor.name.split(" ")[0]}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Join thousands of students who have transformed their careers
            through our expert-led courses.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/courses?instructor=${instructor._id}`}
              className="bg-[#f4bc45] hover:bg-[#f4bc45]/90 text-[#0A192F] font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <BookOpen className="w-5 h-5 mr-2" /> Browse All Courses
            </Link>
            <Link
              href="/contact"
              className="bg-[#112240] hover:bg-[#1D3557] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 border border-gray-700 flex items-center justify-center"
            >
              Contact Instructor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
