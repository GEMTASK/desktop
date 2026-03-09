type PointerData = {
  clientX: number;
  clientY: number;
  offsetLeft: number;
  offsetTop: number;
};

//
// Window
//

import { useRef, useState } from "react";
import { View, Text, Button } from "../shared/components";

function Window({
  id,
  title,
  x,
  y,
  order,
  onUpdate,
  onFocus
}: {
  id: string;
  title: string;
  x: number;
  y: number;
  order: number;
  onUpdate: (id: string, x: number, y: number) => void;
  onFocus: (id: string) => void
}) {
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
      left: x, top: y, width: 400, height: 300, zIndex: order
    }}
    >
      <View absolute style={{ inset: -16, cursor: "ew-resize" }} />
      <View border="bottom" borderColor="gray-2" fillColor="gray-1" align="middle center" style={{
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
      <View flex fillColor="white" padding="16px" style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}>
        <Text border="bottom" padding="16px" fillColor="gray-0">
          Content
        </Text>
        <Text as="a" href="/" padding="16px">
          Content
        </Text>
        <View horizontal padding="16px">
          <Button>
            Hello
          </Button>
          <Button primary>
            Hello
          </Button>
        </View>
        <View horizontal padding="16px" spacing="8px" fillColor="black">
          <Button>
            Hello
          </Button>
          <Button primary>
            Hello
          </Button>
        </View>
      </View>
    </View>
  );
}

export default Window;
