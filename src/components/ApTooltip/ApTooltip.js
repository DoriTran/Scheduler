import React from "react";
import { Tooltip, Typography } from "@mui/material";

const ApTooltip = ({ tooltip, refWrap, config, offset, children, ...restProps }) => {
  return (
    <Tooltip
      title={<Typography sx={{ fontFamily: "'Mali', sans-serif", fontSize: "1rem" }}>{tooltip}</Typography>}
      arrow
      sx={{ backgroundColor: "var(--primary-light" }}
      slotProps={{
        arrow: { sx: { color: "var(--primary-dark)" } },
        tooltip: {
          sx: {
            backgroundColor: "var(--background)",
            border: "2px solid var(--primary-dark)",
            color: "var(--text)",
          },
        },
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: offset || [0, -10],
              },
            },
          ],
        },
        ...config,
      }}
      {...restProps}
    >
      {refWrap ? <div {...refWrap}>{children}</div> : children}
    </Tooltip>
  );
};

export default ApTooltip;
