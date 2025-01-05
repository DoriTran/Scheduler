import { faAngleDoubleDown, faAngleDown, faCircleChevronDown, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { ApIcon, ApTooltip } from "components";
import { useMemo } from "react";

const TimeGap = ({ from, to, start, end }) => {
  const { icon, tooltip } = useMemo(() => {
    const minutes = to.diff(from, "minutes");

    // Lest than 30 minutes
    let gapIcon = faEllipsis;
    // Less than 3 hours
    if (minutes > 30) gapIcon = faAngleDown;
    // More than 3 hours
    if (minutes > 180) gapIcon = faAngleDoubleDown;

    // Tooltip
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return { icon: gapIcon, tooltip: `${hours}:${remainingMinutes.toString().padStart(2, "0")}` };
  }, [from, to]);

  return (
    <ApTooltip tooltip={tooltip}>
      <ApIcon icon={icon} size={14} color="var(--text-low)" />
    </ApTooltip>
  );
};

export default TimeGap;
