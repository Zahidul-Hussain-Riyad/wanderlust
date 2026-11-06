import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Cta() {
  return (
    <section className="relative py-24 text-white">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        preload
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <h2 className="font-serif text-4xl font-light tracking-tight md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>

        <button
          type="button"
          className="mt-10 flex items-center gap-3 bg-white px-10 py-4 text-xs font-semibold uppercase tracking-widest text-neutral-900 hover:bg-neutral-100"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
