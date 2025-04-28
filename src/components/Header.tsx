"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import chemistryAnimation from "../animations/Animation - 1737788326125.json";

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Header = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const textArray = [
      "SSC Exam Preparation",
      "HSC Exam Preparation",
      "University Admission Preparation",
      "Engineering Admission Preparation",
    ];

    const handleTyping = () => {
      const current = loopNum % textArray.length;
      const fullText = textArray[current];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A192F] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Welcome to Biddarthi
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              {text}
              <span className="animate-pulse">|</span>
            </motion.p>
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
            {isMounted && (
              <Lottie animationData={chemistryAnimation} loop={true} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;
