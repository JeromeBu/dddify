import { v4 as uuid } from "uuid";

export interface UuidGenerator {
  new: () => string;
}

export class CustomUuidGenerator implements UuidGenerator {
  private _nextUuids: string[] = [];

  constructor(private defaultUuid: string = "default-generated-uuid") {}

  new = () => {
    return this._nextUuids.shift() ?? this.defaultUuid;
  };

  // for test purpose
  setNextUuid = (uuid: string) => {
    this._nextUuids = [uuid];
  };

  setNextUuids = (uuids: string[]) => {
    this._nextUuids = uuids;
  };
}

export class ActualUuidGenerator implements UuidGenerator {
  new = () => uuid();
}
