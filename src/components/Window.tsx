import { useRef, useState } from "react";

import type { Delegate } from "onyx-ui";

import { View, Text } from "onyx-ui";

import Frame from "./Frame";

type PointerData = {
  left: number,
  top: number
};

//
// Window
//

function Window({
  id,
  title,
  children,
  x,
  y,
  order,
  onUpdate,
  onFocus
}: Delegate<{
  id: string,
  title: string,
  x: number,
  y: number,
  order: number,
  onUpdate: (id: string, x: number, y: number) => void,
  onFocus: (id: string) => void
}, typeof View<"div">>) {
  const initialMoveEventRef = useRef<PointerData | null>(null);
  const initialResizeDOMRectRef = useRef<DOMRect | null>(null);

  const windowElementRef = useRef<HTMLDivElement>(null);

  //

  const handlePointerDown = (event: React.PointerEvent) => {
    event.currentTarget.setPointerCapture(event.pointerId);

    if (windowElementRef.current) {
      initialMoveEventRef.current = {
        left: windowElementRef.current.offsetLeft - event.clientX,
        top: windowElementRef.current.offsetTop - event.clientY
      };

      windowElementRef.current.style.willChange = "left, top";
    }

    onFocus(id);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (windowElementRef.current && initialMoveEventRef.current) {
      windowElementRef.current.style.left = `${initialMoveEventRef.current.left + event.clientX}px`;
      windowElementRef.current.style.top = `${initialMoveEventRef.current.top + event.clientY}px`;
    }
  };

  const handlePointerUp = () => {
    initialMoveEventRef.current = null;

    if (windowElementRef.current) {
      onUpdate(id, windowElementRef.current.offsetLeft, windowElementRef.current.offsetTop);

      windowElementRef.current.style.willChange = "left, top";
    }
  };

  //

  const handleFrameResizeStart = () => {
    if (windowElementRef.current) {
      initialResizeDOMRectRef.current = windowElementRef.current.getBoundingClientRect();
    }
  };

  const handleFrameUpdate = (deltaX: number, deltaY: number) => {
    if (windowElementRef.current && initialResizeDOMRectRef.current) {
      windowElementRef.current.style.width = `${initialResizeDOMRectRef.current.width + deltaX}px`;
    }
  };

  return (
    <View id="window" ref={windowElementRef} absolute shadow cornerRadius="4px" style={{
      left: x, top: y, width: undefined, height: undefined, zIndex: order
    }}>
      <Frame onStart={handleFrameResizeStart} onUpdate={handleFrameUpdate} />
      <View border="bottom" borderColor="gutter" fillColor="gray-1" align="middle center" style={{
        borderTopLeftRadius: 4, borderTopRightRadius: 4
      }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <Text fontWeight="700" padding="8px 16px" style={{ marginTop: 1 }}>
          {title}
        </Text>
      </View>
      <View id="content" fillColor="content" style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4, overflow: "hidden" }}>
        {children}
      </View>
      <View id="overlay" absolute style={{ inset: 0, top: 30, pointerEvents: "none" }} />
    </View>
  );
}

export default Window;
