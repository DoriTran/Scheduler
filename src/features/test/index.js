/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { ApDragDrop, useMonitor } from "components";
import styles from "./index.module.scss";

const Square = ({ label }) => {
  return (
    <ApDragDrop
      data={label}
      disableDefaultPreviewContainer
      classNameBase={styles.squareBase}
      classNamePreview={styles.squarePreview}
      useNonNativePreviewContainer
    >
      <Paper className={styles.square}>
        <Typography variant="body2">{label}</Typography>
      </Paper>
    </ApDragDrop>
  );
};

const Rectangle = ({ type = "Vertical", order, children }) => {
  return (
    <ApDragDrop dropData={order} classNameDragHover={styles.rectHover}>
      <Paper className={styles.rect}>{children}</Paper>
    </ApDragDrop>
  );
};

const TestPage = () => {
  const [first, setFirst] = useState(["A", "B", "C"]);
  const [second, setSecond] = useState([1, 2, 3]);

  useEffect(() => {
    console.log(first, second);
  }, [first, second]);

  useMonitor(
    {
      onDrop: ({ source, location }) => {
        // console.log(first, second);
        const destinationData = location.current.dropTargets?.[0]?.data;
        const dropItemData = source.data;

        if (destinationData === "first" && !first.includes(dropItemData)) {
          setFirst([...first, dropItemData]);
          setSecond([...second.filter((item) => item !== dropItemData)]);
        } else if (destinationData === "second" && !second.includes(dropItemData)) {
          setSecond([...second, dropItemData]);
          setFirst([...first.filter((item) => item !== dropItemData)]);
        }
      },
      onDragStart: () => {
        console.log("debug");
      },
    },
    [first, second]
  );

  return (
    <div className={styles.testPageContainer}>
      <Rectangle order="first" setFirst={setFirst} setSecond={setSecond}>
        {first.map((each) => (
          <Square key={`First-${each}`} label={each} setFirst={setFirst} setSecond={setSecond} />
        ))}
      </Rectangle>
      <Rectangle order="second" setFirst={setFirst} setSecond={setSecond}>
        {second.map((each) => (
          <Square key={`Second-${each}`} label={each} setFirst={setFirst} setSecond={setSecond} />
        ))}
      </Rectangle>
      <Rectangle order="third" setFirst={setFirst} setSecond={setSecond}>
        <Rectangle order="fourth" setFirst={setFirst} setSecond={setSecond} />
      </Rectangle>
    </div>
  );
};

export default TestPage;
