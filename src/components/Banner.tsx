'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import bannerImg from "../app/client/images/bannerimg.jpg"

const Banner = () => {
  return (
    <div className="relative w-full">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="relative w-full"
      >
        <div className="relative w-full" style={{ paddingTop: 'auto' }}>
          <Image
            src={bannerImg}
            alt="Biddarthy Banner"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent" />
      </motion.div>
    </div>
  )
}

export default Banner
