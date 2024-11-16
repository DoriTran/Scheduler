import css from "../../index.module.scss";
import styles from "./Calendar.module.scss";

const Calendar = () => {
  return (
    <div className={css.cardWrapper}>
      <div className={styles.title}>Calendar</div>
      <div className={styles.date}>12/10/2024</div>
    </div>
  );
};

export default Calendar;
