function getPeriodRange(period) {
  switch (period) {
    case "midnight":
      return [0, 6];
    case "morning":
      return [6, 12];
    case "noon":
      return [12, 16];
    case "evening":
      return [16, 19];
    case "night":
      return [19, 24];
    default:
      return [0, 24];
  }
}

export default getPeriodRange;
