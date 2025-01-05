const getMomentAsObject = (mm) => {
  return {
    day: mm.date(),
    month: mm.month(),
    year: mm.year(),
    weekDay: mm.format("dddd"),
  };
};

export default getMomentAsObject;
