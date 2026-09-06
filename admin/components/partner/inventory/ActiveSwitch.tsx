export function ActiveSwitch({
  on,
  onChange,
  disabled = false,
  label,
  size = "md",
}: {
  on: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: "sm" | "md";
}) {
  const compact = size === "sm";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => onChange(!on)}
      className={`flex items-center ${compact ? "gap-1.5" : "gap-2"} ${disabled ? "opacity-50" : ""}`}
    >
      <span
        className={`relative shrink-0 rounded-full transition-colors ${
          compact ? "h-4 w-7" : "h-6 w-10"
        } ${on ? "bg-[#377e22]" : "bg-[#d1d5db]"}`}
      >
        <span
          className={`absolute rounded-full bg-white shadow-sm transition-[left] ${
            compact
              ? `top-[2px] h-3 w-3 ${on ? "left-[14px]" : "left-[2px]"}`
              : `top-0.5 h-5 w-5 ${on ? "left-[18px]" : "left-0.5"}`
          }`}
        />
      </span>
      {label ? (
        <span
          className={`font-bold ${compact ? "text-[10px] leading-3" : "text-[12px]"} ${
            on ? "text-[#377e22]" : "text-kowi-muted"
          }`}
        >
          {label}
        </span>
      ) : null}
    </button>
  );
}
