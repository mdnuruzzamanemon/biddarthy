"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Helper function to get token from cookies
const getToken = () => {
  return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
};

type Banner = {
  _id: string;
  image: string;
  createdAt: string;
};

export default function BannerPage() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // For initial data load

  // Fetch banner from the backend
  const fetchBanner = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/homebanner");
      const data = await res.json();
      if (data?.image) {
        setBanner({ ...data, image: `/uploads/${data.image}` });
      }
    } catch (error) {
      console.error("Failed to fetch banner:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async (event: FormEvent) => {
    event.preventDefault(); // Prevent form submission from refreshing the page
    if (!selectedFile) {
      alert("Please select an image file.");
      return;
    }

    const token = getToken();
    if (!token) {
      alert("Unauthorized. No token found.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch("/api/homebanner", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData, // Important: Send as FormData
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchBanner();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to upload banner");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = getToken();
    if (!token) {
      alert("Unauthorized. No token found.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/homebanner", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setBanner(null);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete banner");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 m-6 border rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Home Banner</h2>
        <Button onClick={() => setIsModalOpen(true)} disabled={loading}>
          {loading ? "Processing..." : "Upload New Banner"}
        </Button>
      </div>

      {/* Banner Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Banner</TableHead>
            <TableHead>Uploaded At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetching ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Loading banner...
              </TableCell>
            </TableRow>
          ) : banner ? (
            <TableRow>
              <TableCell>
                <Image src={banner.image} alt="Banner" width={150} height={80} className="rounded-lg" />
              </TableCell>
              <TableCell>{new Date(banner.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleDelete} disabled={loading}>
                      <Trash className="mr-2 h-4 w-4" /> {loading ? "Deleting..." : "Delete"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No banner uploaded.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Modal for Uploading Banner */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Home Banner</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpload} className="space-y-4">
            <Input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
            <div className="flex justify-end">
              <Button type="submit" disabled={loading || !selectedFile}>
                {loading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
