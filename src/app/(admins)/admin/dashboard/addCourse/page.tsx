"use client";

import CourseForm from "@/app/(admins)/admin/components/CourseForm";
import CourseList from "@/app/(admins)/admin/components/CourseList";
import { Course } from "@/app/(admins)/admin/components/types/courseType";
import { FormEvent, useEffect, useState } from "react";

type Category = {
  _id: string;
  categoryName: string;
};

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCourseList, setShowCourseList] = useState(true);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // New error state

  const getToken = () => {
    if (typeof document === "undefined") return "";
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/courses");
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      fetchCourses();
    }
  }, [categories]);

  const handleAddCourse = () => {
    setCourseToEdit(null);
    setShowCourseList(false);
  };

  const handleEditCourse = (course: Course) => {
    setCourseToEdit(course);
    setShowCourseList(false);
  };

  const handleDeleteCourse = async (_id: string) => {
    setLoading(true);
    try {
      await fetch(`/api/courses/${_id}`, { method: "DELETE" });
      fetchCourses();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrendingCourse = async (courseId: string) => {
    setLoading(true);
    setError(null);
    const token = getToken();

    try {
      const res = await fetch("/api/trending", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Failed to add course to trending"
        );
      }

      // Refresh the trending courses
      fetchCourses();
    } catch (error: any) {
      console.error("Adding to trending failed:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCourse = async (updatedCourse: Course, event: FormEvent) => {
    event.preventDefault();
    setError(null);
    const token = getToken();
    const method = updatedCourse._id ? "PUT" : "POST";
    const url = updatedCourse._id
      ? `/api/courses/${updatedCourse._id}`
      : "/api/courses";
    setLoading(true);

    const formData = new FormData();
    formData.append("title", updatedCourse.title);
    formData.append("price", updatedCourse.price.toString());
    formData.append(
      "discountPrice",
      updatedCourse.discountPrice?.toString() || ""
    );
    formData.append("description", updatedCourse.description);
    formData.append("instructor", updatedCourse.instructor);
    formData.append(
      "discountEndsAt",
      updatedCourse.discountEndsAt
        ? new Date(updatedCourse.discountEndsAt).toISOString()
        : ""
    );
    formData.append("demoVideo", updatedCourse.demoVideo || "");
    formData.append("category", updatedCourse.category._id);

    if (
      updatedCourse.thumbnail &&
      typeof updatedCourse.thumbnail === "object" &&
      (updatedCourse.thumbnail as any) instanceof File
    ) {
      formData.append("thumbnail", updatedCourse.thumbnail);
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Error: ${res.status}`);
      }

      setShowCourseList(true);
      fetchCourses();
    } catch (error: any) {
      console.error("Save failed:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 m-6 border rounded-lg shadow">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {showCourseList ? (
        <CourseList
          courses={courses}
          onAddCourse={handleAddCourse}
          onEditCourse={handleEditCourse}
          onDeleteCourse={handleDeleteCourse}
          onAddTrendingCourse={handleCreateTrendingCourse}
        />
      ) : (
        <CourseForm
          initialCourse={courseToEdit}
          onCancel={() => setShowCourseList(true)}
          onSave={handleSaveCourse}
          categories={categories}
        />
      )}
    </div>
  );
}
