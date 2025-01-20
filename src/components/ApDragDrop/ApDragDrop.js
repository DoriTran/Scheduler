/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";
import { disableNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview";
import { useEffect, useRef, Children, cloneElement, useState } from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";

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

/* ~ References:
  onGenerateDragPreview: https://atlassian.design/components/pragmatic-drag-and-drop/core-package/adapters/element/drag-previews
  the partial opacity that is applied to preview is an unfortunate design decision made by browsers that we can't change
*/

const ApDragDrop = ({
  //* Drag properties */
  dragHandle,
  data, // { element, dragHandle, input }
  externalData, // { element, dragHandle, input }
  canDrag, // { element, dragHandle, input }
  onDragStart, // { source, location }
  onDrag, // { source, location }
  onDrop, // { source, location }
  onDropTargetChange, // { source, location }
  onGenerateDragPreview, // ({ nativeSetDragImage }) => setCustomNativeDragPreview({ render({ container }) {}, getOffset: () => { x,y }, nativeSetDragImage })
  dragDeps = [],
  restDragProps,
  //* Drag css */
  styleBase,
  classNameBase,
  stylePreview,
  classNamePreview,
  preview,
  useNonNativePreviewContainer,

  //* Drop properties */
  dropData, // { input, source, element } => { your_data }
  canDrop, // { input, source, element } => boolean
  onCatch, // { source, location, self }
  onDragEnter, // SyntheticBaseEvent
  onDragLeave, // SyntheticBaseEvent
  dropEffect, // { input, source, element } => { your_effect }
  dropSticky, // { input, source, element } => boolean
  dropDeps = [],
  restDropProps,
  //* Drop css */
  styleDragHover,
  classNameDragHover,

  //* Other properties */
  children,
}) => {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [container, setContainer] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [baseOffset, setBaseOffset] = useState({ x: 0, y: 0 });

  const dragPropsDeps = [dragHandle, data, externalData, canDrag, onDragStart, onDrag, onDrop, onDropTargetChange, onGenerateDragPreview];
  const dropPropsDeps = [dropData, canDrop, onCatch, onDragEnter, onDragLeave, dropEffect, dropSticky];

  useEffect(() => {
    const el = ref.current;
    const willApplyDragLogic =
      dragHandle ||
      data ||
      externalData ||
      canDrag ||
      onDragStart ||
      onDrag ||
      onDrop ||
      onDropTargetChange ||
      onGenerateDragPreview;

    if (!el || !willApplyDragLogic) return;
    return draggable({
      element: el,
      dragHandle,
      getInitialData: (event) => (typeof data === "function" ? data(event) : data),
      getInitialDataForExternal: (event) => (typeof externalData === "function" ? externalData(event) : externalData),
      canDrag,
      onDragStart: (event) => {
        setDragging(true);
        onDragStart?.(event);
        if (useNonNativePreviewContainer) {
          // Get the initial pointer position
          const { pageX, pageY } = event.location.initial.input;
          setPreviewPosition({ x: pageX - baseOffset.x, y: pageY - baseOffset.y });
          // Create a div holder
          const customPreview = document.createElement("div");
          customPreview.style.position = "fixed";
          customPreview.style.zIndex = "2147483647";
          customPreview.style.pointerEvents = "none";
          document.body.appendChild(customPreview);
          setContainer(customPreview);
        }
      },
      onDrag: (event) => {
        onDrag?.(event);
        if (useNonNativePreviewContainer) {
          const { pageX, pageY } = event.location.current.input;
          setPreviewPosition({ x: pageX - baseOffset.x, y: pageY - baseOffset.y });
        }
      },
      onDrop: (event) => {
        setDragging(false);
        onDrop?.(event);
        if (useNonNativePreviewContainer && container) {
          document.body.removeChild(container);
          setContainer(null);
        } else setContainer(null);
      },
      onDropTargetChange,
      onGenerateDragPreview: (event) => {
        const { nativeSetDragImage, location, source } = event;
        if (useNonNativePreviewContainer) {
          const sourceRect = source.element.getBoundingClientRect();
          const { input } = location.current;
          setBaseOffset({
            x: input.clientX - sourceRect.x,
            y: input.clientY - sourceRect.y,
          });
          disableNativeDragPreview({ nativeSetDragImage });
          return;
        }
        if (!preview && !stylePreview && !classNamePreview) onGenerateDragPreview?.(event);
        else {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({
              element: source.element,
              input: location.current.input,
            }),
            render({ container: ctn }) {
              setContainer(ctn);
            },
          });
        }
      },
      ...restDragProps,
    });
  }, [...dragDeps, ...dragPropsDeps, container, baseOffset]);

  useEffect(() => {
    const el = ref.current;
    const willApplyDropLogic = dropData || canDrop || onCatch || onDragEnter || onDragLeave || dropEffect || dropSticky;

    if (!el || !willApplyDropLogic) return;
    return dropTargetForElements({
      element: el,
      getData: (event) => (typeof dropData === "function" ? dropData(event) : dropData),
      canDrop,
      onDrop: (event) => {
        onCatch?.(event);
        setHovering(false);
      },
      onDragEnter: (event) => {
        onDragEnter?.(event);
        setHovering(true);
      },
      onDragLeave: (event) => {
        onDragLeave?.(event);
        setHovering(false);
      },
      getDropEffect: (event) => (typeof dropEffect === "function" ? dropEffect(event) : dropEffect),
      getIsSticky: (event) => (typeof dropSticky === "function" ? dropSticky(event) : dropSticky),
      ...restDropProps,
    });
  }, [...dropDeps, ...dropPropsDeps]);

  if (Children.count(children) === 1) {
    return (
      <>
        {cloneElement(children, {
          ref,
          style: {
            ...children.props.style,
            ...(dragging && { ...styleBase }),
            ...(hovering && { ...styleDragHover }),
          },
          className: clsx(children.props.className, dragging && classNameBase, hovering && classNameDragHover),
        })}
        {container &&
          createPortal(
            preview ||
              cloneElement(children, {
                style: {
                  ...children.props.style,
                  ...stylePreview,
                  ...(useNonNativePreviewContainer && {
                    position: "fixed",
                    left: `${previewPosition.x}px`,
                    top: `${previewPosition.y}px`,
                  }),
                },
                className: clsx(children.props.className, classNamePreview),
              }),
            container
          )}
      </>
    );
  }
  return children;
};

export default ApDragDrop;
