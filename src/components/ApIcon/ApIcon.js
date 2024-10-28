import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ApIcon = ({ icon, color = "inherit", size = "1.5rem", fixedWidth = true, sx, ...restProps }) => {
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
