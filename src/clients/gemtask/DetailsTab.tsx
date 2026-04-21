import { View } from "onyx-ui";
import { Input } from "../terminal/Terminal";

function DetailsTab() {
  const summary = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.";

  return (
    <View spacing="16px">
      <Input flush label="Summary" border="none" value={summary} />
      <Input flush label="Criteria" border="none" value="But I must explain to you" />
      <Input flush label="Out of Scope" border="none" value="" />
    </View>
  );
}

export default DetailsTab;
