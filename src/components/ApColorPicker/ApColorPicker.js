import { useMemo } from "react";
import { getAllNoteColors } from "utils";
import styles from "./ApColorPicker.module.scss";

const ApColorPicker = ({ color, setColor }) => {
  const allNoteColors = useMemo(() => getAllNoteColors(), []);

  return (
    <>
      {allNoteColors.map((eachColor) => (
        <div
          className={styles.color}
          key={eachColor}
          style={{
            backgroundColor: `var(--${eachColor}-pastel)`,
            borderColor: `var(--${eachColor}-important)`,
            borderWidth: eachColor === color ? 5 : 2,
          }}
          onClick={() => setColor(eachColor)}
        />
      ))}
    </>
  );
};

export default ApColorPicker;
