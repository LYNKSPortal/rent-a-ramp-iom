import Image from "next/image";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { Ramp } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export default function RampImage({ ramp, className }: { ramp: Ramp; className?: string }) {
  if (!ramp.image) {
    return (
      <ImagePlaceholder
        icon={ramp.type === "4-post" ? "4post" : "2post"}
        label={ramp.imageAlt}
        className={className}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-grey-100", className)}>
      <Image
        src={ramp.image}
        alt={ramp.imageAlt}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
