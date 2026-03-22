import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";

import { View, Button, Menu } from "onyx-ui";

import Window from "./components/Window";
import Calculator from "./clients/calculator";
import Styleguide from "./clients/styleguide";
// import Asteroids from "./clients/asteroids/Asteroids";
import Explorer from "./clients/explorer";
import Browser from "./clients/browser";
import AnalogClock from "./clients/clock";
import Calendar from "./clients/calendar";
import MarkdownClient from "./clients/markdown/Markdown";

import "./App.css";

function Asteroids() {
  return (
    <View flex as="iframe" src="https://editor.p5js.org/mike_ekim1024/full/q8nWdZV0U" />
  );
}

const IframeClients = {
  "music-player": "https://mike-austin.com/music-player",
  "bestest-movies-ever": "https://bestestmoviesever.com",
  "ft86-part-picker": "https://wheels.ft86partpicker.com",
  "vector-draw": "https://mike-austin.com/draw-2",
  "react-asteroids": "https://codepen.io/mikeaustin/embed/mdpYMym?default-tab=js%2Cresult",
  "strategic-asteroids": "https://code.mike-austin.com/asteroids",
  "lets-code": "https://code.mike-austin.com/lets-code",
  "fountain": "https://code.mike-austin.com/fountain",
  "imploding-sphere": "https://editor.p5js.org/mike_ekim1024/full/shcbRaIS8"
};

function IFrame({ name }: { name: keyof typeof IframeClients }) {
  return (
    <View flex as="iframe" src={IframeClients[name]} />
  );
}

//
// App
//

type Client = {
  title: string,
  position?: { x: number, y: number },
  size: { width?: number, height?: number },
  client: React.ReactElement
};

const clients: Record<string, Client> = {
  "calendar": {
    title: "Calendar", size: { width: 360, height: 330 }, client: <Calendar />
  },
  "clock": {
    title: "Clock", size: { width: 300, height: 330 }, client: <AnalogClock />
  },
  "calculator": {
    title: "Calculator", size: { width: 255, height: 330 }, client: <Calculator />
  },
  "styleguide": {
    title: "Styleguide", size: { width: 645, height: undefined }, client: <Styleguide />
  },
  "markdown": {
    title: "Markdown", size: { width: 645, height: 900 }, client: <MarkdownClient />
  },
  "bestest-movies-ever": {
    title: "Bestest Movies Ever", size: { width: 960, height: 900 }, client: <IFrame name="bestest-movies-ever" />
  },
  "music-player": {
    title: "Music Player", size: { width: 1500, height: 900 }, client: <IFrame name="music-player" />
  },
  "s3-explorer": {
    title: "S3 Explorer", size: { width: 675, height: 535 }, client: <Explorer />
  },
  "ft86-part-picker": {
    title: "FT86 Part Picker", size: { width: 1024 + 32, height: 900 }, client: <IFrame name="ft86-part-picker" />
  },
  "strategic-asteroids": {
    title: "Strategic Asteroids", size: { width: 800, height: 872 }, client: <Asteroids />
  },
  "react-asteroids": {
    title: "React Asteroids", size: { width: 1400, height: 900 }, client: <IFrame name="react-asteroids" />
  },
  "browser": {
    title: "Browser", size: { width: 500, height: 500 }, client: <Browser />
  },
  "p5-lets-code": {
    title: "p5 Let's Code!", size: { width: 1680, height: 1100 }, client: <IFrame name="lets-code" />
  },
  "p5-fountain": {
    title: "p5 Fountain", size: { width: 1680, height: 1100 }, client: <IFrame name="fountain" />
  },
  "p5-asteroids": {
    title: "p5 Asteroids", size: { width: 1680, height: 1100 }, client: <IFrame name="strategic-asteroids" />
  },
  "vector-draw": {
    title: "Vector Draw", size: { width: 1340, height: 900 }, client: <IFrame name="vector-draw" />
  },
  "imploding-sphere": {
    title: "Imploding Sphere", size: { width: 800, height: 872 }, client: <IFrame name="imploding-sphere" />
  }
} as const;

