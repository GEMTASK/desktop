import type { Delegate } from "../../types/Delegate";

import { Label, Menu, Text } from "..";

type OptionValueBase = {
  icon?: React.ComponentProps<typeof Menu.Item>["icon"],
  label: React.ComponentProps<typeof Menu.Item>["title"],
  value: string | undefined
};

type OptionValue = OptionValueBase & {
  options?: OptionValueBase[]
};

function SelectOption({
  label,
  value,
  onClick,
  onSelect,
  ...props
}: Delegate<{
  label: React.ComponentProps<typeof Menu.Item>["title"],
  value: string | undefined,
  onSelect: (value: string | undefined) => void
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
  label,
  value,
  options,
  onValueChange,
  ...props
}: Delegate<{
  label?: string,
  value?: string,
  options: OptionValue[],
  onValueChange?: (value: string | undefined) => void
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
      <Label chevron label={label}>
        <Text>
          {options.reduce((acc, option) => (
            option.value === value ? option : option.options?.find(option => option?.value === value) ?? acc
          )).label}
        </Text>
      </Label>
    </Menu>
  );
}

export default Select;
