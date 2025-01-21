'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Pagination from '@/components/Pagination'

// Mock demo videos data (replace with API data later)
const demoVideos = [
  {
    id: 1,
    title: 'Medical Admission Test Preparation - Demo Class 1',
    videoId: 'your-youtube-video-id-1',
    category: 'Medical',
    instructor: 'Dr. John Doe'
  },
  {
    id: 2,
    title: 'University Admission Mathematics - Demo Class',
    videoId: 'your-youtube-video-id-2',
    category: 'University',
    instructor: 'Prof. Jane Smith'
  },
  // Add more demo videos...
]

const DemosPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // Show 6 videos per page

  // Calculate pagination
  const indexOfLastVideo = currentPage * itemsPerPage
  const indexOfFirstVideo = indexOfLastVideo - itemsPerPage
  const currentVideos = demoVideos.slice(indexOfFirstVideo, indexOfLastVideo)

  return (
    <div className="min-h-screen bg-[#0A192F] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Demo Classes
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Watch our demo classes to get a taste of our teaching methodology
          </p>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentVideos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#13284D] rounded-lg overflow-hidden shadow-lg"
            >
              {/* YouTube Video Embed */}
              <div className="relative pt-[56.25%]">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <span>{video.category}</span>
                  <span>{video.instructor}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {demoVideos.length > itemsPerPage && (
          <Pagination
            totalItems={demoVideos.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        {/* No Videos Message */}
        {demoVideos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-300 mt-12"
          >
            No demo videos available at the moment.
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default DemosPage 