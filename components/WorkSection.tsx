import Image from "next/image";

const projects = [
  {
    name: "Ritz Carlton",
    src: "/images/work-1.png",
    width: 507,
    height: 591,
    featured: true,
  },
  {
    name: "The Hue Hotel",
    src: "/images/work-2.png",
    width: 357,
    height: 521,
    featured: false,
  },
  {
    name: "Oceanside Lotto",
    src: "/images/work-3.png",
    width: 357,
    height: 521,
    featured: false,
  },
  {
    name: "Marlowe Residence",
    src: "/images/work-4.png",
    width: 357,
    height: 521,
    featured: false,
  },
] as const;

export function WorkSection() {
  return (
    <section className="relative h-[846px] w-full shrink-0 overflow-hidden bg-forest">
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        aria-hidden
      >
        <Image
          src="/images/satin-texture.png"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="1440px"
        />
      </div>

      <h2 className="absolute left-[50px] top-8 w-[318px] font-display text-[48px] leading-[1.2] uppercase text-white">
        Work that speaks for us
      </h2>

      <div className="absolute left-[50px] top-[172px] flex h-[591px] items-end gap-8 overflow-visible">
        {projects.map((project) => (
          <figure key={project.name} className="relative shrink-0">
            <div
              className={`relative overflow-hidden rounded transition-transform duration-500 hover:scale-[1.01] ${
                project.featured ? "h-[591px] w-[507px]" : "h-[521px] w-[357px]"
              }`}
            >
              <Image
                src={project.src}
                alt={project.name}
                fill
                className="object-cover"
                sizes={project.featured ? "507px" : "357px"}
              />
            </div>
          </figure>
        ))}
      </div>

      <div className="absolute left-[50px] top-[787px] flex w-[1674px] font-[family-name:var(--font-instrument)] text-2xl leading-[1.2] text-white">
        <span className="w-[507px]">Ritz Carlton</span>
        <span className="ml-8 w-[357px]">The Hue Hotel</span>
        <span className="ml-8 w-[357px]">Oceanside Lotto</span>
        <span className="ml-8 w-[357px]">Marlowe Residence</span>
      </div>
    </section>
  );
}
