import { useEffect, useRef, useState } from "react";

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
      position: {
        x: 100,
        y: 100
      },
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

  const handleAnimationFrame = useRef((timestamp: number) => {
    const timestampDelta = timestamp - lastTimestamp.current;

    if (keymapRef.current.ArrowRight) {
      setState(state => ({
        ship: {
          ...state.ship,
          rotation: state.ship.rotation + timestampDelta * 0.5
        }
      }));
    }

    if (keymapRef.current.ArrowLeft) {
      setState(state => ({
        ship: {
          ...state.ship,
          rotation: state.ship.rotation - timestampDelta * 0.5
        }
      }));
    }

    if (keymapRef.current.ArrowUp) {
      setState(state => {
        const ship = state.ship;
        const angle = (Math.PI / 180) * (ship.rotation - (90 + 45));

        return ({
          ship: {
            ...state.ship,
            position: {
              x: ship.position.x + Math.cos(angle) - Math.sin(angle),
              y: ship.position.y + Math.sin(angle) + Math.cos(angle),
            }
          }
        });
      });
    }

    lastTimestamp.current = timestamp;

    animationFrameRef.current = requestAnimationFrame(handleAnimationFrame.current);
  });

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(handleAnimationFrame.current);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleAnimationFrame]);

  return (
    <View as="svg" tabIndex={0} style={{ width: 500, height: 500 }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <ShipSvg
        width={25}
        height={25}
        transform={`
          translate(${state.ship.position.x}, ${state.ship.position.y})
          rotate(${state.ship.rotation}, 12.5, 15.25)
        `}
      />
    </View>
  );
}

export default Asteroids;
