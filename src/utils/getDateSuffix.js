const getDateSuffix = (dateAsNumber) => {
  const lastDigit = dateAsNumber % 10;
  const firstDigit = Math.floor(dateAsNumber / 10);

  if (firstDigit === 1) return "th";
  return ["st", "nd", "rd"][lastDigit - 1] || "th";
};

export default getDateSuffix;
