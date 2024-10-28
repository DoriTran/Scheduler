import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import styles from "./TimeIndicator.module.scss";

const TimeIndicator = () => {
  const [currentTime, setCurrentTime] = useState(moment().format("HH:mm"));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().format("HH:mm"));
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <Divider sx={{ thickness: 2, margin: "16px 0" }}>
      <div className={styles.time}>{currentTime}</div>
    </Divider>
  );
};

export default TimeIndicator;
