import { default as React } from 'react';
import { Delegate, Icon, Label, View } from 'onyx-ui';
declare const Input: ({ label, value: _value, lines, border, flush, icon, placeholder, changeOnEnter, innerStyle, onValueChange, ...props }: Delegate<{
    label?: React.ComponentProps<typeof Label>["label"];
    value?: string;
    lines?: number;
    flush?: boolean;
    icon?: React.ComponentProps<typeof Icon>["icon"];
    placeholder?: React.ComponentProps<"input">["placeholder"];
    innerStyle?: React.ComponentProps<"textarea">["style"];
    changeOnEnter?: boolean;
    onValueChange?: (value: string) => void;
}, typeof View<"div">>) => React.JSX.Element;
declare const Terminal: () => React.JSX.Element;
export default Terminal;
export { Input, };
