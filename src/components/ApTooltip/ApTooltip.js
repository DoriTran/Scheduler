import React from "react";
import { Tooltip, Typography } from "@mui/material";

const ApTooltip = ({ tooltip, wrapContent, componentsProps, children, ...restProps }) => {
  return (
    <Tooltip
      title={<Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.75rem" }}>{tooltip}</Typography>}
      arrow
      sx={{ backgroundColor: "var(--primary-light" }}
      slotProps={{
        arrow: {
          sx: {
            color: "var(--primary)",
            ...(componentsProps?.arrow?.sx || {}),
          },
        },
        tooltip: {
          sx: {
            backgroundColor: "var(--primary)",
            border: "3px solid var(--primary-light)",
            ...(componentsProps?.tooltip?.sx || {}),
          },
        },
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -4],
              },
            },
          ],
          ...(componentsProps?.popper?.modifiers || {}),
        },
        ...componentsProps,
      }}
      {...restProps}
    >
      {wrapContent ? <div>{children}</div> : children}
    </Tooltip>
  );
};

export default ApTooltip;
