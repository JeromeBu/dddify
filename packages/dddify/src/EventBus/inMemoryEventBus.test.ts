import { createInMemoryEventBus } from "./createInMemoryEventBus";
import { EventBus, GenericEvent } from "./EventBus";

type TestEvent =
  | GenericEvent<"WasSaved", { name: string }>
  | GenericEvent<"WasDeleted", { nameToDelete: string }>;

describe("In Memory event bus", () => {
  let eventBus: EventBus<TestEvent>;

  beforeEach(() => {
    eventBus = createInMemoryEventBus();
  });

  it("executes the subscribed callback when an event is published", async () => {
    const savedEvents: TestEvent[] = [];
    eventBus.subscribe("WasSaved", async (event) => {
      savedEvents.push(event);
    });
    expectToEqual(savedEvents, []);

    const event: TestEvent = {
      id: "1",
      occurredAt: new Date(),
      topic: "WasSaved",
      payload: { name: "bob" },
    };
    await eventBus.publish(event);
    expectToEqual(savedEvents, [event]);
  });

  it("does not trigger execution if subscription is on a different topic", async () => {
    const savedEvents: TestEvent[] = [];
    eventBus.subscribe("WasDeleted", async (event) => {
      savedEvents.push(event);
    });
    expectToEqual(savedEvents, []);

    const event: TestEvent = {
      id: "1",
      occurredAt: new Date(),
      topic: "WasSaved",
      payload: { name: "bob" },
    };
    await eventBus.publish(event);
    expectToEqual(savedEvents, []);
  });
});

const expectToEqual = <T>(actual: T, expected: T) => {
  expect(actual).toEqual(expected);
};
