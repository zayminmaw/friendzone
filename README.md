# friendzone

The boundary no events can cross. It's a React component library that captures and manages event propagation for its child elements. It provides a way to stop the propagation of certain event categories (e.g., mouse, keyboard, clipboard) and optionally logs the event information for debugging purposes.

## Components

- EventBoundary
- EventBlackHole
- OnClickBoundary

## Usage Example

### EventBoundary

EventBoundary attributes are `trace`, `onEvent` and `logName`.

| Attribute | Type                                                                      | Description           |
| --------- | ------------------------------------------------------------------------- | --------------------- |
| trace     | ["clipboard","drag","form","keyboard","media","mouse","pointer","window"] |                       |
| onEvent   | (eventType: string, event: Event) => void                                 |                       |
| logName   | string                                                                    | For debugging purpose |

```typescript
import {  EventBoundary } from "friendzone";

function App() {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid black",
      }}
      onClick={() => {
        console.log("parent");
      }}
    >
      <EventBoundary trace={["mouse"]} onEvent={(_, e) => {}>
        <div
          style={{
            padding: 10,
            border: "1px solid red",
          }}
          onClick={() => {
            console.log("child");
          }}
        >
          click
        </div>
       </EventBoundary>
    </div>
  );
}

export default App;

```

### EventBlackHole

EventBlackHole attributes are `absorbOnly` and `logName`.

| Attribute  | Type                                                                      | Description           |
| ---------- | ------------------------------------------------------------------------- | --------------------- |
| absorbOnly | ["clipboard","drag","form","keyboard","media","mouse","pointer","window"] |                       |
| logName    | string                                                                    | For debugging purpose |

```typescript
import { EventBlackHole, EventBoundary, OnClickBoundary } from "friendzone";

function App() {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid black",
      }}
      onClick={() => {
        console.log("parent");
      }}
    >
      <EventBlackHole absorbOnly={["keyboard"]}>
        <div
          style={{
            padding: 10,
            border: "1px solid red",
          }}
          onClick={() => {
            console.log("child");
          }}
        >
          click
        </div>
      </EventBlackHole>
    </div>
  );
}

export default App;
```

### OnClickBoundary

No attributes.

```typescript
import { OnClickBoundary } from "friendzone";

function App() {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid black",
      }}
      onClick={() => {
        console.log("parent");
      }}
    >
      <OnClickBoundary>
        {" "}
        // On click boundary will prevent parent from getting triggered
        <div
          style={{
            padding: 10,
            border: "1px solid red",
          }}
          onClick={() => {
            console.log("child");
          }}
        >
          click
        </div>
      </OnClickBoundary>
    </div>
  );
}

export default App;
```
