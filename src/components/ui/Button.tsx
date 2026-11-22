import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline-light" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex min-w-0 max-w-full items-center justify-center gap-2 whitespace-normal text-center font-semibold uppercase tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-orange text-white hover:bg-orange-dark",
  secondary: "bg-ink text-white hover:bg-ink-800",
  "outline-light": "border-2 border-white text-white hover:bg-white hover:text-ink",
  ghost: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  href?: string;
}

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> &
  Omit<React.ComponentProps<typeof Link>, keyof CommonProps | "href">;

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as Omit<React.ComponentProps<typeof Link>, "href">)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
