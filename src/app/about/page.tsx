"use client";

import miltonImg from "@/app/client/images/milton.jpg";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FaChalkboardTeacher,
  FaFacebook,
  FaFlask,
  FaGlobe,
  FaQuoteLeft,
  FaUniversity,
  FaYoutube,
} from "react-icons/fa";

const AboutPage = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isImageInView = useInView(imageRef, {
    once: true,
    margin: "-100px 0px",
  });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      url: "https://www.facebook.com/milton.khandokar.14",
      color: "hover:text-blue-500",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      url: "https://youtube.com/@milton-khandokar?si=kKYFd-0_wqaVand7",
      color: "hover:text-red-500",
    },
    {
      name: "LinkedIn",
      icon: FaGlobe,
      url: "https://www.bangla-kobita.com/milton/",
      color: "hover:text-blue-400",
    },
  ];

  const achievements = [
    { number: "5000+", label: "Students Taught" },
    { number: "8+", label: "Years Experience" },
    { number: "95%", label: "Success Rate" },
  ];

  const [animatedNumbers, setAnimatedNumbers] = useState(
    achievements.map(() => 0)
  );

  useEffect(() => {
    if (isImageInView) {
      const interval = setInterval(() => {
        setAnimatedNumbers((prev) => {
          const newNumbers = [...prev];
          let allDone = true;

          achievements.forEach((achievement, index) => {
            const target = parseInt(achievement.number) || 0;
            if (newNumbers[index] < target) {
              newNumbers[index] = Math.min(
                newNumbers[index] + Math.ceil(target / 50),
                target
              );
              allDone = false;
            }
          });

          if (allDone) clearInterval(interval);
          return newNumbers;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isImageInView, achievements]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-[#0A192F] to-[#13284D] overflow-hidden"
    >
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[#0A192F]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#f4bc45]/10 rounded-full blur-[100px] transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#f4bc45]/10 rounded-full blur-[100px] transform -translate-x-1/4 translate-y-1/4"></div>
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Meet <span className="text-[#f4bc45]">The Visionary</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-24 h-1 bg-[#f4bc45] mx-auto mb-6"
            ></motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              The story behind Biddarthi and the educator who's transforming
              academic preparation in Bangladesh
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#13284D] to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Image and Stats */}
          <div className="lg:col-span-5 space-y-12">
            {/* Image with Frame */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isImageInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 border border-[#f4bc45]/20 rounded-xl transform rotate-3"></div>
              <div className="absolute -inset-8 border border-[#f4bc45]/10 rounded-xl transform -rotate-2"></div>

              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={miltonImg}
                  alt="Milton Khandokar"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent"></div>

                {/* Name Tag */}
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h2 className="text-3xl font-bold text-white mb-1">
                    Milton Khandokar
                  </h2>
                  <p className="text-[#f4bc45]">Founder & Lead Instructor</p>
                </div>

                {/* Social Links */}
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`bg-white/10 backdrop-blur-sm p-2.5 rounded-full text-white transition-colors ${social.color}`}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(255,255,255,0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="text-lg" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isImageInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6"
            >
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#f4bc45] mb-2">
                    {typeof animatedNumbers[index] === "number"
                      ? achievement.number.includes("+")
                        ? `${animatedNumbers[index]}+`
                        : achievement.number.includes("%")
                        ? `${animatedNumbers[index]}%`
                        : animatedNumbers[index]
                      : achievement.number}
                  </div>
                  <div className="text-sm text-gray-400">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Bio */}
          <motion.div
            style={{ y, opacity }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Quote */}
            <div className="relative mb-12">
              <FaQuoteLeft className="text-[#f4bc45]/20 text-8xl absolute -top-6 -left-6" />
              <blockquote className="relative text-2xl text-white italic font-light leading-relaxed pl-8">
                My goal is to make quality education accessible to every
                aspiring student and help them achieve their dreams through
                dedicated guidance and support.
              </blockquote>
            </div>

            {/* Bio Sections */}
            <div className="space-y-8 text-gray-300 text-lg">
              <p>
                Milton Khandokar is a distinguished educator specializing in
                medical and engineering university admissions as well as general
                university admission preparation. His unique teaching
                methodology has helped thousands of students achieve their
                academic goals.
              </p>

              <p>
                As the founder of Biddarthi, he has developed comprehensive
                study materials and innovative teaching techniques that make
                complex topics easy to understand. His dedication to student
                success has made him one of the most respected educators in
                Bangladesh.
              </p>

              <p>
                Milton holds a BSc in Textile Engineering from BUTEX and has
                extensive experience as a Chemistry Lecturer at BP Dream School.
              </p>
            </div>

            {/* Expertise */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: FaChalkboardTeacher,
                  title: "Teaching Excellence",
                  description:
                    "Innovative methods that simplify complex concepts for students at all levels.",
                },
                {
                  icon: FaUniversity,
                  title: "Admission Expertise",
                  description:
                    "Specialized guidance for university entrance exams with proven success rates.",
                },
                {
                  icon: FaFlask,
                  title: "Chemistry Specialist",
                  description:
                    "Deep expertise in chemistry education with practical applications.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isImageInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-[#0A192F]/50 border border-[#f4bc45]/10 rounded-xl p-6"
                >
                  <div className="text-[#f4bc45] mb-4">
                    <item.icon className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Previous Experience */}
            <div className="mt-12 space-y-6">
              <h3 className="text-2xl font-semibold text-white">
                Professional Journey
              </h3>

              <div className="space-y-6">
                {[
                  {
                    position: "Chemistry Lecturer",
                    company: "Udvash Academic and Admission Care",
                    period: "2 years",
                    description:
                      "Provided specialized chemistry instruction for university admission preparation.",
                  },
                  {
                    position: "Chemistry Instructor",
                    company: "10 Minute School",
                    period: "1 year",
                    description:
                      "Created digital content and live classes for online education platform.",
                  },
                  {
                    position: "Chemistry Instructor",
                    company: "Battles of Biology",
                    period: "8 months",
                    description:
                      "Specialized instruction for medical admission test preparation.",
                  },
                ].map((experience, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isImageInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#f4bc45]/30"
                  >
                    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-[#f4bc45] transform -translate-x-1/2"></div>
                    <h4 className="text-xl font-medium text-white">
                      {experience.position}
                    </h4>
                    <p className="text-[#f4bc45] mb-2">
                      {experience.company} • {experience.period}
                    </p>
                    <p className="text-gray-400">{experience.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CSS for grid pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
