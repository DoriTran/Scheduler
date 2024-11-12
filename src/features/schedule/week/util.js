import moment from "moment";

export const getCurrentWeekDates = () => {
  // Monday as start of the week
  const startOfWeek = moment().isoWeekday(1);
  const daysOfWeek = [];

  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(startOfWeek.clone().add(i, "days").format("DD/MM/YYYY"));
  }

  return daysOfWeek;
};

export const getSurroundingDates = (prev = 2, next = 4, currentDay = moment().format("DD/MM/YYYY")) => {
  const baseDate = moment(currentDay, "DD/MM/YYYY");
  const dates = [];

  for (let i = -prev; i <= next; i++) {
    dates.push(baseDate.clone().add(i, "days").format("DD/MM/YYYY"));
  }

  return dates;
};
