import { useState } from "react";
import { ChevronRightIcon, ExternalLinkIcon, Minimize2 } from "lucide-react";
import { View, Button, Menu, Icon } from "onyx-ui";

import Window from "./components/Window";
import clients from "./clients.tsx";

import "./App.css";

//
// App
//

type Client = {
  icon?: React.ComponentProps<typeof Icon>["icon"],
  title: string,
  position?: { x: number, y: number },
  size: { width?: number, height?: number },
  client: React.ReactElement,
  minimized?: boolean
};

const startupClients: Client[] = [
  { ...clients["calendar"]!, position: { x: 15, y: 15 } },
  { ...clients["clock"]!, position: { x: 390, y: 15 } },
  { ...clients["calculator"]!, position: { x: 705, y: 15 } },
  { ...clients["eyes"]!, position: { x: 705, y: 360 } },
  { ...clients["s3-explorer"]!, position: { x: 15, y: 360 } },
  { ...clients["terminal"]!, position: { x: 975, y: 360 } },
];

const desktopMenuItems = [
  <Menu.Item title="About Desktop" value="about" />,
];

const utilitiesMenuItems = [
  <Menu.Item title="Clock" value="clock" />,
  <Menu.Item title="Calendar" value="calendar" />,
  <Menu.Item title="Calculator" value="calculator" />,
  <Menu.Item title="Terminal" value="terminal" />,
  <Menu.Item title="Browser" value="browser" />,
  <Menu.Item title="Markdown" value="markdown" />,
  <Menu.Divider />,
  <Menu.Item title="Styleguide" value="styleguide" />,
];

const programsMenuItems = [
  <Menu.Group label="Applications" />,
  <Menu.Item title="Bestest Movies Ever" value="bestest-movies-ever" />,
  <Menu.Item title="Stereo System" value="virtual-stereo" />,
  <Menu.Item title="FT86 Part Picker" value="ft86-part-picker" />,
  <Menu.Item title="Vector Draw" value="vector-draw" />,
  <Menu.Item title="Virtual Machine" value="virtual-machine" />,
  <Menu.Divider />,
  <Menu.Group label="Games & Visuals" />,
  <Menu.Item title="Strategic Asteroids" value="strategic-asteroids" />,
  <Menu.Item title="React Asteroids" value="react-asteroids" />,
  <Menu.Item title="Snakey Snake" value="p5-snake" />,
  <Menu.Item title="Bouncy Bounce" value="p5-bounce" />,
  <Menu.Item title="Line Segments" value="p5-segments" />,
  <Menu.Item title="Imploding Sphere" value="imploding-sphere" />,
  <Menu.Divider />,
  <Menu noPortal anchor="top right" items={[
    <Menu.Item title="Let's Code!" value="p5-lets-code" />,
    <Menu.Item title="Asteroids" value="p5-asteroids" />,
    <Menu.Item title="Fountain" value="p5-fountain" />,
  ]}>
    <Menu.Item title="p5 Tutorials" rightIcon={ChevronRightIcon} />
  </Menu>,
];

//
// App
//

function App() {
  const [windows, setWindows] = useState(startupClients.map(client => ({
    id: crypto.randomUUID(),
    ...client,
  })));
  const [orderedWindowIds, setOrderedWindowIds] = useState<string[]>(windows.map(window => window.id));

  const addWindow = (client: Client) => {
    const id = crypto.randomUUID();

    setWindows(windows => [
      ...windows,
      { id, ...client, position: { x: 0, y: 0 } },
    ]);

    setOrderedWindowIds(orderedWindowIds => [
      ...orderedWindowIds,
      id,
    ]);
  };

  const handleWindowUpdate = (id: string, x: number, y: number) => {
    setWindows(windows => windows.map(window => window.id !== id ? window : ({
      ...window,
      position: { x, y },
    })));
  };

  const handleWindowFocus = (id: string) => {
    setOrderedWindowIds(orderedWindowIds => [
      ...orderedWindowIds.filter(windowId => windowId !== id),
      id,
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
        { id, ...client },
      ]);

      setOrderedWindowIds(orderedWindowIds => [
        ...orderedWindowIds,
        id,
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

  const handleWindowRequestMinimize = (id: string) => {
    setWindows(windows => windows.map(window => window.id !== id ? window : {
      ...window,
      minimized: true,
    }));
  };

  const handleWindowWindowSelect = (id: string) => {
    setWindows(windows => windows.map(window => window.id !== id ? window : {
      ...window,
      minimized: false,
    }));
    setOrderedWindowIds(orderedWindowIds => [
      ...orderedWindowIds.filter(windowId => windowId !== id),
      id,
    ]);
  };

  const handleWindowLayout = (id: string, element: HTMLElement) => {
    setWindows(windows => windows.map(window => window.id !== id || window.position ? window : {
      ...window,
      position: {
        x: (document.body.offsetWidth - element.offsetWidth) / 2,
        y: (document.body.offsetHeight - element.offsetHeight) / 2,
      },
    }));
  };

  return (
    <View id="window" style={{ height: "100vh", overflow: "hidden" }}>
      <View id="overlay" absolute style={{ zIndex: 1000, inset: 0, pointerEvents: "none" }} />
      <View horizontal shadow padding="0px 8px" fillColor="content" style={{ zIndex: 2, minHeight: 32 }}>
        <Menu onSelect={handleMenuSelect} items={desktopMenuItems}>
          <Menu.Item title="Desktop" fontWeight="700" padding="8px" />
        </Menu>
        <Menu onSelect={handleMenuSelect} items={utilitiesMenuItems}>
          <Menu.Item title="Utilities" padding="8px" />
        </Menu>
        <Menu onSelect={handleMenuSelect} items={programsMenuItems}>
          <Menu.Item title="Programs" padding="8px" />
        </Menu>
        <Menu onSelect={handleLinksMenuSelect} items={[
          <Menu.Item icon={ExternalLinkIcon} title="My GitHub Repos" value="https://github.com/mikeaustin" />,
          <Menu.Item icon={ExternalLinkIcon} title="My Old Resume (2017)" value="https://mike-austin.com" />,
          <Menu.Item icon={ExternalLinkIcon} title="Learning React" value="https://codepen.io/collection/dbOKez" />,
        ]}>
          <Menu.Item title="Links" padding="8px" />
        </Menu>
      </View>
      <View flex fillColor="panel" style={{ background: "url('/wallpaper.jpg') center center / cover" }}>
        <View
          absolute
          style={{
            top: 0, right: 0, bottom: 0, width: 240, padding: 15,
            background: "hsla(0, 0%, 100%, 0.2)",
            backdropFilter: "blur(10px)",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 16px",
          }}
        >
          <View padding="8px 0px" fillColor="content" cornerRadius="2px">
            {windows.map(window => (
              <Button
                hover
                key={window.id}
                selected={window.id === orderedWindowIds.at(-1)}
                icon={window.icon}
                rightIcon={window.minimized ? Minimize2 : undefined}
                align="left"
                cornerRadius="0px"
                onClick={() => handleWindowWindowSelect(window.id)}
              >
                {window.title}
              </Button>
            ))}
          </View>
        </View>
        {windows.map(({ id, title, position, size, client, minimized }) => (
          <Window
            key={id}
            id={id}
            title={title}
            position={position}
            size={size}
            order={orderedWindowIds.indexOf(id)}
            minimized={!!minimized}
            onUpdate={handleWindowUpdate}
            onFocus={handleWindowFocus}
            onRequestClose={handleWindowRequestClose}
            onRequestMinimize={handleWindowRequestMinimize}
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
