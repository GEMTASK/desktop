import { CheckIcon } from "lucide-react";

import { Icon, Label, Text, View } from "..";

function Checkbox({
  label,
  value,
  onValueChange
}: {
  label?: string,
  value?: boolean,
  onValueChange?: (value: boolean) => void
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.currentTarget.checked);
  };

  return (
    <Label horizontal spacing="8px" align="middle left">
      <View fillColor={value ? "primary" : "divider"} cornerRadius="2px" align="middle center" style={{ width: 24, height: 24 }}>
        <View absolute as="input" type="checkbox" checked={value} onChange={handleChange} />
        {value && (
          <Icon icon={CheckIcon} size={20} color="white" />
        )}
      </View>
      <Text>{label}</Text>
    </Label>
  );
}

export default Checkbox;
