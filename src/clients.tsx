import {
  CalculatorIcon, CalendarIcon, ClockIcon, EyeIcon, FolderIcon, GlobeIcon, PenIcon, TerminalIcon,
} from "lucide-react";

import { View, Icon } from "onyx-ui";

import About from "./clients/about";
import Window from "./components/Window";
import Calculator from "./clients/calculator";
import Styleguide from "./clients/styleguide";
// import Asteroids from "./clients/asteroids/Asteroids";
import Explorer from "./clients/explorer";
import Browser from "./clients/browser";
import AnalogClock from "./clients/clock";
import Calendar from "./clients/calendar";
import Markdown from "./clients/markdown";
import Eyes from "./clients/eyes";
import Terminal from "./clients/terminal";

const IframeClients = {
  "asteroids": "https://editor.p5js.org/mike_ekim1024/full/q8nWdZV0U",
  "music-player": "https://mike-austin.com/music-player",
  "bestest-movies-ever": "https://bestestmoviesever.com",
  "ft86-part-picker": "https://wheels.ft86partpicker.com",
  "vector-draw": "https://mike-austin.com/draw-2",
  "react-asteroids": "https://codepen.io/mikeaustin/embed/mdpYMym?default-tab=js%2Cresult",
  "strategic-asteroids": "https://code.mike-austin.com/asteroids",
  "lets-code": "https://code.mike-austin.com/lets-code",
  "fountain": "https://code.mike-austin.com/fountain",
  "imploding-sphere": "https://editor.p5js.org/mike_ekim1024/full/shcbRaIS8",
};

function IFrame({ name }: { name: keyof typeof IframeClients }) {
  return (
    <View flex as="iframe" src={IframeClients[name]} />
  );
}

type Client = {
  icon?: React.ComponentProps<typeof Icon>["icon"],
  title: string,
  position?: { x: number, y: number },
  size: { width?: number, height?: number },
  client: React.ReactElement
};

const clients: Record<string, Client> = {
  "about": {
    title: "About", size: { width: 500, height: 255 }, client: <About />,
  },
  "calendar": {
    icon: CalendarIcon, title: "Calendar", size: { width: 360, height: 330 }, client: <Calendar />,
  },
  "clock": {
    icon: ClockIcon, title: "Clock", size: { width: 300, height: 330 }, client: <AnalogClock />,
  },
  "calculator": {
    icon: CalculatorIcon, title: "Calculator", size: { width: 255, height: 330 }, client: <Calculator />,
  },
  "terminal": {
    icon: TerminalIcon, title: "Terminal", size: { width: 700, height: 535 }, client: <Terminal />,
  },
  "eyes": {
    icon: EyeIcon, title: "Eyes", size: { width: 255, height: 165 }, client: <Eyes />,
  },
  "styleguide": {
    title: "Styleguide", size: { width: 645, height: undefined }, client: <Styleguide />,
  },
  "markdown": {
    icon: PenIcon, title: "Markdown", size: { width: 800, height: 900 }, client: <Markdown />,
  },
  "bestest-movies-ever": {
    title: "Bestest Movies Ever", size: { width: 960, height: 900 }, client: <IFrame name="bestest-movies-ever" />,
  },
  "music-player": {
    title: "Music Player", size: { width: 1500, height: 900 }, client: <IFrame name="music-player" />,
  },
  "s3-explorer": {
    icon: FolderIcon, title: "Explorer", size: { width: 675, height: 535 }, client: <Explorer />,
  },
  "ft86-part-picker": {
    title: "FT86 Part Picker", size: { width: 1024 + 32, height: 900 }, client: <IFrame name="ft86-part-picker" />,
  },
  "strategic-asteroids": {
    title: "Strategic Asteroids", size: { width: 800, height: 872 }, client: <IFrame name="asteroids" />,
  },
  "react-asteroids": {
    title: "React Asteroids", size: { width: 1400, height: 900 }, client: <IFrame name="react-asteroids" />,
  },
  "browser": {
    icon: GlobeIcon, title: "Browser", size: { width: 1200, height: 900 }, client: <Browser />,
  },
  "p5-lets-code": {
    title: "p5 Let's Code!", size: { width: 1680, height: 1100 }, client: <IFrame name="lets-code" />,
  },
  "p5-fountain": {
    title: "p5 Fountain", size: { width: 1680, height: 1100 }, client: <IFrame name="fountain" />,
  },
  "p5-asteroids": {
    title: "p5 Asteroids", size: { width: 1680, height: 1100 }, client: <IFrame name="strategic-asteroids" />,
  },
  "vector-draw": {
    title: "Vector Draw", size: { width: 1340, height: 900 }, client: <IFrame name="vector-draw" />,
  },
  "imploding-sphere": {
    title: "Imploding Sphere", size: { width: 800, height: 872 }, client: <IFrame name="imploding-sphere" />,
  },
} as const;

export default clients;
