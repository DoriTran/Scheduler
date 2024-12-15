import { ApCalendar } from "components";
import moment from "moment";
import { useState } from "react";

const Calendar = () => {
  const [calendar, setCalendar] = useState(moment());

  return <ApCalendar value={calendar} setValue={setCalendar} />;
};

export default Calendar;
