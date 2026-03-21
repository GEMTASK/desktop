import { useLayoutEffect, useRef, useState } from "react";

import type { Delegate } from "onyx-ui";

import { View, Text, Button } from "onyx-ui";

import Frame from "./Frame";
import { XIcon } from "lucide-react";

type PointerData = {
  clientX: number,
  clientY: number,
  offsetLeft: number,
  offsetTop: number
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
        clientX: event.clientX,
        clientY: event.clientY,
        offsetLeft: event.clientX - windowElementRef.current.offsetLeft,
        offsetTop: event.clientY - windowElementRef.current.offsetTop
      };

      windowElementRef.current.style.willChange = "left, top";
    }

    onFocus(id);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (windowElementRef.current && initialMoveEventRef.current) {
      if (
        Math.abs(event.clientX - initialMoveEventRef.current.clientX) > 1
        || Math.abs(event.clientY - initialMoveEventRef.current.clientY) > 1
      ) {
        windowElementRef.current.style.left = `${event.clientX - initialMoveEventRef.current.offsetLeft}px`;
        windowElementRef.current.style.top = `${event.clientY - initialMoveEventRef.current.offsetTop}px`;
      }
    }
  };

  const handlePointerUp = () => {
    initialMoveEventRef.current = null;

    if (windowElementRef.current) {
      windowElementRef.current.style.left = `${Math.round(windowElementRef.current.offsetLeft / 15) * 15}px`;
      windowElementRef.current.style.top = `${Math.round(windowElementRef.current.offsetTop / 15) * 15}px`;

      onUpdate(id,
        windowElementRef.current.offsetLeft,
        windowElementRef.current.offsetTop
      );

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
      <View horizontal border="bottom" borderColor="gutter" fillColor="divider" align="middle justify" style={{
        borderTopLeftRadius: 4, borderTopRightRadius: 4, minHeight: 32, marginBottom: -1, zIndex: 1
      }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <Button
          hover
          icon={XIcon}
          style={{ padding: 6, marginLeft: 4 }}
          onPointerDown={handleCloseButtonPointerDown}
          onClick={handleCloseButtonClick}
        />
        <Text fontWeight="700" padding="8px 16px" style={{ marginBottom: -1 }}>
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
