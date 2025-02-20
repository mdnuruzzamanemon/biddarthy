"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "react-hot-toast";

// Student request type
type StudentRequest = {
    id: number;
    name: string;
    phone: string;
    email: string;
    transactionId: string;
};

const initialRequests: StudentRequest[] = [
    { id: 1, name: "John Doe", phone: "0123456789", email: "john@example.com", transactionId: "TXN12345" },
    { id: 2, name: "Jane Smith", phone: "01788889999", email: "jane@example.com", transactionId: "TXN67890" },
    { id: 3, name: "Ali Ahmed", phone: "01822223333", email: "ali@example.com", transactionId: "TXN11122" },
    { id: 4, name: "Sara Khan", phone: "01555556666", email: "sara@example.com", transactionId: "TXN33445" },
];

export default function StudentRequestPage() {
    const [requests, setRequests] = useState<StudentRequest[]>(initialRequests);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const savedRequests = localStorage.getItem("studentRequests");
        if (savedRequests) {
            setRequests(JSON.parse(savedRequests));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("studentRequests", JSON.stringify(requests));
    }, [requests]);

    const handleAccept = (student: StudentRequest) => {
        const updatedRequests = requests.filter((req) => req.id !== student.id);
        setRequests(updatedRequests);
        toast.success(`${student.name} has been accepted!`);

        const acceptedStudents = JSON.parse(localStorage.getItem("acceptedStudents") || "[]");
        acceptedStudents.push({ ...student, status: "Active" });
        localStorage.setItem("acceptedStudents", JSON.stringify(acceptedStudents));
    };

    const handleReject = (student: StudentRequest) => {
        const updatedRequests = requests.filter((req) => req.id !== student.id);
        setRequests(updatedRequests);
        toast.error(`${student.name} has been rejected.`);
    };

    const requestsPerPage = 5;
    const filteredRequests = requests.filter(
        (request) =>
            request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.phone.includes(searchTerm) ||
            request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.transactionId.includes(searchTerm)
    );

    const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);
    const startIndex = (currentPage - 1) * requestsPerPage;
    const currentRequests = filteredRequests.slice(startIndex, startIndex + requestsPerPage);

    return (
        <div className="p-6 m-6 border rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Student Requests</h2>

            <Input
                type="text"
                placeholder="Search by name, phone, email, or transaction ID..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
                className="mb-4 w-full sm:w-[400px]"
            />

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Serial</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentRequests.map((request, index) => (
                            <TableRow key={request.id}>
                                <TableCell>{startIndex + index + 1}</TableCell>
                                <TableCell>{request.name}</TableCell>
                                <TableCell>{request.phone}</TableCell>
                                <TableCell>{request.email}</TableCell>
                                <TableCell>{request.transactionId}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="default" className="bg-green-500 text-white hover:bg-green-600" onClick={() => handleAccept(request)}>
                                            Accept
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleReject(request)}>
                                            Reject
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

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

                    {totalPages > 5 && <PaginationEllipsis />}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                            className={currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
