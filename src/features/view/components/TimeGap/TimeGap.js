import { faAngleDoubleDown, faAngleDown, faCircleChevronDown, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { ApIcon, ApTooltip } from "components";
import moment from "moment";
import { useMemo } from "react";

const TimeGap = ({ from: fromValue, to: toValue, plus, onClick }) => {
  const { icon, tooltip } = useMemo(() => {
    if (plus) return { tooltip: "Create note?" };
    const from = moment(fromValue, "HH:mm");
    const to = moment(toValue, "HH:mm");
    const minutes = to.diff(from, "minutes");

    if (Number.isNaN(minutes) || minutes === 0) return { icon: null, tooltip: null };
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
  }, [fromValue, toValue]);

  if (!icon && !plus) return null;
  return (
    <ApTooltip refWrap tooltip={tooltip}>
      <ApIcon icon={icon} period={plus && "plus"} size={18} color="var(--text-low)" onClick={onClick} />
    </ApTooltip>
  );
};

export default TimeGap;
