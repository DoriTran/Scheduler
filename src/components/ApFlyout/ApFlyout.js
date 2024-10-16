import React, { useState } from "react";
import { Fade, Popover } from "@mui/material"; // Ensure you have Material-UI installed
import ApScrollbar from "./ApScrollbar"; // Adjust this path according to your file structure

const ApFlyout = ({
  anchor,
  anchorOrigin = {
    vertical: "center",
    horizontal: "center",
  },
  transformOrigin = {
    vertical: "top",
    horizontal: "left",
  },
  isOpen,
  setIsOpen,
  style,
  maxHeight = "75vh",
  autoFocus = false,
  onOpen,
  onClose,
  noUnmountWhenClose,
  children,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    onOpen?.(event);
    setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    onClose?.();
    setIsOpen?.(false);
  };

  return (
    <>
      {React.cloneElement(anchor, {
        onClick: handleOpen,
        style: { cursor: "pointer" },
      })}
      {anchorEl && (
        <Popover
          autoFocus={autoFocus}
          anchorEl={anchorEl}
          open={noUnmountWhenClose || isOpen}
          onClose={handleClose}
          TransitionComponent={Fade}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          sx={{ ...(noUnmountWhenClose && !isOpen && { display: "none" }), ...style }}
        >
          <ApScrollbar hidden maxHeight={maxHeight}>
            <div style={style?.children}>{children}</div>
          </ApScrollbar>
        </Popover>
      )}
    </>
  );
};

export default ApFlyout;
