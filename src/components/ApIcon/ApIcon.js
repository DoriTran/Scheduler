import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSVG } from "react-svg";
import sun from "./sun.svg";
import sunrise from "./sunrise.svg";
import sunset from "./sunset.svg";
import moon from "./moon.svg";
import stars from "./stars.svg";
import plusdown from "./plusdown.svg";

// Session: morning, noon, evening, night, midnight
const svgIcon = {
  morning: sunrise,
  noon: sun,
  evening: sunset,
  night: moon,
  midnight: stars,
  plus: plusdown,
};

const ApIcon = ({ icon, color = "inherit", size = "1.5rem", fixedWidth = true, sx, period, ...restProps }) => {
  if (period) {
    return (
      <ReactSVG
        src={svgIcon[period]}
        beforeInjection={(svg) => {
          svg.setAttribute("width", size);
          svg.setAttribute("height", size);
          svg.setAttribute("fill", color);
        }}
        {...restProps}
        style={{
          cursor: restProps.onClick ? "pointer" : "unset",
          ...sx,
        }}
      />
    );
  }

  if (icon?.prefix && icon?.iconName) {
    return (
      <FontAwesomeIcon
        icon={icon}
        color={color}
        fixedWidth={fixedWidth}
        {...restProps}
        style={{
          fontSize: size,
          cursor: restProps.onClick ? "pointer" : "unset",
          ...restProps.style,
        }}
      />
    );
  }

  const Icon = icon;
  return (
    <Icon
      sx={{
        fontSize: size,
        cursor: restProps.onClick ? "pointer" : "unset",
        color,
        ...sx,
      }}
      {...restProps}
    />
  );
};

export default ApIcon;
