import { useMemo, useState } from "react";
import { getAllNoteColors } from "utils";
import ApFlyout from "components/ApFlyout/ApFlyout";
import { MenuItem } from "@mui/material";
import ApIcon from "components/ApIcon/ApIcon";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import styles from "./ColorPicker.module.scss";

const ColorItem = ({ isSelected, color, setColor, setPreview }) => {
  return (
    <MenuItem
      className={styles.colorItem}
      onClick={() => setColor(color)}
      onMouseEnter={() => setPreview(color)}
      onMouseLeave={() => setPreview(null)}
      style={{
        background: `linear-gradient(
          to right, 
          var(--${color}-highlight) 10px, 
          var(--${color}-pastel) 10px
        )`,
      }}
    >
      <div className={styles.colorText} style={{ color: `var(--${color}-important)` }}>
        {color}
      </div>
    </MenuItem>
  );
};

const ColorPicker = ({ isOpen, setOpen, color, setColor, setPreview, paletteSize = 22 }) => {
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  const allNoteColors = useMemo(() => getAllNoteColors(), []);

  return (
    <ApFlyout
      anchor={<ApIcon icon={faPalette} size={paletteSize} color={`var(--${color}-important)`} />}
      transformOrigin={{ vertical: "center", horizontal: "left" }}
      isOpen={isOpenPicker}
      setIsOpen={setIsOpenPicker}
      onClose={() => setPreview(null)}
      maxHeight="90vh"
      className={styles.wrapper}
    >
      {allNoteColors.map((eachColor) => (
        <ColorItem
          key={eachColor}
          isSelected={color === eachColor}
          color={eachColor}
          setColor={setColor}
          setPreview={setPreview}
        />
      ))}
    </ApFlyout>
  );
};

export default ColorPicker;
