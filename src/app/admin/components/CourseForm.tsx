"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Course } from "@/app/admin/components/types/courseType";
import CategoryCombobox from "@/app/admin/components/CategoryCombobox"; // Import the new Category Combobox component

type CourseFormProps = {
  initialCourse?: Course | null;
  onCancel: () => void;
  onSave: (course: Course) => void;
};

export default function CourseForm({ initialCourse, onCancel, onSave }: CourseFormProps) {
  const [course, setCourse] = useState<Partial<Course>>(initialCourse || {});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(course.discountEndsAt);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(course.category || "");

  const handleSave = () => {
    const updatedCourse = {
      ...course,
      discountEndsAt: selectedDate,
      thumbnail: selectedFile ? URL.createObjectURL(selectedFile) : course.thumbnail,
      category: selectedCategory,
    } as Course;
    onSave(updatedCourse);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{initialCourse ? "Edit Course" : "Add Course"}</h2>
        <Button onClick={onCancel}>Show Courses</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Course Title</label>
          <Input
            placeholder="Course Title"
            value={course.title || ""}
            onChange={(e) => setCourse((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Thumbnail (File Upload)</label>
          <Input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <CategoryCombobox value={selectedCategory} onChange={(value) => setSelectedCategory(value)} />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <Input
            type="number"
            placeholder="Course Price"
            value={course.price || ""}
            onChange={(e) => setCourse((prev) => ({ ...prev, price: parseFloat(e.target.value) }))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Discount Price</label>
          <Input
            type="number"
            placeholder="Discount Price"
            value={course.discountPrice || ""}
            onChange={(e) => setCourse((prev) => ({ ...prev, discountPrice: parseFloat(e.target.value) }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <Input
            placeholder="Course Description"
            value={course.description || ""}
            onChange={(e) => setCourse((prev) => ({ ...prev, description: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Instructor</label>
          <Input
            placeholder="Instructor Name"
            value={course.instructor || ""}
            onChange={(e) => setCourse((prev) => ({ ...prev, instructor: e.target.value }))}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Discount Ends At</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="block text-sm font-medium">Demo Video Link</label>
          <Input
            placeholder="Demo Video URL"
            value={course.demoVideo || ""}
            onChange={(e) => setCourse((prev) => ({ ...prev, demoVideo: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={handleSave}>Save Course</Button>
      </div>
    </div>
  );
}
