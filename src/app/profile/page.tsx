"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaCamera,
  FaDownload,
  FaEdit,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaShoppingBag,
  FaStar,
  FaTrash,
  FaUser,
} from "react-icons/fa";

// Sample user data - in a real app, this would come from your authentication system
const userData = {
  id: "usr_123456",
  name: "Rahul Ahmed",
  email: "rahul.ahmed@example.com",
  phone: "+880 1712-345678",
  address: "123 Green Road, Dhaka 1205",
  avatar: "/images/avatars/user1.jpg",
  joinDate: "2022-08-15",
  completedCourses: 4,
  activeCourses: 2,
  wishlist: 7,
  orders: 5,
};

// Sample order data
const orderHistory = [
  {
    id: "ORD-12345",
    date: "2023-11-15",
    status: "Delivered",
    total: 1280,
    items: [
      { id: 1, name: "Chemistry Master Guide", quantity: 1, price: 380 },
      { id: 5, name: "Biddarthi Hoodie", quantity: 1, price: 950 },
    ],
  },
  {
    id: "ORD-12344",
    date: "2023-10-22",
    status: "Delivered",
    total: 760,
    items: [
      { id: 3, name: "Physics Formula Handbook", quantity: 2, price: 280 },
      { id: 4, name: "Scientific Calculator", quantity: 1, price: 200 },
    ],
  },
  {
    id: "ORD-12343",
    date: "2023-09-05",
    status: "Delivered",
    total: 550,
    items: [{ id: 2, name: "Biddarthi Logo T-shirt", quantity: 1, price: 550 }],
  },
];

