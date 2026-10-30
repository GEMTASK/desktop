import { useEffect, useState } from "react";
import { ChevronRightIcon, ExternalLinkIcon, Minimize2 } from "lucide-react";
import { View, Button, Menu, Icon } from "onyx-ui";

import Window from "./components/Window";
import clients, { startClient } from "./clients.tsx";

import wallpaperImage from "./assets/wallpaper.jpg";
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
  minimized?: boolean,
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
  <Menu.Item title="About Desktop" value="about" fontWeight="500" />,
];

const utilitiesMenuItems = [
  <Menu.Item title="Clock" value="clock" fontWeight="500" />,
  <Menu.Item title="Calendar" value="calendar" fontWeight="500" />,
  <Menu.Item title="Calculator" value="calculator" fontWeight="600" />,
  <Menu.Item title="Terminal" value="terminal" fontWeight="500" />,
  <Menu.Item title="Browser" value="browser" fontWeight="500" />,
  <Menu.Item title="Markdown" value="markdown" fontWeight="500" />,
  <Menu.Item title="Eyes" value="eyes" fontWeight="500" />,
  <Menu.Divider />,
  <Menu.Item title="Styleguide" value="styleguide" fontWeight="500" />,
];

const buildProgramsMenuItems = (handleMenuSelect: (value?: string) => void) => [
  <Menu.Group label="Applications" />,
  <Menu.Item title="Bestest Movies Ever" value="bestest-movies-ever" fontWeight="500" />,
  <Menu.Item title="Stereo System" value="virtual-stereo" fontWeight="500" />,
  <Menu.Item title="FT86 Part Picker" value="ft86-part-picker" fontWeight="500" />,
  <Menu.Item title="Vector Draw" value="vector-draw" fontWeight="500" />,
  <Menu.Item title="Virtual Machine" value="virtual-machine" fontWeight="500" />,
  <Menu.Item title="GEMTASK Mock" value="gemtask" fontWeight="500" />,
  <Menu.Divider />,
  <Menu.Group label="Games & Visuals" />,
  <Menu.Item title="Strategic Asteroids" value="strategic-asteroids" fontWeight="500" />,
  <Menu.Item title="React Asteroids" value="react-asteroids" fontWeight="500" />,
  <Menu.Item title="Snakey Snake" value="p5-snake" fontWeight="500" />,
  <Menu.Item title="Bouncy Bounce" value="p5-bounce" fontWeight="500" />,
  <Menu.Item title="Line Segments" value="p5-segments" fontWeight="500" />,
  <Menu.Item title="Imploding Sphere" value="imploding-sphere" fontWeight="500" />,
  <Menu.Divider />,
  <Menu noPortal anchor="top right" onItemSelect={handleMenuSelect} items={[
    <Menu.Item title="Let's Code!" value="p5-lets-code" fontWeight="500" />,
    <Menu.Item title="Asteroids" value="p5-asteroids" fontWeight="500" />,
    <Menu.Item title="Fountain" value="p5-fountain" fontWeight="500" />,
  ]}>
    <Menu.Item title="p5 Tutorials" rightIcon={ChevronRightIcon} fontWeight="500" />
  </Menu>,
];

//
// App
//

