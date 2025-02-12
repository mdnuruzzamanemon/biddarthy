"use client";

import React, { useState } from "react";
import CourseList from "@/app/admin/components/CourseList";
import CourseForm from "@/app/admin/components/CourseForm";
import { Course } from "@/app/admin/components/types/courseType";


export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([
    {
      title: "Medical Admission Test Preparation",
      thumbnail: "/@/app/client/images/bannerimg.jpg",
      category: "Medical",
      price: 12000,
      discountPrice: 9999,
      discountPercentage: 17,
      description: "Comprehensive preparation for medical college admission tests.",
      instructor: "Dr. John Doe",
      discountEndsAt: new Date("2025-02-31T23:59:59Z"),
      demoVideo: "https://www.youtube.com/embed/-P6PkFO-uIU?si=obQCxREsmK4crZC2",
    },
  ]);

  const [showCourseList, setShowCourseList] = useState(true);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  const handleAddCourse = () => {
    setCourseToEdit(null);
    setShowCourseList(false);
  };

  const handleEditCourse = (course: Course) => {
    setCourseToEdit(course);
    setShowCourseList(false);
  };

  const handleDeleteCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const handleSaveCourse = (course: Course) => {
    if (courseToEdit) {
      // Update existing course
      setCourses(courses.map((c) => (c === courseToEdit ? course : c)));
    } else {
      // Add new course
      setCourses([...courses, course]);
    }
    setShowCourseList(true);
  };

  return (
    <div className="p-6 m-6 border rounded-lg shadow">
      {showCourseList ? (
        <CourseList
          courses={courses}
          onAddCourse={handleAddCourse}
          onEditCourse={handleEditCourse}
          onDeleteCourse={handleDeleteCourse}
        />
      ) : (
        <CourseForm
          initialCourse={courseToEdit}
          onCancel={() => setShowCourseList(true)}
          onSave={handleSaveCourse}
        />
      )}
    </div>
  );
}
