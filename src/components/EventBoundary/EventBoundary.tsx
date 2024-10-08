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
import { EventCategories } from "../../types";

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
  trace: EventCategories[];
  logName?: string | undefined;
  onEvent?: (eventType: string, event: Event) => void | undefined;
}

const EventBoundary: React.FC<EventBoundaryProps> = ({
  children,
  logName,
  trace = [],
  onEvent,
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleEvent = (event: Event) => {
    logName && console.log(`${logName}: ${event.type}`, event);
    onEvent?.(event.type, event);
  };

  useEffect(() => {
    const divElement = divRef?.current;

    if (divElement) {
      const eventSet = new Set<string>();
      trace.forEach((type) => {
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
