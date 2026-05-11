import { cn } from "@/lib/utils";

export function MarigoldGarland({ className }: { className?: string }) {
  const flowers = 14;
  return (
    <svg
      viewBox="0 0 600 60"
      preserveAspectRatio="none"
      className={cn("h-10 w-full", className)}
      aria-hidden
    >
      <path
        d="M 0 30 Q 150 55 300 30 T 600 30"
        stroke="#386641"
        strokeWidth="1.4"
        fill="none"
      />
      {Array.from({ length: flowers }).map((_, i) => {
        const t = i / (flowers - 1);
        const x = t * 600;
        const y = 30 + Math.sin(t * Math.PI) * 22;
        const r = 7 + (i % 3) * 1.2;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            {Array.from({ length: 8 }).map((__, p) => {
              const a = (p * Math.PI) / 4;
              const px = Math.cos(a) * r * 0.55;
              const py = Math.sin(a) * r * 0.55;
              return <circle key={p} cx={px} cy={py} r={r * 0.55} fill="#F4A300" opacity="0.92" />;
            })}
            <circle r={r * 0.55} fill="#D62828" />
          </g>
        );
      })}
    </svg>
  );
}
