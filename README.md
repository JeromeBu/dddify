# Dddify

Being tired to recreate the same abstraction and implementation in many project, I am building this lib to have it ready to use.

There should be :

- A `Clock` interface, and both a `CustomClock` for test and an `ActualClock`
- A `UuidGenerator` interface, and both a `CustomUuidGenerator` for test and an `ActualUuidGenerator`
- An `EventBus` with an in memory implementation
