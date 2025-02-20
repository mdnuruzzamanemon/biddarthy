"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

// Define the Category type
type Category = {
  id: string;
  name: string;
};

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Medical" },
    { id: "2", name: "University" },
    { id: "3", name: "Job" },
    { id: "4", name: "Skill Development" },
    { id: "5", name: "Engineering" },
  ]);

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = () => {
    setCurrentCategory({ id: "", name: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleSave = () => {
    if (!currentCategory) return;

    if (currentCategory.id) {
      // Update an existing category
      setCategories(
        categories.map((category) =>
          category.id === currentCategory.id ? { ...category, name: currentCategory.name } : category
        )
      );
    } else {
      // Add a new category with a generated `id`
      setCategories([
        ...categories,
        { id: Date.now().toString(), name: currentCategory.name },
      ]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 m-6 border rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Category Table</h2>
        <Button onClick={handleAdd}>Add Category</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Serial</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead className="w-20 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEdit(category)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(category.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Add/Edit Category */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentCategory?.id ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Category Name"
              value={currentCategory?.name || ""}
              onChange={(e) =>
                setCurrentCategory((prev) => prev && { ...prev, name: e.target.value })
              }
            />
            <div className="flex justify-end">
              <Button onClick={handleSave}>{currentCategory?.id ? "Update" : "Add"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
