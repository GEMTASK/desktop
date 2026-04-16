import { BookIcon } from "lucide-react";
import { Button, Divider, Icon, Select, Text, View } from "onyx-ui";

function SectionHeader() {
  return (
    <View sticky padding="8px 16px" fillColor="gutter" style={{ paddingTop: 16 }}>
      <Text light caps fontSize="12px">
        Product Backlog
      </Text>
    </View>
  );
}

function BacklogItem() {
  return (
    <View padding="8px 16px" spacing="8px" fillColor="content">
      <Text fontWeight="600">
        An application can be filled out to become a Certified Scrum Trainer
      </Text>
      <View horizontal spacing="8px" align="middle left">
        <View horizontal spacing="4px" align="middle left">
          <Icon icon={BookIcon} size={14} style={{ marginTop: -4, marginBottom: -4 }} />
          <Text light fontSize="12px" fontWeight="600">
            ENG-2
          </Text>
        </View>
        <View>
          <Text fontSize="12px">
            Basic Authentication
          </Text>
        </View>
      </View>
    </View>
  );
}

function GEMTASK() {
  return (
    <View flex>
      <View border="bottom" fillColor="white" style={{ height: 44 }}>
        {/* Header */}
      </View>
      <View border="bottom" padding="8px 16px" spacing="12px" fillColor="panel">
        <View horizontal align="top justify" fillColor="panel">
          <View spacing="8px">
            <Text light fontSize="12px">
              Engineering – ENG
            </Text>
            <Text fontSize="24px">
              Backlog
            </Text>
          </View>
          <Button solid cornerRadius="max" style={{ minHeight: 32 }}>
            Create Sprint
          </Button>
        </View>
        <View horizontal spacing="16px">
          <Select label="Type" value={"STORY"} options={[{ value: "STORY", label: "Story" }]} />
          <Select label="Status" value={"BACKLOG"} options={[{ value: "BACKLOG", label: "Backlog" }]} />
        </View>
      </View>
      <View flex fillColor="gutter">
        <SectionHeader />
        <View padding="0px 16px">
          <View border cornerRadius="4px" style={{ overflow: "hidden" }}>
            <BacklogItem />
            <Divider />
            <BacklogItem />
            <Divider />
            <BacklogItem />
          </View>
        </View>
      </View>
    </View>
  );
}

export default GEMTASK;
