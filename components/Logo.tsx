import Image from "next/image";
import { cx } from "@/lib/format";

type MarkProps = {
  className?: string;
  size?: number;
  priority?: boolean;
  decorative?: boolean;
};

export function LogoMark({
  className,
  size = 48,
  priority = false,
  decorative = true,
}: MarkProps) {
  return (
    <Image
      src="/brand/forensic-mark.png"
      alt={
        decorative
          ? ""
          : "The Forensic Neuroscientist mark: a blue brain beside an orange fingerprint profile."
      }
      width={678}
      height={677}
      priority={priority}
      sizes={`${size}px`}
      className={cx("logoMark", className)}
      style={{ width: size, height: "auto" }}
    />
  );
}

type FullLogoProps = {
  className?: string;
  width?: number;
  priority?: boolean;
};

export function FullLogo({
  className,
  width = 440,
  priority = false,
}: FullLogoProps) {
  return (
    <Image
      src="/brand/forensic-logo.png"
      alt="Forensic Neuroscience Training Academy logo"
      width={1738}
      height={788}
      priority={priority}
      sizes={`(max-width: 640px) 240px, ${width}px`}
      className={cx("fullLogo", className)}
      style={{ width, height: "auto" }}
    />
  );
}
