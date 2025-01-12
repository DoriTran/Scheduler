import { useMemo } from "react";

const useCardStyle = ({ isHover, isFocus, isColor, important, color, preview } = {}) => {
  return useMemo(() => {
    return {
      backgroundColor: `var(--${preview || color || "background"}${
        (isHover && color && "-highlight") || (important && color && "-important") || (color && "-pastel") || ""
      })`,
      color: `var(--${((isHover || !important) && "text") || (important && "text-contrast")})`,
      ...((isFocus || isColor) && { border: `2px solid var(--${preview || color || "background"}-important)` }),
    };
  }, [isHover, isFocus, isColor, important, color, preview]);
};

export default useCardStyle;
