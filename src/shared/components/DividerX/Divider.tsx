import type { Delegate } from "../../types/Delegate";

import { View } from "..";

function Divider({
  style,
  ...props
}: Delegate<object, typeof View<"div">>) {
  return (
    <View fillColor="divider" style={{ ...style, minWidth: 1, minHeight: 1 }} {...props} />
  );
}

export default Divider;
