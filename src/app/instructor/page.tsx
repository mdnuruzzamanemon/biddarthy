"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Award,
  BookOpen,
  ExternalLink,
  GraduationCap,
  Map,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

// Type definitions
interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  website?: string;
}

interface Instructor {
  _id: string;
  name: string;
  designation: string;
  image: string;
  bio: string;
  featured: boolean;
  expertise: string[];
  education: string;
  location?: string;
  joinedYear?: number;
  courseCount: number;
  studentCount: number;
  rating: number;
  socialLinks?: SocialLinks;
}

interface Category {
  name: string;
  slug: string;
  count: number;
}

interface Department {
  name: string;
  slug: string;
  description: string;
  instructors: string[];
}

interface Stat {
  label: string;
  value: number;
  icon: React.ReactNode;
}

// Sample Data
const sampleInstructors: Instructor[] = [
  {
    _id: "instr1",
    name: "Dr. Sarah Johnson",
    designation: "Professor of Computer Science",
    image: "/images/instructors/instructor1.jpg",
    bio: "Dr. Sarah Johnson is a renowned expert in artificial intelligence and machine learning with over 15 years of teaching experience. She has published numerous papers in top-tier journals and has worked with leading tech companies.",
    featured: true,
    expertise: ["Artificial Intelligence", "Machine Learning", "Data Science"],
    education: "Ph.D. from MIT",
    location: "Cambridge, MA",
    joinedYear: 2015,
    courseCount: 12,
    studentCount: 3450,
    rating: 4.9,
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
      website: "https://sarahjohnson.edu",
    },
  },
  {
    _id: "instr2",
    name: "Prof. Michael Chen",
    designation: "Associate Professor of Mathematics",
    image: "/images/instructors/instructor2.jpg",
    bio: "Professor Chen specializes in advanced calculus and mathematical modeling. His research focuses on applications of mathematics in real-world scenarios.",
    featured: true,
    expertise: ["Calculus", "Mathematical Modeling", "Statistics"],
    education: "Ph.D. from Stanford University",
    location: "Palo Alto, CA",
    joinedYear: 2017,
    courseCount: 8,
    studentCount: 2800,
    rating: 4.7,
    socialLinks: {
      linkedin: "https://linkedin.com/in/michaelchen",
    },
  },
  {
    _id: "instr3",
    name: "Dr. Emily Rodriguez",
    designation: "Assistant Professor of Physics",
    image: "/images/instructors/instructor3.jpg",
    bio: "Dr. Rodriguez is an expert in quantum physics and theoretical physics with a passion for making complex concepts accessible to students.",
    featured: false,
    expertise: ["Quantum Physics", "Theoretical Physics", "Astrophysics"],
    education: "Ph.D. from Caltech",
    location: "Pasadena, CA",
    joinedYear: 2019,
    courseCount: 6,
    studentCount: 1250,
    rating: 4.8,
  },
  {
    _id: "instr4",
    name: "Dr. James Wilson",
    designation: "Professor of Chemistry",
    image: "/images/instructors/instructor4.jpg",
    bio: "Dr. Wilson's research focuses on organic chemistry and biochemistry. He has received multiple awards for his innovative teaching methods.",
    featured: false,
    expertise: ["Organic Chemistry", "Biochemistry", "Medicinal Chemistry"],
    education: "Ph.D. from Harvard University",
    location: "Boston, MA",
    joinedYear: 2014,
    courseCount: 10,
    studentCount: 2100,
    rating: 4.6,
  },
  {
    _id: "instr5",
    name: "Prof. Lisa Thompson",
    designation: "Professor of Literature",
    image: "/images/instructors/instructor5.jpg",
    bio: "Professor Thompson specializes in American literature and creative writing. She is also an acclaimed novelist with several published works.",
    featured: true,
    expertise: ["American Literature", "Creative Writing", "Literary Theory"],
    education: "Ph.D. from Columbia University",
    location: "New York, NY",
    joinedYear: 2012,
    courseCount: 15,
    studentCount: 3200,
    rating: 4.9,
    socialLinks: {
      twitter: "https://twitter.com/lisathompson",
      website: "https://lisathompson.com",
    },
  },
  {
    _id: "instr6",
    name: "Dr. Robert Martinez",
    designation: "Associate Professor of Economics",
    image: "/images/instructors/instructor6.jpg",
    bio: "Dr. Martinez is an expert in macroeconomics and international trade. His research has been cited in major economic policy papers.",
    featured: false,
    expertise: ["Macroeconomics", "International Trade", "Economic Policy"],
    education: "Ph.D. from University of Chicago",
    location: "Chicago, IL",
    joinedYear: 2016,
    courseCount: 7,
    studentCount: 1800,
    rating: 4.5,
  },
];

