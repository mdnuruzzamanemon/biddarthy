"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "react-hot-toast";
import { Loader2, MoreHorizontal, Check, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type StudentRequest = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  transactionId: string;
  status: "Pending" | "Approved" | "Rejected";
  course: { title: string };
};

// Define a type to track both the request ID and the action being performed
type LoadingAction = { id: string; action: "approve" | "reject" } | null;

export default function StudentRequestPage() {
  const [requests, setRequests] = useState<StudentRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading for data fetch
  const [actionLoading, setActionLoading] = useState<LoadingAction>(null); // Loading for accept/reject action

  const requestsPerPage = 5;

  // Fetch student requests
  const fetchStudentRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enrollments");
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching student requests:", error);
      toast.error("Failed to load student requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentRequests();
  }, []);

  // Handle accept/reject actions with tracking of both the request ID and action
  const handleAction = async (id: string, action: "approve" | "reject") => {
    setActionLoading({ id, action });

    try {
      const res = await fetch(`/api/enrollments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) throw new Error(`Failed to ${action} enrollment`);

      toast.success(
        `Enrollment ${action === "approve" ? "approved" : "rejected"} successfully!`
      );
      fetchStudentRequests(); // Refresh list after action
    } catch (error) {
      console.error(`Error during ${action}:`, error);
      toast.error(`Failed to ${action} enrollment.`);
    } finally {
      setActionLoading(null);
    }
  };

  // Filter requests based on search term
  const filteredRequests = requests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.phone.includes(searchTerm) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.transactionId.includes(searchTerm) ||
      request.course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the filtered requests so that Pending items appear first
  const sortedRequests = filteredRequests.sort((a, b) => {
    if (a.status === "Pending" && b.status !== "Pending") return -1;
    if (a.status !== "Pending" && b.status === "Pending") return 1;
    return 0;
  });

  const totalPages = Math.ceil(sortedRequests.length / requestsPerPage);
  const startIndex = (currentPage - 1) * requestsPerPage;
  const currentRequests = sortedRequests.slice(startIndex, startIndex + requestsPerPage);

  return (
    <div className="p-6 m-6 border rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Student Enrollment Requests</h2>

      <Input
        type="text"
        placeholder="Search by name, phone, email, course, or transaction ID..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 w-full sm:w-[400px]"
      />

      {/* Loading Spinner for Fetching Data */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Serial</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500 py-4">
                    No requests found.
                  </TableCell>
                </TableRow>
              ) : (
                currentRequests.map((request, index) => (
                  <TableRow key={request._id}>
                    <TableCell>{startIndex + index + 1}</TableCell>
                    <TableCell>{request.name}</TableCell>
                    <TableCell>{request.phone}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.transactionId}</TableCell>
                    <TableCell>{request.course.title}</TableCell>
                    <TableCell
                      className={`font-semibold ${
                        request.status === "Approved"
                          ? "text-green-600"
                          : request.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {request.status}
                    </TableCell>
                    <TableCell>
                      {request.status === "Pending" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => handleAction(request._id, "approve")}
                              disabled={
                                actionLoading?.id === request._id &&
                                actionLoading?.action === "approve"
                              }
                            >
                              {actionLoading?.id === request._id &&
                              actionLoading?.action === "approve" ? (
                                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                              ) : (
                                <Check className="mr-2 h-4 w-4" />
                              )}
                              Accept
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleAction(request._id, "reject")}
                              disabled={
                                actionLoading?.id === request._id &&
                                actionLoading?.action === "reject"
                              }
                            >
                              {actionLoading?.id === request._id &&
                              actionLoading?.action === "reject" ? (
                                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                              ) : (
                                <X className="mr-2 h-4 w-4" />
                              )}
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                className={currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}
              />
            </PaginationItem>

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

            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                className={currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
