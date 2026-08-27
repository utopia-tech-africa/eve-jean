import Image from "next/image";

const menuItems = ["Home", "Services", "Work", "About"] as const;

const socials = [
  { name: "Instagram", src: "/icons/instagram.svg" },
  { name: "X", src: "/icons/x.svg" },
  { name: "LinkedIn", src: "/icons/linkedin.svg" },
  { name: "YouTube", src: "/icons/youtube.svg" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative flex h-[646px] w-full shrink-0 flex-col items-center overflow-hidden bg-forest px-[50px] pb-3 pt-[60px]">
      <div className="relative flex w-full max-w-[1280px] flex-col items-center gap-10">
        <div className="flex w-full items-start justify-between">
          <div className="relative h-[78px] w-[112px]" aria-label="Eve Jean Interiors">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/footer-mark-b.svg"
              alt=""
              className="absolute left-0 top-0 h-[78px] w-[48px]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/evejean-text.svg"
              alt=""
              className="absolute left-[56px] top-[26px] h-[7px] w-[39px]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/interiors-text.svg"
              alt=""
              className="absolute left-[56px] top-[39px] h-[8px] w-[57px]"
            />
          </div>

          <div className="flex gap-12">
            <div className="flex w-[153px] flex-col gap-4">
              <p className="font-[family-name:var(--font-montserrat)] text-lg font-bold leading-[33px] text-white">
                Menu
              </p>
              <div className="flex flex-col gap-2.5 font-[family-name:var(--font-instrument)] text-base leading-[1.2] text-white/80">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-disabled="true"
                    className="h-[19px] cursor-default text-left transition-opacity hover:opacity-80"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-[family-name:var(--font-montserrat)] text-lg font-bold leading-[33px] text-white">
                Connect with us
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icons/phone.svg" alt="" className="size-6 shrink-0" />
                  <span className="font-[family-name:var(--font-montserrat)] text-lg font-medium leading-[33px] text-white">
                    (844) 693-3733
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/icons/envelope.svg"
                    alt=""
                    className="size-6 shrink-0"
                  />
                  <span className="font-[family-name:var(--font-montserrat)] text-lg font-medium leading-[33px] text-white">
                    info@dfree.com
                  </span>
                </div>
              </div>

              <div className="mt-1 flex gap-3">
                {socials.map((social) => (
                  <button
                    key={social.name}
                    type="button"
                    aria-label={social.name}
                    aria-disabled="true"
                    className="flex items-center overflow-hidden rounded-lg border border-[#3b3c43] p-3 transition-opacity hover:opacity-80"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={social.src}
                      alt=""
                      className="size-4 shrink-0"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative aspect-[1376/279] w-full overflow-hidden opacity-70">
          <Image
            src="/images/footer-wordmark.png"
            alt="Eve Jean"
            fill
            className="object-cover object-[center_42%]"
            sizes="1280px"
          />
        </div>

        <div className="flex items-center gap-6 font-[family-name:var(--font-instrument)] text-sm text-white/60">
          <p className="leading-[1.3]">
            © 2024 DFREE® Foundation. Inc All rights reserved.
          </p>
          <button
            type="button"
            aria-disabled="true"
            className="cursor-default underline leading-normal"
          >
            Privacy policy
          </button>
          <button
            type="button"
            aria-disabled="true"
            className="cursor-default underline leading-normal"
          >
            Terms of service
          </button>
          <button
            type="button"
            aria-disabled="true"
            className="cursor-default underline leading-normal"
          >
            Cookies settings
          </button>
        </div>
      </div>
    </footer>
  );
}
