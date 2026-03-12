import { useCallback, useEffect, useRef, useState } from "react";

import { View } from "../shared/components";

import ShipSvg from "./Ship.svg?react";

// function Ship() {
//   return (
//     <ShipSvg width={25} height={25} transform={`rotate(${rotation}, 12.5, 12.5)`} />
//   );
// }

function Asteroids() {
  const [frame, setFrame] = useState(0);

  const animationFrameRef = useRef(0);
  const rotatationRef = useRef(0);
  const keymapRef = useRef<Record<string, boolean>>({
    "ArrowUp": false,
    "ArrowDown": false,
    "ArrowLeft": false,
    "ArrowRight": false
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (keymapRef.current) {
      keymapRef.current[event.key] = true;
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (keymapRef.current) {
      keymapRef.current[event.key] = false;
    }
  };

  const handleAnimationFrame = useCallback(() => {
    if (keymapRef.current.ArrowRight) {
      rotatationRef.current += 1;
    } else if (keymapRef.current.ArrowLeft) {
      rotatationRef.current -= 1;
    }

    setFrame(frame => frame + 1);

    animationFrameRef.current = requestAnimationFrame(handleAnimationFrame);
  }, []);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(handleAnimationFrame);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleAnimationFrame]);

  return (
    <View as="svg" tabIndex={0} style={{ width: 500, height: 500 }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <ShipSvg width={25} height={25} transform={`rotate(${rotatationRef.current}, 12.5, 15.25)`} />
    </View>
  );
}

export default Asteroids;
