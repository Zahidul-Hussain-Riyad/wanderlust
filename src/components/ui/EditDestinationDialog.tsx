// "use client";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button";
// import { Pencil } from "lucide-react";
// import Link from "next/link";
// import { id } from "date-fns/locale";
// import React from "react";
// import { Plus, Trash2 } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// const categories = [
//   { value: "beach", label: "Beach" },
//   { value: "mountains", label: "Mountains" },
//   { value: "city", label: "City" },
//   { value: "adventure", label: "Adventure" },
//   { value: "cultural", label: "Cultural" },
//   { value: "luxury", label: "Luxury" },
// ];

// interface TravelPackage {
//   name: string;
//   country: string;
//   category: string;
//   price: string;
//   duration: string;
//   departureDate: string;
//   imageUrl: string;
//   description: string;
// }

// const emptyPackage: TravelPackage = {
//   name: "",
//   country: "",
//   category: "",
//   price: "",
//   duration: "",
//   departureDate: "",
//   imageUrl: "",
//   description: "",
// };

// const EditDestinationDialog = () => {

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         const res = await fetch("http://localhost:8000/app-destination", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(travelPackage)
//         })

//         const data = await res.json();
//         console.log(data);

//         console.log("Travel package to save:", travelPackage);
//         // TODO: replace with a real create call (API route / server action) later.
//         setTravelPackage(emptyPackage);
//     };

//     return (
//         <Dialog>
//             <DialogTrigger>
//                 <Button
//                     className="flex items-center gap-2 bg-cyan-500 text-white hover:bg-cyan-600"
//                     render={<Link href={`/destinations/${id}/edit`} />}
//                 >
//                     <Pencil className="size-4" />
//                     Edit
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className={'min-w-md'}>
//                 <DialogHeader>
//                     <DialogTitle>Edit Destination</DialogTitle>
//                     <DialogDescription>
//                         <form
//                             onSubmit={handleSubmit}
//                             className="mt-10 mx-auto max-w-2xl border border-neutral-100 bg-white p-8 shadow-sm md:p-10"
//                         >
//                             <div className="grid gap-6">
//                                 {/* Destination Name */}
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="name" className="font-semibold">
//                                         Destination Name
//                                     </Label>
//                                     <Input
//                                         id="name"
//                                         name="name"
//                                         placeholder="Bali Paradise"
//                                         required
//                                         className={inputClassName}
//                                         value={travelPackage.name}
//                                         onChange={(event) => updateField("name", event.target.value)}
//                                     />
//                                 </div>

//                                 {/* Country + Category */}
//                                 <div className="grid gap-6 sm:grid-cols-2">
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="country" className="font-semibold">
//                                             Country
//                                         </Label>
//                                         <Input
//                                             id="country"
//                                             name="country"
//                                             placeholder="Indonesia"
//                                             className={inputClassName}
//                                             value={travelPackage.country}
//                                             onChange={(event) =>
//                                                 updateField("country", event.target.value)
//                                             }
//                                         />
//                                     </div>
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="category" className="font-semibold">
//                                             Category
//                                         </Label>
//                                         <Select
//                                             items={categories}
//                                             value={travelPackage.category}
//                                             onValueChange={(value) => updateField("category", value ?? "")}
//                                         >
//                                             <SelectTrigger
//                                                 id="category"
//                                                 className={inputClassName}
//                                             >
//                                                 <SelectValue placeholder="Beach" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 {categories.map((category) => (
//                                                     <SelectItem key={category.value} value={category.value}>
//                                                         {category.label}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectContent>
//                                         </Select>
//                                     </div>
//                                 </div>

//                                 {/* Price + Duration */}
//                                 <div className="grid gap-6 sm:grid-cols-2">
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="price" className="font-semibold">
//                                             Price (USD)
//                                         </Label>
//                                         <Input
//                                             id="price"
//                                             name="price"
//                                             type="number"
//                                             min={0}
//                                             placeholder="e.g., 1299"
//                                             required
//                                             className={inputClassName}
//                                             value={travelPackage.price}
//                                             onChange={(event) => updateField("price", event.target.value)}
//                                         />
//                                     </div>
//                                     <div className="grid gap-2">
//                                         <Label htmlFor="duration" className="font-semibold">
//                                             Duration
//                                         </Label>
//                                         <Input
//                                             id="duration"
//                                             name="duration"
//                                             placeholder="e.g., 7 Days/6 Nights"
//                                             className={inputClassName}
//                                             value={travelPackage.duration}
//                                             onChange={(event) =>
//                                                 updateField("duration", event.target.value)
//                                             }
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Departure Date */}
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="departureDate" className="font-semibold">
//                                         Departure Date
//                                     </Label>
//                                     <Input
//                                         id="departureDate"
//                                         name="departureDate"
//                                         type="date"
//                                         className={inputClassName}
//                                         value={travelPackage.departureDate}
//                                         onChange={(event) =>
//                                             updateField("departureDate", event.target.value)
//                                         }
//                                     />
//                                 </div>

