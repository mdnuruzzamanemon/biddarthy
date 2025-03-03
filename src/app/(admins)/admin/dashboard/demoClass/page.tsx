"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CategoryCombobox from "@/app/(admins)/admin/components/CategoryCombobox";

// Define the types based on your database schema
type Category = {
  _id: string;
  categoryName: string;
};

type DemoClass = {
  _id: string;
  title: string;
  videoLink: string;
  category: string | Category; // This should match the `_id` of the category
  instructor: string;
  createdAt: string;
  updatedAt: string;
};

export default function DemoClassPage() {
  const [demoClasses, setDemoClasses] = useState<DemoClass[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentDemoClass, setCurrentDemoClass] = useState<DemoClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Fetch demo classes from API
  const fetchDemoClasses = async () => {
    try {
      const res = await fetch("/api/demoVideos");
      const data = await res.json();
      setDemoClasses(data);
    } catch (error) {
      console.error("Failed to fetch demo classes:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchDemoClasses();
  }, []);

  const handleAdd = () => {
    setCurrentDemoClass({ _id: "", title: "", videoLink: "", category: "", instructor: "", createdAt: "", updatedAt: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (demoClass: DemoClass) => {
    setCurrentDemoClass(demoClass);
    setIsModalOpen(true);
  };

  const handleDelete = async (_id: string) => {
    setLoading(true);
    try {
      await fetch(`/api/demoVideos/${_id}`, { method: "DELETE" });
      fetchDemoClasses();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentDemoClass) return;
    const method = currentDemoClass._id ? "PUT" : "POST";
    const url = currentDemoClass._id ? `/api/demoVideos/${currentDemoClass._id}` : "/api/demoVideos";
    setLoading(true);

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentDemoClass),
      });
      setIsModalOpen(false);
      fetchDemoClasses();
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 m-6 border rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Demo Classes</h2>
        <Button onClick={handleAdd}>Add Demo Class</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Video Link</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demoClasses.map((demoClass) => (
            <TableRow key={demoClass._id}>
              <TableCell>{demoClass.title}</TableCell>
              <TableCell>{demoClass.videoLink}</TableCell>
              <TableCell>
                {/* {categories.find((cat) => cat._id === demoClass.category)?.categoryName || "Unknown"} */}
                {typeof demoClass.category === "string" ? "Unknown" : demoClass.category.categoryName}
              </TableCell>
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
                    <DropdownMenuItem onClick={() => handleDelete(demoClass._id)}>
                      <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Add/Edit Demo Class */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentDemoClass?._id ? "Edit Demo Class" : "Add Demo Class"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              placeholder="Title" 
              value={currentDemoClass?.title || ""} 
              onChange={(e) => setCurrentDemoClass((prev) => prev && { ...prev, title: e.target.value })}
            />
            <Input 
              placeholder="Video Link" 
              value={currentDemoClass?.videoLink || ""} 
              onChange={(e) => setCurrentDemoClass((prev) => prev && { ...prev, videoLink: e.target.value })}
            />
            <CategoryCombobox 
              value={currentDemoClass?.category || ""} 
              onChange={(value) => setCurrentDemoClass((prev) => prev && { ...prev, category: value })}
            />
            <Input 
              placeholder="Instructor" 
              value={currentDemoClass?.instructor || ""} 
              onChange={(e) => setCurrentDemoClass((prev) => prev && { ...prev, instructor: e.target.value })}
            />
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : currentDemoClass?._id ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
