"use client";

import { motion } from "framer-motion";
import {
  Download,
  FileText,
  Image as ImageIcon,
  Loader2,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define types for materials
type Material = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: "pdf" | "image";
  courseId: string | null; // null means available for all students
  courseName?: string;
  uploadedAt: string;
};

type UserStatus = {
  isLoggedIn: boolean;
  enrolledCourseIds: string[];
};

export default function MaterialPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [userStatus, setUserStatus] = useState<UserStatus>({
    isLoggedIn: false,
    enrolledCourseIds: [],
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "public" | "enrolled">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch materials and user status
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch materials
        const materialsRes = await fetch("/api/materials");
        const materialsData = await materialsRes.json();

        // Fetch user enrollment status
        const userStatusRes = await fetch("/api/user/status");
        const userStatusData = await userStatusRes.json();

        setMaterials(materialsData);
        setUserStatus(userStatusData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter materials based on user access and search term
  const filteredMaterials = materials.filter((material) => {
    // Filter by access level
    if (filter === "public" && material.courseId !== null) return false;
    if (
      filter === "enrolled" &&
      (material.courseId === null ||
        !userStatus.enrolledCourseIds.includes(material.courseId))
    )
      return false;

    // Filter by search term
    if (
      searchTerm &&
      !material.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;

    return true;
  });

  // Check if user has access to a material
  const hasAccess = (material: Material) => {
    return (
      material.courseId === null ||
      userStatus.enrolledCourseIds.includes(material.courseId)
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#0A192F] pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Study Materials
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access and download study materials to enhance your learning
            experience.
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 px-4 py-2 rounded-lg bg-[#13284D] border border-gray-600 text-white focus:outline-none focus:border-[#f4bc45]"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "all"
                  ? "bg-[#f4bc45] text-[#13284D] font-medium"
                  : "bg-[#13284D] text-gray-300 hover:bg-opacity-80"
              }`}
            >
              All Materials
            </button>
            <button
              onClick={() => setFilter("public")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "public"
                  ? "bg-[#f4bc45] text-[#13284D] font-medium"
                  : "bg-[#13284D] text-gray-300 hover:bg-opacity-80"
              }`}
            >
              Public Only
            </button>
            <button
              onClick={() => setFilter("enrolled")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "enrolled"
                  ? "bg-[#f4bc45] text-[#13284D] font-medium"
                  : "bg-[#13284D] text-gray-300 hover:bg-opacity-80"
              }`}
            >
              My Materials
            </button>
          </div>
        </div>

        {/* Materials Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-8 h-8 text-white" />
          </div>
        ) : filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#13284D] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-medium text-white">
                      {material.title}
                    </h3>
                    {material.fileType === "pdf" ? (
                      <FileText className="text-[#f4bc45] w-6 h-6" />
                    ) : (
                      <ImageIcon className="text-[#f4bc45] w-6 h-6" />
                    )}
                  </div>

                  <p className="text-gray-300 mb-4 text-sm line-clamp-2">
                    {material.description}
                  </p>

                  {material.courseId && (
                    <div className="mb-4">
                      <span className="text-xs font-medium bg-[#0A192F] text-gray-300 px-2 py-1 rounded-full">
                        {material.courseName}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {formatDate(material.uploadedAt)}
                    </span>

                    {hasAccess(material) ? (
                      <a
                        href={material.fileUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#f4bc45] text-[#13284D] px-3 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-gray-400 text-sm">
                          <Lock className="w-4 h-4" /> Enrolled students only
                        </span>
                        <Link
                          href={`/courses/${material.courseId}`}
                          className="text-[#f4bc45] text-sm hover:underline"
                        >
                          Enroll
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-300 mt-12"
          >
            {searchTerm ? (
              <p>No materials found matching "{searchTerm}".</p>
            ) : (
              <p>No materials available in this category.</p>
            )}
          </motion.div>
        )}

        {/* Not logged in message */}
        {!userStatus.isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-6 bg-[#13284D] rounded-lg border border-gray-700"
          >
            <h3 className="text-xl font-medium text-white mb-2">
              Access More Materials
            </h3>
            <p className="text-gray-300 mb-4">
              Sign in to access course-specific materials and track your
              progress.
            </p>
            <Link
              href="/login"
              className="inline-block bg-[#f4bc45] text-[#13284D] px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Sign In
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
