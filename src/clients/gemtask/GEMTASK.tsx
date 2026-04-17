import React, { useState } from "react";
import { BookIcon, BookmarkIcon, CalendarIcon, ChevronDownIcon, FlagIcon, SquareDashed, SquareIcon } from "lucide-react";

import { Avatar, Button, Divider, Icon, List, Menu, Select, Text, View, type Delegate } from "onyx-ui";

function SectionHeader({
  children,
  ...props
}: Delegate<object, typeof View<"div">>) {
  return (
    <View sticky negativeBorder border="top bottom" padding="8px 16px" fillColor="gutter" zIndex={2} style={{ paddingTop: 16 }} {...props}>
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
    <View horizontal spacing="4px" align="middle left">
      <Icon icon={CalendarIcon} size={14} style={{ margin: "-2px 0", opacity: light ? 0.6 : undefined }} />
      <Text light={light} fillColor={fillColor} cornerRadius="2px" {...props} padding={fillColor ? "2px 4px" : undefined} style={{ margin: fillColor ? "-2px 0" : undefined }}>
        {children}
      </Text>
    </View>
  );
}

function Sprint() {
  const [isBacklogVisible, setIsBacklogVisible] = useState(false);

  const handleClick = () => {
    setIsBacklogVisible(isBacklogVisible => !isBacklogVisible);
  };

  return (
    <View>
      <View sticky negativeBorder border="top bottom" padding="8px 16px" spacing="8px" fillColor="content" style={{ top: 35 }} onClick={handleClick}>
        <Text bold>
          Sprint 1
        </Text>
        <Text light fontSize="12px">
          5 items
        </Text>
      </View>
      {isBacklogVisible && (
        <View border="top" padding="16px" fillColor="gutter">
          <List>
            <BacklogItem />
            <BacklogItem />
          </List>
        </View>
      )}
    </View>
  );
}

function BacklogItem() {
  return (
    <View horizontal padding="8px 16px" fillColor="content">
      <View flex spacing="8px">
        <Text bold innerStyle={{ lineHeight: "16px" }}>
          An application can be filled out to become a Certified Scrum Trainer
        </Text>
        <View horizontal spacing="12px" align="middle left">
          <View horizontal spacing="4px" align="middle left">
            <Icon icon={BookIcon} size={14} style={{ marginTop: -4, marginBottom: -4 }} />
            <Text light bold fontSize="12px">
              ENG-2
            </Text>
          </View>
          <Chip light fontSize="12px" fillColor="icon">
            Basic Authentication
          </Chip>
          <Chip light bold fontSize="12px" fillColor="highlight">
            Apr 15
          </Chip>
        </View>
      </View>
      <View horizontal spacing="12px">
        <Avatar.Stack>
          <Avatar imageOnly />
          <Avatar imageOnly />
        </Avatar.Stack>
        <View spacing="8px">
          <View horizontal spacing="4px" align="middle left">
            <Icon icon={SquareIcon} size={14} color="primary" fill="currentColor" style={{ margin: "-2px 0" }} />
            <Text>
              In Progress
            </Text>
          </View>
          <Text light fontSize="12px" style={{ paddingLeft: 18 }}>
            2 of 2 done
          </Text>
        </View>
        <View spacing="8px" align="middle center">
          <Text bold>
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
];

const sprints = [
  { title: "Sprint 1" },
  { title: "Sprint 2" },
  { title: "Sprint 3" },
];

function ItemBacklog() {
  return (
    <View flex style={{ minHeight: 0 }}>
      <View negativeBorder border="bottom" padding="8px 16px" spacing="16px" fillColor="panel" zIndex={3}>
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
      {/*  */}
      <View flex fillColor="gutter" style={{ overflow: "scroll" }}>
        <View>
          <SectionHeader>
            Active Sprints
          </SectionHeader>
          <View>
            {sprints.map((sprint, index) => (
              <Sprint key={index} />
            ))}
          </View>
        </View>
        <View>
          <SectionHeader>
            Product Backlog
          </SectionHeader>
          <View padding="16px">
            <List style={{ overflow: "hidden" }}>
              {items.map(({ title }, index) => (
                <BacklogItem key={index} />
              ))}
            </List>
          </View>
        </View>
        <Text padding="16px" align="middle center" style={{ paddingTop: 0 }}>
          The product backlog is a prioritized list of items with the most valuable at the top
        </Text>
      </View>
    </View>
  );
}

function ItemOverview() {
  return (
    <View flex>
      <View padding="8px 16px" spacing="16px" border="bottom" fillColor="panel">
        <View horizontal fillColor="panel" align="top justify">
          <View spacing="8px">
            <View horizontal spacing="12px">
              <Chip icon={BookIcon}>
                ENG-2
              </Chip>
              <Chip bold fontSize="12px" fillColor="highlight">
                Apr 15
              </Chip>
            </View>
            <Text light fontSize="12px">
              Updated Sat, Mar 21, 2026
            </Text>
          </View>
          <Menu items={[
            <Menu.Item icon={FlagIcon} title="Flag Item" />,
            <Menu.Item icon={BookmarkIcon} title="Bookmark Item" />,
          ]}>
            <Button solid cornerRadius="max" rightIcon={ChevronDownIcon} style={{ minHeight: 32 }}>
              Actions
            </Button>
          </Menu>
        </View>
        <Text fontSize="18px">
          An application can be filled out to become a Certified Scrum Trainer
        </Text>
      </View>
      {/*  */}
      <View padding="16px">
        <Text light caps fontSize="12px">
          Summary
        </Text>
      </View>
    </View>
  );
}

function GEMTASK() {
  return (
    <View flex style={{ minHeight: 0 }}>
      {/*  */}
      <View horizontal border="bottom" padding="8px 16px" align="middle justify" fillColor="white">
        <Text>
          GEMTASK
        </Text>
        <Avatar name="Sarah Connor" label="Quality Assurance" />
      </View>
      <View flex horizontal style={{ minHeight: 0 }}>
        <ItemBacklog />
        <Divider />
        <ItemOverview />
      </View>
    </View>
  );
}

export default GEMTASK;
