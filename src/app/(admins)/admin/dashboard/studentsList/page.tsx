"use client";

import React, { useState } from "react";
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

// Student data type
type Student = {
    id: number;
    name: string;
    phone: string;
    email: string;
    transactionId: string;
    status: "Active";
};

// Dummy accepted students (simulating data from the request page)
const initialAcceptedStudents: Student[] = [
    { id: 1, name: "John Doe", phone: "0123456789", email: "john@example.com", transactionId: "TXN12345", status: "Active" },
    { id: 2, name: "Jane Smith", phone: "01788889999", email: "jane@example.com", transactionId: "TXN67890", status: "Active" },
    { id: 3, name: "Ali Ahmed", phone: "01822223333", email: "ali@example.com", transactionId: "TXN11122", status: "Active" },
];

export default function StudentListPage() {
    const [students, setStudents] = useState<Student[]>(initialAcceptedStudents);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const studentsPerPage = 5;

    // Filter students based on search term
    const filteredStudents = students.filter(
        (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.phone.includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.transactionId.includes(searchTerm)
    );

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    const startIndex = (currentPage - 1) * studentsPerPage;
    const currentStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage);

    // Remove a student from the list
    const handleRemove = (id: number) => {
        setStudents(students.filter(student => student.id !== id));
    };

    return (
        <div className="p-6 m-6 border rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Student List</h2>

            {/* Search Bar */}
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

            {/* Data Table */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Serial</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentStudents.length > 0 ? (
                            currentStudents.map((student, index) => (
                                <TableRow key={student.id}>
                                    <TableCell>{startIndex + index + 1}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.phone}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.transactionId}</TableCell>
                                    <TableCell>
                                        <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-md">
                                            {student.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleRemove(student.id)}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-4">
                                    No students found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
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
