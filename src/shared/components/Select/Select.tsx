import { ChevronDownIcon } from "lucide-react";

import type { Delegate } from "../../types/Delegate";

import { Icon, Menu, Text, View } from "..";

type OptionValue = {
  icon?: React.ComponentProps<typeof Menu.Item>["icon"];
  label: React.ComponentProps<typeof Menu.Item>["title"];
  value: string;
  options?: OptionValue[];
};

function Option({
  label,
  value,
  onClick,
  onSelect,
  ...props
}: Delegate<{
  label: React.ComponentProps<typeof Menu.Item>["title"];
  value: string;
  onSelect: (value: string) => void;
}, typeof Menu.Item, "title">) {
  const handleItemClick = () => {
    onSelect?.(value);
  };

  return (
    <Menu.Item title={label} onClick={handleItemClick} {...props} />
  );
}

//
// Select
//

function Select({
  value,
  options,
  onValueChange,
  ...props
}: Delegate<{
  value?: string;
  options: OptionValue[];
  onValueChange?: (value: string) => void;
}, typeof Menu, "items" | "children">) {
  const handleOptionSelect = (value: string) => {
    onValueChange?.(value);
  };

  const menuItems = options.flatMap(({ icon, label, value: _value, options }) => {
    switch (true) {
      case options !== undefined:
        return (
          [<Menu.Divider />, ...options.map(({ icon, label, value: _value }) => (
            <Option selected={_value === value} icon={icon} label={label} value={_value} onSelect={handleOptionSelect} />
          ))]
        );
      default: {
        return (
          <Option selected={_value === value} icon={icon} label={label} value={_value} onSelect={handleOptionSelect} />
        );
      }
    }
  });

  return (
    <Menu items={menuItems} {...props}>
      <View spacing="8px">
        <View horizontal align="middle left">
          <Text light caps fontSize="12px" innerStyle={{ fontSize: 11, lineHeight: "17px" }}>
            Status
          </Text>
          <Icon icon={ChevronDownIcon} size={16} style={{ opacity: 0.6, margin: "-4px 0" }} />
        </View>
        <Text>
          {options.reduce((acc, option) => (
            option.value === value ? option : option.options?.find(option => option?.value === value) ?? acc
          )).label}
        </Text>
      </View>
    </Menu>
  );
}

export default Select;
