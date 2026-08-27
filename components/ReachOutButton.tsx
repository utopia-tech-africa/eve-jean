type ReachOutButtonProps = {
  variant?: "outline" | "filled";
  className?: string;
};

export function ReachOutButton({
  variant = "outline",
  className = "",
}: ReachOutButtonProps) {
  const isFilled = variant === "filled";

  return (
    <button
      type="button"
      aria-disabled="true"
      className={`group w-[117px] rounded-[4px] border transition-opacity hover:opacity-90 ${
        isFilled ? "border-[rgba(21,21,21,0.3)]" : "border-white"
      } ${className}`}
    >
      <span
        className={`flex w-full items-center justify-center rounded-[4px] px-3 py-2 font-[family-name:var(--font-instrument)] text-[16px] font-normal leading-normal text-white transition-colors ${
          isFilled
            ? "bg-accent group-hover:bg-[#354828]"
            : "bg-transparent"
        }`}
      >
        Reach Out
      </span>
    </button>
  );
}
