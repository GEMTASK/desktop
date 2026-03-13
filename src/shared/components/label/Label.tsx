import type { Delegate } from "../../types/Delegate";

import { Icon, Text, View } from "..";
import { ChevronDownIcon } from "lucide-react";

function Label({
  label,
  chevron,
  children,
  onClick,
  ...props
}: Delegate<{
  label?: string;
  chevron?: boolean;
}, typeof View<"label">>) {
  return (
    <View as="label" spacing="8px" style={{ cursor: "pointer" }} onClick={onClick}>
      {label && (
        <View horizontal align="middle left">
          <Text light caps innerStyle={{ fontSize: 11, lineHeight: "17px" }}>
            {label}
          </Text>
          {chevron && (
            <Icon icon={ChevronDownIcon} size={16} style={{ opacity: 0.6, margin: "-4px 0", strokeWidth: 1 }} />
          )}
        </View>
      )}
      <View {...props}>
        {children}
      </View>
    </View>
  );
}

export default Label;
