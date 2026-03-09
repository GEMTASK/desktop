import { View, Text } from "..";

import styles from "./Button.module.scss";

const getFillColor = ({ primary }: { primary?: boolean }) => {
  switch (true) {
    case primary:
      return "blue-5";
  }

  return "gray-1";
};

const getTextColor = ({ primary }: { primary?: boolean }) => {
  switch (true) {
    case primary:
      return "white";
  }

  return undefined;
};

function Button({
  primary,
  children,
  ...props
}: {
  primary?: boolean;
} & React.ComponentProps<typeof View<"button">>) {
  const buttonClassName = [
    styles.Button
  ].filter(className => className).join(" ");

  return (
    <View
      as="button"
      type="button"
      fillColor={getFillColor({ primary })}
      cornerRadius="2px"
      className={buttonClassName}
      {...props}
    >
      <Text>
        {children}
      </Text>
    </View>
  );
}

export default Button;
