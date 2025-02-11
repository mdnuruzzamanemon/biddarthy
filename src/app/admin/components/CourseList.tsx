"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Course } from "@/app/admin/components/types/courseType";

type CourseListProps = {
  courses: Course[];
  onAddCourse: () => void;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (index: number) => void;
};

export default function CourseList({ courses, onAddCourse, onEditCourse, onDeleteCourse }: CourseListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Course Management</h2>
        <Button onClick={onAddCourse}>Add Course</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course, index) => (
          <Card key={index} className="w-72">
            <CardHeader>
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={300}
                height={150}
                className="w-full h-32 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{course.title}</CardTitle>
              <p className="text-sm text-gray-500">Category: {course.category}</p>
              <p className="text-sm text-gray-800">Price: ${course.price}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onEditCourse(course)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDeleteCourse(index)}>Delete</DropdownMenuItem>
                  <DropdownMenuItem>Add to Trending</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
