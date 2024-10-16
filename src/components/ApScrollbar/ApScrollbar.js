import { useRef } from "react";
import CustomScrollbar from "./CustomScrollbar";

const ApScrollbar = ({
  maxWidth = "100vw",
  maxHeight = "100vh",
  hidden,
  horizontal,
  vertical,
  size = 8,
  style,
  className,
  children,
  ...restProps
}) => {
  const scrollbarRef = useRef(null);

  return (
    <CustomScrollbar
      ref={scrollbarRef}
      className={className}
      style={{
        overflowX: horizontal || "auto",
        overflowY: vertical || "auto",
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
};

export default ApScrollbar;
