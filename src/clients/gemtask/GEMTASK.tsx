import React, { useState } from "react";
import { BookIcon, BookmarkIcon, BugIcon, CalendarIcon, ChevronDownIcon, ClockIcon, FlagIcon, LayersIcon, SearchIcon, SettingsIcon, SquareDashed, SquareIcon, XIcon } from "lucide-react";

import { Avatar, Button, Chip, Divider, Icon, Label, List, Menu, Select, Text, View, type Delegate } from "onyx-ui";
import { Input } from "../terminal/Terminal";

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

function Sprint() {
  const [isBacklogVisible, setIsBacklogVisible] = useState(false);

  const handleClick = () => {
    setIsBacklogVisible(isBacklogVisible => !isBacklogVisible);
  };

  return (
    <View>
      <View sticky cursor="pointer" border="top bottom" padding="8px 16px" spacing="8px" fillColor="content" style={{ top: 36, marginBottom: -1 }} onClick={handleClick}>
        <Text bold>
          Sprint 1
        </Text>
        <Text light fontSize="12px">
          5 items
        </Text>
      </View>
      {isBacklogVisible && (
        <View padding="16px" fillColor="gutter">
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
        <Text bold style={{ marginBottom: 4 }} innerStyle={{ lineHeight: "16px" }}>
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
          <Chip light bold icon={CalendarIcon} fontSize="12px" fillColor="highlight">
            Apr 15
          </Chip>
        </View>
      </View>
      {/*  */}
      <View horizontal spacing="12px">
        <Avatar.Stack>
          <Avatar imageOnly />
          <Avatar imageOnly />
        </Avatar.Stack>
        <View spacing="8px">
          <View horizontal spacing="4px" align="middle left">
            <Icon icon={SquareIcon} size={14} color="primary" fill="currentColor" style={{ margin: "-2px 0" }} />
            <Text bold>
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
  const itemTypeSelectOptions = [
    {
      options: [
        { label: "Any", value: undefined },
      ],
    },
    {
      options: [
        { icon: BookIcon, label: "Story", value: "STORY" },
        { icon: SettingsIcon, label: "Chore", value: "BACKLOG" },
        { icon: BugIcon, label: "Defect", value: "TO_DO" },
        { icon: ClockIcon, label: "Spike", value: "IN_PROGRESS" },
        { icon: LayersIcon, label: "Epic", value: "IN_REVIEW" },
      ],
    },
  ];

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
          <Button solid cornerRadius="max" style={{ minHeight: 30 }}>
            Create Sprint
          </Button>
        </View>
        <View horizontal spacing="16px">
          <Select label="Type" value={"STORY"} options={itemTypeSelectOptions} />
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
      <View padding="8px 16px" spacing="16px" border="bottom" fillColor="panel" style={{ paddingBottom: 0 }}>
        <View horizontal fillColor="panel" align="top justify">
          <View spacing="8px">
            <View horizontal spacing="12px">
              <Chip icon={BookIcon}>
                ENG-2
              </Chip>
              <Chip bold icon={CalendarIcon} fontSize="12px" fillColor="highlight">
                Apr 15
              </Chip>
            </View>
            <Text light fontSize="12px">
              Updated Sat, Mar 21, 2026
            </Text>
          </View>
          <View horizontal spacing="8px" fillColor="panel" /* TODO */ align="middle left">
            <Menu items={[
              <Menu.Item icon={FlagIcon} title="Flag Item" />,
              <Menu.Item icon={BookmarkIcon} title="Bookmark Item" />,
            ]}>
              <Button solid cornerRadius="max" rightIcon={ChevronDownIcon} style={{ minHeight: 30 }}>
                Actions
              </Button>
            </Menu>
            <Button icon={XIcon} cornerRadius="max" style={{ minHeight: 30 }} />
          </View>
        </View>
        <Input
          flush
          border="none"
          value="An application can be filled out to become a Certified Scrum Trainer"
          innerStyle={{ fontSize: 18 }}
        />
        <View horizontal spacing="16px">
          <Select label="Type" value={"STORY"} options={[{ value: "STORY", label: "Story" }]} />
          <Select label="Status" value={"BACKLOG"} options={[{ value: "BACKLOG", label: "Backlog" }]} />
        </View>
        <View horizontal spacing="16px">
          <Text fontSize="18px" cursor="pointer" negativeBorder border="bottom" borderColor="primary" style={{ paddingBottom: 8 }}>
            Details
          </Text>
          <Text light fontSize="18px" cursor="pointer" style={{ paddingBottom: 8 }} innerStyle={{ opacity: 0.6 }}>
            Comments
          </Text>
          <Text light fontSize="18px" cursor="pointer" style={{ paddingBottom: 8 }} innerStyle={{ opacity: 0.6 }}>
            Updates
          </Text>
        </View>
      </View>
      {/*  */}
      <View padding="16px" style={{ overflow: "auto" }}>
        <Label label="Summary">
          <Text>
            But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
            <br />
            <br />
            But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
            <br />
            <br />
            But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
          </Text>
        </Label>
      </View>
    </View>
  );
}

//
//
//

function GEMTASK() {
  return (
    <View flex style={{ minHeight: 0 }}>
      {/*  */}
      <View horizontal border="bottom" padding="8px 16px" align="middle justify" fillColor="white">
        <View flex spacing="8px">
          <Text>
            GEMTASK
          </Text>
          <Text light fontSize="12px">
            Agile, simplified
          </Text>
        </View>
        <View style={{ flexBasis: "100%", maxWidth: 300 }}>
          <Input icon={SearchIcon} fillColor="gutter" cornerRadius="max" />
        </View>
        <View flex align="right">
          <Avatar name="Sarah Connor" label="Quality Assurance" />
        </View>
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
