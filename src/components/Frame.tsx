import { View } from "onyx-ui";
import { useRef } from "react";

type PointerData = {
  clientX: number,
  clientY: number,
  offsetLeft: number,
  offsetTop: number
};

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

//
// Frame
//

function Frame({
  onStart,
  onUpdate
}: {
  onStart: () => void,
  onUpdate: (deltaX: number, deltaY: number) => void
}) {
  const initialEventRef = useRef<PointerData | null>(null);
  const dragState = useRef<ResizeState>([ResizeVertical.NONE, ResizeHorizontal.NONE]);

  const windowElementRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);

    if (windowElementRef.current) {
      const { clientX, clientY } = event;
      const { offsetLeft, offsetTop } = windowElementRef.current;

      initialEventRef.current = {
        clientX,
        clientY,
        offsetLeft,
        offsetTop
      };
    }

    const clientRect = event.currentTarget.getBoundingClientRect();

    const localX = event.clientX - clientRect.left;
    const localY = event.clientY - clientRect.top;

    const [vertical, horizontal] = getResizeState(localX, localY, clientRect.width, clientRect.height);

    dragState.current = [vertical, horizontal];

    onStart();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (initialEventRef.current) {
      onUpdate(
        event.clientX - initialEventRef.current.clientX,
        event.clientY - initialEventRef.current.clientY
      );
    }

    const clientRect = event.currentTarget.getBoundingClientRect();

    const localX = event.clientX - clientRect.left;
    const localY = event.clientY - clientRect.top;

    const [vertical, horizontal] = getResizeState(localX, localY, clientRect.width, clientRect.height);

    event.currentTarget.style.cursor = getCursor(vertical, horizontal);
  };

  const handlePointerUp = () => {
    initialEventRef.current = null;
    dragState.current = [ResizeVertical.NONE, ResizeHorizontal.NONE];
  };

  return (
    <View
      ref={windowElementRef}
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

export default Frame;
