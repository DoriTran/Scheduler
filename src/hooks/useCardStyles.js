import { useMemo } from "react";

const useCardStyles = ({ isHover, isFocus, isColor, isEdit, important, color, preview } = {}) => {
  return useMemo(() => {
    // Card status conditions:
    const isSelected = isFocus || isColor;
    const isImportantSelected = important && isSelected;

    // Color priority: preview > color > base
    const baseColor = preview || color || "base";
    const typeSuffix = (important && "-important") || (isHover && "-highlight") || "-pastel";
    const borderSuffix = (isSelected && "-important") || typeSuffix;

    return {
      transition: "background-color 0.15s ease-in-out",
      backgroundColor: `var(--${baseColor}${typeSuffix})`,
      color: `var(--${typeSuffix === "-important" ? "text-contrast" : "text"})`,
      border: `2px solid var(--${isImportantSelected ? "important" : baseColor}${borderSuffix})`,
    };
  }, [isHover, isFocus, isColor, important, color, preview]);
};

export default useCardStyles;
