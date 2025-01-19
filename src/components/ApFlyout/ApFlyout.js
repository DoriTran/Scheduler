import React, { useState } from "react";
import { Fade, Popover } from "@mui/material";
import ApScrollbar from "components/ApScrollbar/ApScrollbar";

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
  isOpen, // required for opening
  setIsOpen, // required for opening
  maxHeight = "75vh",
  autoFocus = false,
  onOpen,
  onClose,
  noUnmountWhenClose,
  disabled,
  sx,
  children,
  ...restProps
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    if (disabled) return;
    onOpen?.(event);
    setIsOpen?.(true);
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
        style: { cursor: disabled ? "unset" : "pointer" },
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
          sx={{ ...(noUnmountWhenClose && !isOpen && { display: "none" }), ...sx }}
        >
          <ApScrollbar hidden maxHeight={maxHeight}>
            <div {...restProps}>{children}</div>
          </ApScrollbar>
        </Popover>
      )}
    </>
  );
};

export default ApFlyout;
