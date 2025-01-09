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
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && addNewNoteToPlan()}
          placeholder="New planning?"
        />
        <input
          className={clsx(styles.input, styles.description)}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && addNewNoteToPlan()}
          placeholder="About it?"
        />
      </div>
      <ApIcon icon={faPlay} size={30} color="var(--text)" onClick={addNewNoteToPlan} />
    </div>
  );
};

export default NewCard;
