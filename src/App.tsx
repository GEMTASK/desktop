import { useState } from "react";

import { View, Text, Button, Menu } from "onyx-ui";

import Window from "./components/Window";
import Calculator from "./clients/calculator";
import Styleguide from "./clients/styleguide";
import Asteroids from "./clients/asteroids/Asteroids";
import Explorer from "./clients/explorer";

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

type Application = {
  title: string,
  position: { x: number, y: number },
  size: { width: number, height: number },
  client: React.ReactElement
};

const applicationsMap: Record<string, Application> = {
  "bestest-movies-ever": {
    title: "Bestest Movies Ever", position: { x: 16, y: 32 }, size: { width: 400, height: 300 }, client: <BestestMoviesEver />
  }
};

const applications = [
  // { title: "Stereo", position: { x: 16, y: 32 }, size: { width: 400, height: 300 }, client: <MusicPlayer /> },
  // { title: "Bestest Movies Ever", position: { x: 16, y: 32 }, size: { width: 400, height: 300 }, client: <BestestMoviesEver /> },
  // { title: "Calculator", position: { x: 16, y: 16 }, size: { width: 300, height: 200 }, client: <Calculator /> },
  // { title: "Asteroids", position: { x: 900, y: 16 }, size: { width: 400, height: 300 }, client: <Asteroids /> },
  { title: "Calculator", position: { x: 16, y: 16 }, size: { width: 300, height: 200 }, client: <Calculator /> },
  { title: "Styleguide", position: { x: 272, y: 16 }, size: { width: 400, height: 300 }, client: <Styleguide /> },
  { title: "S3 Explorer", position: { x: 900, y: 16 }, size: { width: 400, height: 300 }, client: <Explorer /> }
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
      position: { x, y }
    })));
  };

  const handleWindowFocus = (id: string) => {
    const updatedWindowOrder = [...windowOrder.filter(windowId => windowId !== id), id];

    setWindowOrder(updatedWindowOrder);
  };

  const handleMenuSelect = (value: string | undefined) => {
    if (typeof value !== "string") {
      return;
    }

    console.log(value);

    const application = applicationsMap[value];
    console.log(application);

    if (application) {
      const id = crypto.randomUUID();

      setWindows(windows => [
        ...windows,
        { id, ...application }
      ]);

      setWindowOrder(windowOrder => [...windowOrder, id]);
    }
  };

  return (
    <View id="window" style={{ height: "100vh" }}>
      <View id="overlay" absolute style={{ zIndex: 1000, inset: 0, pointerEvents: "none" }} />
      <View horizontal shadow padding="0px 8px" fillColor="content" style={{ zIndex: 2, minHeight: 32 }}>
        <Button hover fontWeight="700" padding="8px">
          Desktop
        </Button>
        <Menu onSelect={handleMenuSelect} items={[
          <Menu.Item title="Calculator" />
        ]}>
          <Button hover padding="8px">
            Utilities
          </Button>
        </Menu>
        <Menu onSelect={handleMenuSelect} items={[
          <Menu.Group label="Applications" />,
          <Menu.Item title="Calculator" />,
          <Menu.Divider />,
          <Menu.Group label="Games" />,
          <Menu.Item title="Bestest Movies Ever" value="bestest-movies-ever" />
        ]}>
          <Button hover padding="8px">
            Programs
          </Button>
        </Menu>
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
