import { useStoreNotes } from "store";
import { useShallow } from "zustand/react/shallow";
import NewCard from "./NewCard/NewCard";
import PlanCard from "./PlanCard/PlanCard";
import styles from "./YourPlans.module.scss";

const YourPlans = () => {
  const { plans, moveNote } = useStoreNotes(
    useShallow((state) => ({ plans: state.plans, updateNote: state.updateNote, moveNote: state.moveNote }))
  );

  return (
    <div className={styles.yourPlans}>
      <NewCard />
      <div className={styles.plans}>
        {plans.map((plan, index) => (
          <PlanCard key={`${plan.name}-${plan.description}`} at={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default YourPlans;
