import React from "react";
import { type Icon } from "onyx-ui";

import clients from "./clients.tsx";

import Desktop from "./components/Desktop.tsx";

import "./App.css";

//
// App
//

type Client = {
  icon?: React.ComponentProps<typeof Icon>["icon"],
  title: string,
  position?: { x: number, y: number },
  size: { width?: number, height?: number },
  client: React.ReactElement<{ args?: Record<string, string> }>,
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

//
// App
//

function App() {
  return (
    <Desktop clients={clients} startupClients={startupClients} />
  );
}

export default App;
