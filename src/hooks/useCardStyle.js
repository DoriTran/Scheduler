import { useMemo } from "react";

const useCardStyle = ({ isHover, isFocus, isColor, important, color, preview } = {}) => {
  return useMemo(() => {
    // Color priority: preview > color > base
    const baseColor = preview || color || "base";
    const typeSuffix = (isHover && "highlight") || (important && "important") || "pastel";
    const ctrsSuffix = important ? "pastel" : "important";

    return {
      transition: "0.15s ease-in-out",
      backgroundColor: `var(--${baseColor}-${typeSuffix})`,
      color: `var(--${((isHover || !important) && "text") || (important && "text-contrast")})`,
      border: `2px solid var(--${baseColor}-${isFocus || isColor ? ctrsSuffix : typeSuffix})`,
    };
  }, [isHover, isFocus, isColor, important, color, preview]);
};

export default useCardStyle;
