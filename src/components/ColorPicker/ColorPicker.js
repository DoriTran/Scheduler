import { useMemo, useState } from "react";
import { getAllNoteColors } from "utils";
import ApFlyout from "components/ApFlyout/ApFlyout";
import { MenuItem } from "@mui/material";
import ApIcon from "components/ApIcon/ApIcon";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import styles from "./ColorPicker.module.scss";

const ColorItem = ({ isSelected, color, setPreview, setOpen, onSelect }) => {
  return (
    <MenuItem
      className={styles.colorItem}
      onClick={(e) => {
        e?.stopPropagation();
        onSelect(null, { color });
        setOpen(false);
      }}
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

const ColorPicker = ({ isOpen, setOpen, color, setPreview, onSelect, paletteSize = 22, paletteColor }) => {
  // const [isOpenPicker, setIsOpenPicker] = useState(false);
  const allNoteColors = useMemo(() => getAllNoteColors(), []);

  return (
    <ApFlyout
      anchor={<ApIcon icon={faPalette} size={paletteSize} color={paletteColor} />}
      transformOrigin={{ vertical: "center", horizontal: "left" }}
      isOpen={isOpen}
      setIsOpen={setOpen}
      onClose={() => setPreview(null)}
      maxHeight="90vh"
      className={styles.wrapper}
    >
      {allNoteColors.map((eachColor) => (
        <ColorItem
          key={eachColor}
          isSelected={color === eachColor}
          color={eachColor}
          setPreview={setPreview}
          setOpen={setOpen}
          onSelect={onSelect}
        />
      ))}
    </ApFlyout>
  );
};

export default ColorPicker;
