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

  return (
    <View ref={windowElementRef} absolute shadow cornerRadius="4px" style={{
      left: x, top: y, width: undefined, height: undefined, zIndex: order
    }}
    >
      <View absolute style={{ inset: -16, cursor: "ew-resize" }} />
      <View border="bottom" borderColor="gutter" fillColor="gray-1" align="middle center" style={{
        height: 30, borderTopLeftRadius: 4, borderTopRightRadius: 4
      }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <Text fontWeight="700" style={{ userSelect: "none", paddingTop: 1 }}>
          {title}
        </Text>
      </View>
      <View fillColor="content" style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4, overflow: "hidden" }}>
        {children}
      </View>
    </View>
  );
}

export default Window;
