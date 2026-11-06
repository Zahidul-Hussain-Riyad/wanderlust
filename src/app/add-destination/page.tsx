"use client";
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  { value: "beach", label: "Beach" },
  { value: "mountains", label: "Mountains" },
  { value: "city", label: "City" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
  { value: "luxury", label: "Luxury" },
];

interface TravelPackage {
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

const emptyPackage: TravelPackage = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

const inputClassName = "h-11 rounded-md border-transparent bg-[#f5f7f8] px-3.5 text-sm placeholder:text-neutral-400 focus-visible:border-ring aria-invalid:border-destructive";

export default function AddDestinationPage() {

  const [travelPackage, setTravelPackage] = React.useState<TravelPackage>(emptyPackage);

  const updateField = (field: keyof TravelPackage, value: string) => {
    setTravelPackage((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = await getTokenFromClient()

    const res = await fetch("http://localhost:8000/app-destination", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(travelPackage)
    })

    const result = await res.json();
    console.log(result);

    console.log("Travel package to save:", travelPackage);
    // TODO: replace with a real create call (API route / server action) later.
    setTravelPackage(emptyPackage);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12 text-neutral-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-serif text-5xl font-light tracking-tight">
          Add New Travel Package
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-10 mx-auto max-w-2xl border border-neutral-100 bg-white p-8 shadow-sm md:p-10"
        >
          <div className="grid gap-6">
            {/* Destination Name */}
            <div className="grid gap-2">
              <Label htmlFor="name" className="font-semibold">
                Destination Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Bali Paradise"
                required
                className={inputClassName}
                value={travelPackage.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </div>

            {/* Country + Category */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="country" className="font-semibold">
                  Country
                </Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Indonesia"
                  className={inputClassName}
                  value={travelPackage.country}
                  onChange={(event) =>
                    updateField("country", event.target.value)
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category" className="font-semibold">
                  Category
                </Label>
                <Select
                  items={categories}
                  value={travelPackage.category}
                  onValueChange={(value) => updateField("category", value ?? "")}
                >
                  <SelectTrigger
                    id="category"
                    className={inputClassName}
                  >
                    <SelectValue placeholder="Beach" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price + Duration */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price" className="font-semibold">
                  Price (USD)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min={0}
                  placeholder="e.g., 1299"
                  required
                  className={inputClassName}
                  value={travelPackage.price}
                  onChange={(event) => updateField("price", event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration" className="font-semibold">
                  Duration
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="e.g., 7 Days/6 Nights"
                  className={inputClassName}
                  value={travelPackage.duration}
                  onChange={(event) =>
                    updateField("duration", event.target.value)
                  }
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="grid gap-2">
              <Label htmlFor="departureDate" className="font-semibold">
                Departure Date
              </Label>
              <Input
                id="departureDate"
                name="departureDate"
                type="date"
                className={inputClassName}
                value={travelPackage.departureDate}
                onChange={(event) =>
                  updateField("departureDate", event.target.value)
                }
              />
            </div>

            {/* Image URL */}
            <div className="grid gap-2">
              <Label htmlFor="imageUrl" className="font-semibold">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                className={inputClassName}
                value={travelPackage.imageUrl}
                onChange={(event) =>
                  updateField("imageUrl", event.target.value)
                }
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description" className="font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the travel experience..."
                className="min-h-28 rounded-md border-transparent bg-[#f5f7f8] px-3.5 py-3 text-sm placeholder:text-neutral-400 focus-visible:border-ring"
                value={travelPackage.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex items-center gap-2 border-red-200 font-semibold text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => setTravelPackage(emptyPackage)}
            >
              <Trash2 className="size-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              className="flex items-center gap-2 bg-cyan-500 font-semibold text-white hover:bg-cyan-600"
            >
              <Plus className="size-4" />
              Add Travel Package
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
