import { useState } from "react";

import { View, Text } from "./shared/components";

import Window from "./components/Window";
import Calculator from "./components/Calculator";
import Styleguide from "./components/Styleguide";

import "./App.css";

//
// App
//

function App() {
  const [windows, setWindows] = useState([
    { id: crypto.randomUUID(), title: "Styleguide", position: { x: 50, y: 50 }, size: { width: 400, height: 300 }, client: <Styleguide /> },
    { id: crypto.randomUUID(), title: "Calculator", position: { x: 150, y: 150 }, size: { width: 300, height: 200 }, client: <Calculator /> },
  ]);
  const [windowOrder, setWindowOrder] = useState<string[]>([windows[0].id, windows[1].id]);

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
      <View horizontal shadow padding="0px 16px" align="middle left" fillColor="white" style={{ height: 30, zIndex: 2 }}>
        <Text fontWeight="700" fillColor="gray-0">
          Desktop
        </Text>
      </View>
      <View flex fillColor="gray-0" style={{ background: "url('/wallpaper.jpg') center center / cover" }}>
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
