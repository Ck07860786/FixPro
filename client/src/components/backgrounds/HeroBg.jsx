"use client"

import { cn } from "@/lib/utils"
import { InteractiveGridPattern } from "../ui/interactive-grid-pattern"

export function HeroBg({ className }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -left-[50vw] -right-[50vw] mx-auto w-screen overflow-hidden",
        className
      )}
    >
      
      <InteractiveGridPattern
        width={42}
        height={42}
        squares={[60, 40]}
        className={cn(
          "pointer-events-auto absolute inset-0 h-full w-full",
          "[mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,white_10%,transparent_70%)]"
        )}
        squaresClassName="stroke-slate-300/30"
      />
    </div>
  )
}
