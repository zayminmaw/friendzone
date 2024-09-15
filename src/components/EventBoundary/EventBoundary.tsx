import React, { useEffect, useRef } from "react";
import {
  clipboardEvents,
  dragEvents,
  formEvents,
  keyboardEvents,
  mediaEvents,
  mouseEvents,
  pointerEvents,
  windowEvents,
} from "../../constants";
import { EventsCategory } from "./type";

const eventCategories = {
  clipboard: clipboardEvents,
  drag: dragEvents,
  form: formEvents,
  keyboard: keyboardEvents,
  media: mediaEvents,
  mouse: mouseEvents,
  pointer: pointerEvents,
  window: windowEvents,
};

interface EventBoundaryProps {
  children: React.ReactNode;
  stop?: EventsCategory[];
  logID?: string | undefined;
  trace: (eventType: string, event: Event) => void;
}

const EventBoundary: React.FC<EventBoundaryProps> = ({
  children,
  logID,
  stop = ["mouse", "keyboard"],
  trace,
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

    logID && console.log(`Event ${logID} triggered ${event.type}`, event);

    trace?.(event.type, event);
  };

  useEffect(() => {
    const divElement = divRef?.current;

    if (divElement) {
      const eventSet = new Set<string>();
      stop.forEach((type) => {
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
  }, [stop]);

  return <div ref={divRef}>{children}</div>;
};

export default EventBoundary;
