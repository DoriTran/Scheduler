import { ApIcon } from "components";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useStoreNotes } from "store";
import { useCardStyle } from "hooks";
import clsx from "clsx";
import styles from "./NewCard.module.scss";

const NewCard = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const cardStyles = useCardStyle();
  const addNote = useStoreNotes((state) => state.addNote);

  const addNewNoteToPlan = () => {
    addNote("plans", data);
    setData({ name: "", description: "" });
  };

  return (
    <div className={styles.card} style={cardStyles}>
      <div className={styles.fieldsWrapper}>
        <input
          className={clsx(styles.input, styles.name)}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="Write your new note"
        />
        <input
          className={clsx(styles.input, styles.description)}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          placeholder="Write description"
        />
      </div>
      <ApIcon icon={faPlay} size={30} color="var(--text)" onClick={addNewNoteToPlan} />
    </div>
  );
};

export default NewCard;
