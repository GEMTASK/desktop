import { useEffect, useLayoutEffect, useState } from "react";

import { View, Text, Button, Menu } from "onyx-ui";

import Window from "./components/Window";
import Calculator from "./clients/calculator";
import Styleguide from "./clients/styleguide";
import Asteroids from "./clients/asteroids/Asteroids";
import Explorer from "./clients/explorer";

import "./App.css";
import AnalogClock from "./clients/clock";

function MusicPlayer() {
  return (
    <View flex as="iframe" src="https://mike-austin.com/music-player" />
  );
}

function BestestMoviesEver() {
  return (
    <View flex as="iframe" src="https://bestestmoviesever.com" />
  );
}

function FT86PartPicker() {
  return (
    <View flex as="iframe" src="https://wheels.ft86partpicker.com" />
  );
}

function VectorDraw() {
  return (
    <View flex as="iframe" src="https://mike-austin.com/draw-2" />
  );
}

//
// App
//

type Application = {
  title: string,
  position?: { x: number, y: number },
  size: { width?: number, height?: number },
  client: React.ReactElement
};

const applicationsMap: Record<string, Application> = {
  "clock": {
    title: "Clock", size: { width: 300, height: 335 }, client: <AnalogClock />
  },
  "calculator": {
    title: "Calculator", size: { width: undefined, height: undefined }, client: <Calculator />
  },
  "styleguide": {
    title: "Styleguide", size: { width: undefined, height: undefined }, client: <Styleguide />
  },
  "bestest-movies-ever": {
    title: "Bestest Movies Ever", size: { width: 960, height: 900 }, client: <BestestMoviesEver />
  },
  "music-player": {
    title: "Music Player", size: { width: 1500, height: 900 }, client: <MusicPlayer />
  },
  "s3-explorer": {
    title: "S3 Explorer", size: { width: 600, height: 400 }, client: <Explorer />
  },
  "ft86-part-picker": {
    title: "FT86 Part Picker", size: { width: 1024 + 32, height: 900 }, client: <FT86PartPicker />
  },
  "asteroids": {
    title: "Asteroids", size: { width: 500, height: 500 }, client: <Asteroids />
  },
  "vector-draw": {
    title: "Vector Draw", size: { width: 1200, height: 900 }, client: <VectorDraw />
  }
} as const;

const applications: Application[] = [
  // { title: "Stereo", position: { x: 16, y: 32 }, size: { width: 400, height: 300 }, client: <MusicPlayer /> },
  // { title: "Asteroids", position: { x: 900, y: 16 }, size: { width: 400, height: 300 }, client: <Asteroids /> },
  { ...applicationsMap["clock"]!, position: { x: 15, y: 15 } },
  { ...applicationsMap["calculator"]!, position: { x: 332, y: 15 } },
  { ...applicationsMap["styleguide"]!, position: { x: 15, y: 370 } },
  { ...applicationsMap["s3-explorer"]!, position: { x: 630, y: 370 } }
];

//
// App
//

function App() {
  const [windows, setWindows] = useState(applications.map(application => ({
    id: crypto.randomUUID(),
    ...application
  })));
  const [orderedWindowIds, setOrderedWindowIds] = useState<string[]>(windows.map(window => window.id));

  const addWindow = (application: Application) => {
    const id = crypto.randomUUID();

    setWindows(windows => [
      ...windows,
      { id, ...application, position: { x: 0, y: 0 } }
    ]);

    setOrderedWindowIds(orderedWindowIds => [
      ...orderedWindowIds,
      id
    ]);
  };

  const handleWindowUpdate = (id: string, x: number, y: number) => {
    setWindows(windows => windows.map(window => window.id !== id ? window : ({
      ...window,
      position: { x, y }
    })));
  };

  const handleWindowFocus = (id: string) => {
    setOrderedWindowIds(orderedWindowIds => [
      ...orderedWindowIds.filter(windowId => windowId !== id),
      id
    ]);
  };

  const handleMenuSelect = (value: string | undefined) => {
    if (typeof value !== "string") {
      return;
    }

    const application = applicationsMap[value];

    if (application) {
      const id = crypto.randomUUID();

      setWindows(windows => [
        ...windows,
        { id, ...application }
      ]);

      setOrderedWindowIds(orderedWindowIds => [
        ...orderedWindowIds,
        id
      ]);
    }
  };

  const handleWindowRequestClose = (id: string) => {
    setWindows(windows => windows.filter(window => window.id !== id));
    setOrderedWindowIds(windowIds => windowIds.filter(windowId => windowId !== id));
  };

  const handleWindowLayout = (id: string, element: HTMLElement) => {
    setWindows(windows => windows.map(window => window.id !== id || window.position ? window : {
      ...window,
      position: {
        x: (document.body.offsetWidth - element.offsetWidth) / 2,
        y: (document.body.offsetHeight - element.offsetHeight) / 2
      }
    }));
  };

  return (
    <View id="window" style={{ height: "100vh" }}>
      <View id="overlay" absolute style={{ zIndex: 1000, inset: 0, pointerEvents: "none" }} />
      <View horizontal shadow padding="0px 8px" fillColor="content" style={{ zIndex: 2, minHeight: 32 }}>
        <Button hover fontWeight="700" padding="8px">
          Desktop
        </Button>
        <Menu onSelect={handleMenuSelect} items={[
          <Menu.Item title="Clock" value="clock" />,
          <Menu.Item title="Calculator" value="calculator" />
        ]}>
          <Button hover padding="8px">
            Utilities
          </Button>
        </Menu>
        <Menu onSelect={handleMenuSelect} items={[
          <Menu.Group label="Applications" />,
          <Menu.Item title="Bestest Movies Ever" value="bestest-movies-ever" />,
          <Menu.Item title="Music Player" value="music-player" />,
          <Menu.Item title="FT86 Part Picker" value="ft86-part-picker" />,
          <Menu.Item title="Vector Draw" value="vector-draw" />,
          <Menu.Divider />,
          <Menu.Group label="Games" />,
          <Menu.Item title="Asteroids" value="asteroids" />
        ]}>
          <Button hover padding="8px">
            Programs
          </Button>
        </Menu>
      </View>
      <View flex fillColor="panel" style={{ background: "url('/wallpaper.jpg') center center / cover" }}>
        {windows.map(({ id, title, position, size, client }) => (
          <Window
            key={id}
            id={id}
            title={title}
            position={position}
            size={size}
            order={orderedWindowIds.indexOf(id)}
            onUpdate={handleWindowUpdate}
            onFocus={handleWindowFocus}
            onRequestClose={handleWindowRequestClose}
            onLayout={handleWindowLayout}
          >
            {client}
          </Window>
        ))}
      </View>
    </View>
  );
}

export default App;
