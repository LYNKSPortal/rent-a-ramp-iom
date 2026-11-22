import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Rent a Ramp logo. The source artwork (`/public/logo.png`) sits on a solid
 * white background, so on dark surfaces (navbar, footer) it's shown on a
 * white chip for legibility. On light surfaces it can be dropped in directly.
 */
export default function Logo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        light && "bg-transparent",
        className
      )}
    >
      <Image
        src="/logo-dark.png"
        alt="Rent a Ramp"
        width={3000}
        height={435}
        priority
        className="h-auto w-[300px] max-w-full"
      />
    </span>
  );
}
