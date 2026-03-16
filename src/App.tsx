import { useState } from "react";

import { View, Text, Button } from "./shared/components";

import Window from "./components/Window";
import Calculator from "./clients/calculator/Calculator";
import Styleguide from "./clients/styleguide/Styleguide";
import Asteroids from "./clients/asteroids/Asteroids";
import Explorer from "./clients/explorer/Explorer";

import "./App.css";

function MusicPlayer() {
  return (
    <View as="iframe" src="https://mike-austin.com/music-player" style={{ width: 1500, height: 870 }} />
  );
}

function BestestMoviesEver() {
  return (
    <View as="iframe" src="https://bestestmoviesever.com" style={{ width: 1500, height: 870 }} />
  );
}

//
// App
//

const applications = [
  // { title: "Stereo", position: { x: 16, y: 32 }, size: { width: 400, height: 300 }, client: <MusicPlayer /> },
  // { title: "Bestest Movies Ever", position: { x: 16, y: 32 }, size: { width: 400, height: 300 }, client: <BestestMoviesEver /> },  { title: "Calculator", position: { x: 16, y: 16 }, size: { width: 300, height: 200 }, client: <Calculator /> },
  // { title: "Asteroids", position: { x: 900, y: 16 }, size: { width: 400, height: 300 }, client: <Asteroids /> },
  { title: "Calculator", position: { x: 16, y: 16 }, size: { width: 300, height: 200 }, client: <Calculator /> },
  { title: "Styleguide", position: { x: 272, y: 16 }, size: { width: 400, height: 300 }, client: <Styleguide /> },
  { title: "S3 Explorer", position: { x: 900, y: 16 }, size: { width: 400, height: 300 }, client: <Explorer /> },
];

function App() {
  const [windows, setWindows] = useState(applications.map(application => ({
    id: crypto.randomUUID(),
    ...application
  })));
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
