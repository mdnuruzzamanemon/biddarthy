"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

// Type definitions
interface Instructor {
  _id: string;
  name: string;
  designation: string;
  image: string;
  expertise: string[];
  education: string;
}

// Sample Data
const sampleInstructors: Instructor[] = [
  {
    _id: "1",
    name: "Dr. Sarah Johnson",
    designation: "Professor of Computer Science",
    image: "/images/instructors/instructor1.jpg",
    expertise: ["Artificial Intelligence", "Machine Learning", "Data Science"],
    education: "Ph.D. from MIT",
  },
  {
    _id: "2",
    name: "Prof. Michael Chen",
    designation: "Associate Professor of Mathematics",
    image: "/images/instructors/instructor2.jpg",
    expertise: ["Calculus", "Mathematical Modeling", "Statistics"],
    education: "Ph.D. from Stanford University",
  },
  {
    _id: "3",
    name: "Dr. Emily Rodriguez",
    designation: "Assistant Professor of Physics",
    image: "/images/instructors/instructor3.jpg",
    expertise: ["Quantum Physics", "Theoretical Physics", "Astrophysics"],
    education: "Ph.D. from Caltech",
  },
  {
    _id: "4",
    name: "Dr. James Wilson",
    designation: "Professor of Chemistry",
    image: "/images/instructors/instructor4.jpg",
    expertise: ["Organic Chemistry", "Biochemistry", "Medicinal Chemistry"],
    education: "Ph.D. from Harvard University",
  },
  {
    _id: "5",
    name: "Prof. Lisa Thompson",
    designation: "Professor of Literature",
    image: "/images/instructors/instructor5.jpg",
    expertise: ["American Literature", "Creative Writing", "Literary Theory"],
    education: "Ph.D. from Columbia University",
  },
  {
    _id: "6",
    name: "Dr. Robert Martinez",
    designation: "Associate Professor of Economics",
    image: "/images/instructors/instructor6.jpg",
    expertise: ["Macroeconomics", "International Trade", "Economic Policy"],
    education: "Ph.D. from University of Chicago",
  },
];

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const InstructorsPage = () => {
  const [loading, setLoading] = useState(true);
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setInstructors(sampleInstructors);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading faculty data..." />;
  }

  return (
    <div className="min-h-screen bg-[#0A192F]">
      {/* Header section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Academic <span className="text-[#f4bc45]">Faculty</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the industry experts and academics who will guide you through
            your educational journey
          </p>
        </div>
      </div>

      {/* Faculty Grid - Simplified Card Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center mb-10">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <GraduationCap className="w-6 h-6 mr-2 text-[#f4bc45]" />
            Our Faculty Members
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor._id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
            >
              {/* Simplified Card Design */}
              <Link href={`/instructor/${instructor._id}`}>
                <div className="group bg-gradient-to-br from-[#13284D] to-[#0A192F] rounded-xl overflow-hidden shadow-lg border border-gray-800/50 hover:border-[#f4bc45]/30 transition-all duration-300 h-full flex flex-col">
                  {/* Instructor Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/70 to-transparent"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex-grow flex flex-col">
                    {/* Name and Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-[#f4bc45] transition-colors mb-1">
                      {instructor.name}
                    </h3>
                    <p className="text-[#f4bc45] font-medium text-sm mb-3">
                      {instructor.designation}
                    </p>

                    {/* Education */}
                    <div className="flex items-center text-xs text-gray-300 mb-4 pb-4 border-b border-gray-800/30">
                      <GraduationCap className="w-3.5 h-3.5 mr-2 text-gray-400" />
                      {instructor.education}
                    </div>

                    {/* Expertise Tags */}
                    <div className="mt-auto">
                      {instructor.expertise &&
                        instructor.expertise.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {instructor.expertise
                              .slice(0, 3)
                              .map((skill, i) => (
                                <span
                                  key={i}
                                  className="bg-[#0A192F] text-gray-300 text-xs px-2 py-1 rounded-md"
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;
