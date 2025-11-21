"use client";
import { useEffect, useState, useRef, ReactNode } from "react";

type ScrollFadeInProps = {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
};

export const ScrollFadeIn = ({
  children,
  delay = 0,
  threshold = 0.2,
  className = "overflow-y-hidden",
}: ScrollFadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      },
      { threshold }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, [threshold, isVisible]);

  const classes = `transition-all duration-1000 ease-out 
    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
    ${className}`;

  return (
    <div
      className={classes}
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
