import React from "react";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 min-h-[60vh] animate-pulse">
      {/* Skeleton Header */}
      <div className="h-4 w-32 bg-border/60 rounded mb-4" />
      <div className="h-8 w-64 md:w-96 bg-border/80 rounded mb-2" />
      <div className="h-4 w-48 md:w-72 bg-border/40 rounded mb-10" />

      {/* Skeleton Content Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-card bg-surface border border-border/60 overflow-hidden shadow-xs flex flex-col"
          >
            <div className="aspect-square w-full bg-accent-soft/50" />
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="h-3 w-16 bg-border/60 rounded" />
                <div className="h-4 w-full bg-border/80 rounded" />
              </div>
              <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                <div className="h-4 w-20 bg-border/60 rounded" />
                <div className="h-7 w-7 rounded-full bg-border/40" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
