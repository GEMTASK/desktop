import { useState } from "react";
import { Button, Icon, Menu, View } from "onyx-ui";
import { Minimize2Icon } from "lucide-react";

import wallpaperImage from "../assets/wallpaper.jpg";
import Window from "./Window";

type Client = {
  icon?: React.ComponentProps<typeof Icon>["icon"],
  title: string,
  position?: { x: number, y: number },
  size: { width?: number, height?: number },
  client: React.ReactElement<{ args?: Record<string, string> }>,
  minimized?: boolean,
};

function Desktop(clients: Client[], startupClients?: Client[]) {
  const [windows, setWindows] = useState(location.pathname !== "/" || !startupClients ? [] : startupClients.map(client => ({
    id: crypto.randomUUID(),
    ...client,
  })));
  const [orderedWindowIds, setOrderedWindowIds] = useState<string[]>(windows.map(window => window.id));

  return (
    <View id="window" style={{ height: "100vh", overflow: "hidden" }}>
      <View id="overlay" absolute style={{ zIndex: 1000, inset: 0, pointerEvents: "none" }} />
      <View horizontal shadow padding="0px 8px" fillColor="content" style={{ zIndex: 2, minHeight: 32 }}>
        {/* <Menu onItemSelect={handleMenuSelect} items={desktopMenuItems}>
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
        </Menu> */}
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
                rightIcon={window.minimized ? Minimize2Icon : undefined}
                align="left"
                cornerRadius="0px"
              // onClick={() => handleWindowWindowSelect(window.id)}
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
          // onUpdate={handleWindowUpdate}
          // onFocus={handleWindowFocus}
          // onSendToBack={handleWindowSendToBack}
          // onRequestClose={handleWindowRequestClose}
          // onRequestMinimize={handleWindowRequestMinimize}
          // onLayout={handleWindowLayout}
          >
            {client}
          </Window>
        ))}
      </View>
    </View>
  );
}

export default Desktop;
