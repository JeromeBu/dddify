import { createCustomUuidGenerator } from "./UuidGenerator";

const libDefaultUuid = "default-generated-uuid";

describe("CustomUuidGenerator", () => {
  it("can set the next uuid, than fallback to default", () => {
    const uuidGenerator = createCustomUuidGenerator();

    const nextUuid = "uuid-1";
    uuidGenerator.setNextUuid(nextUuid);

    expect(uuidGenerator.new()).toEqual(nextUuid);
    expect(uuidGenerator.new()).toEqual(libDefaultUuid);
  });

  it("can set the next n uuid, than fallback to default", () => {
    const uuidGenerator = createCustomUuidGenerator();

    const uuid1 = "uuid-1";
    const uuid2 = "uuid-2";
    const uuid3 = "uuid-3";
    uuidGenerator.setNextUuids([uuid1, uuid2, uuid3]);

    expect(uuidGenerator.new()).toEqual(uuid1);
    expect(uuidGenerator.new()).toEqual(uuid2);
    expect(uuidGenerator.new()).toEqual(uuid3);
    expect(uuidGenerator.new()).toEqual(libDefaultUuid);
  });

  it("has deterministic default value", () => {
    const uuidGenerator = createCustomUuidGenerator();
    expect(uuidGenerator.new()).toEqual(libDefaultUuid);
  });

  it("has configurable default value", () => {
    const newDefaultUuid = "my-custom-uuid";
    const uuidGenerator = createCustomUuidGenerator(newDefaultUuid);
    expect(uuidGenerator.new()).toEqual(newDefaultUuid);
  });
});
