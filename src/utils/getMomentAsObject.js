const getMomentAsObject = (mm) => {
  return {
    day: mm.date(),
    month: mm.month(),
    year: mm.year(),
  };
};

export default getMomentAsObject;
