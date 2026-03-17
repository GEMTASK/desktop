import { useRef, useState } from "react";

import type { Delegate } from "../shared/types/Delegate";

import { View, Text } from "../shared/components";

type PointerData = {
  clientX: number;
  clientY: number;
  offsetLeft: number;
  offsetTop: number;
};

//
// Frame
//

function Frame({ onUpdate }: { onUpdate: () => void; }) {
  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const clientRect = event.currentTarget.getBoundingClientRect();

    const localX = event.clientX - clientRect.left;
    const localY = event.clientY - clientRect.top;

    if (localX < 48 && localY < 48) {
      event.currentTarget.style.cursor = "nwse-resize";
    } else if (localX > clientRect.width - 48 && localY < 48) {
      event.currentTarget.style.cursor = "nesw-resize";
    } else if (localX < 48 && localY > clientRect.height - 48) {
      event.currentTarget.style.cursor = "nesw-resize";
    } else if (localX > clientRect.width - 48 && localY > clientRect.height - 48) {
      event.currentTarget.style.cursor = "nwse-resize";
    } else if (localX >= 48 && localX <= clientRect.width - 48) {
      event.currentTarget.style.cursor = "ns-resize";
    } else if (localY >= 48 && localY <= clientRect.height - 48) {
      event.currentTarget.style.cursor = "ew-resize";
    } else {
      event.currentTarget.style.cursor = "";
    }
  };

  return (
    <View absolute style={{ inset: -16, xcursor: "nw" }} onPointerMove={handlePointerMove} />
  );
}

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
  id: string;
  title: string;
  x: number;
  y: number;
  order: number;
  onUpdate: (id: string, x: number, y: number) => void;
  onFocus: (id: string) => void;
}, typeof View<"div">>) {
  const [initialEvent, setInitialEvent] = useState<PointerData | null>(null);

  const windowElementRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (event: React.PointerEvent) => {
    if (windowElementRef.current) {
      const { clientX, clientY } = event;
      const { offsetLeft, offsetTop } = windowElementRef.current;

      setInitialEvent({
        clientX,
        clientY,
        offsetLeft,
        offsetTop
      });

      windowElementRef.current.style.willChange = "left, top";
    }

    event.currentTarget.setPointerCapture(event.pointerId);

    onFocus(id);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (initialEvent) {
      if (windowElementRef.current) {
        windowElementRef.current.style.left = `${initialEvent.offsetLeft + event.clientX - initialEvent.clientX}px`;
        windowElementRef.current.style.top = `${initialEvent.offsetTop + event.clientY - initialEvent.clientY}px`;
      }
    }
  };

  const handlePointerUp = () => {
    setInitialEvent(null);

    if (windowElementRef.current) {
      onUpdate(id, windowElementRef.current.offsetLeft, windowElementRef.current.offsetTop);
    }
  };

  const handleFrameUpdate = () => {

  };

  return (
    <View id="window" ref={windowElementRef} absolute shadow cornerRadius="4px" style={{
      left: x, top: y, width: undefined, height: undefined, zIndex: order
    }}>
      <Frame onUpdate={handleFrameUpdate} />
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
