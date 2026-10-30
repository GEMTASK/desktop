import { default as React } from 'react';
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
declare const clients: Record<string, Client>;
declare function startClient(clientName: string, args?: Record<string, string>): {
    client: React.ReactElement<{
        args?: Record<string, string>;
    }, string | React.JSXElementConstructor<any>>;
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
    minimized?: boolean;
} | undefined;
export default clients;
export { startClient, };
