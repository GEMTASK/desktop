import { Delegate, View } from 'onyx-ui';
declare function Window({ id, title, children, position, size, order, minimized, onLayout, onUpdate, onFocus, onSendToBack, onRequestClose, onRequestMinimize, }: Delegate<{
    id: string;
    title: string;
    position?: {
        x: number;
        y: number;
    };
    size: {
        width?: number;
        height?: number;
    };
    order: number;
    minimized: boolean;
    onLayout?: (id: string, element: HTMLElement) => void;
    onUpdate: (id: string, x: number, y: number) => void;
    onFocus: (id: string) => void;
    onSendToBack: (id: string) => void;
    onRequestClose?: (id: string) => void;
    onRequestMinimize?: (id: string) => void;
}, typeof View<"div">>): import("react").JSX.Element;
export default Window;
