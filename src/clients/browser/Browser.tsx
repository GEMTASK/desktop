import { View } from "onyx-ui";

function Browser() {
  return (
    <View flex>
      <View as="iframe" src="https://github.com" />
    </View>
  );
}

export default Browser;
