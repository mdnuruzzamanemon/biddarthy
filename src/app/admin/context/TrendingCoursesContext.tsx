"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Course } from "@/app/admin/components/types/courseType";

type TrendingCoursesContextType = {
  trendingCourses: Course[];
  addToTrending: (course: Course) => void;
  removeFromTrending: (index: number) => void;
};

const TrendingCoursesContext = createContext<TrendingCoursesContextType | undefined>(undefined);

export function TrendingCoursesProvider({ children }: { children: ReactNode }) {
  const [trendingCourses, setTrendingCourses] = useState<Course[]>([]);

  const addToTrending = (course: Course) => {
    setTrendingCourses((prev) => (prev.length < 4 ? [...prev, course] : prev));
  };

  const removeFromTrending = (index: number) => {
    setTrendingCourses((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <TrendingCoursesContext.Provider value={{ trendingCourses, addToTrending, removeFromTrending }}>
      {children}
    </TrendingCoursesContext.Provider>
  );
}

export function useTrendingCourses() {
  const context = useContext(TrendingCoursesContext);
  if (!context) {
    throw new Error("useTrendingCourses must be used within a TrendingCoursesProvider");
  }
  return context;
}
