import React, { useEffect, useRef } from "react";
import { eventCategories } from "../../constants";
import { EventCategories } from "../../types";

interface EventBlackHoleProps {
  children: React.ReactNode;
  absorbOnly?: EventCategories[] | undefined;
  logName?: string | undefined;
}

const EventBlackHole: React.FC<EventBlackHoleProps> = ({
  children,
  absorbOnly = [
    "clipboard",
    "drag",
    "form",
    "keyboard",
    "media",
    "mouse",
    "pointer",
    "window",
  ],
  logName,
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleEvent = (event: Event) => {
    event.stopPropagation();

    if (
      event.type === "submit" ||
      event.type === "click" ||
      event.type === "contextmenu"
    ) {
      event.preventDefault();
    }

    logName && console.log(`${logName}: ${event.type}`, event);
  };

  useEffect(() => {
    const divElement = divRef?.current;

    if (divElement) {
      const eventSet = new Set<string>();
      absorbOnly.forEach((type) => {
        const eventList = eventCategories[type as keyof typeof eventCategories];
        eventList?.forEach((eventType) => eventSet.add(eventType));
      });

      eventSet.forEach((eventType) => {
        divElement.addEventListener(eventType, handleEvent);
      });

      return () => {
        eventSet.forEach((eventType) => {
          divElement.removeEventListener(eventType, handleEvent);
        });
      };
    }
  }, []);

  return <div ref={divRef}>{children}</div>;
};

export default EventBlackHole;
