import { useMemo } from "react";

const useCardStyle = ({ isHover, isFocus, isColor, important, color, preview } = {}) => {
  return useMemo(() => {
    // Color priority: preview > color > background
    const baseColor = preview || color || "background";
    const typeColor = (isHover && "-highlight") || (important && "-important") || "-pastel";

    return {
      backgroundColor: `var(--${baseColor}${baseColor !== "background" ? typeColor : ""})`,
      color: `var(--${((isHover || !important) && "text") || (important && "text-contrast")})`,
      ...((isFocus || isColor) && { border: `2px solid var(--${preview || color || "background"}-important)` }),
    };
  }, [isHover, isFocus, isColor, important, color, preview]);
};

export default useCardStyle;
