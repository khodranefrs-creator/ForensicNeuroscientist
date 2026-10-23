import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...props}>
      <path d="M3 10h13M11.5 5l5 5-5 5" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...props}>
      <path d="M5.5 14.5 14.5 5.5M7 5.5h7.5V13" />
    </svg>
  );
}

export function Play(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <path d="M8.5 6.5v11l9-5.5-9-5.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTube(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="4" />
      <path d="M10 9v6l5-3-5-3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function External(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...props}>
      <path d="M11 4h5v5M16 4l-7 7M8 4H4v12h12v-4" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...props}>
      <path d="m3.5 10.5 4 4 9-9" />
    </svg>
  );
}

export function Alert(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...props}>
      <path d="M10 3 2.5 16.5h15L10 3Z" />
      <path d="M10 8v4M10 14.5v.2" />
    </svg>
  );
}

export function Search(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" {...base} {...props}>
      <circle cx="8.5" cy="8.5" r="5" />
      <path d="m12.2 12.2 4.3 4.3" />
    </svg>
  );
}

export function Quote(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...props}>
      <path d="M4 12h6v7H4v-7Zm0-2c0-3 2-5 5-6M14 12h6v7h-6v-7Zm0-2c0-3 2-5 5-6" />
    </svg>
  );
}
