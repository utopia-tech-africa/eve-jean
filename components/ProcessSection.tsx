import Image from "next/image";

const steps = [
  {
    number: "1",
    title: "Smarter design, better outcomes",
    body: "We evaluate materials and methods early to maximise value and cut unnecessary cost.",
    left: 141,
    top: 138,
    numberLeft: 112,
    numberTop: 138,
  },
  {
    number: "2",
    title: "From concept to precision",
    body: "Ideas become drawings and plans, evolving from concepts to designs, bringing visions to life.",
    left: 406,
    top: 254,
    numberLeft: 376,
    numberTop: 254,
  },
  {
    number: "3",
    title: "The right partners",
    body: "We choose and manage the best makers and contractors for each project.",
    left: 712,
    top: 368,
    numberLeft: 686,
    numberTop: 368,
  },
  {
    number: "4",
    title: "Full turnkey delivery",
    body: "We manage sourcing, production, and installation. Every step is handled from start to finish. Your project is in good hands with us.",
    left: 1021,
    top: 476,
    numberLeft: 996,
    numberTop: 476,
  },
] as const;

export function ProcessSection() {
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

      <div className="absolute left-[50px] top-[114px] h-[618px] w-[1340px]">
        <h2 className="absolute left-0 top-[-30px] w-[352px] font-[family-name:var(--font-display)] text-[48px] leading-[1.2] uppercase text-white">
          We handle all the complexity
        </h2>

        {steps.map((step) => (
          <div key={step.number}>
            <p
              className="absolute font-[family-name:var(--font-instrument)] text-xl font-medium leading-[1.2] text-white"
              style={{ left: step.numberLeft, top: step.numberTop }}
            >
              {step.number}
            </p>
            <div
              className="absolute flex w-[319px] flex-col gap-3 leading-[1.2]"
              style={{ left: step.left, top: step.top }}
            >
              <p className="font-[family-name:var(--font-instrument)] text-xl font-medium text-white">
                {step.title}
              </p>
              <p className="font-[family-name:var(--font-instrument)] text-lg text-white/80">
                {step.body}
              </p>
            </div>
          </div>
        ))}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/vector-1.svg"
          alt=""
          className="absolute left-[117px] top-[162px] h-[102px] w-[248px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/vector-2.svg"
          alt=""
          className="absolute left-[382px] top-[278px] h-[102px] w-[294px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/vector-3.svg"
          alt=""
          className="absolute left-[693px] top-[395px] h-[95px] w-[294px]"
        />
      </div>
    </section>
  );
}