//                                 {/* Image URL */}
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="imageUrl" className="font-semibold">
//                                         Image URL
//                                     </Label>
//                                     <Input
//                                         id="imageUrl"
//                                         name="imageUrl"
//                                         type="url"
//                                         placeholder="https://example.com/image.jpg"
//                                         className={inputClassName}
//                                         value={travelPackage.imageUrl}
//                                         onChange={(event) =>
//                                             updateField("imageUrl", event.target.value)
//                                         }
//                                     />
//                                 </div>

//                                 {/* Description */}
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="description" className="font-semibold">
//                                         Description
//                                     </Label>
//                                     <Textarea
//                                         id="description"
//                                         name="description"
//                                         placeholder="Describe the travel experience..."
//                                         className="min-h-28 rounded-md border-transparent bg-[#f5f7f8] px-3.5 py-3 text-sm placeholder:text-neutral-400 focus-visible:border-ring"
//                                         value={travelPackage.description}
//                                         onChange={(event) =>
//                                             updateField("description", event.target.value)
//                                         }
//                                     />
//                                 </div>
//                             </div>

//                             {/* Actions */}
//                             <div className="mt-10 flex justify-end gap-4">
//                                 <Button
//                                     type="button"
//                                     variant="outline"
//                                     size="lg"
//                                     className="flex items-center gap-2 border-red-200 font-semibold text-red-500 hover:bg-red-50 hover:text-red-600"
//                                     onClick={() => setTravelPackage(emptyPackage)}
//                                 >
//                                     <Trash2 className="size-4" />
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     type="submit"
//                                     size="lg"
//                                     className="flex items-center gap-2 bg-cyan-500 font-semibold text-white hover:bg-cyan-600"
//                                 >
//                                     <Plus className="size-4" />
//                                     Add Travel Package
//                                 </Button>
//                             </div>
//                         </form>
//                     </DialogDescription>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default EditDestinationDialog;



"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Destination } from "@/components/destinations-explorer";

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

interface EditDestinationDialogProps {
    destination: Destination;
}

const inputClassName = "w-full rounded-md border border-neutral-200 bg-[#f5f7f8] px-3.5 py-2.5 text-sm";

const EditDestinationDialog = ({destination}: EditDestinationDialogProps) => {
    const [open, setOpen] = React.useState(false);

    const [travelPackage, setTravelPackage] =
        React.useState<TravelPackage>({
            name: destination.name,
            country: destination.country,
            category: destination.category || "",
            price: String(destination.price ?? ""),
            duration: destination.duration || "",
            departureDate: destination.departureDate || "",
            imageUrl: destination.imageUrl || "",
            description: destination.description || "",
        });

    const updateField = (field: keyof TravelPackage, value: string) => {
        setTravelPackage((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const res = await fetch(`http://localhost:8000/destination/${destination._id}`,{
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(travelPackage),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to update destination");
            }

            alert("Destination updated successfully!");
            setOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Update error:", error);
            alert("Could not update destination.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-600">
                <Pencil className="size-4" />
                Edit
            </DialogTrigger>

            <DialogContent className="min-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Destination</DialogTitle>
                    <DialogDescription>
                        Update your destination information below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-6 grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Destination Name</Label>
                        <Input
                            id="name"
                            required
                            className={inputClassName}
                            value={travelPackage.name}
                            onChange={(event) =>
                                updateField("name", event.target.value)
                            }
                        />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                                id="country"
                                className={inputClassName}
                                value={travelPackage.country}
                                onChange={(event) =>
                                    updateField("country", event.target.value)
                                }
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                items={categories}
                                value={travelPackage.category}
                                onValueChange={(value) =>
                                    updateField("category", value ?? "")
                                }
                            >
                                <SelectTrigger
                                    id="category"
                                    className={inputClassName}
                                >
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>

                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price (USD)</Label>
                            <Input
                                id="price"
                                type="number"
                                min={0}
                                required
                                className={inputClassName}
                                value={travelPackage.price}
                                onChange={(event) =>
                                    updateField("price", event.target.value)
                                }
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                                id="duration"
                                className={inputClassName}
                                value={travelPackage.duration}
                                onChange={(event) =>
                                    updateField("duration", event.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="departureDate">Departure Date</Label>
                        <Input
                            id="departureDate"
                            type="date"
                            className={inputClassName}
                            value={travelPackage.departureDate}
                            onChange={(event) =>
                                updateField("departureDate", event.target.value)
                            }
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                            id="imageUrl"
                            type="url"
                            className={inputClassName}
                            value={travelPackage.imageUrl}
                            onChange={(event) =>
                                updateField("imageUrl", event.target.value)
                            }
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            className="min-h-28"
                            value={travelPackage.description}
                            onChange={(event) =>
                                updateField("description", event.target.value)
                            }
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            <X className="size-4" />
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="bg-cyan-500 text-white hover:bg-cyan-600"
                        >
                            <Save className="size-4" />
                            Update Destination
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDestinationDialog;
