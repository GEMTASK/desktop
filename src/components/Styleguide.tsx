import { useState } from "react";
import {
  ArrowRightFromLineIcon, ArrowRightLeftIcon, BookmarkIcon, ChevronDownIcon, ChevronRightIcon, CopyIcon,
  HomeIcon, SquareIcon, TrashIcon
} from "lucide-react";

import { Button, Divider, Icon, Text, View, Popover, Menu, Select, Form } from "../shared/components";

import type { FieldValue } from "../shared/components/Form/Form";

const SelectField = Form.Field.withComponent(Select);

function Styleguide() {
  const [itemFilters, setItemFilters] = useState<{
    itemType: undefined | "TO_DO"
  }>({
    itemType: "TO_DO"
  });

  const handleItemFiltersUpdate = (name: string, value: FieldValue) => setItemFilters(filters => ({
    ...filters,
    [name]: value
  }));

  const itemTypeSelectOptions = [
    { label: "Any", value: undefined },
    { icon: SquareIcon, label: "To Do", value: "TO_DO" },
  ];

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
            <Button round solid icon={HomeIcon}>Left Icon</Button>
            <Button round solid icon={HomeIcon} />
            <Button round solid rightIcon={ChevronDownIcon}>Right Icon</Button>
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
          <Menu anchor="top right" items={[<Menu.Item icon={ArrowRightFromLineIcon} title="Blocked By" />]}>
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

        <Form horizontal fields={itemFilters} spacing="8px" onFieldChange={handleItemFiltersUpdate}>
          <Form.Field name="status">
            <Select options={[
              { label: "Any", value: undefined },
              { icon: SquareIcon, label: "Backlog", value: "BACKLOG" },
              { icon: SquareIcon, label: "To Do", value: "TO_DO" },
            ]} />
          </Form.Field>
          <SelectField name="status" options={itemTypeSelectOptions} />
        </Form>
      </View>
    </View>
  );
}

export default Styleguide;
