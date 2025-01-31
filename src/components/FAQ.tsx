'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosArrowDown } from 'react-icons/io'

// FAQ data
const faqs = [
  {
    id: 1,
    question: "Why should we take courses from Biddarthy?",
    answer: "Biddarthy offers comprehensive study materials, experienced instructors, and proven success records. Our courses are specifically designed to help students excel in their admission tests with structured learning paths and regular practice tests."
  },
  {
    id: 2,
    question: "How are Biddarthy's courses different from others?",
    answer: "Our courses stand out through personalized attention, updated study materials, interactive learning sessions, and continuous assessment systems. We focus on both conceptual understanding and exam techniques."
  },
  {
    id: 3,
    question: "What support do students get after enrollment?",
    answer: "Students receive access to video lectures, study materials, practice questions, mock tests, doubt-clearing sessions, and one-on-one mentoring. We also provide regular performance tracking and feedback."
  },
  {
    id: 4,
    question: "Is there any demo class available before enrollment?",
    answer: "Yes, we offer demo classes for all our courses. This helps students understand our teaching methodology and course structure before making a decision."
  },
  {
    id: 5,
    question: "What is the success rate of Biddarthy's students?",
    answer: "We maintain a consistently high success rate with many of our students securing positions in top medical colleges and universities. Our track record shows excellent results in various competitive exams."
  }
]

const FAQItem = ({ question, answer, isOpen, onClick }: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) => {
  return (
    <div className="border-b border-gray-700">
      <button
        className="w-full py-6 text-left flex justify-between items-center focus:outline-none"
        onClick={onClick}
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <IoIosArrowDown 
          className={`text-white text-xl transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-300">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(1) // First FAQ open by default

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A192F]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our courses and learning process
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#13284D] rounded-lg p-6 shadow-lg"
        >
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ 