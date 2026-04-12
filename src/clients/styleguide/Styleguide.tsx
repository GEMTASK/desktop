import { useState } from "react";
import {
  ArrowRightFromLineIcon, ArrowRightLeftIcon, BookIcon, BookmarkIcon, BugIcon, ChevronDownIcon, ChevronRightIcon, ClockIcon, CopyIcon,
  HomeIcon, LayersIcon, SettingsIcon, SquareIcon, TrashIcon,
} from "lucide-react";
import { Button, Checkbox, Divider, Form, Icon, Menu, Popover, Select, Text, View } from "onyx-ui";
import type { FieldValue } from "onyx-ui";

import { Input } from "../terminal/Terminal";

const SelectField = Form.Field.withComponent(Select);
const CheckboxField = Form.Field.withComponent(Checkbox);

function Styleguide() {
  const [itemFilters, setItemFilters] = useState<{
    itemType: undefined | "TO_DO",
    sendSpam: boolean
  }>({
    itemType: "TO_DO",
    sendSpam: true,
  });

  const handleItemFiltersUpdate = (name: string, value: FieldValue) => setItemFilters(filters => ({
    ...filters,
    [name]: value,
  }));

  const itemTypeSelectOptions = [
    { label: "Any", value: undefined },
    {
      label: "", value: "", options: [
        { icon: BookIcon, label: "Story", value: "STORY" },
        { icon: SettingsIcon, label: "Chore", value: "BACKLOG" },
        { icon: BugIcon, label: "Defect", value: "TO_DO" },
        { icon: ClockIcon, label: "Spike", value: "IN_PROGRESS" },
        { icon: LayersIcon, label: "Epic", value: "IN_REVIEW" },
      ],
    },
  ];

  const itemStatusSelectOptions = [
    { label: "Any", value: undefined },
    {
      label: "", value: "", options: [
        { icon: SquareIcon, label: "Conceptual", value: "CONCEPT" },
        { icon: SquareIcon, label: "Backlog", value: "BACKLOG" },
        { icon: SquareIcon, label: "To Do", value: "TO_DO" },
        { icon: SquareIcon, label: "In Progress", value: "IN_PROGRESS" },
        { icon: SquareIcon, label: "In Review", value: "IN_REVIEW" },
        { icon: SquareIcon, label: "Done", value: "DONE" },
      ],
    },
  ];

  return (
    <View flex fillColor="content" padding="16px" spacing="16px"
      style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}
    >
      <View horizontal spacing="16px" align="middle justify">
        <Text fontSize="32px">Page Heading</Text>
        <Button style={{ minWidth: 32 }}>Action Button</Button>
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

        <View flex spacing="8px" align="middle center">
          <View horizontal spacing="8px">
            <Button hover>Hover</Button>
            <Button>Default</Button>
            <Button solid>Solid</Button>
            <Button primary>Primary</Button>
            <Button solid primary>Primary Solid</Button>
          </View>
          <View horizontal spacing="8px">
            <Button round solid icon={HomeIcon}>Left Icon</Button>
            <Button round solid icon={HomeIcon} />
            <Button round solid rightIcon={ChevronDownIcon}>Right Icon</Button>
          </View>
        </View>
      </View>

      <Divider />

      <Text as="a" href="/" textColor="primary" style={{ textDecoration: "none" }}>
        Content
      </Text>

      <Text>
        Click <Text as="a" href="/">here</Text>!
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

      <Divider />

      <View horizontal spacing="8px">
        <Popover isVisible content={
          <View padding="8px 0px">
            <Button hover>
              Hello
            </Button>
          </View>
        }>
          <Button solid rightIcon={ChevronDownIcon}>Popover</Button>
        </Popover>

        <Menu items={[
          <Menu.Item icon={CopyIcon} title="Clone Item" />,
          <Menu.Item icon={BookmarkIcon} title="Bookmark Item" />,
          <Menu noPortal anchor="top right" items={[
            <Menu.Item icon={ArrowRightFromLineIcon} title="Blocked By" />,
          ]}>
            <Menu.Item icon={ArrowRightLeftIcon} title="Related To" rightIcon={ChevronRightIcon} />
          </Menu>,
          <Menu.Divider />,
          <Menu.Group label="Group" />,
          <Menu.Item icon={TrashIcon} title="Delete Item" />,
        ]}>
          <Button solid rightIcon={ChevronDownIcon}>
            Menu
          </Button>
        </Menu>
        <Input border cornerRadius="2px" value={"Hello"} />
      </View>

      <View>
        <Form fields={itemFilters} spacing="16px" onFieldChange={handleItemFiltersUpdate}>
          <View horizontal spacing="16px">
            <SelectField label="Status" name="status" options={itemTypeSelectOptions} />
            <SelectField label="Status" name="status" options={itemTypeSelectOptions} />
          </View>

          <View spacing="8px">
            <Form.Field name="sendSpam">
              <Checkbox label="Yes, send me spam" />
            </Form.Field>

            <CheckboxField label="Yes, send me spam" name="sendSpam" />
          </View>
        </Form>
      </View>
    </View>
  );
}

export default Styleguide;
