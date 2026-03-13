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
      rotation: 0,
      velocity: {
        x: 0.0,
        y: 0.0
      },
      position: {
        x: 250,
        y: 250
      },
    }
  });

  const animationFrameRef = useRef(0);
  const lastTimestamp = useRef(0);
  const keymapRef = useRef({
    "ArrowUp": false,
    "ArrowDown": false,
    "ArrowLeft": false,
    "ArrowRight": false
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (keymapRef.current) {
      keymapRef.current[event.key as keyof typeof keymapRef["current"]] = true;
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (keymapRef.current && event.key in keymapRef.current) {
      keymapRef.current[event.key as keyof typeof keymapRef["current"]] = false;
    }
  };

  const handleAnimationFrame = useRef((timestamp: number) => {
    const timestampDelta = timestamp - lastTimestamp.current;

    if (keymapRef.current.ArrowRight) {
      setState(({ ship }) => ({
        ship: {
          ...ship,
          rotation: ship.rotation + timestampDelta * 0.25
        }
      }));
    }

    if (keymapRef.current.ArrowLeft) {
      setState(({ ship }) => ({
        ship: {
          ...ship,
          rotation: ship.rotation - timestampDelta * 0.25
        }
      }));
    }

    if (keymapRef.current.ArrowUp) {
      setState(({ ship }, angle = (Math.PI / 180) * (ship.rotation - (90 + 45))) => ({
        ship: {
          ...ship,
          velocity: {
            x: ship.velocity.x + (Math.cos(angle) - Math.sin(angle)) * 0.05,
            y: ship.velocity.y + (Math.sin(angle) + Math.cos(angle)) * 0.05,
          },
        }
      }));
    }

    setState(({ ship }) => ({
      ship: {
        ...ship,
        position: {
          x: ship.position.x + ship.velocity.x,
          y: ship.position.y + ship.velocity.y,
        }
      }
    }));

    lastTimestamp.current = timestamp;

    animationFrameRef.current = requestAnimationFrame(handleAnimationFrame.current);
  });

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(handleAnimationFrame.current);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleAnimationFrame]);

  // rotate(${state.ship.rotation}, 12.5, 15.25)

  return (
    <View as="svg" tabIndex={0} style={{ width: 500, height: 500 }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      {/* <svg
        transform={`
        translate(${state.ship.position.x}, ${state.ship.position.y})
        rotate(${state.ship.rotation})
      `}
      >
        <g transform="matrix(1, 0, 0, 1, -100, -100)">
          <path d="M100,50 L50,180 L100,170 L150,180 L100,50Z" style={{ fill: "none", stroke: "black", strokeWidth: 10 }} />
        </g>
      </svg> */}

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
