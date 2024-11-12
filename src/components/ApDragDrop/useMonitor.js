import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect } from "react";

/* ====> Main object structure:
  self: { ...target }
  source: { data, dragHandle, element }
  location: { current, initial, previous }
*/

/* ====> Inner structure:
  initial, current, previous: { dropTargets: target[], input (∉ previous) }
  target: { data, dropEffect, element, isActiveDueToStickiness }
  input: { altKey, ctrlKey, shiftKey, button, buttons, clientX, clientY, metaKey, pageX, pageY }
*/

// Hear any event occuring
const useMonitor = (
  { canMonitor, onDragStart, onDrag, onDrop, onDropTargetChange, onGenerateDragPreview, onDragEnter, onDragLeave },
  monitorDeps = []
) => {
  useEffect(() => {
    return monitorForElements({
      canMonitor, // ({ input, source, element }) => boolean
      onDragStart, // { source, location }
      onDrag, // { source, location }
      onDrop, // { source, location }
      onDropTargetChange, // { source, location }
      onGenerateDragPreview, // { source, location }
      onDragEnter, // SyntheticBaseEvent
      onDragLeave, // SyntheticBaseEvent
    });
  }, [...monitorDeps]);
};

export default useMonitor;
