import { useState } from "react";

import { View, Text, Button } from "./shared/components";

import Window from "./components/Window";
import Calculator from "./clients/calculator/Calculator";
import Styleguide from "./clients/styleguide/Styleguide";
import Asteroids from "./clients/asteroids/Asteroids";
import Explorer from "./clients/explorer/Explorer";

import "./App.css";

//
// App
//

const applications = [
  { title: "Calculator", position: { x: 16, y: 16 }, size: { width: 300, height: 200 }, client: <Calculator /> },
  { title: "Styleguide", position: { x: 272, y: 16 }, size: { width: 400, height: 300 }, client: <Styleguide /> },
  // { title: "Asteroids", position: { x: 900, y: 16 }, size: { width: 400, height: 300 }, client: <Asteroids /> },
  { title: "Explorer", position: { x: 900, y: 16 }, size: { width: 400, height: 300 }, client: <Explorer /> },
];

function App() {
  const [windows, setWindows] = useState([
    { id: crypto.randomUUID(), ...applications[0] },
    { id: crypto.randomUUID(), ...applications[1] },
    { id: crypto.randomUUID(), ...applications[2] },
  ]);
  const [windowOrder, setWindowOrder] = useState<string[]>(windows.map(window => window.id));

  const handleWindowUpdate = (id: string, x: number, y: number) => {
    setWindows(windows => windows.map(window => window.id !== id ? window : ({
      ...window,
      position: { x, y },
    })));
  };

  const handleWindowFocus = (id: string) => {
    const updatedWindowOrder = [...windowOrder.filter(windowId => windowId !== id), id];

    setWindowOrder(updatedWindowOrder);
  };


  return (
    <View style={{ height: "100vh" }}>
      <View horizontal shadow padding="0px 8px" align="middle left" fillColor="content" style={{ zIndex: 2 }}>
        <Button hover fontWeight="700" padding="8px">
          Desktop
        </Button>
        <Button hover padding="8px">
          Utilities
        </Button>
      </View>
      <View flex fillColor="panel" style={{ background: "url('/wallpaper.jpg') center center / cover" }}>
        {windows.map(({ id, title, position, client }) => (
          <Window
            key={id}
            id={id}
            title={title}
            x={position.x}
            y={position.y}
            order={windowOrder.indexOf(id)}
            onUpdate={handleWindowUpdate}
            onFocus={handleWindowFocus}
          >
            {client}
          </Window>
        ))}
      </View>
    </View>
  );
}

export default App;
