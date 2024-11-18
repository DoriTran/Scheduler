import clsx from "clsx";
import css from "../../index.module.scss";
import styles from "./Plans.module.scss";

const Plans = () => {
  return (
    <div className={clsx(css.cardWrapper, styles.plansWrapper)}>
      <div className={css.title}>Plans</div>
    </div>
  );
};

export default Plans;
