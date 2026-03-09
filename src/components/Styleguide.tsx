import { Button, Text, View } from "../shared/components";

function Styleguide() {
  return (
    <View flex fillColor="white" padding="16px" spacing="16px"
      style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}
    >
      <View>
        <Text fontSize="32px">32px</Text>
        <View padding="4px" fillColor="gray-1" />
        <Text fontSize="24px">24px</Text>
        <View padding="4px" fillColor="gray-1" />
        <Text fontSize="18px">18px</Text>
        <View padding="4px" fillColor="gray-1" />
        <Text fontSize="14px">14px</Text>
        <View padding="4px" fillColor="gray-1" />
        <Text fontSize="12px">12px</Text>
      </View>

      <Text as="a" href="/">
        Content
      </Text>
      <View horizontal spacing="8px">
        <Button>
          Hello
        </Button>
        <Button primary>
          Hello
        </Button>
        <Button hover>
          Hello
        </Button>
      </View>
      <View horizontal spacing="8px" align="middle justify">
        <View spacing="8px">
          <Text>
            Title
          </Text>
          <Text light fontSize="12px">
            Subtitle
          </Text>
        </View>
        <Button>
          Button
        </Button>
      </View>
    </View>
  );
}

export default Styleguide;
