import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

import { View } from "..";

function Popover({
  content,
  children
}: {
  content: React.ReactNode
} & React.ComponentProps<typeof View<"div">>) {
  const [isVisible, setIsVisible] = useState(false);

  const overlayElement = document.getElementById("overlay");

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    });


  }, []);

  useLayoutEffect(() => {
    // if (isVisible && childElementRef.current && menuElementRef.current) {
    //   const childClientRect = childElementRef.current.getBoundingClientRect();
    //   const menuClientRect = menuElementRef.current.getBoundingClientRect();

    //   if (anchor === "bottom right") {
    //     menuElementRef.current.style.left = `${childClientRect.right - menuClientRect.width}px`;
    //     menuElementRef.current.style.top = `${childClientRect.top + childClientRect.height + 4}px`;
    //   } else if (anchor === "top left") {
    //     menuElementRef.current.style.left = `${childClientRect.left}px`;
    //     menuElementRef.current.style.top = `${childClientRect.top - childClientRect.height - menuClientRect.height + 4}px`;
    //   } else {
    //     menuElementRef.current.style.left = `${childClientRect.left}px`;
    //     menuElementRef.current.style.top = `${childClientRect.top + childClientRect.height + 4}px`;
    //   }

    //   if (childClientRect.left + menuClientRect.width > window.innerWidth) {
    //     menuElementRef.current.style.left = `${childClientRect.left - (childClientRect.left + menuClientRect.width - window.innerWidth + 16)}px`;
    //   }

    //   if (childClientRect.bottom + menuClientRect.height > window.innerHeight) {
    //     menuElementRef.current.style.top = `${childClientRect.top - menuClientRect.height - 4}px`;
    //   }
    // }
  }, [isVisible]);

  console.log(overlayElement);

  return (
    <>
      <View>
        {children}
      </View>
      {overlayElement && createPortal((
        <View
        // ref={menuElementRef}
        // fillColor="content"
        // className={popoverStyles.Popover}
        >
          {content}
        </View>
      ), overlayElement)}
    </>
  );
}

export default Popover;
