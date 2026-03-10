import { Button, Divider, Icon, Text, View } from "../shared/components";
import { Home as HomeIcon } from "lucide-react";

function Styleguide() {
  return (
    <View flex fillColor="content" padding="16px" spacing="16px"
      style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}
    >
      <View horizontal spacing="16px" align="middle justify">
        <Text fontSize="32px">Page Heading</Text>
        <Button>Action Button</Button>
      </View>
      <Divider />
      <View horizontal spacing="16px">
        <View>
          <View padding="4px" fillColor="divider" />
          <Text fontSize="32px">32px</Text>
          <View padding="4px" fillColor="divider" />
          <Text fontSize="24px">24px</Text>
          <View padding="4px" fillColor="divider" />
          <Text fontSize="18px">18px</Text>
          <View padding="4px" fillColor="divider" />
          <Text fontSize="14px">14px</Text>
          <View padding="4px" fillColor="divider" />
          <Text fontSize="12px">12px</Text>
          <View padding="4px" fillColor="divider" />
        </View>
        <Divider />
        <View spacing="8px" align="middle center">
          <View horizontal spacing="8px">
            <Button hover>Hover</Button>
            <Button>Default</Button>
            <Button solid>Solid</Button>
            <Button primary>Primary</Button>
            <Button solid primary>Primary Solid</Button>
          </View>
          <View horizontal spacing="8px">
            <Button round hover>Hover</Button>
            <Button round>Default</Button>
            <Button round solid>Solid</Button>
            <Button round primary>Primary</Button>
            <Button round solid primary>Primary Solid</Button>
          </View>
          <View horizontal spacing="8px">
            <Button round solid icon={HomeIcon}>Left Icon</Button>
            <Button round solid icon={HomeIcon} />
          </View>
          <View horizontal spacing="8px">
            <Button hover>Mutiline<br />Hover</Button>
            <Button >Mutiline<br />Default</Button>
            <Button solid>Mutiline<br />Solid</Button>
            <Button primary>Mutiline<br />Primary</Button>
            <Button solid primary>Mutiline<br />Primary Solid</Button>
          </View>
        </View>
      </View>

      <Text as="a" href="/" textColor="primary" style={{ textDecoration: "none" }}>
        Content
      </Text>

      <Icon icon={HomeIcon} color="primary" />

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
