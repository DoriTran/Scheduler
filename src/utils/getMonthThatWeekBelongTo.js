import getMomentAsObject from "./getMomentAsObject";

const getMonthThatWeekBelongTo = (mm, asMoment = true) => {
  // Start & End of moment input
  const startOfWeek = mm.clone().startOf("isoWeek");
  const endOfWeek = mm.clone().endOf("isoWeek");

  let result;
  // If start and end both are in the same month → return that month
  if (startOfWeek.isSame(endOfWeek, "month")) result = startOfWeek;
  // Else counting total day belong to each month to determine
  else {
    const startOfNextMonth = endOfWeek.clone().startOf("month");
    const totalDayInPreviousMonth = startOfNextMonth.diff(startOfWeek, "days");
    const totalDayInNextMonth = endOfWeek.diff(startOfNextMonth, "days") + 1; // Also count the 1st day
    if (totalDayInPreviousMonth > totalDayInNextMonth) result = startOfWeek;
    else result = endOfWeek;
  }

  // Change the day to the first day of the result month
  return asMoment ? result.startOf("month") : getMomentAsObject(result.startOf("month")); //
};

export default getMonthThatWeekBelongTo;
