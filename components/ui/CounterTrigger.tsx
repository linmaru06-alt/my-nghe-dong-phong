"use client";

import React, { useEffect, useRef, useState } from "react";

export interface CounterTriggerProps {
  target: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function CounterTrigger({
  target,
  duration = 1600,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: CounterTriggerProps) {
  const [count, setCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const domRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setCount(target);
      setHasTriggered(true);
      return;
    }

    const element = domRef.current;
    if (!element || hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.unobserve(entry.target);

          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease Out Cubic: 1 - (1 - progress)^3
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = easeOut * target;

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [target, duration, hasTriggered]);

  const formattedValue = new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(count);

  return (
    <span ref={domRef} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

export default CounterTrigger;
