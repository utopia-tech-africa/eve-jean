import { ReachOutButton } from "./ReachOutButton";

const links = ["Services", "Work", "About"] as const;

export function SiteNav() {
  return (
    <nav
      className="animate-fade-in absolute left-1/2 top-3 z-20 flex -translate-x-1/2 items-center gap-[120px] overflow-hidden rounded bg-[rgba(21,21,21,0.6)] px-4 py-2.5 backdrop-blur-[5px]"
      aria-label="Primary"
    >
      <p className="shrink-0 whitespace-nowrap text-white">
        <span className="text-[22.644px] leading-none tracking-wide">EVE</span>
        <span className="text-[21.59px] leading-none tracking-wide">JEAN</span>
      </p>

      <div className="flex items-center gap-4 font-[family-name:var(--font-instrument)] text-lg text-white">
        {links.map((label) => (
          <button
            key={label}
            type="button"
            aria-disabled="true"
            className="cursor-default transition-opacity hover:opacity-80"
          >
            {label}
          </button>
        ))}
      </div>

      <ReachOutButton variant="outline" />
    </nav>
  );
}