function App() {
  const [windows, setWindows] = useState(location.pathname !== "/" ? [] : startupClients.map(client => ({
    id: crypto.randomUUID(),
    ...client,
  })));
  const [orderedWindowIds, setOrderedWindowIds] = useState<string[]>(windows.map(window => window.id));

  const addWindow = (client: Client) => {
    const id = crypto.randomUUID();

    setWindows(windows => [
      ...windows,
      { id, ...client },
    ]);

    setOrderedWindowIds(orderedWindowIds => [
      ...orderedWindowIds,
      id,
    ]);
  };

  //

  const handleWindowUpdate = (id: string, x: number, y: number) => {
    setWindows(windows => windows.map(window => window.id !== id ? window : ({
      ...window,
      position: { x, y },
    })));
  };

  const handleWindowFocus = (id: string) => {
    setOrderedWindowIds(orderedWindowIds => orderedWindowIds.at(-1) === id ? orderedWindowIds : [
      ...orderedWindowIds.filter(windowId => windowId !== id),
      id,
    ]);
  };

  const handleWindowSendToBack = (id: string) => {
    setOrderedWindowIds(orderedWindowIds => [
      id,
      ...orderedWindowIds.filter(windowId => windowId !== id),
    ]);
  };

  const handleMenuSelect = (value?: string) => {
    if (typeof value !== "string") {
      return;
    }

    const client = startClient(value);

    if (client) {
      addWindow(client);
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
        x: (document.body.offsetWidth - element.offsetWidth - 240) / 2,
        y: (document.body.offsetHeight - element.offsetHeight - 32) / 2,
      },
    }));
  };

  //

  useEffect(() => {
    const handleWindowMessage = (event: MessageEvent) => {
      if (event.data.action === "START_CLIENT") {
        const client = startClient(event.data.client, event.data.args);

        if (client) {
          addWindow(client);
        }
      } else if (event.data.action === "WINDOW_TO_FRONT") {
        const iframes = Array.from(document.querySelectorAll("iframe"));

        const sourceIFrame = iframes.find(iframe => iframe.contentWindow === event.source);
        const windowId = sourceIFrame?.closest("#window")?.getAttribute("data-window-id");

        if (windowId) {
          handleWindowFocus(windowId);
        }
      }
    };

    window.addEventListener("message", handleWindowMessage);

    setTimeout(() => {
      const clientName = location.pathname.slice(1).split("/").at(-1);

      if (clientName) {
        const args = new URLSearchParams(window.location.search);
        const argsObject = Object.fromEntries(args.entries());

        const client = startClient(clientName, argsObject);

        if (client) {
          addWindow(client);
        }
      }
    });

    return () => {
      window.removeEventListener("message", handleWindowMessage);
    };
  }, []);

  return (
    <View id="window" style={{ height: "100vh", overflow: "hidden" }}>
      <View id="overlay" absolute style={{ zIndex: 1000, inset: 0, pointerEvents: "none" }} />
      <View horizontal shadow padding="0px 8px" fillColor="content" style={{ zIndex: 2, minHeight: 32 }}>
        <Menu onItemSelect={handleMenuSelect} items={desktopMenuItems}>
          <Menu.Item title="Desktop" padding="8px" fontWeight="700" />
        </Menu>
        <Menu onItemSelect={handleMenuSelect} items={utilitiesMenuItems}>
          <Menu.Item title="Utilities" padding="8px" fontWeight="500" />
        </Menu>
        <Menu onItemSelect={handleMenuSelect} items={buildProgramsMenuItems(handleMenuSelect)}>
          <Menu.Item title="Programs" padding="8px" fontWeight="500" />
        </Menu>
        <Menu onItemSelect={handleLinksMenuSelect} items={[
          <Menu.Item icon={ExternalLinkIcon} title="My GitHub Repos" value="https://github.com/mikeaustin" fontWeight="500" />,
          <Menu.Item icon={ExternalLinkIcon} title="Older React Desktop" value="https://mike-austin.com/react-desktop" fontWeight="500" />,
          <Menu.Item icon={ExternalLinkIcon} title="Learning React" value="https://codepen.io/collection/dbOKez" fontWeight="500" />,
          <Menu.Item icon={ExternalLinkIcon} title="My Old Resume (2017)" value="https://mike-austin.com" fontWeight="500" />,
        ]}>
          <Menu.Item title="Links" padding="8px" />
        </Menu>
      </View>
      <View flex fillColor="panel" style={{ background: `url('${wallpaperImage}') center center / cover` }}>
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
            onSendToBack={handleWindowSendToBack}
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
