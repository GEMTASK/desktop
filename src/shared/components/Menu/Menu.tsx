import React, { cloneElement, isValidElement, useState } from "react";

import type { Delegate } from "../../types/Delegate";

import { Button, Divider, Popover, View } from "..";

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
  title: string,
  value?: string;
  onSelect?: (value: string | undefined) => void;
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
  children
}: Delegate<{
  items: (React.ReactElement<{
    onSelect?: (value: string | undefined) => void;
  }>)[],
  children: React.ReactElement<{
    ref: React.RefObject<HTMLElement | null>;
    // cursor: "pointer";
    onClick: React.PointerEventHandler;
  }>;
}, typeof Popover, "isVisible" | "content">) {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const handleItemSelect = () => {
    setIsPopoverVisible(false);
  };

  const popoverContent = (
    <View padding="8px 0px">
      {items.map((item, index) => isValidElement(item) && cloneElement(item, {
        key: index,
        onSelect: handleItemSelect
      }))}
    </View>
  );

  const onlyChild = React.Children.only(children);

  return (
    <Popover isVisible={isPopoverVisible} content={popoverContent}>
      {React.isValidElement(onlyChild) && React.cloneElement(onlyChild, {
        onClick: () => {
          setIsPopoverVisible(isPopoverVisible => !isPopoverVisible);
        }
      })}
    </Popover>
  );
}

Menu.Item = MenuItem;
Menu.Divider = MenuDivider;

export default Menu;
