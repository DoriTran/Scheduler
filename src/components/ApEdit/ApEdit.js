/* eslint-disable prettier/prettier */
import clsx from "clsx";
import styles from "./ApEdit.module.scss";

// type → name | description
const ApEdit = ({ type, isEdit, value, setValue, onConfirm, onCancel, infoColor, ...restProps }) => {
  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter": onConfirm?.(); break;
      case "Escape": onCancel?.(); break;
      default: break;
    }
  };

  if (isEdit)
    return (
      <input
        className={clsx(styles[type], styles.input)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onDoubleClick={(e) => e.stopPropagation()}
        {...restProps}
      />
    );
  return (
    <div className={styles[type]} style={{ color: infoColor }} {...restProps}>
      {value}
    </div>
  );
};

export default ApEdit;
