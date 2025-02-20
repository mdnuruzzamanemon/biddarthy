"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Course } from "@/app/admin/components/types/courseType";
import { useTrendingCourses } from "@/app/admin/context/TrendingCoursesContext";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // ShadCN pagination
import { Input } from "@/components/ui/input";

type CourseListProps = {
  courses: Course[];
  onAddCourse: () => void;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (index: number) => void;
};

export default function CourseList({ courses, onAddCourse, onEditCourse, onDeleteCourse }: CourseListProps) {
  const { trendingCourses, addToTrending } = useTrendingCourses();

  // States for pagination and search
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered courses based on search term
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const coursesPerPage = 8;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Course Management</h2>
        <Button onClick={onAddCourse}>Add Course</Button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full sm:w-[300px]"
        />
      </div>

      {/* Course Cards */}
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {currentCourses.map((course, index) => (
          <Card key={index} className="w-full sm:w-[260px]">
            <CardHeader>
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover rounded-t-lg"
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
                  <DropdownMenuItem
                    onClick={() => addToTrending(course)}
                    disabled={trendingCourses.some((c) => c.title === course.title)}
                  >
                    Add to Trending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* ShadCN Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              className={currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Ellipsis for larger number of pages */}
          {totalPages > 5 && <PaginationEllipsis />}

          <PaginationItem>
            <PaginationNext
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              className={currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
