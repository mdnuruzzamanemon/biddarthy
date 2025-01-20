'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import bannerImg from "../app/client/images/bannerimg.jpg"

const Banner = () => {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const textArray = [
    'Medical Admission Preparation',
    'University Admission Preparation',
    'Job Preparation',
    'Skill Development Courses'
  ]

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % textArray.length
      const fullText = textArray[current]

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 30 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed, textArray])

  return (
    <div className="relative min-h-[100vh] flex items-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background with blur effect */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bannerImg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(.5px)'
        }}
      />

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#13284D] via-[#13284D]/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-left px-8 md:px-16 lg:px-24 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-white"
        >
          Welcome to Biddarthy
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-4 text-white"
        >
          What can you learn here?
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-3xl font-semibold text-yellow-400 min-h-[60px] mb-8"
        >
          <span className="inline-block min-h-[1em]">{text}</span>
          <span className="animate-pulse">|</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            href="/courses"
            className="inline-block bg-white text-[#13284D] px-8 py-3 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View Courses
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Banner
