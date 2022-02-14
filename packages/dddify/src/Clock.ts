export interface Clock {
  now(): Date;
}

export class CustomClock implements Clock {
  constructor(
    private _defaultDate: Date = new Date("2022-01-01T12:00:00.000Z")
  ) {}

  private _nextDates: Date[] = [];

  public now = () => this._nextDates.shift() ?? this._defaultDate;

  // for test purpose :
  setNextDate = (date: Date) => {
    this._nextDates = [date];
  };
  setNextDates = (dates: Date[]) => {
    this._nextDates = dates;
  };
}

export class ActualClock implements Clock {
  public now = () => new Date();
}
