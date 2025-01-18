import React, { useRef, useEffect, forwardRef } from "react";
import CustomScrollbar from "./CustomScrollbar";

// snap: mandatory | proximity
// smooth: boolean
// speed: number for scale, px / rem / ... for exact scrolling
const ApScrollbar = forwardRef(
  (
    {
      maxWidth = "100vw",
      maxHeight = "100vh",
      hidden,
      snap,
      smooth,
      speed,
      horizontal,
      vertical,
      size = 8,
      style,
      className,
      children,
      ...restProps
    },
    ref
  ) => {
    const internalRef = useRef(null);
    const scrollbarRef = ref || internalRef;

    useEffect(() => {
      const handleWheel = (event) => {
        const container = scrollbarRef.current;
        if (!container || speed === undefined) return;

        event.preventDefault();

        // Parse speed if it's a fixed unit (e.g., px, rem, em)
        const unitRegex = /^(\d+)(px|rem|em|%)$/;
        const match = typeof speed === "string" ? speed.match(unitRegex) : null;

        if (match) {
          const [_, value, unit] = match;
          let scrollDistance = parseFloat(value);

          if (unit === "rem") {
            scrollDistance *= parseFloat(getComputedStyle(document.documentElement).fontSize);
          } else if (unit === "em") {
            scrollDistance *= parseFloat(getComputedStyle(container).fontSize);
          } else if (unit === "%") {
            scrollDistance = (scrollDistance / 100) * container.clientHeight;
          }

          container.scrollBy({
            top: vertical ? Math.sign(event.deltaY) * scrollDistance : 0,
            left: horizontal ? Math.sign(event.deltaX) * scrollDistance : 0,
          });
        } else if (typeof speed === "number") {
          // Scale the native delta by the speed multiplier
          container.scrollBy({
            top: vertical ? event.deltaY * speed : 0,
            left: horizontal ? event.deltaX * speed : 0,
          });
        }
      };

      const container = scrollbarRef.current;
      if (container) {
        container.addEventListener("wheel", handleWheel, { passive: false });
      }

      return () => {
        if (container) {
          container.removeEventListener("wheel", handleWheel);
        }
      };
    }, [speed, horizontal, vertical]);

    return (
      <CustomScrollbar
        ref={scrollbarRef}
        className={className}
        style={{
          overflowX: horizontal || "auto",
          overflowY: vertical || "auto",
          ...(snap && {
            scrollSnapType: `${
              (horizontal && vertical && "both") || (horizontal && "x") || (vertical && "y") || "none"
            } ${snap}`,
          }),
          ...(smooth && { scrollBehavior: "smooth" }),
          ...(!className && { maxWidth }),
          ...(!className && { maxHeight }),
          ...style,
        }}
        display={hidden ? "none" : "unset"}
        size={size}
        color="var(--white)"
        {...restProps}
      >
        {children}
      </CustomScrollbar>
    );
  }
);

ApScrollbar.displayName = "ApScrollbar";
export default ApScrollbar;
