import ApScrollbar from "components/ApScrollbar/ApScrollbar";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import ApFlyout from "components/ApFlyout/ApFlyout";
import styles from "./TimePicker.module.scss";

const EmptyCell = () => {
  return <div className={styles.emptyCell} />;
};

const NumCell = memo(({ num, selected, setValue }) => {
  return (
    <div onClick={() => setValue(num)} className={selected ? styles.cellSelected : styles.cellNotSelected}>
      {num.toString().padStart(2, "0")}
    </div>
  );
});
NumCell.displayName = "NumCell";

const cellListLength = { hour: 24, minute: 60 };
const CellList = ({ type, value, setValue }) => {
  const scrollbarRef = useRef(null);
  const [smoothBehavior, setSmoothBehavior] = useState(false);

  useEffect(() => {
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollTo({ top: value * 20 });
      setSmoothBehavior(true);
    }
  }, [value]);

  return (
    <ApScrollbar
      ref={scrollbarRef}
      maxHeight={200}
      hidden
      vertical
      snap="mandatory"
      smooth={smoothBehavior}
      speed={type === "hour" ? "60px" : "140px"}
      className={styles.cellList}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <EmptyCell key={`${type}-top-empty-cell-${index}`} />
      ))}
      {Array.from({ length: cellListLength[type] }).map((_, index) => (
        <NumCell
          key={`${type}-select-${index}`}
          num={index}
          selected={value === index}
          setValue={(v) => setValue((prev) => ({ ...prev, [type]: v }))}
        />
      ))}
      <NumCell
        key={`${type}-select-${0}-last`}
        num={0}
        selected={value === 0}
        setValue={(v) => setValue((prev) => ({ ...prev, [type]: v }))}
      />
      {Array.from({ length: 4 }).map((_, index) => (
        <EmptyCell key={`${type}-bot-empty-cell-${index}`} />
      ))}
    </ApScrollbar>
  );
};

const extractTime = (value) => {
  const hour = parseInt(value?.slice(0, 2), 10) || 0;
  const minute = parseInt(value?.slice(-2), 10) || 0;
  return { hour, minute };
};
const TimePicker = ({ isOpen, setOpen, value, setValue, disabled, infoColor, ...restProps }) => {
  const [time, setTime] = useState(extractTime(value));
  useEffect(() => setTime(extractTime(value)), [value]);

  return (
    <ApFlyout
      anchor={
        <div className={styles.display} style={{ color: infoColor }} {...restProps}>
          {value}
        </div>
      }
      anchorOrigin={{ vertical: "center", horizontal: "center" }}
      transformOrigin={{ vertical: "center", horizontal: "center" }}
      isOpen={isOpen}
      setIsOpen={setOpen}
      onClose={() => {
        const changeResult = `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
        if (changeResult !== value) setValue?.(changeResult);
      }}
      disabled={disabled}
      className={styles.wrapper}
    >
      <CellList type="hour" value={time.hour} setValue={setTime} {...restProps} />
      <div className={styles.colon}>:</div>
      <CellList type="minute" value={time.minute} setValue={setTime} {...restProps} />
    </ApFlyout>
  );
};

export default TimePicker;
