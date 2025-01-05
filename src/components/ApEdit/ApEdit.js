import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./ApEdit.module.scss";

// type → name | description | time
const ApEdit = ({ type, isEdit, setEdit, value, setValue, onConfirm, onCancel, ...restProps }) => {
  const [ownValue, setOwnValue] = useState(value);
  const [status, setStatus] = useState(isEdit || false);

  const setEditStatus = (sta) => {
    setStatus(sta);
    setEdit?.(sta);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Save value and exit edit mode
      setValue(ownValue);
      setEditStatus(false);
      onConfirm?.();
    } else if (e.key === "Escape") {
      // Revert value and exit edit mode
      setOwnValue(value);
      setEditStatus(false);
      onCancel?.();
    }
  };

  useEffect(() => {
    setOwnValue(value);
  }, [value]);

  if (isEdit || status) {
    return (
      <input
        className={clsx(styles[type], styles.input)}
        value={ownValue}
        onChange={(e) => setOwnValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => setEditStatus(false)}
        {...restProps}
      />
    );
  }
  return (
    <div
      className={styles[type]}
      onContextMenu={(e) => {
        e.preventDefault();
        setEditStatus(true);
      }}
      {...restProps}
    >
      {value}
    </div>
  );
};

export default ApEdit;
