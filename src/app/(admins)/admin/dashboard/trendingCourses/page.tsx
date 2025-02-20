"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useTrendingCourses } from "@/app/(admins)/admin/context/TrendingCoursesContext";

export default function TrendingCoursesPage() {
  const { trendingCourses, removeFromTrending } = useTrendingCourses();

  return (
    <div className="p-6 m-6 border rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Trending Courses</h2>

      {trendingCourses.length === 0 ? (
        <p>No trending courses available.</p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {trendingCourses.map((course, index) => (
            <Card key={index} className="w-full sm:w-[260px]">
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
              <CardFooter className="flex justify-end">
                <Button variant="destructive" onClick={() => removeFromTrending(index)}>
                  Remove from Trending
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
