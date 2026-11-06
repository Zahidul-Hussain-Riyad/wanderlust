import React from "react";

import DestinationsExplorer, {
  type Destination,
} from "@/components/destinations-explorer";

async function getDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch("http://localhost:8000/destination", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    // API is unreachable (e.g. backend not started)
    return [];
  }
}

const AllDestinationPage = async () => {
  const destinations = await getDestinations();

  return (
    <div className="min-h-screen bg-white px-6 py-12 text-neutral-900 md:px-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-serif text-5xl font-light tracking-tight">
          Explore All Destinations
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Find your perfect travel experience from our curated collection
        </p>

        <div className="mt-10">
          <DestinationsExplorer destinations={destinations} />
        </div>
      </div>
    </div>
  );
};

export default AllDestinationPage;
