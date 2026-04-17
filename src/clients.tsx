import {
  BrainCircuitIcon, CalculatorIcon, CalendarIcon, CarIcon, CircleQuestionMarkIcon, ClockIcon, CodeIcon, EyeIcon,
  FilmIcon, FolderIcon, Gamepad2Icon, GemIcon, GlobeIcon, GpuIcon, MusicIcon, PaletteIcon, PenIcon, PenToolIcon, TerminalIcon,
} from "lucide-react";

import { View, Icon } from "onyx-ui";

import About from "./clients/about";
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
import GEMTASK from "./clients/gemtask";

const IframeClients = {
  "lets-code": "https://code.mike-austin.com/lets-code",
  "asteroids": "https://editor.p5js.org/mike_ekim1024/full/q8nWdZV0U",
  "fountain": "https://code.mike-austin.com/fountain",
  "snake": "https://editor.p5js.org/mike_ekim1024/full/8c5ovMThX",
  "bounce": "https://editor.p5js.org/mike_ekim1024/full/1eTmKDLpo",
  "segments": "https://editor.p5js.org/mike_ekim1024/full/HM5JTspTa",
  "virtual-stereo": "https://mike-austin.com/music-player",
  "bestest-movies-ever": "https://bestestmoviesever.com",
  "ft86-part-picker": "https://wheels.ft86partpicker.com",
  "vector-draw": "https://mike-austin.com/draw-2",
  "react-asteroids": "https://codepen.io/mikeaustin/embed/mdpYMym?default-tab=js%2Cresult",
  "strategic-asteroids": "https://code.mike-austin.com/asteroids",
  "imploding-sphere": "https://editor.p5js.org/mike_ekim1024/full/shcbRaIS8",
  "virtual-machine": "https://mike-austin.com/react-desktop-old/clients/vmachine",
};

// eslint-disable-next-line react-refresh/only-export-components
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
  client: React.ReactElement,
  minimized?: boolean,
};

const clients: Record<string, Client> = {
  "about": {
    icon: CircleQuestionMarkIcon, title: "About", size: { width: 500, height: 255 }, client: <About />,
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
    icon: TerminalIcon, title: "Terminal", size: { width: 700, height: 525 }, client: <Terminal />,
  },
  "eyes": {
    icon: EyeIcon, title: "Eyes", size: { width: 255, height: 165 }, client: <Eyes />,
  },
  "styleguide": {
    icon: PaletteIcon, title: "Styleguide", size: { width: 645, height: undefined }, client: <Styleguide />,
  },
  "markdown": {
    icon: PenIcon, title: "Markdown", size: { width: 800, height: 900 }, client: <Markdown />,
  },
  "bestest-movies-ever": {
    icon: FilmIcon, title: "Bestest Movies Ever", size: { width: 960, height: 900 }, client: <IFrame name="bestest-movies-ever" />,
  },
  "virtual-stereo": {
    icon: MusicIcon, title: "Stereo System", size: { width: 1500, height: 900 }, client: <IFrame name="virtual-stereo" />,
  },
  "s3-explorer": {
    icon: FolderIcon, title: "Explorer", size: { width: 675, height: 525 }, client: <Explorer />,
  },
  "ft86-part-picker": {
    icon: CarIcon, title: "FT86 Part Picker", size: { width: 1024 + 32, height: 900 }, client: <IFrame name="ft86-part-picker" />,
  },
  "strategic-asteroids": {
    icon: Gamepad2Icon, title: "Strategic Asteroids", size: { width: 800, height: 872 }, client: <IFrame name="asteroids" />,
  },
  "react-asteroids": {
    icon: Gamepad2Icon, title: "React Asteroids", size: { width: 1400, height: 900 }, client: <IFrame name="react-asteroids" />,
  },
  "browser": {
    icon: GlobeIcon, title: "Browser", size: { width: 1200, height: 900 }, client: <Browser />,
  },
  "p5-lets-code": {
    icon: CodeIcon, title: "p5 Let's Code!", size: { width: 1680, height: 1100 }, client: <IFrame name="lets-code" />,
  },
  "p5-fountain": {
    icon: CodeIcon, title: "p5 Fountain", size: { width: 1680, height: 1100 }, client: <IFrame name="fountain" />,
  },
  "p5-asteroids": {
    icon: CodeIcon, title: "p5 Asteroids", size: { width: 1680, height: 1100 }, client: <IFrame name="strategic-asteroids" />,
  },
  "p5-snake": {
    icon: Gamepad2Icon, title: "Snakey Snake", size: { width: 400, height: 473 }, client: <IFrame name="snake" />,
  },
  "p5-bounce": {
    icon: GpuIcon, title: "Bounce!", size: { width: 720, height: 473 }, client: <IFrame name="bounce" />,
  },
  "p5-segments": {
    icon: GpuIcon, title: "Segments", size: { width: 710, height: 473 }, client: <IFrame name="segments" />,
  },
  "vector-draw": {
    icon: PenToolIcon, title: "Vector Draw", size: { width: 1340, height: 900 }, client: <IFrame name="vector-draw" />,
  },
  "imploding-sphere": {
    icon: GpuIcon, title: "Imploding Sphere", size: { width: 800, height: 872 }, client: <IFrame name="imploding-sphere" />,
  },
  "virtual-machine": {
    icon: BrainCircuitIcon, title: "Virtual Machine", size: { width: 435, height: 870 }, client: <IFrame name="virtual-machine" />,
  },
  "gemtask": {
    icon: GemIcon, title: "GEMTASK", size: { width: 1600, height: 900 }, client: <GEMTASK />,
  },
} as const;

export default clients;
