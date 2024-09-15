import { clipboardEvents } from "./clipboardEvents";
import { dragEvents } from "./dragEvents";
import { formEvents } from "./formEvents";
import { keyboardEvents } from "./keyboardEvents";
import { mediaEvents } from "./mediaEvents";
import { mouseEvents } from "./mouseEvents";
import { pointerEvents } from "./pointerEvents";
import { windowEvents } from "./windowEvents";

export const eventCategories = {
  clipboard: clipboardEvents,
  drag: dragEvents,
  form: formEvents,
  keyboard: keyboardEvents,
  media: mediaEvents,
  mouse: mouseEvents,
  pointer: pointerEvents,
  window: windowEvents,
};
