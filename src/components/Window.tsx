import { useLayoutEffect, useRef, useState } from "react";
import { Minimize2Icon, MinimizeIcon, XIcon } from "lucide-react";

import type { Delegate } from "onyx-ui";

import { View, Text, Button } from "onyx-ui";

import Frame from "./Frame";
import styles from "./styles.module.scss";

type PointerData = {
  clientX: number,
  clientY: number,
  offsetLeft: number,
  offsetTop: number,
};

//
// Window
//

function Window({
  id,
  title,
  children,
  position,
  size,
  order,
  minimized,
  onLayout,
  onUpdate,
  onFocus,
  onRequestClose,
  onRequestMinimize,
}: Delegate<{
  id: string,
  title: string,
  position?: {
    x: number,
    y: number,
  },
  size: {
    width?: number,
    height?: number,
  },
  order: number,
  minimized: boolean,
  onLayout?: (id: string, element: HTMLElement) => void,
  onUpdate: (id: string, x: number, y: number) => void,
  onFocus: (id: string) => void,
  onRequestClose?: (id: string) => void,
  onRequestMinimize?: (id: string) => void,
}, typeof View<"div">>) {
  const initialMoveEventRef = useRef<PointerData | null>(null);
  const initialResizeDOMRectRef = useRef<DOMRect | null>(null);

  const windowElementRef = useRef<HTMLDivElement>(null);

  //

  const handleTitlebarPointerDown = (event: React.PointerEvent) => {
    event.currentTarget.setPointerCapture(event.pointerId);

    if (windowElementRef.current) {
      initialMoveEventRef.current = {
        clientX: event.clientX,
        clientY: event.clientY,
        offsetLeft: event.clientX - windowElementRef.current.offsetLeft,
        offsetTop: event.clientY - windowElementRef.current.offsetTop,
      };

      windowElementRef.current.style.willChange = "left, top";
    }

    onFocus(id);
  };

  const handleTitlebarPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (windowElementRef.current && initialMoveEventRef.current) {
      if (
        Math.abs(event.clientX - initialMoveEventRef.current.clientX) > 1
        || Math.abs(event.clientY - initialMoveEventRef.current.clientY) > 1
      ) {
        windowElementRef.current.style.left = `${event.clientX - initialMoveEventRef.current.offsetLeft}px`;
        windowElementRef.current.style.top = `${event.clientY - initialMoveEventRef.current.offsetTop}px`;
      }
    }
  };

  const handleTitlebarPointerUp = () => {
    if (windowElementRef.current && initialMoveEventRef.current) {
      initialMoveEventRef.current = null;

      windowElementRef.current.style.left = `${Math.round(windowElementRef.current.offsetLeft / 15) * 15}px`;
      windowElementRef.current.style.top = `${Math.round(windowElementRef.current.offsetTop / 15) * 15}px`;

      onUpdate(id,
        windowElementRef.current.offsetLeft,
        windowElementRef.current.offsetTop,
      );

      windowElementRef.current.style.willChange = "left, top";
    }
  };

  const handleCloseButtonPointerDown = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleCloseButtonClick = (event: React.MouseEvent) => {
    if (windowElementRef.current && styles.close) {
      windowElementRef.current.addEventListener("animationend", () => {
        onRequestClose?.(id);
      });

      windowElementRef.current.classList.add(styles.close);
    }
  };

  const handleMinimizeButtonClick = (event: React.MouseEvent) => {
    if (windowElementRef.current && styles.minimize) {
      // windowElementRef.current.addEventListener("animationend", () => {
      onRequestMinimize?.(id);
      // });

      // windowElementRef.current.classList.add(styles.minimize);
    }
  };

  //

  const handleFrameResizeStart = () => {
    if (windowElementRef.current) {
      initialResizeDOMRectRef.current = windowElementRef.current.getBoundingClientRect();
    }
  };

  const handleFrameUpdate = (deltaX: number, deltaY: number) => {
    if (windowElementRef.current && initialResizeDOMRectRef.current) {
      windowElementRef.current.style.width = `${initialResizeDOMRectRef.current.width + deltaX}px`;
      windowElementRef.current.style.height = `${initialResizeDOMRectRef.current.height + deltaY}px`;
    }
  };

  useLayoutEffect(() => {
    onLayout?.(id, windowElementRef.current!);
  }, [id, onLayout]);

  useLayoutEffect(() => {
    if (minimized && windowElementRef.current && styles.minimize) {
      windowElementRef.current.classList.add(styles.minimize);
    } else if (!minimized && windowElementRef.current && styles.minimize) {
      windowElementRef.current.classList.remove(styles.minimize);
    }
  }, [minimized]);

  return (
    <View id="window" ref={windowElementRef} absolute shadow cornerRadius="4px" className={styles.element} style={{
      left: position?.x, top: position?.y, width: size.width, height: size.height, zIndex: order,
    }}>
      <View id="overlay" absolute style={{ zIndex: 1000, inset: 0, top: 30, pointerEvents: "none" }} />
      <Frame onStart={handleFrameResizeStart} onUpdate={handleFrameUpdate} />
      <View horizontal border="bottom" borderColor="gutter" fillColor="divider" align="middle justify" style={{
        borderTopLeftRadius: 4, borderTopRightRadius: 4, minHeight: 32, marginBottom: -1, zIndex: 1,
      }}
        onPointerDown={handleTitlebarPointerDown}
        onPointerMove={handleTitlebarPointerMove}
        onPointerUp={handleTitlebarPointerUp}
      >
        <View flex horizontal>
          <Button
            hover
            icon={XIcon}
            style={{ padding: 6, marginLeft: 4 }}
            onPointerDown={handleCloseButtonPointerDown}
            onClick={handleCloseButtonClick}
          />
        </View>
        <Text fontWeight="700" padding="8px 16px" style={{ marginBottom: -1 }}>
          {title}
        </Text>
        <View flex horizontal align="right">
          <Button
            hover
            icon={Minimize2Icon}
            style={{ padding: 6, marginRight: 4 }}
            onPointerDown={handleCloseButtonPointerDown}
            onClick={handleMinimizeButtonClick}
          />
        </View>
      </View>
      <View flex id="content" fillColor="content" style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4, overflow: "hidden" }}>
        {children}
      </View>
    </View>
  );
}

export default Window;
