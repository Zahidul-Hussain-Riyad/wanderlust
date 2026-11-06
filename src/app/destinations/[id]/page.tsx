import { ArrowRight, Check, CalendarDays, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
// import DestinationActions from "@/components/destination-actions";
import type { Destination } from "@/components/destinations-explorer";
import { Button } from "@/components/ui/button";
// import { Pencil } from "lucide-react";
import EditDestinationDialog from "@/components/ui/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/ui/DeleteDestinationDialog";
import BookingCard from "@/components/booking/BookingCard";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

// const API_URL = "http://localhost:8000";


function parseHighlights(destination: Destination): string[] {
  if (Array.isArray(destination.highlights)) return destination.highlights;
  if (typeof destination.highlights === "string" && destination.highlights.trim()) {
    return destination.highlights
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return [];
}

async function getDestination(id: string): Promise<Destination | null> {
  // const { id } = await params;

  const token = await getTokenFromServer()

  const res: Response | null = await fetch(`http://localhost:8000/destination/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  if (!res) return null;
  if (res.status === 404) notFound();
  if (!res.ok) return null;

  return res.json();
}

const DestinationDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) {
    return (
      <div className="min-h-screen bg-white px-6 py-16 text-center text-neutral-900">
        <h1 className="font-serif text-4xl font-light">Destination not found</h1>
        <p className="mt-4 text-sm text-neutral-500">
          The travel package you are looking for is unavailable or the API could
          not be reached.
        </p>
        <Button
          className="mt-8 bg-cyan-500 text-white hover:bg-cyan-600"
          render={<Link href="/destinations" />}
        >
          Back to Destinations
        </Button>
      </div>
    );
  }

  const highlights = parseHighlights(destination);
  const showsRating = destination.rating !== undefined;

  return (
    <div className="min-h-screen bg-white px-6 py-8 text-neutral-900 md:px-16">
      <div className="mx-auto max-w-5xl">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/destinations"
            className="flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900"
          >
            <ArrowRight className="size-4 rotate-180" />
            Back to Destinations
          </Link>
          <div className="flex items-center gap-2">
            
            <EditDestinationDialog destination={destination}/>
            <DeleteDestinationDialog id={id}/>
             
          </div>
        </div>

        {/* Hero image */}
        <div className="relative mt-6 aspect-[5/2] overflow-hidden rounded-sm bg-neutral-700/20">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>

        <hr className="my-6 border-neutral-200" />

        {/* Content */}
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            <p className="flex items-center gap-1 text-sm text-neutral-800">
              <MapPin className="size-4 text-neutral-500" />
              {destination.country}
            </p>

            <h1 className="mt-2 font-serif text-5xl font-light tracking-tight">
              {destination.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-6 text-sm">
              {showsRating && (
                <span className="flex items-center gap-1.5">
                  <Star className="size-4 fill-green-600 text-green-600" />
                  <span className="font-semibold">{destination.rating}</span>
                  {destination.reviews !== undefined && (
                    <span className="text-neutral-500">
                      ({destination.reviews} reviews)
                    </span>
                  )}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4 text-neutral-500" />
                <span className="font-semibold">{destination.duration}</span>
              </span>
            </div>

            {/* Overview */}
            <h2 className="mt-8 font-serif text-2xl">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {destination.description || "No description provided."}
            </p>

            {/* Highlights (only when the API provides them) */}
            {highlights.length > 0 && (
              <>
                <h2 className="mt-8 font-serif text-2xl">Highlights</h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {destination.description}
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2 text-sm text-neutral-700"
                    >
                      <Check className="size-4 shrink-0 text-green-600" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Booking card */}
          {/* <aside className="self-start border border-neutral-100 p-6 shadow-sm">
            <p className="text-xs text-neutral-500">Starting from</p>
            <p className="mt-1 font-serif text-4xl font-light text-cyan-700">
              ${Number.parseInt(destination.price, 10)}
            </p>
            <p className="mt-1 text-xs text-neutral-500">per person</p>

            <div className="mt-6 bg-[#f5f7f8] px-3.5 py-2.5 text-sm text-neutral-700">
              {destination.departureDate
                ? formatDepartureDate(destination.departureDate)
                : "No departure date"}
            </div>

            <Button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 bg-cyan-500 text-white hover:bg-cyan-600"
            >
              Book Now
              <ArrowRight className="size-4" />
            </Button>

            <ul className="mt-6 space-y-2.5">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-2 text-xs text-neutral-600"
                >
                  <Check className="size-3.5 shrink-0 text-green-600" />
                  {perk}
                </li>
              ))}
            </ul>
          </aside> */}
          <BookingCard destination={destination}/>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
