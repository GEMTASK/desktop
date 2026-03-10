/* eslint-disable react-hooks/refs */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { Delegate } from "../../types/Delegate";

import { View } from "..";

function Popover({
  content,
  isVisible,
  children
}: Delegate<{
  content: React.ReactNode;
  isVisible: boolean;
  children: React.ReactElement<{
    ref: React.RefObject<HTMLElement | null>;
    className?: string;
  }> | boolean;
}, typeof View<"div">>) {
  // const [isVisible, setIsVisible] = useState(false);

  const childElementRef = useRef<HTMLDivElement>(null);
  const popoverElementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isVisible && childElementRef.current && popoverElementRef.current) {
      const childClientRect = childElementRef.current.getBoundingClientRect();
      // const popoverClientRect = popoverElementRef.current.getBoundingClientRect();

      popoverElementRef.current.style.left = `${childClientRect.left}px`;
      popoverElementRef.current.style.top = `${childClientRect.top + childClientRect.height + 4}px`;
    }
  }, [isVisible]);

  const overlayElement = document.getElementById("overlay");
  const onlyChild = React.Children.only(children);

  return (
    <>
      {React.isValidElement(onlyChild) && React.cloneElement(onlyChild, {
        ref: childElementRef
      })}
      {isVisible && overlayElement && createPortal((
        <View
          ref={popoverElementRef}
          absolute
          shadow
          fillColor="content"
          cornerRadius="4px"
          style={{ pointerEvents: "auto" }}
        >
          {content}
        </View>
      ), overlayElement)}
    </>
  );
}

export default Popover;
