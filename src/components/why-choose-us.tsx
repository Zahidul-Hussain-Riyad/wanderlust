import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-cyan-50 py-20 text-neutral-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="font-serif text-4xl font-light tracking-tight md:text-5xl">
            Why Choose <span className="font-semibold">Wanderlust</span>
          </h2>
          <p className="mt-4 text-sm text-neutral-500">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border border-neutral-100 bg-white p-8 shadow-sm"
            >
              <Image
                src={feature.icon}
                alt=""
                width={40}
                height={40}
                className="size-10"
              />
              <h3 className="mt-8 text-2xl">{feature.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
