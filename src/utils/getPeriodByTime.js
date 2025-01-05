import moment from "moment";
import getPeriodRange from "./getPeriodRange";

function getPeriodByTime(time = moment()) {
  const { midnight, morning, noon, evening, night } = getPeriodRange();

  // Midnight: 12:00 AM - 5:59 AM
  if (time.isBefore(moment().hour(midnight[1]).minute(0))) {
    return "midnight";
  }
  // Morning: 6:00 AM - 11:59 AM
  if (time.isBetween(moment().hour(morning[0]).minute(0), moment().hour(morning[1]).minute(0), null, "[]")) {
    return "morning";
  }
  // Noon: 12:00 PM - 3:59 PM
  if (time.isBetween(moment().hour(noon[0]).minute(0), moment().hour(noon[1]).minute(0), null, "[]")) {
    return "noon";
  }
  // Evening: 4:00 PM - 6:59 PM
  if (time.isBetween(moment().hour(evening[0]).minute(0), moment().hour(evening[1]).minute(0), null, "[]")) {
    return "evening";
  }
  // Night: 7:00 PM - 11:59 PM
  if (time.isBetween(moment().hour(night[0]).minute(0), moment().hour(night[1]).minute(0), null, "[]")) {
    return "night";
  }

  return "Unknown";
}

export default getPeriodByTime;
