import { ChevronDownIcon } from "lucide-react";

import type { Delegate } from "../../types/Delegate";

import { Icon, Menu, Text, View } from "..";

type OptionValueBase = {
  icon?: React.ComponentProps<typeof Menu.Item>["icon"];
  label: React.ComponentProps<typeof Menu.Item>["title"];
  value: string | undefined;
};

type OptionValue = OptionValueBase & {
  options?: OptionValueBase[];
};

function SelectOption({
  label,
  value,
  onClick,
  onSelect,
  ...props
}: Delegate<{
  label: React.ComponentProps<typeof Menu.Item>["title"];
  value: string | undefined;
  onSelect: (value: string | undefined) => void;
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
  onValueChange?: (value: string | undefined) => void;
}, typeof Menu, "items" | "children">) {
  const handleOptionSelect = (value: string | undefined) => {
    onValueChange?.(value);
  };

  const menuItems = options.flatMap(({ icon, label, value: _value, options }) => {
    switch (true) {
      case options !== undefined:
        return [
          <Menu.Divider />,
          ...(label ? [<Menu.Group label={label as string} />] : []),
          ...options.map(({ icon, label, value: _value }) => (
            <SelectOption selected={_value === value} icon={icon} label={label} value={_value} onSelect={handleOptionSelect} />
          ))
        ];
      default: {
        return (
          <SelectOption selected={_value === value} icon={icon} label={label} value={_value} onSelect={handleOptionSelect} />
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
          <Icon icon={ChevronDownIcon} size={16} style={{ opacity: 0.6, margin: "-4px 0", strokeWidth: 1 }} />
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
