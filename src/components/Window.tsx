import { useLayoutEffect, useRef, useState } from "react";

import type { Delegate } from "onyx-ui";

import { View, Text, Button } from "onyx-ui";

import Frame from "./Frame";
import { XIcon } from "lucide-react";

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
  position,
  size,
  order,
  onUpdate,
  onFocus,
  onRequestClose,
  onLayout
}: Delegate<{
  id: string,
  title: string,
  position?: {
    x: number,
    y: number
  },
  size: {
    width?: number,
    height?: number
  },
  order: number,
  onUpdate: (id: string, x: number, y: number) => void,
  onFocus: (id: string) => void,
  onRequestClose?: (id: string) => void,
  onLayout?: (id: string, element: HTMLElement) => void
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
      console.log(initialMoveEventRef.current.left, event.clientX - initialMoveEventRef.current.left);

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

  const handleCloseButtonPointerDown = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleCloseButtonClick = (event: React.MouseEvent) => {
    onRequestClose?.(id);
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

  // x   

  useLayoutEffect(() => {
    onLayout?.(id, windowElementRef.current!);
  }, [id, onLayout]);

  return (
    <View id="window" ref={windowElementRef} absolute shadow cornerRadius="4px" style={{
      left: position?.x, top: position?.y, width: size.width, height: size.height, zIndex: order
    }}>
      <View id="overlay" absolute style={{ zIndex: 1000, inset: 0, top: 30, pointerEvents: "none" }} />
      <Frame onStart={handleFrameResizeStart} onUpdate={handleFrameUpdate} />
      <View horizontal border="bottom" borderColor="gutter" fillColor="gray-1" align="middle justify" style={{
        borderTopLeftRadius: 4, borderTopRightRadius: 4
      }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <Button hover icon={XIcon} onPointerDown={handleCloseButtonPointerDown} onClick={handleCloseButtonClick} />
        <Text fontWeight="700" padding="8px 16px" style={{ marginTop: 1 }}>
          {title}
        </Text>
        <View style={{ width: 28 }} />
      </View>
      <View flex id="content" fillColor="content" style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4, overflow: "hidden" }}>
        {children}
      </View>
    </View>
  );
}

export default Window;