// Sample course data
const enrolledCourses = [
  {
    id: "CRS-001",
    name: "HSC Chemistry Complete Course",
    progress: 85,
    instructor: "Milton Khandokar",
    lastAccessed: "2023-11-28",
    thumbnail: "/images/courses/chemistry.jpg",
    status: "active",
  },
  {
    id: "CRS-002",
    name: "HSC Physics Master Class",
    progress: 72,
    instructor: "Dr. Rahman",
    lastAccessed: "2023-11-25",
    thumbnail: "/images/courses/physics.jpg",
    status: "active",
  },
  {
    id: "CRS-003",
    name: "English Grammar Essentials",
    progress: 100,
    instructor: "Sarah Khan",
    lastAccessed: "2023-10-15",
    thumbnail: "/images/courses/english.jpg",
    status: "completed",
  },
  {
    id: "CRS-004",
    name: "Advanced Mathematics",
    progress: 100,
    instructor: "Prof. Mahmud",
    lastAccessed: "2023-09-20",
    thumbnail: "/images/courses/math.jpg",
    status: "completed",
  },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(userData);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your API
    setIsEditing(false);
    // Show success message or notification
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A192F] to-[#13284D] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#0A192F] rounded-xl border border-gray-800 overflow-hidden sticky top-24">
              {/* Profile Header */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-[#f4bc45]/20 to-[#f4bc45]/5"></div>
                <div className="absolute top-16 left-0 w-full flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-[#0A192F] overflow-hidden bg-gray-800">
                      <Image
                        src={profileData.avatar}
                        alt={profileData.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#f4bc45] text-[#0A192F] flex items-center justify-center">
                      <FaCamera size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-20 pb-6 px-6 text-center">
                <h1 className="text-xl font-bold text-white mb-1">
                  {profileData.name}
                </h1>
                <p className="text-gray-400 text-sm mb-4">
                  Member since {formatDate(profileData.joinDate)}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-[#0A192F]/50 border border-gray-800 rounded-lg p-3">
                    <div className="text-[#f4bc45] font-bold text-xl">
                      {profileData.activeCourses}
                    </div>
                    <div className="text-gray-400 text-xs">Active Courses</div>
                  </div>
                  <div className="bg-[#0A192F]/50 border border-gray-800 rounded-lg p-3">
                    <div className="text-[#f4bc45] font-bold text-xl">
                      {profileData.completedCourses}
                    </div>
                    <div className="text-gray-400 text-xs">Completed</div>
                  </div>
                  <div className="bg-[#0A192F]/50 border border-gray-800 rounded-lg p-3">
                    <div className="text-[#f4bc45] font-bold text-xl">
                      {profileData.orders}
                    </div>
                    <div className="text-gray-400 text-xs">Orders</div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
                      activeTab === "overview"
                        ? "bg-[#f4bc45]/10 text-[#f4bc45]"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <FaUser className="mr-3" />
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("courses")}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
                      activeTab === "courses"
                        ? "bg-[#f4bc45]/10 text-[#f4bc45]"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <FaStar className="mr-3" />
                    My Courses
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
                      activeTab === "orders"
                        ? "bg-[#f4bc45]/10 text-[#f4bc45]"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <FaShoppingBag className="mr-3" />
                    Order History
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
                      activeTab === "settings"
                        ? "bg-[#f4bc45]/10 text-[#f4bc45]"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <FaEdit className="mr-3" />
                    Edit Profile
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-[#0A192F] rounded-xl border border-gray-800 overflow-hidden">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-gray-800">
                    Profile Overview
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-[#0A192F]/50 border border-gray-800 rounded-lg p-5">
                      <h3 className="text-lg font-medium text-white mb-4">
                        Personal Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FaUser className="text-[#f4bc45] mt-1 mr-3" />
                          <div>
                            <div className="text-sm text-gray-400">
                              Full Name
                            </div>
                            <div className="text-white">{profileData.name}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FaEnvelope className="text-[#f4bc45] mt-1 mr-3" />
                          <div>
                            <div className="text-sm text-gray-400">
                              Email Address
                            </div>
                            <div className="text-white">
                              {profileData.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FaPhone className="text-[#f4bc45] mt-1 mr-3" />
                          <div>
                            <div className="text-sm text-gray-400">
                              Phone Number
                            </div>
                            <div className="text-white">
                              {profileData.phone}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="text-[#f4bc45] mt-1 mr-3" />
                          <div>
                            <div className="text-sm text-gray-400">Address</div>
                            <div className="text-white">
                              {profileData.address}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0A192F]/50 border border-gray-800 rounded-lg p-5">
                      <h3 className="text-lg font-medium text-white mb-4">
                        Account Summary
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">
                            Active Courses
                          </div>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                              <div
                                className="bg-[#f4bc45] h-2.5 rounded-full"
                                style={{
                                  width: `${
                                    (profileData.activeCourses /
                                      (profileData.activeCourses +
                                        profileData.completedCourses)) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-white">
                              {profileData.activeCourses}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">
                            Completed Courses
                          </div>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                              <div
                                className="bg-green-500 h-2.5 rounded-full"
                                style={{
                                  width: `${
                                    (profileData.completedCourses /
                                      (profileData.activeCourses +
                                        profileData.completedCourses)) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-white">
                              {profileData.completedCourses}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">
                            Wishlist Items
                          </div>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                              <div
                                className="bg-purple-500 h-2.5 rounded-full"
                                style={{
                                  width: `${Math.min(
                                    profileData.wishlist * 10,
                                    100
                                  )}%`,
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-white">
                              {profileData.wishlist}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400 mb-1">
                            Total Orders
                          </div>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                              <div
                                className="bg-blue-500 h-2.5 rounded-full"
                                style={{
                                  width: `${Math.min(
                                    profileData.orders * 20,
                                    100
                                  )}%`,
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-white">
                              {profileData.orders}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-800">
                        <h4 className="text-white font-medium mb-2">
                          Recent Activity
                        </h4>
                        <div className="space-y-2">
                          <div className="text-sm text-gray-400">
                            <span className="text-[#f4bc45]">•</span> Completed
                            a lesson in HSC Chemistry
                            <div className="text-xs text-gray-500">
                              2 days ago
                            </div>
                          </div>
                          <div className="text-sm text-gray-400">
                            <span className="text-[#f4bc45]">•</span> Purchased
                            Chemistry Master Guide
                            <div className="text-xs text-gray-500">
                              1 week ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0A192F]/50 border border-gray-800 rounded-lg p-5 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">
                        Recent Courses
                      </h3>
                      <button
                        onClick={() => setActiveTab("courses")}
                        className="text-sm text-[#f4bc45] hover:underline"
                      >
                        View All
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {enrolledCourses
                        .filter((course) => course.status === "active")
                        .slice(0, 2)
                        .map((course) => (
                          <div
                            key={course.id}
                            className="bg-[#0A192F] border border-gray-800 rounded-lg overflow-hidden flex"
                          >
                            <div className="w-24 h-24 flex-shrink-0 relative">
                              <Image
                                src={course.thumbnail}
                                alt={course.name}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3 flex-grow">
                              <h4 className="text-white font-medium text-sm line-clamp-2">
                                {course.name}
                              </h4>
                              <p className="text-gray-400 text-xs mb-2">
                                {course.instructor}
                              </p>
                              <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                                <div
                                  className="bg-[#f4bc45] h-1.5 rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">Progress</span>
                                <span className="text-white">
                                  {course.progress}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="bg-[#0A192F]/50 border border-gray-800 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">
                        Recent Orders
                      </h3>
                      <button
                        onClick={() => setActiveTab("orders")}
                        className="text-sm text-[#f4bc45] hover:underline"
                      >
                        View All
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 uppercase border-b border-gray-800">
                          <tr>
                            <th scope="col" className="px-4 py-3">
                              Order ID
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Date
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Status
                            </th>
                            <th scope="col" className="px-4 py-3 text-right">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderHistory.slice(0, 2).map((order) => (
                            <tr
                              key={order.id}
                              className="border-b border-gray-800 last:border-0"
                            >
                              <td className="px-4 py-3 font-medium text-white">
                                {order.id}
                              </td>
                              <td className="px-4 py-3 text-gray-400">
                                {formatDate(order.date)}
                              </td>
                              <td className="px-4 py-3">
                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-500">
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right text-[#f4bc45]">
                                ৳{order.total}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Courses Tab */}
              {activeTab === "courses" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-gray-800">
                    My Courses
                  </h2>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-4">
                      Active Courses
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {enrolledCourses
                        .filter((course) => course.status === "active")
                        .map((course) => (
                          <div
                            key={course.id}
                            className="bg-[#0A192F]/50 border border-gray-800 rounded-lg overflow-hidden"
                          >
                            <div className="h-40 relative">
                              <Image
                                src={course.thumbnail}
                                alt={course.name}
                                width={400}
                                height={160}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] to-transparent opacity-70"></div>
                              <div className="absolute bottom-3 left-4 right-4">
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-[#f4bc45] h-2 rounded-full"
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between items-center mt-1 text-xs text-white">
                                  <span>{course.progress}% complete</span>
                                  <span>
                                    Last accessed:{" "}
                                    {formatDate(course.lastAccessed)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="text-white font-medium mb-1">
                                {course.name}
                              </h4>
                              <p className="text-gray-400 text-sm mb-4">
                                Instructor: {course.instructor}
                              </p>
                              <Link href={`/courses/${course.id}`}>
                                <button className="w-full bg-[#f4bc45]/10 hover:bg-[#f4bc45]/20 text-[#f4bc45] py-2 rounded-lg text-sm font-medium transition-colors">
                                  Continue Learning
                                </button>
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">
                      Completed Courses
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {enrolledCourses
                        .filter((course) => course.status === "completed")
                        .map((course) => (
                          <div
                            key={course.id}
                            className="bg-[#0A192F]/50 border border-gray-800 rounded-lg overflow-hidden"
                          >
                            <div className="h-40 relative">
                              <Image
                                src={course.thumbnail}
                                alt={course.name}
                                width={400}
                                height={160}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] to-transparent opacity-70"></div>
                              <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                                Completed
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="text-white font-medium mb-1">
                                {course.name}
                              </h4>
                              <p className="text-gray-400 text-sm mb-4">
                                Instructor: {course.instructor}
                              </p>
                              <Link href={`/courses/${course.id}`}>
                                <button className="w-full bg-[#0A192F] border border-gray-700 hover:border-[#f4bc45]/30 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                                  Review Course
                                </button>
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-gray-800">
                    Order History
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-gray-400 uppercase border-b border-gray-800">
                        <tr>
                          <th scope="col" className="px-4 py-3">
                            Order ID
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Date
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Items
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Status
                          </th>
                          <th scope="col" className="px-4 py-3 text-right">
                            Total
                          </th>
                          <th scope="col" className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderHistory.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b border-gray-800 last:border-0"
                          >
                            <td className="px-4 py-4 font-medium text-white">
                              {order.id}
                            </td>
                            <td className="px-4 py-4 text-gray-400">
                              {formatDate(order.date)}
                            </td>
                            <td className="px-4 py-4 text-gray-400">
                              {order.items.length} items
                            </td>
                            <td className="px-4 py-4">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-500">
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-right text-[#f4bc45]">
                              ৳{order.total}
                            </td>
                            <td className="px-4 py-4 text-right">
                              <button
                                onClick={() => {
                                  // In a real app, this would open a modal with order details
                                  console.log("View order details:", order.id);
                                }}
                                className="text-sm text-[#f4bc45] hover:underline"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-gray-800">
                    Edit Profile
                  </h2>

                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={profileData.name.split(" ")[0]}
                            onChange={handleInputChange}
                            className="w-full bg-[#0A192F] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#f4bc45]/50 focus:border-transparent transition-all duration-200"
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Last Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            type="text"
                            name="lastName"
                            value={profileData.name
                              .split(" ")
                              .slice(1)
                              .join(" ")}
                            onChange={handleInputChange}
                            className="w-full bg-[#0A192F] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#f4bc45]/50 focus:border-transparent transition-all duration-200"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="w-full bg-[#0A192F] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#f4bc45]/50 focus:border-transparent transition-all duration-200"
                            placeholder="Email Address"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhone className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-[#0A192F] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#f4bc45]/50 focus:border-transparent transition-all duration-200"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaMapMarkerAlt className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          type="text"
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                          className="w-full bg-[#0A192F] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#f4bc45]/50 focus:border-transparent transition-all duration-200"
                          placeholder="Full Address"
                        />
                      </div>
                    </div>

                    <div className="border-t border-gray-800 pt-6 mb-6">
                      <h3 className="text-lg font-medium text-white mb-4">
                        Password
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaLock className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                              type="password"
                              name="currentPassword"
                              className="w-full bg-[#0A192F] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#f4bc45]/50 focus:border-transparent transition-all duration-200"
                              placeholder="Current Password"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              New Password
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-500" />
                              </div>
                              <input
                                type="password"
                                name="newPassword"
                                className="w-full bg-[#0A192F] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#f4bc45]/50 focus:border-transparent transition-all duration-200"
                                placeholder="New Password"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Confirm New Password
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-500" />
                              </div>
                              <input
                                type="password"
                                name="confirmPassword"
                                className="w-full bg-[#0A192F] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#f4bc45]/50 focus:border-transparent transition-all duration-200"
                                placeholder="Confirm New Password"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-800 pt-6 mb-6">
                      <h3 className="text-lg font-medium text-white mb-4">
                        Notification Preferences
                      </h3>
                      <div className="space-y-4">
                        <label className="flex items-start cursor-pointer group">
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-5 h-5 bg-[#0A192F] border border-gray-700 rounded group-hover:border-[#f4bc45]/50 transition-colors"></div>
                            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-[#f4bc45] rounded scale-0 group-hover:scale-75 transition-transform duration-200 peer-checked:scale-100">
                              <svg
                                className="w-4 h-4 text-[#0A192F]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <span className="ml-3">
                            <span className="block text-sm font-medium text-white">
                              Course updates
                            </span>
                            <span className="block text-xs text-gray-400">
                              Receive notifications about course content updates
                              and new materials.
                            </span>
                          </span>
                        </label>

                        <label className="flex items-start cursor-pointer group">
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-5 h-5 bg-[#0A192F] border border-gray-700 rounded group-hover:border-[#f4bc45]/50 transition-colors"></div>
                            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-[#f4bc45] rounded scale-0 peer-checked:scale-100 transition-transform duration-200">
                              <svg
                                className="w-4 h-4 text-[#0A192F]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <span className="ml-3">
                            <span className="block text-sm font-medium text-white">
                              Promotional emails
                            </span>
                            <span className="block text-xs text-gray-400">
                              Receive emails about special offers, discounts and
                              new courses.
                            </span>
                          </span>
                        </label>

                        <label className="flex items-start cursor-pointer group">
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-5 h-5 bg-[#0A192F] border border-gray-700 rounded group-hover:border-[#f4bc45]/50 transition-colors"></div>
                            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-[#f4bc45] rounded scale-0 peer-checked:scale-100 transition-transform duration-200">
                              <svg
                                className="w-4 h-4 text-[#0A192F]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <span className="ml-3">
                            <span className="block text-sm font-medium text-white">
                              Order status
                            </span>
                            <span className="block text-xs text-gray-400">
                              Receive notifications about your order status and
                              shipping updates.
                            </span>
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setProfileData(userData)}
                        className="px-6 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#f4bc45] text-[#0A192F] font-medium rounded-lg hover:bg-[#f4bc45]/90 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-gray-800">
                    Security Settings
                  </h2>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-white mb-4">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-[#0A192F]/50 border border-gray-800 rounded-lg">
                      <div>
                        <p className="text-white font-medium">
                          Protect your account with 2FA
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Add an extra layer of security to your account by
                          requiring both your password and authentication code.
                        </p>
                      </div>
                      <div className="ml-4">
                        <button className="px-4 py-2 bg-[#f4bc45]/10 text-[#f4bc45] font-medium rounded-lg hover:bg-[#f4bc45]/20 transition-colors">
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-white mb-4">
                      Login Sessions
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-[#0A192F]/50 border border-gray-800 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">
                              Current Session
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                              Dhaka, Bangladesh • Chrome on Windows
                            </p>
                          </div>
                          <div className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-500">
                            Active Now
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-[#0A192F]/50 border border-gray-800 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Mobile App</p>
                            <p className="text-sm text-gray-400 mt-1">
                              Dhaka, Bangladesh • Biddarthi App on Android
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-400 mr-3">
                              3 days ago
                            </span>
                            <button className="text-red-500 hover:text-red-400 text-sm font-medium">
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">
                      Account Actions
                    </h3>
                    <div className="space-y-4">
                      <button className="w-full text-left p-4 bg-[#0A192F]/50 border border-gray-800 rounded-lg flex items-center justify-between hover:border-yellow-500/30 transition-colors">
                        <div>
                          <p className="text-white font-medium">
                            Export Your Data
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            Download a copy of your personal data including
                            profile, courses, and orders.
                          </p>
                        </div>
                        <div className="ml-4 text-yellow-500">
                          <FaDownload />
                        </div>
                      </button>
                      <button className="w-full text-left p-4 bg-[#0A192F]/50 border border-gray-800 rounded-lg flex items-center justify-between hover:border-red-500/30 transition-colors">
                        <div>
                          <p className="text-white font-medium">
                            Delete Account
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            Permanently delete your account and all associated
                            data.
                          </p>
                        </div>
                        <div className="ml-4 text-red-500">
                          <FaTrash />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
