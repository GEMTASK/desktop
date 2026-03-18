/* eslint-disable react-hooks/refs */

import React, { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import type { Delegate } from "../../types/Delegate";

import { View } from "..";

function Popover({
  content,
  isVisible,
  anchor,
  children
}: Delegate<{
  content: React.ReactNode,
  isVisible: boolean,
  anchor?: "bottom left" | "top right",
  children: React.ReactElement<{
    ref: React.RefObject<HTMLElement | null>,
    className?: string
  }> | boolean
}, typeof View<"div">>) {
  const childElementRef = useRef<HTMLDivElement>(null);
  const popoverElementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const overlayElement = childElementRef.current?.closest("#window")?.querySelector("#overlay") as HTMLElement;

    if (isVisible && childElementRef.current && popoverElementRef.current) {
      const childClientRect = childElementRef.current.getBoundingClientRect();
      // const popoverClientRect = popoverElementRef.current.getBoundingClientRect();
      const overlayClientRect = overlayElement.getBoundingClientRect();

      if (anchor === "top right") {
        popoverElementRef.current.style.left = `${childClientRect.right - overlayClientRect.left}px`;
        popoverElementRef.current.style.top = `${childClientRect.top - 7 - overlayClientRect.top}px`;
      } else {
        popoverElementRef.current.style.left = `${childClientRect.left + 1 - overlayClientRect.left}px`;
        popoverElementRef.current.style.top = `${childClientRect.bottom + 5 - overlayClientRect.top}px`;
      }
    }
  }, [anchor, isVisible]);

  const overlayElement = childElementRef.current?.closest("#window")?.querySelector("#overlay");
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
