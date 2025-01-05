const periodRange = {
  midnight: [0, 6],
  morning: [6, 12],
  noon: [12, 16],
  evening: [16, 19],
  night: [19, 24],
};

function getPeriodRange(period) {
  return periodRange[period] || periodRange;
}

export default getPeriodRange;
