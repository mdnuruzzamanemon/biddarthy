"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface TrendingCourse {
  _id: string;
  course: {
    _id: string;
    title: string;
    thumbnail: string;
    category?: { categoryName: string };
    price: number;
  };
}

export default function TrendingCoursesPage() {
  const [trendingCourses, setTrendingCourses] = useState<TrendingCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null); // Track the ID being removed

  // Fetch trending courses from the API
  const fetchTrendingCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/trending");
      if (!res.ok) throw new Error("Failed to fetch trending courses");

      const data = await res.json();
      setTrendingCourses(data);
    } catch (error: any) {
      console.error("Error fetching trending courses:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a trending course
  const handleRemoveFromTrending = async (trendingId: string) => {
    setRemovingId(trendingId); // Set the removing ID

    try {
      const res = await fetch(`/api/trending/${trendingId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to remove course from trending");
      }

      // Remove the course from the state
      setTrendingCourses((prev) => prev.filter((item) => item._id !== trendingId));
    } catch (error: any) {
      console.error("Error removing course from trending:", error);
      setError(error.message);
    } finally {
      setRemovingId(null); // Reset the removing ID
    }
  };

  // Fetch trending courses when the component mounts
  useEffect(() => {
    fetchTrendingCourses();
  }, []);

  return (
    <div className="p-6 m-6 border rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Trending Courses</h2>

      {loading && <p>Loading trending courses...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {trendingCourses.length === 0 ? (
        <p>No trending courses available.</p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {trendingCourses.map((item) => (
            <Card key={item._id} className="w-full sm:w-[260px]">
              <CardHeader>
                <Image
                  src={`https://api.biddarthi.org/${item.course.thumbnail}`}
                  alt={item.course.title}
                  width={300}
                  height={150}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle>{item.course.title}</CardTitle>
                <p className="text-sm text-gray-500">Category: {item.course.category?.categoryName || "N/A"}</p>
                <p className="text-sm text-gray-800">Price: ${item.course.price}</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveFromTrending(item._id)}
                  disabled={removingId === item._id} // Disable only the clicked button
                >
                  {removingId === item._id ? "Removing..." : "Remove from Trending"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
