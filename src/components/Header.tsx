'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Lottie from 'lottie-react'
import chemistryAnimation from '../animations/Animation - 1737788326125.json'

const Header = () => {
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
        <div className="relative min-h-[95vh] flex items-center overflow-hidden px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#13284D] to-[#0A192F]">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto w-full">
                {/* Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold mb-8 text-white"
                    >
                        Welcome to Biddarthy
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl md:text-3xl mb-6 text-white"
                    >
                        What can you learn here?
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-3xl md:text-4xl font-semibold text-yellow-400 min-h-[80px] mb-10"
                    >
                        <span className="inline-block min-h-[1.2em]">{text}</span>
                        <span className="animate-pulse">|</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mb-8 lg:mb-0"
                    >
                        <Link
                            href="/courses"
                            className="inline-block bg-white text-[#13284D] px-10 py-4 rounded-full font-semibold text-xl hover:bg-opacity-90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            View Courses
                        </Link>
                    </motion.div>
                </div>

                {/* Lottie Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-2xl mx-auto"
                >
                    <Lottie
                        animationData={chemistryAnimation}
                        loop={true}
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default Header 