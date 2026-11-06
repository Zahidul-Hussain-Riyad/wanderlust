"use client";

import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Destination {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating?: number;
  reviews?: number;
  highlights?: string[] | string;
}

const priceRanges = [
  { value: "under-500", label: "Under $500", test: (price: number) => price < 500 },
  {
    value: "500-1500",
    label: "$500 - $1500",
    test: (price: number) => price >= 500 && price <= 1500,
  },
  {
    value: "over-1500",
    label: "Over $1500",
    test: (price: number) => price > 1500,
  },
];

const sortOptions = [
  { value: "name-asc", label: "Name: A to Z" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const triggerClassName =
  "h-12 w-full rounded-none border-0 border-b border-neutral-300 bg-transparent px-1 text-xs font-medium uppercase tracking-wide text-neutral-500 data-placeholder:text-neutral-400 focus-visible:ring-0 focus-visible:border-neutral-900";

export default function DestinationsExplorer({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = React.useState("all");
  const [priceRange, setPriceRange] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("");

  const categories = [
    { value: "all", label: "All Categories" },
    ...[...new Set(destinations.map((item) => item.category))].map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    })),
  ];

  let visibleDestinations = destinations.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    if (priceRange !== "all") {
      const range = priceRanges.find((r) => r.value === priceRange);
      if (!range || !range.test(Number.parseFloat(item.price))) return false;
    }
    return true;
  });

  if (sortBy === "name-asc") {
    visibleDestinations = [...visibleDestinations].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortBy === "price-asc") {
    visibleDestinations = [...visibleDestinations].sort(
      (a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price)
    );
  } else if (sortBy === "price-desc") {
    visibleDestinations = [...visibleDestinations].sort(
      (a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price)
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Select
          items={categories}
          value={category}
          onValueChange={(value) => setCategory(value ?? "all")}
        >
          <SelectTrigger className={triggerClassName} size="default">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          items={priceRanges}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value ?? "all")}
        >
          <SelectTrigger className={triggerClassName} size="default">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Price</SelectItem>
            {priceRanges.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          items={sortOptions}
          value={sortBy}
          onValueChange={(value) => setSortBy(value ?? "")}
        >
          <SelectTrigger className={triggerClassName} size="default">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mt-4 text-sm text-neutral-800">
        Showing {visibleDestinations.length} destinations
      </p>

      {/* Cards */}
      <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {visibleDestinations.map((destination) => (
          <article key={destination._id}>
            <div className="relative aspect-[335/230] overflow-hidden rounded-sm bg-neutral-700/20">
              <Image
                src={destination.imageUrl}
                alt={destination.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              {destination.rating !== undefined && (
                <span className="absolute top-3 right-3 flex items-center gap-1 rounded-sm bg-white px-2.5 py-1 text-xs font-medium text-neutral-900">
                  {destination.rating}
                  <Star className="size-3.5 fill-neutral-900" />
                </span>
              )}
            </div>

            <div className="mt-3">
              <p className="flex items-center gap-1 text-sm text-neutral-800">
                <MapPin className="size-4 text-neutral-500" />
                {destination.country}
              </p>

              <div className="mt-1 flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-xl">{destination.name}</h3>
                <p className="shrink-0">
                  <span className="text-lg font-semibold text-neutral-900">
                    ${Number.parseFloat(destination.price)}
                  </span>
                  <span className="text-xs text-neutral-500">/Person</span>
                </p>
              </div>

              <p className="mt-1 flex items-center gap-1 text-sm text-neutral-700">
                <CalendarDays className="size-4 text-neutral-500" />
                {destination.duration}
              </p>

              <Link
                href={`/destinations/${destination._id}`}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-600 underline underline-offset-4 hover:text-cyan-700"
              >
                Book Now
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {visibleDestinations.length === 0 && (
        <p className="mt-16 text-center text-sm text-neutral-500">
          No destinations match your filters.
        </p>
      )}
    </div>
  );
}
