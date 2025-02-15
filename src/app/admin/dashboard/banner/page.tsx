"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

export default function BannerUpload() {
  const [banner, setBanner] = useState<string | null>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBanner(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setBanner(null);
  };

  return (
    <div className="p-6 m-6 border rounded-lg shadow space-y-4">
      <h2 className="text-lg font-bold">Upload Banner</h2>
      <Input type="file" accept="image/*" onChange={handleUpload} />
      <Button onClick={() => alert("Banner Uploaded Successfully!")}>Upload</Button>
      {banner && (
        <Card className="relative w-full max-w-lg mt-4">
          <CardContent className="p-4 flex justify-center items-center">
            <img src={banner} alt="Banner Preview" className="w-full h-auto rounded-lg" />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
