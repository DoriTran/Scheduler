import { useState, useEffect } from "react";
import moment from "moment";

function getTimeOfDay() {
  const now = moment();

  // Midnight: 12:00 AM - 5:59 AM
  if (now.isBefore(moment().hour(6).minute(0))) {
    return "midnight";
  }
  // Morning: 6:00 AM - 11:59 AM
  if (now.isBetween(moment().hour(6).minute(0), moment().hour(12).minute(0), null, "[]")) {
    return "morning";
  }
  // Noon: 12:00 PM - 3:59 PM
  if (now.isBetween(moment().hour(12).minute(0), moment().hour(16).minute(0), null, "[]")) {
    return "noon";
  }
  // Evening: 4:00 PM - 6:59 PM
  if (now.isBetween(moment().hour(16).minute(0), moment().hour(19).minute(0), null, "[]")) {
    return "evening";
  }
  // Night: 7:00 PM - 11:59 PM
  if (now.isBetween(moment().hour(19).minute(0), moment().hour(24).minute(0), null, "[]")) {
    return "night";
  }

  return "Unknown";
}

function useTimePeriod() {
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

  useEffect(() => {
    const updatePeriod = () => {
      setTimeOfDay(getTimeOfDay());
    };

    // Calculate delay to align with the start of the next minute
    const now = moment();
    const delay = (60 - now.seconds()) * 1000;

    const timerId = setTimeout(() => {
      updatePeriod();
      setInterval(updatePeriod, 60000);
    }, delay);

    return () => clearTimeout(timerId);
  }, []);

  return timeOfDay;
}

export default useTimePeriod;
