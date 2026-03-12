import type { Delegate } from "../../types/Delegate";

import { Icon, Text, View } from "..";
import { ChevronDownIcon } from "lucide-react";

function Label({
  label,
  chevron,
  children,
  ...props
}: Delegate<{
  label: string;
  chevron?: boolean;
}, typeof View<"label">>) {
  return (
    <View as="label" spacing="8px" {...props}>
      <View horizontal align="middle left">
        <Text light caps innerStyle={{ fontSize: 11, lineHeight: "17px" }}>
          {label}
        </Text>
        {chevron && (
          <Icon icon={ChevronDownIcon} size={16} style={{ opacity: 0.6, margin: "-4px 0", strokeWidth: 1 }} />
        )}
      </View>
      <View>
        {children}
      </View>
    </View>
  );
}

export default Label;
