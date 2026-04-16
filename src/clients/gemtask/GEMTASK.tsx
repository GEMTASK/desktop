import { BookIcon, CalendarIcon } from "lucide-react";
import { Avatar, Button, Divider, Icon, Select, Text, View, type Delegate } from "onyx-ui";

import styles from "./GEMTASK.module.scss"

function SectionHeader({
  children,
  ...props
}: Delegate<object, typeof View<"div">>) {
  return (
    <View sticky border="top bottom" padding="8px 16px" fillColor="gutter" style={{ paddingTop: 16, margin: "-1px 0" }} {...props}>
      <Text light caps innerStyle={{ fontSize: 11 }}>
        {children}
      </Text>
    </View>
  );
}

function Chip({
  light,
  fillColor,
  children,
  ...props
}: Delegate<{
  icon?: React.ComponentProps<typeof Icon>["icon"],
}, typeof Text>) {
  return (
    <View horizontal spacing="8px" align="middle left">
      <Icon icon={CalendarIcon} size={14} style={{ margin: "-2px 0", opacity: light ? 0.6 : undefined }} />
      <Text light={light} fillColor={fillColor} cornerRadius="2px" {...props} padding={fillColor ? "2px 4px" : undefined} style={{ margin: fillColor ? "-2px 0" : undefined }}>
        {children}
      </Text>
    </View>
  );
}

function Sprint() {
  return (
    <View border="top bottom" className={styles.Sprint}>
      <View padding="8px 16px" spacing="8px" fillColor="content">
        <Text>
          Sprint 1
        </Text>
        <Text light fontSize="12px">
          5 items
        </Text>
      </View>
    </View>
  )
}

function BacklogItem() {
  return (
    <View horizontal padding="8px 16px" fillColor="content">
      <View flex spacing="8px">
        <Text fontWeight="600">
          An application can be filled out to become a Certified Scrum Trainer
        </Text>
        <View horizontal spacing="12px" align="middle left">
          <View horizontal spacing="4px" align="middle left">
            <Icon icon={BookIcon} size={14} style={{ marginTop: -4, marginBottom: -4 }} />
            <Text light fontSize="12px" fontWeight="600">
              ENG-2
            </Text>
          </View>
          <Chip light fontSize="12px" fillColor="icon">
            Basic Authentication
          </Chip>
          <Chip light fontSize="12px" fontWeight="600" fillColor="highlight">
            Apr 15
          </Chip>
        </View>
      </View>
      <View horizontal spacing="12px">
        <Avatar.Stack>
          <Avatar imageOnly />
          <Avatar imageOnly />
        </Avatar.Stack>
        <View spacing="8px" align="middle center">
          <Text fontWeight="600">
            10
          </Text>
          <Text light fontSize="12px">
            points
          </Text>
        </View>
      </View>
    </View>
  );
}

const items = [
  { title: "An application can be filled out to become a Certified Scrum Trainer" },
  { title: "An application can be filled out to become a Certified Scrum Trainer" },
  { title: "An application can be filled out to become a Certified Scrum Trainer" },
  { title: "An application can be filled out to become a Certified Scrum Trainer" },
  { title: "An application can be filled out to become a Certified Scrum Trainer" },
  { title: "An application can be filled out to become a Certified Scrum Trainer" },
  { title: "An application can be filled out to become a Certified Scrum Trainer" },
  { title: "An application can be filled out to become a Certified Scrum Trainer" },
  { title: "An application can be filled out to become a Certified Scrum Trainer" },
  { title: "An application can be filled out to become a Certified Scrum Trainer" },
];

const sprints = [
  { title: "Sprint 1" },
  { title: "Sprint 2" },
  { title: "Sprint 3" },
]

function GEMTASK() {
  return (
    <View flex style={{ minHeight: 0 }}>
      <View horizontal border="bottom" padding="8px 16px" align="middle justify" fillColor="white">
        <Text>
          GEMTASK
        </Text>
        <Avatar name="Sarah Connor" label="Quality Assurance" />
      </View>
      <View border="bottom" padding="8px 16px" spacing="12px" fillColor="panel" style={{ marginBottom: -1, zIndex: 2 }}>
        <View horizontal align="top justify" fillColor="panel">
          <View spacing="8px">
            <Text light fontSize="12px">
              ENG – Engineering
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

      <View flex fillColor="gutter" style={{ overflow: "scroll" }}>
        <View>
          <SectionHeader>
            Active Sprints
          </SectionHeader>
          <View>
            {sprints.map(sprint => (
              <Sprint />
            ))}
          </View>
        </View>
        <View>
          <SectionHeader>
            Product Backlog
          </SectionHeader>
          <View padding="0px 16px">
            <View border cornerRadius="4px" style={{ overflow: "hidden" }}>
              {items.map(({ title }, index) => (
                <>
                  {index > 0 && (
                    <Divider />
                  )}
                  <BacklogItem />
                </>
              ))}
            </View>
          </View>
        </View>
        <Text padding="16px" align="middle center">
          The product backlog is a prioritized list of items with the most valuable at the top
        </Text>
      </View>
    </View>
  );
}

export default GEMTASK;
