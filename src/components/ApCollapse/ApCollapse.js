import { useMemo } from "react";

const ApCollapse = ({
  collapsed,
  horizontal,
  vertical,
  width = "auto", // required for transition
  height = "auto", // required for transition
  collapsedWidth = 0,
  collapsedHeight = 0,
  transition = "all 0.25s ease-in-out",
  children,
  ...restProps
}) => {
  const containerStyles = useMemo(() => {
    return {
      overflow: "hidden",
      transition,
      width: collapsed && horizontal ? collapsedWidth : width,
      height: collapsed && vertical ? collapsedHeight : height,
      ...restProps?.style,
    };
  }, [collapsed, horizontal, vertical, transition]);

  return (
    <div style={containerStyles} {...restProps}>
      {children}
    </div>
  );
};

export default ApCollapse;
