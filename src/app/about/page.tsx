'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa'

import miltonImg from "@/app/client/images/milton.jpg"

const AboutPage = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: 'https://facebook.com/miltonkhandokar',
      color: 'hover:text-blue-500'
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      url: 'https://youtube.com/@miltonkhandokar',
      color: 'hover:text-red-500'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/miltonkhandokar',
      color: 'hover:text-blue-400'
    }
  ]

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
            About Our Instructor
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
           {" Meet the expert behind Biddarthi's success"}
          </p>
        </motion.div>

        {/* Instructor Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={miltonImg} // Add instructor image to public folder
                alt="Milton Khandokar"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Social Links */}
            <div className="absolute bottom-4 left-4 flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-white/10 backdrop-blur-sm p-3 rounded-full text-white transition-colors ${social.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Milton Khandokar
              </h2>
              <p className="text-green-400 text-lg">
                Lead Instructor & Founder
              </p>
            </div>

            <div className="space-y-4 text-gray-300">
              <p>
              medical and engineering university admissions as well as general university admission preparation. His unique teaching methodology has helped thousands of students achieve their academic goals.

As the founder of Biddarthy, he has developed comprehensive study materials and innovative teaching techniques that make complex topics easy to understand. His dedication to student success has made him one of the most respected educators in Bangladesh.
              </p>

              <p>
              Milton Khandokar holds a BSc in Textile Engineering from BUTEX and has extensive experience as a Chemistry Lecturer at BP Dream School.
              </p>

              <div className="space-y-2">
                <h3 className="text-white font-semibold">Specializations:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Engineering Admission Test Preparation</li>
                  <li>University Admission Guidance</li>
                  <li>Mathematics and Science Education</li>
                  <li>Strategic Exam Preparation</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-white font-semibold">Previously worked as:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ex-Chemistry Lecturer at Udvash Academic and Admission Care (2 years)</li>
                  <li>Ex-Chemistry Instructor at 10 Minute School (1 year)</li>
                  <li>Ex-Chemistry Instructor at Battles of Biology (8 months)</li>
                </ul>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-green-400 pl-4 italic text-gray-300">
              "My goal is to make quality education accessible to every aspiring student
              and help them achieve their dreams through dedicated guidance and support."
            </blockquote>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage 