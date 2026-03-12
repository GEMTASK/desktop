import { useState } from "react";

import { View, Text } from "./shared/components";

import Window from "./components/Window";
import Calculator from "./components/Calculator";
import Styleguide from "./components/Styleguide";
import Asteroids from "./components/Asteroids";

import "./App.css";

//
// App
//

const applications = [
  { title: "Calculator", position: { x: 16, y: 16 }, size: { width: 300, height: 200 }, client: <Calculator /> },
  { title: "Styleguide", position: { x: 272, y: 16 }, size: { width: 400, height: 300 }, client: <Styleguide /> },
  { title: "Asteroids", position: { x: 400, y: 16 }, size: { width: 400, height: 300 }, client: <Asteroids /> },
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
      <View horizontal shadow padding="0px 16px" align="middle left" fillColor="content" style={{ height: 30, zIndex: 2 }}>
        <Text fontWeight="700">
          Desktop
        </Text>
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
