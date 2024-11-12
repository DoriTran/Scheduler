import { useEffect, useState, useRef } from "react";
import { css, jsx } from "@emotion/react";

import {
  monitorForElements,
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const items1 = ["A", "B", "C", "D", "E"];
const items2 = ["1", "2", "3", "4", "5"];

// Square component
const Square = ({ item, color }) => {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return draggable({
      element: el,
      getInitialData: () => ({ item }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [item]);

  return (
    <div
      ref={ref}
      style={{
        width: "90px",
        height: "90px",
        backgroundColor: color,
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
        fontWeight: "bold",
        fontSize: "20px",
        boxShadow: dragging ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none",
        opacity: dragging ? 0.5 : 1,
        transition: "box-shadow 0.2s ease, opacity 0.2s ease",
      }}
    >
      {item}
    </div>
  );
};

// Main component
const DragDropColumns = () => {
  const [column1, setColumn1] = useState(items1);
  const [column2, setColumn2] = useState(items2);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const destinationColumn = destination.data.column;
        const sourceItem = source.data.item;

        if (destinationColumn === "column1") {
          setColumn1((prev) => [sourceItem, ...prev]);
          setColumn2((prev) => prev.filter((item) => item !== sourceItem));
        } else {
          setColumn2((prev) => [sourceItem, ...prev]);
          setColumn1((prev) => prev.filter((item) => item !== sourceItem));
        }
      },
    });
  }, [column1, column2]);

  const renderColumn = (items, columnId, color) => {
    return (
      <div
        ref={(el) => {
          if (!el) return; // Replace invariant with simple if check
          dropTargetForElements({
            element: el,
            getData: () => ({ column: columnId }),
          });
        }}
        style={{
          width: "125px",
          height: "80vh",
          backgroundColor: "lightgrey",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        {items.map((item) => (
          <Square key={item} item={item} color={color} />
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "50px" }}>
      {renderColumn(column1, "column1", "pink")}
      {renderColumn(column2, "column2", "lavender")}
    </div>
  );
};

export default DragDropColumns;
