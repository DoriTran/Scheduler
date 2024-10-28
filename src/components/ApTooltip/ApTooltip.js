import { FC } from "react";
import { Tooltip, Typography } from "@mui/material";

interface TooltipProps {
  tooltip: string;
  divWrapper?: boolean;
  componentsProps?: any;
  children: React.ReactElement;
  [key: string]: any;
}

const ApTooltip: FC<TooltipProps> = ({ tooltip, divWrapper, componentsProps, children, ...restProps }) => {
  return (
    <Tooltip
      title={<Typography sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.75rem" }}>{tooltip}</Typography>}
      arrow
      sx={{ backgroundColor: "var(--primary-light" }}
      componentsProps={{
        arrow: {
          sx: {
            color: "var(--primary)",
            ...componentsProps?.arrow?.sx,
          },
        },
        tooltip: {
          sx: {
            backgroundColor: "var(--primary)",
            border: "3px solid var(--primary-light)",
            ...componentsProps?.tooltip?.sx,
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
          ...componentsProps?.popper?.modifiers,
        },
        ...componentsProps,
      }}
      {...restProps}
    >
      {divWrapper ? <div>{children}</div> : children}
    </Tooltip>
  );
};

export default ApTooltip;
