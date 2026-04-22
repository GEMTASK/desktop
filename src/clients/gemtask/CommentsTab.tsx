import { Avatar, Button, Divider, Text, View, type Delegate } from "onyx-ui";
import { ChevronDownIcon } from "lucide-react";

import { Input } from "../terminal/Terminal";

function SectionHeader({
  children,
  ...props
}: Delegate<object, typeof View<"div">>) {
  return (
    <View sticky negativeBorder border="top bottom" padding="8px 16px" fillColor="gutter" zIndex={2} style={{ paddingTop: children ? 16 : 0 }} {...props}>
      {children && (
        <Text light caps innerStyle={{ fontSize: 11 }}>
          {children}
        </Text>
      )}
    </View>
  );
}

function Reply() {
  return (
    <View horizontal padding="16px" spacing="8px" style={{ paddingBottom: 0 }}>
      <Avatar imageOnly />
      <View padding="8px 16px" spacing="8px" fillColor="icon" cornerRadius="4px">
        <Text>
          Green
        </Text>
        <Text light fontSize="12px">
          Sarah Connor &nbsp;&middot;&nbsp; Wed, Nov 27, 2024
        </Text>
      </View>
    </View>
  );
}

function Comment({ replies }: { replies: string[] }) {
  return (
    <View border="top bottom" fillColor="content">
      <View horizontal padding="8px 16px">
        <Avatar flex name="Sarah Connor" label="Quality Assurance" />
        <Button cornerRadius="max" rightIcon={ChevronDownIcon}>
          Actions
        </Button>
      </View>
      <Divider style={{ marginLeft: 16 }} />
      <View padding="16px" spacing="16px" style={{ paddingBottom: 0 }}>
        <Text>
          What color is the background?
        </Text>
      </View>
      {replies.map(reply => (
        <Reply />
      ))}
      <View horizontal padding="8px 16px" align="bottom left">
        <Input flex border="none" padding="4px 0px" placeholder="Reply to comment..." />
        <Button solid primary cornerRadius="max">
          Add Reply
        </Button>
      </View>
    </View>
  );
}

function CommentsTab() {
  return (
    <View flex style={{ overflowY: "auto" }}>
      <View horizontal padding="8px 16px" border="bottom" align="bottom left" fillColor="content">
        <Input flex border="none" padding="4px 0px" placeholder="Add a comment..." />
        <Button primary cornerRadius="max">
          Add Comment
        </Button>
      </View>
      <SectionHeader>
        All Comments
      </SectionHeader>
      <View spacing="8px" fillColor="gutter">
        <Comment replies={["One", "Two"]} />
        <Comment replies={[]} />
      </View>
      <SectionHeader />
    </View>
  );
}

export default CommentsTab;
