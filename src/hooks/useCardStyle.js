import { useMemo } from "react";

const useCardStyle = ({ isHover, isFocus, important, color, preview } = {}) => {
  return useMemo(() => {
    return {
      backgroundColor: `var(--${preview || color || "background"}${
        (isHover && color && "-highlight") || (important && color && "-important") || (color && "-pastel") || ""
      })`,
      color: `var(--${((isHover || !important) && "text") || (important && "text-contrast")})`,
      ...(isFocus && { border: `2px solid var(--${color || "background"}-important)` }),
    };
  }, [isHover, isFocus, important, color, preview]);
};

export default useCardStyle;
