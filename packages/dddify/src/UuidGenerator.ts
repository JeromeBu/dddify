import { v4 as uuidV4 } from "uuid";
import { createCustomValues } from "./createCustomValues";

type Uuid = string;

export interface UuidGenerator {
  new: () => Uuid;
}

interface CustomUuidGenerator extends UuidGenerator {
  setNextUuid: (uuid: Uuid) => void;
  setNextUuids: (uuids: Uuid[]) => void;
}

export const createCustomUuidGenerator = (
  defaultUuid: Uuid = "default-generated-uuid"
): CustomUuidGenerator => {
  const { newValue, setNextValues, setNextValue } =
    createCustomValues(defaultUuid);

  return {
    new: newValue,
    setNextUuid: setNextValue,
    setNextUuids: setNextValues,
  };
};

export const createActualUuidGenerator = (): UuidGenerator => ({
  new: uuidV4,
});
