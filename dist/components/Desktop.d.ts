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
declare function Desktop({ clients, startupClients, }: {
    clients: Record<string, Client>;
    startupClients?: Client[];
}): React.JSX.Element;
export default Desktop;
