"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Lottie from "lottie-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import chemistryAnimation from "../animations/Animation - 1737788326125.json";

const Header = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const phrases = [
    "Unlock your potential",
    "Master your subjects",
    "Achieve your dreams",
    "Excel in academics",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0A192F] px-4 sm:px-6 lg:px-8"
    >
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0A192F]">
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow"
                style={{
                  backgroundColor:
                    i % 2 === 0
                      ? "rgba(244, 188, 69, 0.15)"
                      : "rgba(66, 133, 244, 0.1)",
                  width: `${Math.random() * 40 + 10}vw`,
                  height: `${Math.random() * 40 + 10}vw`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Diagonal split design */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] via-[#13284D] to-[#0A192F]"></div>
        <div className="absolute inset-0">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="headerGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f4bc45" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#f4bc45" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#f4bc45" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <polygon points="0,100 100,0 100,100" fill="url(#headerGradient)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ opacity }}
            className="flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-block px-4 py-1 bg-[#f4bc45]/10 border border-[#f4bc45]/20 rounded-full text-[#f4bc45] text-sm font-medium mb-4">
                The future of education
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6">
                Biddarthi
              </h1>

              <div className="h-20 overflow-hidden relative">
                {phrases.map((phrase, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: currentPhrase === index ? 1 : 0,
                      y: currentPhrase === index ? 0 : 50,
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute text-3xl md:text-4xl text-[#f4bc45] font-light"
                  >
                    {phrase}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-gray-300 mb-12 max-w-xl"
            >
              A revolutionary approach to education that transforms how you
              learn, prepare, and succeed in your academic journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-6"
            >
              <Link
                href="/courses"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium overflow-hidden"
              >
                <span className="absolute w-full h-full bg-[#f4bc45] rounded-md"></span>
                <span className="absolute w-full h-full bg-[#0A192F] rounded-md translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative flex items-center text-[#f4bc45] group-hover:text-[#f4bc45] transition-colors duration-300">
                  Start Learning
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href="/about"
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white hover:text-[#f4bc45] border border-white/20 hover:border-[#f4bc45]/50 rounded-md transition-colors duration-300"
              >
                Discover More
              </Link>
            </motion.div>
          </motion.div>

          {/* Right content - Animation */}
          <motion.div style={{ y }} className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              className="relative"
            >
              {/* Decorative elements */}
              <div className="absolute -inset-4 border border-[#f4bc45]/20 rounded-xl transform rotate-6"></div>
              <div className="absolute -inset-8 border border-[#f4bc45]/10 rounded-xl transform -rotate-3"></div>

              {/* Animation container */}
              <div className="relative bg-gradient-to-br from-[#13284D] to-[#0A192F] p-6 rounded-xl border border-[#f4bc45]/30 shadow-[0_0_50px_rgba(244,188,69,0.1)]">
                <Lottie
                  animationData={chemistryAnimation}
                  loop={true}
                  className="w-full h-full max-w-md mx-auto"
                />

                {/* Floating elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/4 -left-6 w-12 h-12 bg-[#f4bc45]/10 rounded-full backdrop-blur-md"
                ></motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute bottom-1/4 -right-6 w-8 h-8 bg-[#f4bc45]/10 rounded-full backdrop-blur-md"
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-[#f4bc45] rounded-full mt-2"
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Header;
