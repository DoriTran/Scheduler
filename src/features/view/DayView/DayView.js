import { useStoreView } from "store";

const DayView = () => {
  const viewValue = useStoreView((state) => state.viewValue);

  return (
    <h1>
      DayView: {viewValue.day} {viewValue.month} {viewValue.year}
    </h1>
  );
};

export default DayView;
