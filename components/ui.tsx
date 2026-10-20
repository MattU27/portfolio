import type { ReactNode } from "react";
type ArrowDirection = "right" | "up" | "down";

export function Arrow({
  diagonal = false,
  direction = "right",
}: {
  diagonal?: boolean;
  direction?: ArrowDirection;
}) {
  const rotation = diagonal ? -45 : direction === "up" ? -90 : direction === "down" ? 90 : 0;
  return (
    <svg className="icon" aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <g transform={`rotate(${rotation} 12 12)`}>
        <path d="M5 12h14M12 5l7 7-7 7" />
      </g>
    </svg>
  );
}

export function Lock() {
  return (
    <svg className="icon" aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
    </svg>
  );
}

export function Play() {
  return (
    <svg className="icon" aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 5 11 7-11 7V5Z" />
    </svg>
  );
}

export function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children ? <p className="section-intro">{children}</p> : null}
    </div>
  );
}
