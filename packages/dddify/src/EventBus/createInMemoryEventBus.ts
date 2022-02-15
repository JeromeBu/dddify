import { EventBus, GenericEvent } from "./EventBus";

// prettier-ignore
export const createInMemoryEventBus = <Event extends GenericEvent<string, unknown>>(): EventBus<Event> => {
  const _subscriptions: Partial<Record<
    Event["topic"],
    ((event: Event) => Promise<void>)[]
    >> = {};


  return {
    publish: async (event: Event) => {
      const topic: Event["topic"] = event.topic;

      const callbacks = _subscriptions[topic];
      if (callbacks === undefined) {
        console.warn(
          { eventTopic: event.topic },
          `There are no subscriptions for this topic : '${event.topic}'`
        );
        return;
      }

      await Promise.all(
        callbacks.map(async (cb) => {
          await cb(event);
        })
      );
    },

    subscribe: <Topic extends Event["topic"]>(
      topic: Topic,
      callback: (event: Extract<Event, { topic: Topic }>) => Promise<void>
    ): void => {
      if (!_subscriptions[topic]) {
        _subscriptions[topic] = [];
      }

      if (callback) {
        _subscriptions[topic]!.push(callback as any);
      }
    },
  };
};
