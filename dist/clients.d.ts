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
    client: React.ReactElement;
    minimized?: boolean;
};
declare function startClient(client: string, args?: Record<string, string>): {
    icon: import('react').ForwardRefExoticComponent<Omit<import('lucide-react').LucideProps, "ref"> & import('react').RefAttributes<SVGSVGElement>>;
    title: string;
    size: {
        width: number;
        height: number;
    };
    client: import("react").JSX.Element;
} | undefined;
declare const clients: Record<string, Client>;
export default clients;
export { startClient, };