// Animation variants
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
      duration: 0.4,
    },
  },
};

// Counter component for animated stats
const Counter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <>{displayValue}</>;
};

const InstructorsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [expandedBio, setExpandedBio] = useState<string | null>(null);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  // Stats data for the stats section
  const stats = [
    {
      label: "Academic Experts",
      value: 120,
      icon: <Users className="w-6 h-6 text-[#f4bc45]" />,
    },
    {
      label: "Departments",
      value: 15,
      icon: <Map className="w-6 h-6 text-[#f4bc45]" />,
    },
    {
      label: "Courses Offered",
      value: 450,
      icon: <BookOpen className="w-6 h-6 text-[#f4bc45]" />,
    },
    {
      label: "Academic Awards",
      value: 80,
      icon: <Award className="w-6 h-6 text-[#f4bc45]" />,
    },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setInstructors(sampleInstructors);
      setLoading(false);
    }, 800);
  }, []);

  const toggleBio = (id: string) => {
    if (expandedBio === id) {
      setExpandedBio(null);
    } else {
      setExpandedBio(id);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading faculty data..." />;
  }

  // Filter instructors based on search query
  const filteredInstructors = instructors.filter((instructor) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      instructor.name.toLowerCase().includes(searchLower) ||
      instructor.designation.toLowerCase().includes(searchLower) ||
      instructor.bio.toLowerCase().includes(searchLower) ||
      instructor.expertise.some((skill) =>
        skill.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="min-h-screen bg-[#0A192F]">
      {/* Header section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Academic <span className="text-[#f4bc45]">Faculty</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the industry experts and academics who will guide you through
            your educational journey
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-12">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-[#112240] border border-gray-700 rounded-xl text-white focus:ring-[#f4bc45]/50 focus:border-[#f4bc45]/50 focus:outline-none transition-colors shadow-md"
            placeholder="Search for instructors by name, expertise, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div
          ref={statsRef}
          className="bg-[#112240] rounded-xl overflow-hidden shadow-md"
        >
          {/* Academic Excellence Bar */}
          <div className="bg-[#0A192F] p-4 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-3 md:mb-0">
                <Map className="w-5 h-5 text-[#f4bc45] mr-2" />
                <span className="text-white text-sm font-medium">
                  Academic Excellence Metrics
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#f4bc45] mr-2"></div>
                  <span className="text-gray-300 text-xs">
                    78% Research Active
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#4CAF50] mr-2"></div>
                  <span className="text-gray-300 text-xs">
                    346 Publications
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#2196F3] mr-2"></div>
                  <span className="text-gray-300 text-xs">
                    92% Student Satisfaction
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#9C27B0] mr-2"></div>
                  <span className="text-gray-300 text-xs">
                    28 Industry Partnerships
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Grid - New Improved Card Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <GraduationCap className="w-6 h-6 mr-2 text-[#f4bc45]" />
            Our Faculty Members
          </h2>
          <p className="text-gray-400">
            {filteredInstructors.length} Instructors Found
          </p>
        </div>

        {filteredInstructors.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center p-4 bg-[#112240] rounded-full mb-6">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No instructors found
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              We couldn't find any instructors matching your search criteria.
              Try adjusting your search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInstructors.map((instructor, index) => (
              <motion.div
                key={instructor._id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
              >
                {/* NEW ENHANCED CARD DESIGN */}
                <div className="group bg-[#112240] rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-[#f4bc45]/30 transition-all duration-300 h-full flex flex-col">
                  {/* Top Section with Image and Details */}
                  <div className="relative">
                    {/* Instructor Image with Gradient Overlay */}
                    <div className="relative h-64">
                      <Image
                        src={instructor.image}
                        alt={instructor.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-transparent opacity-80"></div>
                    </div>

                    {/* Instructor Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {/* Name and Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-[#f4bc45] transition-colors">
                        {instructor.name}
                      </h3>
                      <p className="text-[#f4bc45] font-medium mt-1">
                        {instructor.designation}
                      </p>

                      {/* Location and Year */}
                      <div className="flex items-center justify-between mt-2">
                        {instructor.location && (
                          <div className="flex items-center text-gray-300 text-sm">
                            <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                            {instructor.location}
                          </div>
                        )}
                        {instructor.joinedYear && (
                          <span className="text-gray-400 text-sm">
                            Since {instructor.joinedYear}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Education */}
                    <div className="flex items-center text-sm text-gray-300 mb-4 pb-4 border-b border-gray-800">
                      <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                      {instructor.education}
                    </div>

                    {/* Bio */}
                    <div className="mb-4 flex-grow">
                      <p
                        className={`text-gray-300 text-sm ${
                          expandedBio === instructor._id ? "" : "line-clamp-3"
                        }`}
                      >
                        {instructor.bio}
                      </p>
                      {instructor.bio.length > 120 && (
                        <button
                          onClick={() => toggleBio(instructor._id)}
                          className="text-[#f4bc45] text-xs mt-2 hover:underline focus:outline-none inline-flex items-center"
                        >
                          {expandedBio === instructor._id
                            ? "Show less"
                            : "Read more"}
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </button>
                      )}
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-[#0A192F] rounded-lg p-2 text-center">
                        <div className="text-[#f4bc45] text-base font-bold">
                          {instructor.courseCount}
                        </div>
                        <div className="text-gray-400 text-xs">Courses</div>
                      </div>
                      <div className="bg-[#0A192F] rounded-lg p-2 text-center">
                        <div className="text-[#f4bc45] text-base font-bold">
                          {instructor.studentCount > 1000
                            ? `${(instructor.studentCount / 1000).toFixed(1)}k`
                            : instructor.studentCount}
                        </div>
                        <div className="text-gray-400 text-xs">Students</div>
                      </div>
                      <div className="bg-[#0A192F] rounded-lg p-2 text-center">
                        <div className="text-[#f4bc45] text-base font-bold flex items-center justify-center">
                          {instructor.rating}
                          <svg
                            className="w-3 h-3 ml-0.5 text-[#f4bc45]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div className="text-gray-400 text-xs">Rating</div>
                      </div>
                    </div>

                    {/* Expertise Tags */}
                    {instructor.expertise &&
                      instructor.expertise.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {instructor.expertise.map((skill, i) => (
                            <span
                              key={i}
                              className="bg-[#0A192F] text-gray-300 text-xs px-2 py-1 rounded-md hover:bg-[#1D3557] transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>

                  {/* Footer with Profile Link */}
                  <div className="p-4 bg-[#0A192F]/60 border-t border-gray-800 flex items-center justify-between">
                    {/* Social Links */}
                    <div className="flex space-x-2">
                      {instructor.socialLinks?.linkedin && (
                        <a
                          href={instructor.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#f4bc45] transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}
                      {instructor.socialLinks?.twitter && (
                        <a
                          href={instructor.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#f4bc45] transition-colors"
                          aria-label="Twitter"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                      )}
                      {instructor.socialLinks?.website && (
                        <a
                          href={instructor.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#f4bc45] transition-colors"
                          aria-label="Website"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>

                    {/* Profile Link */}
                    <Link
                      href={`/instructor/${instructor._id}`}
                      className="flex items-center text-[#f4bc45] text-sm font-medium hover:underline group-hover:text-[#f4bc45] transition-colors"
                    >
                      View Profile
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Back to top button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-[#112240] hover:bg-[#1D3557] text-white p-3 rounded-full shadow-md transition-colors border border-gray-700 hover:border-[#f4bc45]/50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default InstructorsPage;
