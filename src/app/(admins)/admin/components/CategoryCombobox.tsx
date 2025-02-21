"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Fetch categories from the database
async function fetchCategories() {
    const response = await fetch("/api/categories"); // Update with actual API endpoint
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    return response.json();
}

type Category = {
    _id: string;
    categoryName: string;
};

type CategoryComboboxProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function CategoryCombobox({ value, onChange }: CategoryComboboxProps) {
    const [open, setOpen] = React.useState(false);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetchCategories()
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                setLoading(false);
            });
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? categories.find((category) => category._id === value)?.categoryName
                        : "Select Category"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search category..." className="h-9" />
                    <CommandList>
                        {loading ? (
                            <CommandEmpty>Loading categories...</CommandEmpty>
                        ) : categories.length === 0 ? (
                            <CommandEmpty>No category found.</CommandEmpty>
                        ) : (
                            <CommandGroup>
                                {categories.map((category) => (
                                    <CommandItem
                                        key={category._id}
                                        value={category._id}
                                        onSelect={() => {
                                            onChange(category._id);
                                            setOpen(false);
                                        }}
                                    >
                                        {category.categoryName}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === category._id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
