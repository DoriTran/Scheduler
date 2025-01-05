import { ApIcon } from "components";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./SideDivider.module.scss";

const SideDivider = ({ collapse, setCollapse }) => {
  return (
    <div className={styles.sideDivider}>
      <ApIcon
        icon={faAngleRight}
        size={20}
        color="var(--primary-dark)"
        onClick={() => setCollapse(!collapse)}
        style={{ transform: `rotate(${collapse ? "-90deg" : "0"})` }}
        className={styles.thumb}
      />
      <div className={styles.divider} />
    </div>
  );
};

export default SideDivider;
