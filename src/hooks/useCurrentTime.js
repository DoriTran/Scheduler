import { useState, useEffect } from "react";
import moment from "moment";

function useCurrentTime(format) {
  const [time, setTime] = useState(moment().format(format));

  useEffect(() => {
    const updateClock = () => {
      setTime(moment().format(format));
    };

    // Update clock immediately
    updateClock();

    // Calculate delay to next full minute
    const now = moment();
    const delay = (60 - now.seconds()) * 1000;

    // Initial timeout to align with the next minute
    const timerId = setTimeout(() => {
      updateClock();
      setInterval(updateClock, 60000);
    }, delay);

    return () => clearTimeout(timerId);
  }, [format]);

  return time;
}

export default useCurrentTime;
