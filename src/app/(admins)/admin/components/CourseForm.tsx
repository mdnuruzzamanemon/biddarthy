"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Course } from "@/app/(admins)/admin/components/types/courseType";
import CategoryCombobox from "@/app/(admins)/admin/components/CategoryCombobox";

import RichTextEditor from "./RichTextEditor";

type CourseFormProps = {
  initialCourse?: Course | null;
  onCancel: () => void;
  onSave: (course: Course, event: FormEvent) => void;
  categories: { _id: string; categoryName: string }[];
};

export default function CourseForm({ initialCourse, onCancel, onSave, categories }: CourseFormProps) {
  const [course, setCourse] = useState<Partial<Course>>(initialCourse || {});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(course.category?._id || "");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    course.discountEndsAt ? new Date(course.discountEndsAt) : undefined
  );

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const updatedCourse = {
      ...course,
      thumbnail: selectedFile || course.thumbnail,
      category: { _id: selectedCategory },
      discountEndsAt: selectedDate,
    } as Course;

    onSave(updatedCourse, e);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{initialCourse ? "Edit Course" : "Add Course"}</h2>
        <Button onClick={onCancel}>Show Courses</Button>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Course Title</label>
            <Input
              placeholder="Course Title"
              value={course.title || ""}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
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
              onChange={(e) => setCourse({ ...course, price: parseFloat(e.target.value) })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Discount Price</label>
            <Input
              type="number"
              placeholder="Discount Price"
              value={course.discountPrice || ""}
              onChange={(e) => setCourse({ ...course, discountPrice: parseFloat(e.target.value) })}
            />
          </div>

          

          <div>
            <label className="block text-sm font-medium">Instructor</label>
            <Input
              placeholder="Instructor Name"
              value={course.instructor || ""}
              onChange={(e) => setCourse({ ...course, instructor: e.target.value })}
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
              onChange={(e) => setCourse({ ...course, demoVideo: e.target.value })}
            />
          </div>

          
        </div>
        <div className="my-4">
            <label className="block text-sm font-medium">Description</label>
            <RichTextEditor
              value={course.description || ""}
              onChange={(value) => setCourse({ ...course, description: value })}
            />
          </div>

        <div className="flex justify-end mt-4">
          <Button type="submit">Save Course</Button>
        </div>
      </form>
    </div>
  );
}
