type ReachOutButtonProps = {
  variant?: "outline" | "cta";
  className?: string;
};

export function ReachOutButton({
  variant = "outline",
  className = "",
}: ReachOutButtonProps) {
  const isCta = variant === "cta";

  return (
    <button
      type="button"
      aria-disabled="true"
      className={`group rounded-[4px] border transition-opacity hover:opacity-90 ${
        isCta
          ? "border-[rgba(21,21,21,0.3)] p-1"
          : "w-[117px] border-white"
      } ${className}`}
    >
      <span
        className={`flex w-full items-center justify-center rounded-[4px] px-3 py-2 font-[family-name:var(--font-instrument)] text-[16px] font-normal leading-normal text-white transition-colors ${
          isCta
            ? "bg-accent group-hover:bg-[#354828]"
            : "bg-transparent"
        }`}
      >
        Reach Out
      </span>
    </button>
  );
}
