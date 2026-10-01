import { useState } from "react";
import { Info } from "lucide-react";

interface TooltipProps {
  text: string;
  children?: React.ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        aria-label={text}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex text-temple-400 transition hover:text-temple-600 focus:outline-none"
      >
        {children ?? <Info className="h-4 w-4" />}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-30 mb-2 w-56 -translate-x-1/2 rounded-lg bg-temple-900 px-3 py-2 text-xs font-normal normal-case leading-relaxed tracking-normal text-cream-50 shadow-card-lg"
        >
          {text}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-temple-900" />
        </span>
      )}
    </span>
  );
}
