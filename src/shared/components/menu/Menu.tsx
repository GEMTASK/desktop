import React, { cloneElement, isValidElement, useState } from "react";

import type { Delegate } from "../../types/Delegate";

import { Button, Divider, Popover, Text, View } from "..";

function MenuGroup({ label }: { label: string }) {
  return (
    <Text light caps style={{ margin: "8px 16px" }} innerStyle={{ fontSize: 11, lineHeight: "17px" }}>
      {label}
    </Text>
  );
}

function MenuDivider() {
  return (
    <Divider style={{ margin: "8px" }} />
  );
}

//
// MenuItem
//

function MenuItem({
  title,
  value,
  onClick,
  onSelect,
  ...props
}: Delegate<{
  title: React.ComponentProps<typeof Button>["children"],
  value?: string,
  onSelect?: (value: string | undefined) => void
}, typeof Button>) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    onSelect?.(value);
  };

  return (
    <Button hover align="middle left" cornerRadius="0px" {...props} onClick={handleClick}>
      {title}
    </Button>
  );
}

//
// Menu
//

function Menu({
  items,
  children,
  onSelect,
  ...props
}: Delegate<{
  items: (React.ReactElement<{
    onSelect?: (value: string | undefined) => void
  }>)[],
  children: React.ReactElement<{
    ref: React.RefObject<HTMLElement | null>,
    style: React.CSSProperties,
    onClick: React.PointerEventHandler
  }>,
  onSelect?: (value: string | undefined) => void
}, typeof Popover, "isVisible" | "content">) {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const handleItemSelect = (value: string | undefined) => {
    setIsPopoverVisible(false);

    onSelect?.(value);
  };

  const popoverContent = (
    <View padding="8px 0px">
      {items.map((item, index) => isValidElement(item) && cloneElement(item, {
        key: index,
        onSelect: (...args) => { handleItemSelect(...args); item.props.onSelect?.(...args); }
      }))}
    </View>
  );

  const onlyChild = React.Children.only(children);

  return (
    <Popover isVisible={isPopoverVisible} content={popoverContent} {...props}>
      {React.isValidElement(onlyChild) && React.cloneElement(onlyChild, {
        style: {
          cursor: "pointer"
        },
        onClick: () => {
          setIsPopoverVisible(isPopoverVisible => !isPopoverVisible);
        }
      })}
    </Popover>
  );
}

Menu.Item = MenuItem;
Menu.Divider = MenuDivider;
Menu.Group = MenuGroup;

export default Menu;
