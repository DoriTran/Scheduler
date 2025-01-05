import { useState, useEffect } from "react";
import moment from "moment";

function getSmallestUnit(format) {
  // Define time units with associated moment format indicators
  const units = [
    { unit: "second", indicators: ["s"] },
    { unit: "minute", indicators: ["m"] },
    { unit: "hour", indicators: ["H", "h", "a", "A"] },
    { unit: "day", indicators: ["D", "Do"] },
    { unit: "month", indicators: ["M"] },
    { unit: "year", indicators: ["Y"] },
  ];

  // Determine the smallest unit present in the format string
  const smallestUnit = units.find(({ indicators }) => indicators.some((indicator) => format.includes(indicator)))?.unit;
  return smallestUnit || "minute";
}

function useMemoTime(callback, dependancy, format) {
  const [value, setValue] = useState(callback());

  useEffect(() => {
    const smallestUnit = getSmallestUnit(format);

    const now = moment();
    let delay;
    let interval;
    switch (smallestUnit) {
      case "second":
        delay = 1000 - now.milliseconds();
        interval = 1000;
        break;

      case "minute":
        delay = (60 - now.seconds()) * 1000;
        interval = 60000;
        break;

      case "hour":
        delay = (60 - now.minutes()) * 60000;
        interval = 3600000;
        break;

      case "day":
        delay = (24 - now.hours()) * 3600000;
        interval = 86400000;
        break;

      case "month":
        delay = moment(now).endOf("month").add(1, "millisecond").diff(now);
        interval = delay;
        break;

      case "year":
      default:
        delay = moment(now).endOf("year").add(1, "millisecond").diff(now);
        interval = delay;
        break;
    }

    // Set initial alignment and then start a repeating interval
    const timerId = setTimeout(() => {
      setValue(callback());
      setInterval(() => setValue(callback()), interval);
    }, delay);

    // Clear timeout and interval on unmount
    return () => clearTimeout(timerId);
  }, [dependancy, format]);

  return value;
}

export default useMemoTime;
