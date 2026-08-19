declare function Frame({ onStart, onUpdate, }: {
    onStart: () => void;
    onUpdate: (deltaX: number, deltaY: number) => void;
}): import("react").JSX.Element;
export default Frame;
