import { getAllNoteColors } from "utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { ApIcon } from "components";
import styles from "./NoteCard.module.scss";

const Color = ({ color, setPreview, selected }) => {
  const colorStyle = useMemo(() => {
    return {
      backgroundColor: `var(--${color}-pastel)`,
      border: `${selected ? 5 : 2}px solid var(--${color}-important)`,
    };
  }, [color]);

  return (
    <div
      className={styles.color}
      style={colorStyle}
      onMouseEnter={() => setPreview(color)}
      onMouseLeave={() => setPreview(null)}
    />
  );
};

const ColorPicker = ({ isCardHover, color, preview, setPreview }) => {
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef(null);
  const allNoteColors = useMemo(() => getAllNoteColors(), []);

  useEffect(() => {
    const handleClickOutsideColorPicker = (event) => {
      if (isOpen && divRef.current && !divRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideColorPicker);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideColorPicker);
    };
  }, []);

  const pickerStyle = useMemo(() => {
    const pickerSize = (isOpen && "fit-content") || (isHover && "30px") || (isCardHover && "12px");
    return {
      width: pickerSize,
      height: pickerSize,
      background: `linear-gradient(135deg, var(--${preview || color}-pastel), var(--background))`,
    };
  }, [color, preview, isCardHover, isHover, isOpen]);

  return (
    <div
      className={styles.colorPicker}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => !isOpen && setIsHover(false)}
      style={pickerStyle}
      ref={divRef}
    >
      <div className={styles.wrapper}>
        <div className={styles.colors}>
          {allNoteColors.map((eachColor) => (
            <Color key={eachColor} selected={color === eachColor} color={eachColor} setPreview={setPreview} />
          ))}
        </div>
        <ApIcon icon={faPalette} color={`var(--${color}-important)`} size={20} />
      </div>
    </div>
  );
};

export default ColorPicker;
