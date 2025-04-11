"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, ExternalLink, Loader2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Instructor = {
  _id: string;
  name: string;
  designation: string;
  image: string;
  bio?: string;
  location?: string;
  expertise?: string[];
  education?: string;
  rating?: number;
  courseCount?: number;
  studentCount?: number;
  joinedYear?: string;
  featured?: boolean;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
};

const InstructorsList = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedBio, setExpandedBio] = useState<string | null>(null);

  // Sample instructors data with enhanced information
  const sampleInstructors: Instructor[] = [
    {
      _id: "1",
      name: "Dr. Rajesh Sharma",
      designation: "Senior Professor of Computer Science",
      image: "/images/instructors/instructor1.jpg",
      bio: "Dr. Sharma has over 15 years of experience in computer science education and research. His teaching focuses on practical applications of theoretical concepts, helping students develop real-world problem-solving skills.",
      location: "New Delhi, India",
      expertise: ["Machine Learning", "Data Structures", "Algorithms"],
      education: "Ph.D. from Stanford University",
      rating: 4.9,
      courseCount: 7,
      studentCount: 12580,
      joinedYear: "2019",
      featured: true,
      socialLinks: {
        linkedin: "https://linkedin.com/in/rajesh-sharma",
        twitter: "https://twitter.com/rajeshsharma",
      },
    },
    {
      _id: "2",
      name: "Prof. Meena Gupta",
      designation: "Associate Professor of Data Science",
      image: "/images/instructors/instructor2.jpg",
      bio: "Prof. Gupta specializes in data science and has worked with leading tech companies. She brings industry experience to her teaching, ensuring students learn the most relevant skills for today's job market.",
      location: "Bengaluru, India",
      expertise: ["Data Science", "Python", "Statistics"],
      education: "Ph.D. from UC Berkeley",
      rating: 4.8,
      courseCount: 5,
      studentCount: 8750,
      joinedYear: "2020",
      featured: true,
      socialLinks: {
        linkedin: "https://linkedin.com/in/meena-gupta",
        website: "https://meenagupta.com",
      },
    },
    {
      _id: "3",
      name: "Ankit Patel",
      designation: "Web Development Instructor",
      image: "/images/instructors/instructor3.jpg",
      bio: "Ankit is a full-stack developer with expertise in modern web technologies. His interactive teaching style and project-based approach have made him a favorite among students looking to break into web development.",
      location: "Mumbai, India",
      expertise: ["React", "Node.js", "JavaScript"],
      education: "M.S. from MIT",
      rating: 4.7,
      courseCount: 4,
      studentCount: 6320,
      joinedYear: "2021",
      socialLinks: {
        linkedin: "https://linkedin.com/in/ankit-patel",
        twitter: "https://twitter.com/ankitp",
      },
    },
    {
      _id: "4",
      name: "Dr. Sunita Rao",
      designation: "AI Research Scientist",
      image: "/images/instructors/instructor4.jpg",
      bio: "Dr. Rao leads AI research and has published several papers in top conferences. She specializes in making complex AI concepts accessible to students of all levels, from beginners to advanced practitioners.",
      location: "Hyderabad, India",
      expertise: [
        "Artificial Intelligence",
        "Neural Networks",
        "Deep Learning",
      ],
      education: "Ph.D. from Cambridge University",
      rating: 4.9,
      courseCount: 6,
      studentCount: 9450,
      joinedYear: "2020",
      featured: true,
      socialLinks: {
        linkedin: "https://linkedin.com/in/sunita-rao",
        website: "https://sunitarao.ai",
      },
    },
  ];

  useEffect(() => {
    // Here you would typically fetch instructors from your API
    const fetchInstructors = async () => {
      try {
        // Replace with actual API call
        // const res = await fetch('/api/instructors');
        // const data = await res.json();
        // setInstructors(data);

        // Using sample data instead
        setTimeout(() => {
          setInstructors(sampleInstructors);
          setLoading(false);
        }, 600);
      } catch (error) {
        console.error("Error fetching instructors:", error);
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const toggleBio = (id: string) => {
    if (expandedBio === id) {
      setExpandedBio(null);
    } else {
      setExpandedBio(id);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 w-full bg-[#0A192F]">
        <Loader2 className="animate-spin w-8 h-8 text-[#f4bc45]" />
      </div>
    );
  }

  // Separate featured instructors
  const featuredInstructors = instructors.filter((inst) => inst.featured);
  const regularInstructors = instructors.filter((inst) => !inst.featured);

  return (
    <div className="bg-[#0A192F]">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3 text-center">
            Meet Our Expert Instructors
          </h2>
          <div className="w-24 h-1 bg-[#f4bc45] rounded-full mb-6"></div>
          <p className="text-gray-300 max-w-2xl text-center">
            Learn from industry professionals and academic experts who bring
            years of experience to their teaching, ensuring you receive the
            highest quality education.
          </p>
        </div>

        {/* Featured Instructors */}
        {featuredInstructors.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center">
              <Award className="w-5 h-5 mr-2 text-[#f4bc45]" />
              Featured Faculty
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredInstructors.map((instructor, index) => (
                <motion.div
                  key={instructor._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Featured Badge */}
                  <div className="absolute -top-3 -right-3 z-10 bg-[#f4bc45] text-[#0A192F] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Featured Faculty
                  </div>

                  <div className="bg-gradient-to-b from-[#112240] to-[#1D3557] rounded-xl overflow-hidden shadow-lg hover:shadow-[#f4bc45]/20 transition-all duration-300 h-full flex flex-col border border-gray-800 group-hover:border-[#f4bc45]/30">
                    {/* Top Section with Image and Name */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-transparent to-transparent z-10"></div>
                      <div className="h-48 w-full overflow-hidden relative">
                        <Image
                          src={instructor.image}
                          alt={instructor.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-4 z-20">
                        <div className="flex items-end gap-3">
                          <div className="relative w-16 h-16 border-2 border-[#f4bc45] rounded-lg overflow-hidden shadow-lg">
                            <Image
                              src={instructor.image}
                              alt={instructor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <Link href={`/instructor/${instructor._id}`}>
                              <h3 className="text-xl font-bold text-white group-hover:text-[#f4bc45] transition-colors">
                                {instructor.name}
                              </h3>
                            </Link>
                            <p className="text-[#f4bc45] text-sm">
                              {instructor.designation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Content */}
                    <div className="p-5 flex-grow">
                      {/* Location */}
                      {instructor.location && (
                        <div className="flex items-center text-gray-400 text-sm mb-3">
                          <MapPin className="w-4 h-4 mr-1.5 text-gray-500" />
                          {instructor.location}
                        </div>
                      )}

                      {/* Bio */}
                      {instructor.bio && (
                        <div className="mb-4">
                          <p
                            className={`text-gray-300 text-sm ${
                              expandedBio === instructor._id
                                ? ""
                                : "line-clamp-3"
                            }`}
                          >
                            {instructor.bio}
                          </p>
                          {instructor.bio.length > 150 && (
                            <button
                              onClick={() => toggleBio(instructor._id)}
                              className="text-[#f4bc45] text-xs mt-1 hover:underline focus:outline-none"
                            >
                              {expandedBio === instructor._id
                                ? "Show less"
                                : "Read more"}
                            </button>
                          )}
                        </div>
                      )}

                      {/* Academic Info */}
                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <div className="bg-[#0A192F] rounded-full p-1 mr-2">
                          <svg
                            className="w-4 h-4 text-[#f4bc45]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        {instructor.education}
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-[#0A192F] rounded-lg p-2 text-center">
                          <div className="text-[#f4bc45] text-lg font-bold">
                            {instructor.courseCount}
                          </div>
                          <div className="text-gray-400 text-xs">Courses</div>
                        </div>
                        <div className="bg-[#0A192F] rounded-lg p-2 text-center">
                          <div className="text-[#f4bc45] text-lg font-bold">
                            {instructor.studentCount
                              ? instructor.studentCount > 1000
                                ? `${(instructor.studentCount / 1000).toFixed(
                                    1
                                  )}k`
                                : instructor.studentCount
                              : "0"}
                          </div>
                          <div className="text-gray-400 text-xs">Students</div>
                        </div>
                        <div className="bg-[#0A192F] rounded-lg p-2 text-center">
                          <div className="text-[#f4bc45] text-lg font-bold flex items-center justify-center">
                            {instructor.rating}
                            <svg
                              className="w-3 h-3 ml-0.5 text-[#f4bc45]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <div className="text-gray-400 text-xs">Rating</div>
                        </div>
                      </div>

                      {/* Expertise */}
                      {instructor.expertise && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {instructor.expertise.map((skill, i) => (
                            <span
                              key={i}
                              className="bg-[#0A192F] text-gray-300 text-xs px-2 py-1 rounded-md border border-gray-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-800 flex items-center justify-between">
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

                      <Link
                        href={`/instructor/${instructor._id}`}
                        className="flex items-center text-[#f4bc45] text-sm font-medium hover:underline group/link"
                      >
                        <span>View Courses</span>
                        <BookOpen className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>

                    {/* Faculty Since Badge */}
                    {instructor.joinedYear && (
                      <div className="absolute top-3 left-3 bg-[#0A192F]/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-md border border-gray-700">
                        Faculty since {instructor.joinedYear}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Instructors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {regularInstructors.map((instructor, index) => (
            <motion.div
              key={instructor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
            >
              <div className="bg-[#112240] rounded-xl overflow-hidden shadow-lg hover:shadow-[#f4bc45]/20 transition-all duration-300 h-full border border-gray-800 hover:border-gray-700">
                {/* Top Section */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-[#112240]/20 to-transparent"></div>

                  {instructor.education && (
                    <div className="absolute bottom-3 left-3 bg-[#0A192F]/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                      {instructor.education.split(",")[0]}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <Link href={`/instructor/${instructor._id}`}>
                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-[#f4bc45] transition-colors">
                      {instructor.name}
                    </h3>
                  </Link>
                  <p className="text-[#f4bc45] text-sm mb-3">
                    {instructor.designation}
                  </p>

                  {/* Location & Stats */}
                  {instructor.location && (
                    <div className="flex items-center text-gray-400 text-xs mb-3">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {instructor.location}

                      {instructor.courseCount && (
                        <>
                          <span className="mx-2">•</span>
                          <BookOpen className="w-3.5 h-3.5 mr-1" />
                          {instructor.courseCount} Courses
                        </>
                      )}
                    </div>
                  )}

                  {/* Bio */}
                  {instructor.bio && (
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                      {instructor.bio}
                    </p>
                  )}

                  {/* Expertise */}
                  {instructor.expertise && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {instructor.expertise.slice(0, 2).map((skill, i) => (
                        <span
                          key={i}
                          className="bg-[#0A192F] text-gray-300 text-xs px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {instructor.expertise.length > 2 && (
                        <span className="bg-[#0A192F] text-gray-300 text-xs px-2 py-0.5 rounded">
                          +{instructor.expertise.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-5 pb-5 pt-1 flex justify-between items-center">
                  <div className="flex space-x-1.5">
                    {instructor.socialLinks?.linkedin && (
                      <a
                        href={instructor.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#f4bc45] transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg
                          className="w-4 h-4"
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
                          className="w-4 h-4"
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
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/instructor/${instructor._id}`}
                    className="text-[#f4bc45] text-xs font-medium hover:underline"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Instructors Button */}
        <div className="mt-12 text-center">
          <Link
            href="/instructors"
            className="inline-flex items-center bg-[#112240] hover:bg-[#1A365D] text-white px-6 py-3 rounded-lg transition-colors group border border-gray-700 hover:border-[#f4bc45]/50"
          >
            <span className="group-hover:mr-2 transition-all duration-300">
              View All Instructors
            </span>
            <svg
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstructorsList;
