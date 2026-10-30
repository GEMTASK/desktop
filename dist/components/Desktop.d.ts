import { Icon } from 'onyx-ui';
type Client = {
    icon?: React.ComponentProps<typeof Icon>["icon"];
    title: string;
    position?: {
        x: number;
        y: number;
    };
    size: {
        width?: number;
        height?: number;
    };
    client: React.ReactElement<{
        args?: Record<string, string>;
    }>;
    minimized?: boolean;
};
declare function Desktop(clients: Client[], startupClients?: Client[]): import("react").JSX.Element;
export default Desktop;