const startupClients: Client[] = [
  // { title: "Stereo", position: { x: 16, y: 32 }, size: { width: 400, height: 300 }, client: <MusicPlayer /> },
  // { title: "Asteroids", position: { x: 900, y: 16 }, size: { width: 400, height: 300 }, client: <Asteroids /> },
  { ...clients["calendar"]!, position: { x: 15, y: 15 } },
  { ...clients["clock"]!, position: { x: 390, y: 15 } },
  { ...clients["calculator"]!, position: { x: 705, y: 15 } },
  { ...clients["styleguide"]!, position: { x: 705, y: 360 } },
  { ...clients["s3-explorer"]!, position: { x: 15, y: 360 } },
  { ...clients["markdown"]!, position: { x: 15, y: 360 } }
];

const utilitiesMenuItems = [
  <Menu.Item title="Clock" value="clock" />,
  <Menu.Item title="Calculator" value="calculator" />,
  <Menu.Item title="Browser" value="browser" />
];

const programsMenuItems = [
  <Menu.Group label="Applications" />,
  <Menu.Item title="Bestest Movies Ever" value="bestest-movies-ever" />,
  <Menu.Item title="Music Player" value="music-player" />,
  <Menu.Item title="FT86 Part Picker" value="ft86-part-picker" />,
  <Menu.Item title="Vector Draw" value="vector-draw" />,
  <Menu.Divider />,
  <Menu.Group label="Games" />,
  <Menu.Item title="Strategic Asteroids" value="strategic-asteroids" />,
  <Menu.Item title="React Asteroids" value="react-asteroids" />,

  <Menu.Divider />,
  <Menu.Group label="Visuals" />,
  <Menu.Item title="Imploding Sphere" value="imploding-sphere" />,

  <Menu.Divider />,
  <Menu anchor="top right" items={[
    <Menu.Group label="Coding Lessons" />,
    <Menu.Item title="Let's Code!" value="p5-lets-code" />,
    <Menu.Item title="Asteroids" value="p5-asteroids" />,
    <Menu.Item title="Fountain" value="p5-fountain" />
  ]}>
    <Menu.Item title="p5 Tutorials" rightIcon={ChevronRightIcon} />
  </Menu>
];

//
// App
//

function App() {
  const [windows, setWindows] = useState(startupClients.map(client => ({
    id: crypto.randomUUID(),
    ...client
  })));
  const [orderedWindowIds, setOrderedWindowIds] = useState<string[]>(windows.map(window => window.id));

  const addWindow = (client: Client) => {
    const id = crypto.randomUUID();

    setWindows(windows => [
      ...windows,
      { id, ...client, position: { x: 0, y: 0 } }
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

  const handleMenuSelect = (value?: string) => {
    if (typeof value !== "string") {
      return;
    }

    const client = clients[value];

    if (client) {
      const id = crypto.randomUUID();

      setWindows(windows => [
        ...windows,
        { id, ...client }
      ]);

      setOrderedWindowIds(orderedWindowIds => [
        ...orderedWindowIds,
        id
      ]);
    }
  };

  const handleLinksMenuSelect = (value?: string) => {
    if (typeof value !== "string") {
      return;
    }

    window.open(value);
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
    <View id="window" style={{ height: "100vh", overflow: "hidden" }}>
      <View id="overlay" absolute style={{ zIndex: 1000, inset: 0, pointerEvents: "none" }} />
      <View horizontal shadow padding="0px 8px" fillColor="content" style={{ zIndex: 2, minHeight: 32 }}>
        <Button hover fontWeight="700" padding="8px">
          Desktop
        </Button>
        <Menu onSelect={handleMenuSelect} items={utilitiesMenuItems}>
          <Button hover padding="8px">
            Utilities
          </Button>
        </Menu>
        <Menu onSelect={handleMenuSelect} items={programsMenuItems}>
          <Button hover padding="8px">
            Programs
          </Button>
        </Menu>
        <Menu onSelect={handleLinksMenuSelect} items={[
          <Menu.Item title="My GitHub Repos" value="https://github.com/mikeaustin" />,
          <Menu.Item title="My Old Resume (2017)" value="https://mike-austin.com" />
        ]}>
          <Button hover padding="8px">
            Links
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
