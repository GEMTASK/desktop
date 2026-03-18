import { useRef, useState } from "react";

import type { Delegate } from "../shared/types/Delegate";

import { View, Text } from "onyx-ui";

type PointerData = {
  clientX: number,
  clientY: number,
  offsetLeft: number,
  offsetTop: number
};

//
// Frame
//

const ResizeVertical = {
  NONE: 0,
  TOP: 1,
  BOTTOM: 3
} as const;

const ResizeHorizontal = {
  NONE: 0,
  LEFT: 4,
  RIGHT: 2
} as const;

type ResizeState = [
  typeof ResizeVertical[keyof typeof ResizeVertical],
  typeof ResizeHorizontal[keyof typeof ResizeHorizontal]
];

const getResizeState = (x: number, y: number, width: number, height: number) => {
  let vertical: ResizeState[0] = ResizeVertical.NONE;
  let horizontal: ResizeState[1] = ResizeHorizontal.NONE;

  switch (true) {
    case y < 48:
      vertical = ResizeVertical.TOP;
      break;
    case y > height - 48:
      vertical = ResizeVertical.BOTTOM;
      break;
  }

  switch (true) {
    case x < 48:
      horizontal = ResizeHorizontal.LEFT;
      break;
    case x > width - 48:
      horizontal = ResizeHorizontal.RIGHT;
      break;
  }

  return [vertical, horizontal] as const;
};

const getCursor = (vertical: ResizeState[0], horizontal: ResizeState[1]) => {
  switch (true) {
    case vertical === ResizeVertical.TOP && horizontal === ResizeHorizontal.LEFT
      || vertical === ResizeVertical.BOTTOM && horizontal === ResizeHorizontal.RIGHT:
      return "nwse-resize";
    case vertical === ResizeVertical.TOP && horizontal === ResizeHorizontal.RIGHT
      || vertical === ResizeVertical.BOTTOM && horizontal === ResizeHorizontal.LEFT:
      return "nesw-resize";
    case vertical === ResizeVertical.TOP || vertical === ResizeVertical.BOTTOM:
      return "ns-resize";
    case horizontal === ResizeHorizontal.LEFT || horizontal === ResizeHorizontal.RIGHT:
      return "ew-resize";
    default:
      return "";
  }
};

function Frame({ onUpdate }: { onUpdate: () => void }) {
  const dragState = useRef<ResizeState>([ResizeVertical.NONE, ResizeHorizontal.NONE]);

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    const clientRect = event.currentTarget.getBoundingClientRect();

    const localX = event.clientX - clientRect.left;
    const localY = event.clientY - clientRect.top;

    const [vertical, horizontal] = getResizeState(localX, localY, clientRect.width, clientRect.height);

    dragState.current = [vertical, horizontal];
  };

  const handlePointerUp = () => {
    dragState.current = [ResizeVertical.NONE, ResizeHorizontal.NONE];
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const clientRect = event.currentTarget.getBoundingClientRect();

    const localX = event.clientX - clientRect.left;
    const localY = event.clientY - clientRect.top;

    const [vertical, horizontal] = getResizeState(localX, localY, clientRect.width, clientRect.height);

    event.currentTarget.style.cursor = getCursor(vertical, horizontal);
  };

  return (
    <View
      absolute
      style={{
        inset: -16,
        borderRadius: 8
        // background: "hsla(0, 0%, 0%, 0.1)"
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    />
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
  id: string,
  title: string,
  x: number,
  y: number,
  order: number,
  onUpdate: (id: string, x: number, y: number) => void,
  onFocus: (id: string) => void
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
