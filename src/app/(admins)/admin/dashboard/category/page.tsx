"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, Trash } from "lucide-react";

// Helper function to get token from cookies
const getToken = () => {
  return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
};

type Category = {
  _id: string;
  categoryName: string;
};

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // For initial data load

  // Fetch categories from the backend
  const fetchCategories = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle Add new category
  const handleAdd = () => {
    setCurrentCategory(null);
    setCategoryName("");
    setIsModalOpen(true);
  };

  // Handle Edit category
  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setCategoryName(category.categoryName);
    setIsModalOpen(true);
  };

  // Handle Delete category
  const handleDelete = async (_id: string) => {
    const token = getToken();
    if (!token) {
      alert("Unauthorized. No token found.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/categories/${_id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchCategories();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete category");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Save (Create or Update)
  const handleSave = async () => {
    if (categoryName.trim() === "") return;

    const categoryData = { categoryName };
    const token = getToken();
    if (!token) {
      alert("Unauthorized. No token found.");
      return;
    }

    setLoading(true);
    try {
      let res;
      if (currentCategory) {
        // Update category
        res = await fetch(`/api/categories/${currentCategory._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(categoryData),
        });
      } else {
        // Create category
        res = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(categoryData),
        });
      }

      if (res.ok) {
        setIsModalOpen(false);
        fetchCategories();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to save category");
      }
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 m-6 border rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Category Table</h2>
        <Button onClick={handleAdd} disabled={loading}>
          {loading ? "Processing..." : "Add Category"}
        </Button>
      </div>

      {/* Category Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetching ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Loading categories...
              </TableCell>
            </TableRow>
          ) : categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No categories found.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category, index) => (
              <TableRow key={category._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.categoryName}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0" disabled={loading}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEdit(category)} disabled={loading}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(category._id)} disabled={loading}>
                        {loading ? "Deleting..." : (
                          <>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Category Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentCategory ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            disabled={loading}
          />
          <div className="mt-4">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : currentCategory ? "Update" : "Create"} Category
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
