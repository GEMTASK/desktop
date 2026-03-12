import type { Delegate } from "../../types/Delegate";

import { Text, View } from "..";

function Label({
  label,
  children,
  ...props
}: Delegate<{
  label: string;
}, typeof View<"label">>) {
  return (
    <View as="label" spacing="8px" {...props}>
      <Text light caps innerStyle={{ fontSize: 11, lineHeight: "17px" }}>
        {label}
      </Text>
      <View>
        {children}
      </View>
    </View>
  );
}

export default Label;
