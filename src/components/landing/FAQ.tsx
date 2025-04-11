"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

// FAQ data
const faqs = [
  {
    id: 1,
    question: "Why should we take courses from Biddarthy?",
    answer:
      "Biddarthy offers comprehensive study materials, experienced instructors, and proven success records. Our courses are specifically designed to help students excel in their admission tests with structured learning paths and regular practice tests.",
  },
  {
    id: 2,
    question: "How are Biddarthy's courses different from others?",
    answer:
      "Our courses stand out through personalized attention, updated study materials, interactive learning sessions, and continuous assessment systems. We focus on both conceptual understanding and exam techniques.",
  },
  {
    id: 3,
    question: "What support do students get after enrollment?",
    answer:
      "Students receive access to video lectures, study materials, practice questions, mock tests, doubt-clearing sessions, and one-on-one mentoring. We also provide regular performance tracking and feedback.",
  },
  {
    id: 4,
    question: "Is there any demo class available before enrollment?",
    answer:
      "Yes, we offer demo classes for all our courses. This helps students understand our teaching methodology and course structure before making a decision.",
  },
  {
    id: 5,
    question: "What is the success rate of Biddarthy's students?",
    answer:
      "We maintain a consistently high success rate with many of our students securing positions in top medical colleges and universities. Our track record shows excellent results in various competitive exams.",
  },
];

const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      className={`border-b border-gray-700 overflow-hidden ${
        isOpen ? "bg-[#13284D]/50 rounded-lg" : ""
      }`}
      initial={false}
      animate={{
        backgroundColor: isOpen
          ? "rgba(19, 40, 77, 0.5)"
          : "rgba(19, 40, 77, 0)",
        borderRadius: isOpen ? "0.5rem" : "0",
      }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="w-full py-6 px-4 text-left flex justify-between items-center focus:outline-none group"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span
          className={`text-lg font-medium transition-colors duration-300 ${
            isOpen ? "text-[#f4bc45]" : "text-white group-hover:text-[#f4bc45]"
          }`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`flex items-center justify-center h-8 w-8 rounded-full ${
            isOpen
              ? "bg-[#f4bc45] text-[#13284D]"
              : "bg-[#13284D] text-[#f4bc45]"
          } transition-colors duration-300`}
        >
          <IoIosArrowDown className="text-xl" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 text-gray-300 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(1); // First FAQ open by default

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A192F] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#f4bc45]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f4bc45]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="text-[#f4bc45]">Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our courses and learning
            process
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-[#13284D] to-[#13284D]/70 rounded-xl p-6 shadow-lg border border-gray-700/50 backdrop-blur-sm"
        >
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openId === faq.id}
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Additional help text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-gray-400">
            Still have questions?{" "}
            <a
              href="/contact"
              className="text-[#f4bc45] hover:text-[#f4bc45]/80 transition-colors font-medium"
            >
              Contact us
            </a>{" "}
            for more information.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
