"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CategoryCombobox from "@/app/(admins)/admin/components/CategoryCombobox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define the DemoClass type
type DemoClass = {
  id: string;
  title: string;
  videoLink: string;
  category: string;
  instructor: string;
};

export default function DemoClassPage() {
  const [demoClasses, setDemoClasses] = useState<DemoClass[]>([]);
  const [currentDemoClass, setCurrentDemoClass] = useState<DemoClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const demoClassesPerPage = 5;

  const handleAdd = () => {
    setCurrentDemoClass({ id: "", title: "", videoLink: "", category: "", instructor: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (demoClass: DemoClass) => {
    setCurrentDemoClass(demoClass);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDemoClasses(demoClasses.filter((demoClass) => demoClass.id !== id));
  };

  const handleSave = () => {
    if (!currentDemoClass) return;

    if (currentDemoClass.id) {
      setDemoClasses(
        demoClasses.map((demoClass) =>
          demoClass.id === currentDemoClass.id ? currentDemoClass : demoClass
        )
      );
    } else {
      setDemoClasses([
        ...demoClasses,
        { ...currentDemoClass, id: Date.now().toString() },
      ]);
    }
    setIsModalOpen(false);
  };

  const totalPages = Math.ceil(demoClasses.length / demoClassesPerPage);
  const currentDemoClasses = demoClasses.slice(
    (currentPage - 1) * demoClassesPerPage,
    currentPage * demoClassesPerPage
  );

  return (
    <div className="p-6 m-6 border rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Demo Classes</h2>
        <Button onClick={handleAdd}>Add Demo Class</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Video Link</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentDemoClasses.map((demoClass, index) => (
            <TableRow key={demoClass.id}>
              <TableCell>{(currentPage - 1) * demoClassesPerPage + index + 1}</TableCell>
              <TableCell>{demoClass.title}</TableCell>
              <TableCell>{demoClass.videoLink}</TableCell>
              <TableCell>{demoClass.category}</TableCell>
              <TableCell>{demoClass.instructor}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEdit(demoClass)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(demoClass.id)}>
                      <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

      {/* Modal for Add/Edit Demo Class */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentDemoClass?.id ? "Edit Demo Class" : "Add Demo Class"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Demo Class Title"
              value={currentDemoClass?.title || ""}
              onChange={(e) => setCurrentDemoClass((prev) => prev && { ...prev, title: e.target.value })}
            />
            <Input
              placeholder="Video Link"
              value={currentDemoClass?.videoLink || ""}
              onChange={(e) => setCurrentDemoClass((prev) => prev && { ...prev, videoLink: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium">Category</label>
              <CategoryCombobox value={currentDemoClass?.category || ""} onChange={(value) => setCurrentDemoClass((prev) => prev && { ...prev, category: value })} />
            </div>
            <Input
              placeholder="Instructor"
              value={currentDemoClass?.instructor || ""}
              onChange={(e) => setCurrentDemoClass((prev) => prev && { ...prev, instructor: e.target.value })}
            />
            <div className="flex justify-end">
              <Button onClick={handleSave}>{currentDemoClass?.id ? "Update" : "Add"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
