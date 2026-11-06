import Image from "next/image";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { id: "location", label: "Location", placeholder: "Address, City Or Zip" },
  { id: "date", label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { id: "budget", label: "Budget", placeholder: "$0-$3000" },
  { id: "people", label: "People", placeholder: "5-10" },
];

export default function Banner() {
  return (
    <section className="relative min-h-[560px] text-white">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        sizes="100vw"
        preload
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="flex flex-col items-center px-6 pb-32 pt-24 text-center">
        <h1 className="font-serif text-6xl font-light leading-[1.08] tracking-tight md:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/90">
          Explore breathtaking destinations and create unforgettable memories with
          our curated travel experiences.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="flex items-center gap-3 bg-cyan-500 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-cyan-600"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </button>
          <button
            type="button"
            className="bg-white/20 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm hover:bg-white/30"
          >
            View Destination
          </button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-white/10 backdrop-blur-sm">
        <form className="mx-auto grid h-[72px] max-w-7xl grid-cols-[repeat(4,1fr)_auto] divide-x divide-white/25 px-4">
          {searchFields.map((field) => (
            <div key={field.id} className="flex flex-col justify-center px-5">
              <label
                htmlFor={field.id}
                className="text-sm font-semibold text-white"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type="text"
                placeholder={field.placeholder}
                className="w-full bg-transparent text-xs text-white placeholder:text-white/70 focus:outline-none"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-cyan-500 px-14 text-sm font-semibold text-white hover:bg-cyan-600"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
