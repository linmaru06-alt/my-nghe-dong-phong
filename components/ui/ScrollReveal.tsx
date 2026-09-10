"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number; // milliseconds
  duration?: number; // seconds
  threshold?: number; // 0 to 1
  className?: string;
  as?: React.ElementType;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  threshold = 0.12,
  className = "",
  as: Component = "div",
  style,
  ...props
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = domRef.current;
    if (!element) return;

    // Check if element is already in viewport on mount (e.g. above fold)
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Small timeout to allow initial render to commit
      const timer = setTimeout(() => setIsVisible(true), 40 + delay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [delay, threshold]);

  const initialTransform = useMemo(() => {
    switch (direction) {
      case "up":
        return "translate3d(0, 24px, 0)";
      case "down":
        return "translate3d(0, -24px, 0)";
      case "left":
        return "translate3d(28px, 0, 0)";
      case "right":
        return "translate3d(-28px, 0, 0)";
      case "none":
      default:
        return "translate3d(0, 0, 0)";
    }
  }, [direction]);

  return (
    <Component
      ref={domRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0)" : initialTransform,
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
        backfaceVisibility: "hidden",
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * ScrollRevealGroup: Helper to stagger child elements automatically
 */
export interface ScrollRevealGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  staggerDelay?: number; // ms delay between items
  direction?: RevealDirection;
  duration?: number;
  className?: string;
  as?: React.ElementType;
}

export function ScrollRevealGroup({
  children,
  staggerDelay = 70,
  direction = "up",
  duration = 0.7,
  className = "",
  as: Component = "div",
  ...props
}: ScrollRevealGroupProps) {
  const childArray = React.Children.toArray(children);

  return (
    <Component className={className} {...props}>
      {childArray.map((child, index) => {
        if (!React.isValidElement(child)) return child;
        return (
          <ScrollReveal
            key={child.key || index}
            direction={direction}
            delay={index * staggerDelay}
            duration={duration}
          >
            {child}
          </ScrollReveal>
        );
      })}
    </Component>
  );
}

export default ScrollReveal;
