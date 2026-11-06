"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    author: "Michael Chen",
    location: "Singapore",
    image: "/images/person1.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    author: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Kyoto In Cherry Blossom Season Was A Dream. Seamlessly Organized From Start To Finish."',
    author: "Emily Rodriguez",
    location: "Madrid, Spain",
    image: "/images/person2.png",
  },
  {
    quote:
      '"The Patagonia Trek Changed How I See Travel. World-Class Guides Every Step Of The Way."',
    author: "James Thompson",
    location: "London, UK",
    image: "/images/person1.png",
  },
];

function TestimonialsControls() {
  const { scrollPrev, scrollNext } = useCarousel();

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        aria-label="Previous testimonial"
        onClick={scrollPrev}
        className="flex size-12 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-cyan-500 hover:text-cyan-600"
      >
        <ArrowLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next testimonial"
        onClick={scrollNext}
        className="flex size-12 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-cyan-500 hover:text-cyan-600"
      >
        <ArrowRight className="size-5" />
      </button>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 text-neutral-900">
      <div className="mx-auto max-w-7xl px-4">
        <Carousel opts={{ loop: true }}>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-4xl font-light tracking-tight md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-neutral-500">
                Real experiences from our happy travelers
              </p>
            </div>

            <TestimonialsControls />
          </div>

          <CarouselContent className="mt-10">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.author}
                className="basis-full md:basis-1/2"
              >
                <div className="flex h-full items-start gap-6 border border-neutral-100 bg-white p-6 shadow-sm">
                  <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch">
                    <blockquote className="font-serif text-xl leading-snug">
                      {testimonial.quote}
                    </blockquote>
                    <footer className="mt-8">
                      <p className="flex items-center gap-2 text-sm">
                        <span aria-hidden className="h-px w-5 bg-cyan-600" />
                        <span className="text-cyan-600">
                          {testimonial.author}
                        </span>
                      </p>
                      <p className="mt-1 pl-7 text-xs text-neutral-500">
                        {testimonial.location}
                      </p>
                    </footer>
                  </div>

                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={168}
                    height={248}
                    className="hidden h-[248px] w-[168px] shrink-0 self-center object-cover sm:block"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
