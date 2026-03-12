import { useCallback, useEffect, useRef, useState } from "react";

import { View } from "../shared/components";

import ShipSvg from "./Ship.svg?react";

// function Ship() {
//   return (
//     <ShipSvg width={25} height={25} transform={`rotate(${rotation}, 12.5, 12.5)`} />
//   );
// }

function Asteroids() {
  const [state, setState] = useState({
    ship: {
      rotation: 0
    }
  });

  const animationFrameRef = useRef(0);
  const lastTimestamp = useRef(0);
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

  const handleAnimationFrame = useCallback((timestamp: number) => {
    const timestampDelta = timestamp - lastTimestamp.current;

    if (keymapRef.current.ArrowRight) {
      setState(state => ({
        ship: {
          rotation: state.ship.rotation + timestampDelta * 0.5
        }
      }));
    } else if (keymapRef.current.ArrowLeft) {
      setState(state => ({
        ship: {
          rotation: state.ship.rotation - timestampDelta * 0.5
        }
      }));
    }

    lastTimestamp.current = timestamp;

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
      <ShipSvg width={25} height={25} transform={`rotate(${state.ship.rotation}, 12.5, 15.25)`} />
    </View>
  );
}

export default Asteroids;
