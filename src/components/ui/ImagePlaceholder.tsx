import { cn } from "@/lib/utils";

type IconKey = "hero" | "2post" | "4post" | "workshop" | "tools" | "location";

const icons: Record<IconKey, React.ReactNode> = {
  hero: (
    <svg viewBox="0 0 200 140" fill="none" className="h-full w-full">
      <path
        d="M20 110h160M45 110V70h20l15-16h40l15 16h20v40"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="70" cy="112" r="10" stroke="currentColor" strokeWidth="3" />
      <circle cx="150" cy="112" r="10" stroke="currentColor" strokeWidth="3" />
      <path d="M35 60V25M155 60V25" stroke="currentColor" strokeWidth="3" />
      <path d="M25 25h20M145 25h20" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  "2post": (
    <svg viewBox="0 0 200 140" fill="none" className="h-full w-full">
      <path d="M40 130V20M160 130V20" stroke="currentColor" strokeWidth="4" />
      <path d="M30 20h20M150 20h20" stroke="currentColor" strokeWidth="4" />
      <path d="M40 65h40l14-14h12l14 14h40" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <rect x="55" y="65" width="90" height="16" rx="2" stroke="currentColor" strokeWidth="3" />
      <circle cx="75" cy="100" r="12" stroke="currentColor" strokeWidth="3" />
      <circle cx="125" cy="100" r="12" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  "4post": (
    <svg viewBox="0 0 200 140" fill="none" className="h-full w-full">
      <path d="M30 130V25M170 130V25M60 130V60M140 130V60" stroke="currentColor" strokeWidth="3.5" />
      <rect x="45" y="72" width="110" height="10" stroke="currentColor" strokeWidth="3" />
      <path d="M55 72V50h90v22" stroke="currentColor" strokeWidth="3" />
      <circle cx="75" cy="95" r="11" stroke="currentColor" strokeWidth="3" />
      <circle cx="125" cy="95" r="11" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  workshop: (
    <svg viewBox="0 0 200 140" fill="none" className="h-full w-full">
      <path d="M15 130h170M25 130V60l75-35 75 35v70" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M25 60h150" stroke="currentColor" strokeWidth="3" />
      <path d="M80 130V85h40v45" stroke="currentColor" strokeWidth="3" />
      <path d="M100 25v20" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 200 140" fill="none" className="h-full w-full">
      <path
        d="M60 40l20 20-45 45a10 10 0 0 1-14-14z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M100 40l10-10 10 10-10 10z" stroke="currentColor" strokeWidth="3" />
      <path
        d="M120 100a20 20 0 1 0 20 20l-10-10-10 3-3-10z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M40 70l60 60" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 200 140" fill="none" className="h-full w-full">
      <path
        d="M100 20c-25 0-45 20-45 45 0 32 45 60 45 60s45-28 45-60c0-25-20-45-45-45z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="100" cy="65" r="15" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
};

export default function ImagePlaceholder({
  icon,
  label,
  className,
  iconClassName,
}: {
  icon: IconKey;
  label?: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-ink industrial-texture grain-overlay",
        className
      )}
      role="img"
      aria-label={label ?? "Workshop imagery placeholder"}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-orange/10" />
      <div className="absolute inset-0 flex items-center justify-center p-10">
        <div className={cn("w-full max-w-[220px] text-orange/80", iconClassName)}>
          {icons[icon]}
        </div>
      </div>
      {label && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-4 py-2">
          <p className="text-xs uppercase tracking-widest text-white/70">{label}</p>
        </div>
      )}
    </div>
  );
}
