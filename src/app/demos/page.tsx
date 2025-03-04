'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Pagination from '@/components/Pagination'
import { Loader2 } from 'lucide-react'


// API Helper Function
const fetchDemoVideos = async () => {
  try {
    const res = await fetch('/api/demoVideos')
    if (!res.ok) throw new Error('Failed to fetch demo videos')
    return await res.json()
  } catch (error) {
    console.error(error)
    return []
  }
}

const DemosPage = () => {
  const [demoVideos, setDemoVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // Show 6 videos per page

  // Fetch demo videos from API
  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await fetchDemoVideos()
        setDemoVideos(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    getVideos()
  }, [])

  // Calculate pagination
  const indexOfLastVideo = currentPage * itemsPerPage
  const indexOfFirstVideo = indexOfLastVideo - itemsPerPage
  const currentVideos = demoVideos.slice(indexOfFirstVideo, indexOfLastVideo)

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
            Demo Classes
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch our demo classes to get a taste of our teaching methodology
          </p>
        </motion.div>

        {/* Loading and Error States */}
        {loading && (<div className="flex bg-[#0A192F] justify-center items-center ">
        <Loader2 className="animate-spin w-8 h-8 text-white" />
      </div>)}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Videos Grid */}
        {!loading && !error && demoVideos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentVideos.map((video: any) => (
              <motion.div
                key={video._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#13284D] rounded-lg overflow-hidden shadow-lg"
              >
                {/* YouTube Video Embed */}
                <div className="relative pt-[56.25%]">
                  <iframe
                    src={video.videoLink}
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
                    <span>{video.category.categoryName}</span>
                    <span>{video.instructor}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && demoVideos.length > itemsPerPage && (
          <Pagination
            totalItems={demoVideos.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        {/* No Videos Message */}
        {!loading && demoVideos.length === 0 && (
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
