import { View } from "onyx-ui";

function Browser() {
  return (
    <View flex>
      <View flex as="iframe" src="https://gemtask.github.io" />
    </View>
  );
}

export default Browser;
