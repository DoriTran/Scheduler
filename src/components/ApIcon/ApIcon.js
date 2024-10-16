import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ApIcon = ({ icon, color = "inherit", size = "1.5rem", fixedWidth = true, sx, ...restProps }) => {
  // Check if the icon is an SVG path
  if (typeof icon === "string" && icon.startsWith("M")) {
    return (
      <svg
        {...restProps}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          cursor: restProps.onClick ? "pointer" : "unset",
          ...restProps.style,
        }}
      >
        <path d={icon} />
      </svg>
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
