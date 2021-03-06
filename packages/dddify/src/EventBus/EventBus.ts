export type GenericEvent<T extends string, P> = {
  id: string;
  occurredAt: Date;
  topic: T;
  payload: P;
};

export interface EventBus<Event extends GenericEvent<string, unknown>> {
  publish: (event: Event) => Promise<void>;
  subscribe: <Topic extends Event["topic"]>(
    topic: Topic,
    callBack: (e: Extract<Event, { topic: Topic }>) => Promise<void>
  ) => void;
}
