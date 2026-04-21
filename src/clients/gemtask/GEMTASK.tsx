import React, { useLayoutEffect, useState } from "react";
import {
  BookIcon, BookmarkIcon, BugIcon, CalendarIcon, ChevronDownIcon, ClockIcon, FlagIcon, LayersIcon, SearchIcon,
  SettingsIcon, SquareIcon, XIcon, ZapIcon,
} from "lucide-react";

import { Avatar, Button, Chip, Divider, Icon, Label, List, Menu, Select, Text, View, type Delegate } from "onyx-ui";
import { Input } from "../terminal/Terminal";
import CommentsTab from "./CommentsTab";

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
        <>
          <View horizontal border="bottom" padding="8px 16px" align="middle justify" fillColor="panel">
            <View>
              <Chip light fontSize="12px" fillColor="icon">
                Basic Authentication
              </Chip>
            </View>
            <Button cornerRadius="max" rightIcon={ChevronDownIcon} style={{ minHeight: 30 }}>
              Actions
            </Button>
          </View>
          <View padding="16px" fillColor="gutter">
            <List>
              <BacklogItem />
              <BacklogItem />
            </List>
          </View>
        </>
      )}
    </View>
  );
}

function BacklogItem({ selected }: { selected?: boolean }) {
  return (
    <View horizontal padding="8px 16px" fillColor={selected ? "selected" : "content"}>
      <View flex spacing="8px">
        <Text bold style={{ marginBottom: 4 }} innerStyle={{ lineHeight: "16px" }}>
          An application can be filled out to become a Certified Scrum Trainer
        </Text>
        <View horizontal spacing="12px" align="middle left">
          <View horizontal spacing="4px" align="middle left">
            <Icon icon={BookIcon} size={14} style={{ marginTop: -4, marginBottom: -4, color: "#748ffc" }} />
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
            <Icon icon={SquareIcon} size={14} color="primary" fill="currentColor" style={{ margin: "-2px 0", color: "#a5d8ff" }} />
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
        { icon: SettingsIcon, label: "Chore", value: "CHORE" },
        { icon: BugIcon, label: "Defect", value: "TO_DO" },
        { icon: ClockIcon, label: "Spike", value: "SPIKE" },
        { icon: LayersIcon, label: "Epic", value: "EPIC" },
      ],
    },
  ];

  const itemStatusSelectOptions = [
    {
      options: [
        { label: "Any", value: undefined },
        { label: "None", value: null },
      ],
    },
    {
      options: [
        { icon: BookIcon, label: "Conceptual", value: "STORY" },
        { icon: SettingsIcon, label: "Backlog", value: "BACKLOG" },
        { icon: BugIcon, label: "To Do", value: "TO_DO" },
        { icon: ClockIcon, label: "In Progress", value: "IN_PROGRESS" },
        { icon: LayersIcon, label: "In Review", value: "IN_REVIEW" },
        { icon: LayersIcon, label: "Done", value: "DONE" },
      ],
    },
  ];

  return (
    <View flex style={{ minHeight: 0 }}>
      <View negativeBorder border="bottom" padding="16px" spacing="16px" fillColor="panel" zIndex={3} style={{ paddingBottom: 8 }}>
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
          <Select label="Status" value={"BACKLOG"} options={itemStatusSelectOptions} />
        </View>
        <View horizontal spacing="16px">
          <View horizontal spacing="4px" align="middle left" cursor="pointer">
            <Icon icon={FlagIcon} size={14} />
            <Text>
              Flagged Items
            </Text>
          </View>
          <View horizontal spacing="4px" align="middle left" cursor="pointer">
            <Icon icon={ZapIcon} size={14} />
            <Text>
              Unpointed Items
            </Text>
          </View>
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
                <BacklogItem key={index} selected={index === 0} />
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

const overviewTabs = [
  { id: "item-overview-details", title: "Details" },
  { id: "item-overview-comments", title: "Comments" },
  { id: "item-overview-updates", title: "Updates" },
];

const summary = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.";

function ItemOverview() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabSelect = (index: number) => {
    document.querySelector(`#${overviewTabs[index]?.id}`)?.scrollIntoView();
  };

  const handleScrollEnd = (event: React.UIEvent) => {
    setSelectedTabIndex(
      Math.round(event.currentTarget.scrollLeft / (event.currentTarget.scrollWidth - event.currentTarget.clientWidth) * 2),
    );
  };

  return (
    <View flex>
      <View padding="16px" spacing="16px" border="bottom" fillColor="panel" style={{ paddingBottom: 0 }}>
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
          innerStyle={{ fontSize: 18, height: 22 }}
        />
        <View horizontal spacing="16px">
          <Select label="Type" value={"STORY"} options={[{ value: "STORY", label: "Story" }]} />
          <Select label="Status" value={"BACKLOG"} options={[{ value: "BACKLOG", label: "Backlog" }]} />
        </View>
        <View horizontal spacing="16px">
          <Text
            light={selectedTabIndex !== 0}
            fontSize="18px"
            cursor="pointer"
            negativeBorder
            border="bottom"
            borderColor={selectedTabIndex === 0 ? "primary" : undefined}
            style={{ paddingBottom: 8 }}
            onClick={() => handleTabSelect(0)}
          >
            Details
          </Text>
          <Text
            light={selectedTabIndex !== 1}
            fontSize="18px"
            cursor="pointer"
            negativeBorder
            border="bottom"
            borderColor={selectedTabIndex === 1 ? "primary" : undefined}
            style={{ paddingBottom: 8 }}
            onClick={() => handleTabSelect(1)}
          >
            Comments
          </Text>
          <Text
            light={selectedTabIndex !== 2}
            fontSize="18px"
            cursor="pointer"
            negativeBorder
            border="bottom"
            borderColor={selectedTabIndex === 2 ? "primary" : undefined}
            style={{ paddingBottom: 8 }}
            onClick={() => handleTabSelect(2)}
          >
            Updates
          </Text>
        </View>
      </View>
      {/*  */}
      <View flex horizontal style={{ overflowX: "auto", scrollSnapType: "x mandatory" }} onScrollEnd={handleScrollEnd}>
        <View id="item-overview-details" padding="16px" style={{ flexShrink: 0, flexBasis: "100%", overflowY: "auto", scrollSnapAlign: "start" }}>
          {selectedTabIndex === 0 && (
            <View spacing="16px">
              <Input flush label="Summary" border="none" value={summary} />
              <Input flush label="Criteria" border="none" value="But I must explain to you" />
              <Input flush label="Out of Scope" border="none" value="" />
            </View>
          )}
        </View>
        <Divider />
        <View id="item-overview-comments" style={{ flexShrink: 0, flexBasis: "100%", overflowY: "auto", scrollSnapAlign: "start" }}>
          {selectedTabIndex === 1 && (
            <CommentsTab />
          )}
        </View>
        <Divider />
        <View id="item-overview-updates" padding="16px" style={{ flexShrink: 0, flexBasis: "100%", overflowY: "auto", scrollSnapAlign: "start" }}>
          {selectedTabIndex === 2 && (
            <Label label="Updates">
              <Text>
                But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                Asdf
              </Text>
            </Label>
          )}
        </View>
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
