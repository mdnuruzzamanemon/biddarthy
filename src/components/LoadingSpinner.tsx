"use client";

import { motion } from "framer-motion";
import { GraduationCap, LucideIcon } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  icon?: LucideIcon;
  iconColor?: string;
  spinnerColor?: string;
  backgroundColor?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({
  size = "md",
  text,
  icon: Icon = GraduationCap,
  iconColor = "#f4bc45",
  spinnerColor = "#f4bc45",
  backgroundColor = "#0A192F",
  fullScreen = false,
}: LoadingSpinnerProps) => {
  // Size mapping
  const sizeMap = {
    sm: {
      spinner: "w-10 h-10",
      icon: "w-5 h-5",
      text: "text-sm",
    },
    md: {
      spinner: "w-16 h-16",
      icon: "w-7 h-7",
      text: "text-base",
    },
    lg: {
      spinner: "w-20 h-20",
      icon: "w-9 h-9",
      text: "text-lg",
    },
    xl: {
      spinner: "w-24 h-24",
      icon: "w-12 h-12",
      text: "text-xl",
    },
  };

  const { spinner, icon, text: textSize } = sizeMap[size];

  // Container classnames based on fullScreen prop
  const containerClasses = fullScreen
    ? "min-h-screen w-full flex justify-center items-center"
    : "flex justify-center items-center py-8";

  return (
    <div className={containerClasses} style={{ backgroundColor }}>
      <div className="flex flex-col items-center">
        <div className="relative">
          <motion.div
            className={`border-4 border-gray-700 rounded-full ${spinner}`}
            style={{ borderTopColor: spinnerColor }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className={icon} style={{ color: iconColor }} />
          </div>
        </div>

        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`mt-4 text-gray-300 ${textSize} font-medium`}
          >
            {text}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
